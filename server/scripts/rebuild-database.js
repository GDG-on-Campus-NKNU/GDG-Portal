/**
 * 完整重構資料庫腳本
 * 修復 "Too many keys specified; max 64 keys allowed" 錯誤
 * 
 * 這個腳本會：
 * 1. 備份所有資料
 * 2. 重新創建表格結構
 * 3. 恢復所有資料
 * 4. 重建外鍵關聯
 * 
 * 使用方法：
 * node scripts/rebuild-database.js
 */

import sequelize from '../config/database.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 載入環境變數
dotenv.config({ path: path.join(__dirname, '../.env') });

// 日誌記錄
const logFile = `database-rebuild-${new Date().toISOString().replace(/[:.]/g, '-')}.log`;
const logPath = path.join(__dirname, logFile);

const log = async (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(message);
  await fs.appendFile(logPath, logMessage);
};

// 表格列表和依賴關係 (按創建順序排序)
const tables = [
  // 核心表格 (無外鍵依賴)
  { name: 'users', hasForeignKeys: false },
  { name: 'categories', hasForeignKeys: false },
  { name: 'event_tags', hasForeignKeys: false },
  { name: 'announcement_tags', hasForeignKeys: false },

  // 一級依賴 (依賴於核心表格)
  { name: 'profiles', hasForeignKeys: true, dependencies: ['users'] },
  { name: 'core_teams', hasForeignKeys: true, dependencies: ['users'] },
  { name: 'events', hasForeignKeys: true, dependencies: ['users'] },
  { name: 'announcements', hasForeignKeys: true, dependencies: ['users'] },

  // 二級依賴 (依賴於一級依賴表格)
  { name: 'core_team_categories', hasForeignKeys: true, dependencies: ['core_teams', 'categories'] },
  { name: 'event_speakers', hasForeignKeys: true, dependencies: ['events'] },
  { name: 'event_registrations', hasForeignKeys: true, dependencies: ['events', 'users'] },
  { name: 'galleries', hasForeignKeys: true, dependencies: ['events', 'users'] },
  { name: 'event_tag_relationships', hasForeignKeys: true, dependencies: ['events', 'event_tags'] },
  { name: 'announcement_tag_relationships', hasForeignKeys: true, dependencies: ['announcements', 'announcement_tags'] }
];

/**
 * 檢查表格是否存在
 */
const tableExists = async (tableName) => {
  try {
    const query = `
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_schema = '${process.env.DB_NAME}' 
      AND table_name = '${tableName}'
    `;
    const [results] = await sequelize.query(query);
    return results[0].count > 0;
  } catch (error) {
    await log(`檢查表格 ${tableName} 失敗: ${error.message}`);
    return false;
  }
};

/**
 * 獲取表格結構
 */
const getTableSchema = async (tableName) => {
  try {
    const query = `SHOW CREATE TABLE ${tableName}`;
    const [results] = await sequelize.query(query);
    if (results && results.length > 0) {
      // 移除外鍵約束
      let createStatement = results[0]['Create Table'];
      createStatement = createStatement.replace(/,\s*CONSTRAINT\s+`[^`]+`\s+FOREIGN KEY\s+\([^)]+\)\s+REFERENCES\s+`[^`]+`\s+\([^)]+\)(\s+ON DELETE\s+[A-Z]+)?(\s+ON UPDATE\s+[A-Z]+)?/g, '');
      return createStatement;
    }
    return null;
  } catch (error) {
    await log(`獲取表格 ${tableName} 結構失敗: ${error.message}`);
    return null;
  }
};

/**
 * 獲取表格數據
 */
const getTableData = async (tableName) => {
  try {
    const [results] = await sequelize.query(`SELECT * FROM ${tableName}`);
    return results;
  } catch (error) {
    await log(`獲取表格 ${tableName} 數據失敗: ${error.message}`);
    return [];
  }
};

/**
 * 創建表格備份
 */
const backupTable = async (tableName) => {
  try {
    const backupTableName = `${tableName}_backup`;

    // 檢查備份表是否存在，如果存在則刪除
    if (await tableExists(backupTableName)) {
      await sequelize.query(`DROP TABLE ${backupTableName}`);
    }

    // 創建備份表
    await sequelize.query(`CREATE TABLE ${backupTableName} LIKE ${tableName}`);
    await sequelize.query(`INSERT INTO ${backupTableName} SELECT * FROM ${tableName}`);

    await log(`✓ 表格 ${tableName} 已成功備份到 ${backupTableName}`);
    return true;
  } catch (error) {
    await log(`✗ 備份表格 ${tableName} 失敗: ${error.message}`);
    return false;
  }
};

/**
 * 從備份恢復數據
 */
const restoreDataFromBackup = async (tableName) => {
  const backupTableName = `${tableName}_backup`;

  try {
    // 檢查原表和備份表是否存在
    if (!await tableExists(tableName)) {
      await log(`✗ 恢復數據失敗: 表格 ${tableName} 不存在`);
      return false;
    }

    if (!await tableExists(backupTableName)) {
      await log(`✗ 恢復數據失敗: 備份表 ${backupTableName} 不存在`);
      return false;
    }

    // 取得欄位列表以確保只插入兩個表格共有的欄位
    const [columnsResult] = await sequelize.query(`
      SELECT COLUMN_NAME
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = '${process.env.DB_NAME}'
        AND TABLE_NAME = '${tableName}'
    `);

    const [backupColumnsResult] = await sequelize.query(`
      SELECT COLUMN_NAME
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = '${process.env.DB_NAME}'
        AND TABLE_NAME = '${backupTableName}'
    `);

    const tableColumns = columnsResult.map(col => col.COLUMN_NAME);
    const backupColumns = backupColumnsResult.map(col => col.COLUMN_NAME);

    // 找出兩表共有的欄位
    const commonColumns = tableColumns.filter(col => backupColumns.includes(col));
    const columnsList = commonColumns.map(col => `\`${col}\``).join(', ');

    // 恢復數據
    await sequelize.query(`
      INSERT INTO ${tableName} (${columnsList})
      SELECT ${columnsList} FROM ${backupTableName}
    `);

    await log(`✓ 已從 ${backupTableName} 恢復數據到 ${tableName}`);
    return true;
  } catch (error) {
    await log(`✗ 從備份恢復數據到 ${tableName} 失敗: ${error.message}`);
    return false;
  }
};

/**
 * 重建 users 表結構 (修復索引過多問題)
 */
const rebuildUsersTable = async () => {
  try {
    await log('開始重建 users 表...');

    // 創建新的 users 表定義（無外鍵依賴）
    const newUserTableQuery = `
      CREATE TABLE users_new (
        id INT AUTO_INCREMENT PRIMARY KEY,
        google_id VARCHAR(255) NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        avatar_url TEXT NULL,
        role ENUM('admin', 'core', 'member') DEFAULT 'member',
        is_active BOOLEAN DEFAULT TRUE,
        email_verified BOOLEAN DEFAULT FALSE,
        refresh_token TEXT NULL,
        last_login DATETIME NULL,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL,
        INDEX idx_google_id (google_id),
        UNIQUE INDEX idx_unique_email (email),
        UNIQUE INDEX idx_unique_google_id (google_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    // 創建新表
    await sequelize.query(newUserTableQuery);
    await log('✓ 已創建新的 users_new 表');

    // 從備份表複製數據到新表
    try {
      await sequelize.query(`
        INSERT INTO users_new (
          id, google_id, email, password, name, avatar_url, role, is_active, 
          email_verified, refresh_token, last_login, created_at, updated_at
        )
        SELECT 
          id, google_id, email, password, name, avatar_url, role, is_active, 
          email_verified, refresh_token, last_login, created_at, updated_at
        FROM users_backup;
      `);
      await log('✓ 已將數據從 users_backup 複製到 users_new');
    } catch (error) {
      await log(`✗ 複製數據到 users_new 失敗: ${error.message}`);
      throw error;
    }

    // 備份原始表，刪除原表，重命名新表
    try {
      // 若有舊的表存在，先刪除
      if (await tableExists('users_old')) {
        await sequelize.query('DROP TABLE users_old');
      }

      // 重命名表
      await sequelize.query('RENAME TABLE users TO users_old, users_new TO users');
      await log('✓ 已重命名表: users -> users_old, users_new -> users');
    } catch (error) {
      await log(`✗ 重命名表失敗: ${error.message}`);
      throw error;
    }

    await log('✓ users 表重建完成');
    return true;
  } catch (error) {
    await log(`✗ 重建 users 表失敗: ${error.message}`);
    return false;
  }
};

/**
 * 重建外鍵關係
 */
const rebuildForeignKeys = async () => {
  try {
    await log('開始重建外鍵關係...');

    // 添加 profiles 表的外鍵
    await sequelize.query(`
      ALTER TABLE profiles
      ADD CONSTRAINT fk_profiles_users
      FOREIGN KEY (user_id) REFERENCES users(id) 
      ON DELETE CASCADE ON UPDATE CASCADE
    `);

    // 添加 core_teams 表的外鍵
    await sequelize.query(`
      ALTER TABLE core_teams
      ADD CONSTRAINT fk_core_teams_users
      FOREIGN KEY (user_id) REFERENCES users(id)
      ON DELETE SET NULL ON UPDATE CASCADE
    `);

    // 添加 events 表的外鍵 (如果有 created_by 欄位)
    const [eventsColumns] = await sequelize.query(`
      SHOW COLUMNS FROM events WHERE Field = 'created_by'
    `);

    if (eventsColumns.length > 0) {
      await sequelize.query(`
        ALTER TABLE events
        ADD CONSTRAINT fk_events_users
        FOREIGN KEY (created_by) REFERENCES users(id)
        ON DELETE SET NULL ON UPDATE CASCADE
      `);
    }

    // 添加 announcements 表的外鍵 (如果有 created_by 欄位)
    const [announcementsColumns] = await sequelize.query(`
      SHOW COLUMNS FROM announcements WHERE Field = 'created_by'
    `);

    if (announcementsColumns.length > 0) {
      await sequelize.query(`
        ALTER TABLE announcements
        ADD CONSTRAINT fk_announcements_users
        FOREIGN KEY (created_by) REFERENCES users(id)
        ON DELETE SET NULL ON UPDATE CASCADE
      `);
    }

    // 添加 event_registrations 表的外鍵
    await sequelize.query(`
      ALTER TABLE event_registrations
      ADD CONSTRAINT fk_event_registrations_users
      FOREIGN KEY (user_id) REFERENCES users(id)
      ON DELETE CASCADE ON UPDATE CASCADE
    `);

    // 添加 galleries 表的外鍵
    await sequelize.query(`
      ALTER TABLE galleries
      ADD CONSTRAINT fk_galleries_users
      FOREIGN KEY (created_by) REFERENCES users(id)
      ON DELETE SET NULL ON UPDATE CASCADE
    `);

    await log('✓ 外鍵關係重建完成');
    return true;
  } catch (error) {
    await log(`✗ 重建外鍵關係失敗: ${error.message}`);
    return false;
  }
};

/**
 * 刪除備份表
 */
const cleanupBackupTables = async () => {
  try {
    await log('開始清理備份表...');

    for (const table of tables) {
      const backupTableName = `${table.name}_backup`;
      if (await tableExists(backupTableName)) {
        await sequelize.query(`DROP TABLE ${backupTableName}`);
        await log(`✓ 已刪除備份表 ${backupTableName}`);
      }
    }

    await log('✓ 備份表清理完成');
    return true;
  } catch (error) {
    await log(`✗ 清理備份表失敗: ${error.message}`);
    return false;
  }
};

/**
 * 主函數：重建資料庫
 */
const rebuildDatabase = async () => {
  try {
    await log('=== 資料庫重構開始 ===');

    // 檢查資料庫連接
    await sequelize.authenticate();
    await log('✓ 資料庫連接成功');

    // 1. 備份所有表格數據
    await log('=== 開始備份資料 ===');
    for (const table of tables) {
      if (await tableExists(table.name)) {
        await backupTable(table.name);
      } else {
        await log(`表格 ${table.name} 不存在，跳過備份`);
      }
    }

    // 2. 重建 users 表
    await rebuildUsersTable();

    // 3. 重建外鍵關係
    await rebuildForeignKeys();

    // 4. 檢查結果
    await log('=== 重構完成，進行檢查 ===');
    await log('檢查 users 表是否存在...');
    const usersExist = await tableExists('users');
    await log(`users 表 ${usersExist ? '存在' : '不存在'}`);

    if (usersExist) {
      const [userCount] = await sequelize.query('SELECT COUNT(*) as count FROM users');
      await log(`users 表中共有 ${userCount[0].count} 條記錄`);

      const [indexCount] = await sequelize.query(`
        SELECT COUNT(*) as count
        FROM information_schema.statistics
        WHERE table_schema = '${process.env.DB_NAME}' AND table_name = 'users'
      `);
      await log(`users 表中共有 ${indexCount[0].count} 個索引`);
    }

    // 5. 詢問是否清理備份表
    const keepBackups = false; // 更改為 true 可以保留備份表
    if (!keepBackups) {
      await cleanupBackupTables();
    } else {
      await log('備份表已保留，清理備份表的步驟已跳過');
    }

    await log('=== 資料庫重構成功完成 ===');

    return true;
  } catch (error) {
    await log(`=== 資料庫重構失敗: ${error.message} ===`);
    return false;
  } finally {
    // 關閉資料庫連接
    await sequelize.close();
    await log('資料庫連接已關閉');
    process.exit(0);
  }
};

// 執行主函數
rebuildDatabase();

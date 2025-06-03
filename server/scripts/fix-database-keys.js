/**
 * 修復資料庫中索引過多的問題
 * 這個腳本會重建 users 表格，但保留所有用戶資料
 */
import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 載入環境變數
dotenv.config({ path: path.join(__dirname, '../.env') });

const fixDatabaseKeys = async () => {
  try {
    console.log('開始修復資料庫索引過多問題...');
    
    // 檢查資料庫連接
    await sequelize.authenticate();
    console.log('資料庫連接成功');

    // 1. 創建臨時表格
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS users_temp (
        id INT AUTO_INCREMENT PRIMARY KEY,
        google_id VARCHAR(255) NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NULL,
        name VARCHAR(100) NOT NULL,
        avatar_url TEXT NULL,
        role ENUM('admin', 'core', 'member') DEFAULT 'member',
        is_active BOOLEAN DEFAULT TRUE,
        email_verified BOOLEAN DEFAULT FALSE,
        refresh_token TEXT NULL,
        last_login DATETIME NULL,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL,
        KEY idx_google_id (google_id),
        KEY idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('臨時表格已創建');

    // 2. 將數據從原表複製到臨時表
    await sequelize.query(`
      INSERT INTO users_temp (
        id, google_id, email, password, name, avatar_url, role, is_active, 
        email_verified, refresh_token, last_login, created_at, updated_at
      )
      SELECT 
        id, google_id, email, password, name, avatar_url, role, is_active, 
        email_verified, refresh_token, last_login, created_at, updated_at
      FROM users;
    `);
    console.log('數據已複製到臨時表');

    // 3. 備份原表結構
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS users_backup LIKE users;
    `);
    console.log('原表結構已備份');

    // 4. 備份原表數據
    await sequelize.query(`
      INSERT INTO users_backup SELECT * FROM users;
    `);
    console.log('原表數據已備份');

    // 5. 刪除原表
    await sequelize.query(`DROP TABLE IF EXISTS users;`);
    console.log('原表已刪除');

    // 6. 將臨時表重命名為原表
    await sequelize.query(`ALTER TABLE users_temp RENAME TO users;`);
    console.log('臨時表已重命名為 users');

    // 7. 添加唯一索引 (只為不為 NULL 的值添加)
    await sequelize.query(`
      ALTER TABLE users 
      ADD UNIQUE INDEX idx_unique_email (email);
    `);
    await sequelize.query(`
      ALTER TABLE users 
      ADD UNIQUE INDEX idx_unique_google_id (google_id);
    `);
    console.log('唯一索引已添加');

    console.log('資料庫索引修復完成！');
    process.exit(0);
  } catch (error) {
    console.error('修復過程出錯:', error);
    process.exit(1);
  }
};

// 執行修復
fixDatabaseKeys();

#!/usr/bin/env node
// filepath: /workspaces/GDG-Portal/scripts/check-database.js

/**
 * 資料庫連接檢查腳本
 * 用於驗證資料庫配置和連接狀態
 */

import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

// 設定環境變數路徑
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../server/.env') });

// 引入資料庫
import sequelize from '../server/config/database.js';

/**
 * 檢查資料庫連接
 */
async function checkDatabaseConnection() {
  try {
    console.log('🔍 Checking database configuration...');
    
    // 顯示資料庫配置（隱藏敏感資訊）
    console.log('📋 Database Configuration:');
    console.log(`   Host: ${process.env.DB_HOST || 'Not set'}`);
    console.log(`   Port: ${process.env.DB_PORT || 'Not set'}`);
    console.log(`   Database: ${process.env.DB_NAME || 'Not set'}`);
    console.log(`   User: ${process.env.DB_USER || 'Not set'}`);
    console.log(`   Password: ${process.env.DB_PASSWORD ? '***' : 'Not set'}`);
    console.log('');
    
    // 測試資料庫連接
    console.log('📡 Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connection successful!');
    
    // 檢查是否可以執行查詢
    console.log('🔍 Testing query execution...');
    const [results] = await sequelize.query('SELECT 1 as test');
    console.log('✅ Query execution successful!');
    
    // 顯示資料庫資訊
    const [dbInfo] = await sequelize.query('SELECT VERSION() as version');
    console.log(`📊 Database version: ${dbInfo[0].version}`);
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error(`   Error: ${error.message}`);
    
    // 提供故障排除建議
    console.log('\n🔧 Troubleshooting suggestions:');
    console.log('   1. Check if database server is running');
    console.log('   2. Verify database credentials in .env file');
    console.log('   3. Ensure database exists');
    console.log('   4. Check network connectivity');
    console.log('   5. Verify firewall settings');
    
    process.exit(1);
  } finally {
    await sequelize.close();
    console.log('🔌 Database connection closed.');
  }
}

// 執行檢查
checkDatabaseConnection().catch(error => {
  console.error('💥 Script execution failed:', error);
  process.exit(1);
});

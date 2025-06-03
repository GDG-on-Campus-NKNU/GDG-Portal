import { initializeDatabase } from '../model/index.js';

const initDatabase = async () => {
  try {
    console.log('🔧 開始初始化資料庫...');
    
    // 使用統一的初始化函數
    await initializeDatabase();
    
    console.log('✅ 資料庫初始化完成！');
    console.log('📋 已創建的表格:');
    console.log('  - users (使用者)');
    console.log('  - core_teams (核心成員)');
    console.log('  - categories (分類)');
    console.log('  - core_team_categories (成員分類關聯)');
    console.log('  - events (活動)');
    console.log('  - event_speakers (活動講者)');
    console.log('  - event_tags (活動標籤)');
    console.log('  - event_registrations (活動報名)');
    console.log('  - announcements (公告)');
    console.log('  - announcement_tags (公告標籤)');
    console.log('  - galleries (照片集)');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ 資料庫初始化失敗:', error);
    console.error('請檢查:');
    console.error('1. 資料庫連線設定 (.env 檔案)');
    console.error('2. 資料庫服務是否已啟動');
    console.error('3. 資料庫權限設定');
    process.exit(1);
  }
};

initDatabase();

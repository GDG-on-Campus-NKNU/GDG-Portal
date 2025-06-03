/**
 * 簡化的 Message Passing 架構驗證
 */

import fs from 'fs';
import path from 'path';

console.log('🔍 GDG Portal Message Passing 架構驗證\n');

// 檢查核心檔案
const coreFiles = [
  // 後端核心
  'server/index.js',
  'server/config/database.js',
  'server/middlewares/auth.js',
  'server/middlewares/validation.js',
  'server/middlewares/errorHandler.js',
  
  // 模型
  'server/model/userModel.js',
  'server/model/eventModel.js',
  'server/model/announcementModel.js',
  'server/model/coreteamModel.js',
  'server/model/galleryModel.js',
  
  // 控制器
  'server/controllers/eventController.js',
  'server/controllers/announcementController.js',
  'server/controllers/coreteamController.js',
  'server/controllers/galleryController.js',
  
  // 路由
  'server/routes/eventRoutes.js',
  'server/routes/announcementRoutes.js',
  'server/routes/coreteamRoutes.js',
  'server/routes/galleryRoutes.js',
  
  // 前端 hooks
  'client/src/hooks/useEventData.js',
  'client/src/hooks/useAnnouncementData.js',
  'client/src/hooks/useCoreTeamData.js',
  'client/src/hooks/useGalleryData.js'
];

let existingFiles = 0;
let totalSize = 0;

console.log('📋 檢查核心檔案存在性:\n');

coreFiles.forEach(file => {
  try {
    const stats = fs.statSync(file);
    const sizeKB = (stats.size / 1024).toFixed(1);
    console.log(`✅ ${file} (${sizeKB}KB)`);
    existingFiles++;
    totalSize += stats.size;
  } catch (error) {
    console.log(`❌ ${file} (不存在)`);
  }
});

console.log(`\n📊 結果: ${existingFiles}/${coreFiles.length} 檔案存在`);
console.log(`💾 總大小: ${(totalSize / 1024).toFixed(1)}KB\n`);

// 檢查關鍵功能
console.log('🔧 檢查關鍵功能:\n');

// 1. 檢查用戶角色系統
try {
  const userModel = fs.readFileSync('server/model/userModel.js', 'utf8');
  if (userModel.includes("ENUM('admin', 'core', 'member')")) {
    console.log('✅ 用戶角色系統已更新為 admin/core/member');
  } else {
    console.log('⚠️  用戶角色系統需要更新');
  }
} catch (e) {
  console.log('❌ 無法檢查用戶模型');
}

// 2. 檢查認證中介軟體
try {
  const authMiddleware = fs.readFileSync('server/middlewares/auth.js', 'utf8');
  if (authMiddleware.includes('requireCore') && authMiddleware.includes('requireAdmin')) {
    console.log('✅ 認證中介軟體支援新角色系統');
  } else {
    console.log('⚠️  認證中介軟體需要更新');
  }
} catch (e) {
  console.log('❌ 無法檢查認證中介軟體');
}

// 3. 檢查驗證中介軟體
try {
  const validation = fs.readFileSync('server/middlewares/validation.js', 'utf8');
  const hasEventValidation = validation.includes('validateEvent');
  const hasAnnouncementValidation = validation.includes('validateAnnouncement');
  const hasCoreTeamValidation = validation.includes('validateCoreTeamMember');
  
  if (hasEventValidation && hasAnnouncementValidation && hasCoreTeamValidation) {
    console.log('✅ 驗證中介軟體完整');
  } else {
    console.log('⚠️  驗證中介軟體可能不完整');
  }
} catch (e) {
  console.log('❌ 無法檢查驗證中介軟體');
}

// 4. 檢查套件依賴
try {
  const packageJson = JSON.parse(fs.readFileSync('server/package.json', 'utf8'));
  const requiredDeps = ['express', 'sequelize', 'mysql2', 'jsonwebtoken', 'bcryptjs', 'morgan', 'cors'];
  const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);
  
  if (missingDeps.length === 0) {
    console.log('✅ 所有必要套件已安裝');
  } else {
    console.log(`⚠️  缺少套件: ${missingDeps.join(', ')}`);
  }
} catch (e) {
  console.log('❌ 無法檢查套件依賴');
}

console.log('\n🔄 Message Passing 流程分析:\n');

console.log('1. 前端發起請求:');
console.log('   React Hook → fetch() → HTTP Request');
console.log('   ↓');

console.log('2. 後端路由處理:');
console.log('   Express Router → 認證中介軟體 → 驗證中介軟體');
console.log('   ↓');

console.log('3. 控制器邏輯:');
console.log('   Controller → Sequelize ORM → MySQL 資料庫');
console.log('   ↓');

console.log('4. 資料回傳:');
console.log('   資料庫 → ORM → Controller → JSON Response');
console.log('   ↓');

console.log('5. 前端狀態更新:');
console.log('   HTTP Response → React Hook → State Update → UI Re-render');

console.log('\n✅ 架構驗證完成！');

if (existingFiles >= coreFiles.length * 0.9) {
  console.log('🎉 Message Passing 架構基本完整，可以進行實際測試');
} else {
  console.log('⚠️  部分檔案缺失，需要補完後再進行測試');
}

console.log('\n🚀 下一步建議:');
console.log('1. 啟動後端伺服器: cd server && npm run dev');
console.log('2. 啟動前端開發: cd client && npm run dev');
console.log('3. 測試 API 端點: curl http://localhost:5000/api/events');
console.log('4. 前端整合測試: 訪問 http://localhost:5173');

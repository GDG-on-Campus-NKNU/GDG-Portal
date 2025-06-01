#!/usr/bin/env node

/**
 * GDG Portal 架構驗證腳本
 * 檢查整個系統的 Message Passing 流程
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 GDG Portal 架構完整性檢查\n');

// 檢查項目清單
const checks = [
  {
    name: '資料庫配置',
    description: '檢查資料庫連接設定',
    files: [
      'server/config/database.js',
      'server/model/index.js'
    ]
  },
  {
    name: '模型定義',
    description: '檢查所有資料模型',
    files: [
      'server/model/userModel.js',
      'server/model/eventModel.js',
      'server/model/announcementModel.js',
      'server/model/coreteamModel.js',
      'server/model/galleryModel.js'
    ]
  },
  {
    name: '控制器實現',
    description: '檢查 API 控制器',
    files: [
      'server/controllers/eventController.js',
      'server/controllers/announcementController.js',
      'server/controllers/coreteamController.js',
      'server/controllers/galleryController.js'
    ]
  },
  {
    name: '路由設定',
    description: '檢查 API 路由',
    files: [
      'server/routes/eventRoutes.js',
      'server/routes/announcementRoutes.js',
      'server/routes/coreteamRoutes.js',
      'server/routes/galleryRoutes.js'
    ]
  },
  {
    name: '中介軟體',
    description: '檢查認證、驗證和錯誤處理',
    files: [
      'server/middlewares/auth.js',
      'server/middlewares/validation.js',
      'server/middlewares/errorHandler.js',
      'server/middlewares/logger.js'
    ]
  },
  {
    name: '前端 Hooks',
    description: '檢查前端資料獲取邏輯',
    files: [
      'client/src/hooks/useEventData.js',
      'client/src/hooks/useAnnouncementData.js',
      'client/src/hooks/useCoreTeamData.js',
      'client/src/hooks/useGalleryData.js'
    ]
  }
];

let totalScore = 0;
let maxScore = 0;

// 執行檢查
for (const check of checks) {
  console.log(`📋 檢查: ${check.name}`);
  console.log(`   ${check.description}`);
  
  let checkScore = 0;
  
  for (const file of check.files) {
    const filePath = path.join(__dirname, '..', file);
    maxScore++;
    
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.size > 0) {
        console.log(`   ✅ ${file} (${(stats.size / 1024).toFixed(1)}KB)`);
        checkScore++;
        totalScore++;
      } else {
        console.log(`   ⚠️  ${file} (檔案為空)`);
      }
    } else {
      console.log(`   ❌ ${file} (檔案不存在)`);
    }
  }
  
  console.log(`   得分: ${checkScore}/${check.files.length}\n`);
}

// 檢查特殊功能
console.log('🔧 功能檢查:');

// 檢查新角色系統
const userModelPath = path.join(__dirname, '..', 'server/model/userModel.js');
if (fs.existsSync(userModelPath)) {
  const userModelContent = fs.readFileSync(userModelPath, 'utf8');
  if (userModelContent.includes("ENUM('admin', 'core', 'member')")) {
    console.log('   ✅ 用戶角色系統已更新 (admin, core, member)');
  } else {
    console.log('   ❌ 用戶角色系統未正確更新');
  }
}

// 檢查驗證中介軟體
const validationPath = path.join(__dirname, '..', 'server/middlewares/validation.js');
if (fs.existsSync(validationPath)) {
  const validationContent = fs.readFileSync(validationPath, 'utf8');
  if (validationContent.includes('validateEvent') && 
      validationContent.includes('validateAnnouncement') &&
      validationContent.includes('validateCoreTeamMember')) {
    console.log('   ✅ 驗證中介軟體完整');
  } else {
    console.log('   ⚠️  驗證中介軟體可能不完整');
  }
}

// 檢查錯誤處理
const errorHandlerPath = path.join(__dirname, '..', 'server/middlewares/errorHandler.js');
if (fs.existsSync(errorHandlerPath)) {
  console.log('   ✅ 錯誤處理中介軟體存在');
}

// 檢查 package.json
const serverPackagePath = path.join(__dirname, '..', 'server/package.json');
if (fs.existsSync(serverPackagePath)) {
  const packageContent = JSON.parse(fs.readFileSync(serverPackagePath, 'utf8'));
  const requiredDeps = ['express', 'sequelize', 'mysql2', 'jsonwebtoken', 'bcryptjs', 'morgan'];
  const missingDeps = requiredDeps.filter(dep => !packageContent.dependencies[dep]);
  
  if (missingDeps.length === 0) {
    console.log('   ✅ 所有必要依賴已安裝');
  } else {
    console.log(`   ⚠️  缺少依賴: ${missingDeps.join(', ')}`);
  }
}

console.log('\n📊 檢查結果:');
console.log(`總分: ${totalScore}/${maxScore} (${(totalScore/maxScore*100).toFixed(1)}%)`);

if (totalScore === maxScore) {
  console.log('🎉 架構完整性檢查通過！');
} else if (totalScore >= maxScore * 0.8) {
  console.log('✅ 架構基本完整，有少數問題需要處理');
} else {
  console.log('⚠️  架構存在重要問題，需要進一步修復');
}

console.log('\n🔄 Message Passing 流程分析:');
console.log('1. 前端 (React Hooks) → HTTP 請求 → 後端路由');
console.log('2. 路由 → 認證中介軟體 → 驗證中介軟體 → 控制器');
console.log('3. 控制器 → Sequelize ORM → 資料庫');
console.log('4. 資料庫 → ORM → 控制器 → JSON 回應');
console.log('5. JSON 回應 → 前端 → 狀態更新 → UI 重新渲染');

console.log('\n🚀 建議下一步:');
console.log('1. 設定實際資料庫連線');
console.log('2. 執行資料庫初始化腳本');
console.log('3. 啟動後端伺服器測試 API');
console.log('4. 啟動前端應用測試整合');
console.log('5. 添加檔案上傳功能 (圖片)');
console.log('6. 實作 Markdown 支援');

console.log('\n📝 測試命令:');
console.log('# 後端測試');
console.log('cd server && npm run dev');
console.log('');
console.log('# 前端測試');
console.log('cd client && npm run dev');
console.log('');
console.log('# API 測試範例');
console.log('curl http://localhost:5000/api/events');
console.log('curl http://localhost:5000/api/announcements');
console.log('curl http://localhost:5000/api/coreteam');

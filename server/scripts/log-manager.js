#!/usr/bin/env node
/**
 * 日誌管理工具 - 用於查看和管理應用程式日誌
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 日誌目錄路徑
const logDir = path.join(__dirname, '../logs');

/**
 * 列出所有可用的日誌檔案
 */
function listLogFiles() {
  console.log('\n📋 可用的日誌檔案:');
  console.log('=====================================');
  
  if (!fs.existsSync(logDir)) {
    console.log('  📁 日誌目錄不存在，可能尚未產生任何日誌');
    return [];
  }

  const logFiles = fs.readdirSync(logDir);
  
  if (logFiles.length === 0) {
    console.log('  📄 尚無日誌檔案');
    return [];
  }

  const filesByType = {
    access: [],
    api: [],
    error: [],
    other: []
  };

  logFiles.forEach(file => {
    const stats = fs.statSync(path.join(logDir, file));
    const sizeKB = (stats.size / 1024).toFixed(2);
    const modifiedDate = stats.mtime.toISOString().split('T')[0];
    
    // 分類檔案
    if (file.startsWith('access-')) {
      filesByType.access.push({ file, sizeKB, modifiedDate });
    } else if (file.startsWith('api-')) {
      filesByType.api.push({ file, sizeKB, modifiedDate });
    } else if (file.startsWith('error-')) {
      filesByType.error.push({ file, sizeKB, modifiedDate });
    } else {
      filesByType.other.push({ file, sizeKB, modifiedDate });
    }
  });

  // 顯示分類結果
  Object.entries(filesByType).forEach(([type, files]) => {
    if (files.length > 0) {
      console.log(`\n  📂 ${type.toUpperCase()} 日誌:`);
      files.forEach(({ file, sizeKB, modifiedDate }) => {
        console.log(`    📄 ${file} (${sizeKB} KB, 修改: ${modifiedDate})`);
      });
    }
  });

  return logFiles;
}

/**
 * 顯示今天的錯誤日誌
 */
function showTodayErrors() {
  const today = new Date().toISOString().split('T')[0];
  const errorLogFile = path.join(logDir, `error-${today}.log`);

  console.log('\n🚨 今天的錯誤日誌:');
  console.log('=====================================');

  if (!fs.existsSync(errorLogFile)) {
    console.log('  ✅ 今天沒有錯誤日誌 - 系統運行良好！');
    return;
  }

  try {
    const errorLogs = fs.readFileSync(errorLogFile, 'utf8');
    if (errorLogs.trim().length === 0) {
      console.log('  ✅ 錯誤日誌檔案存在但為空 - 系統運行良好！');
    } else {
      console.log(errorLogs);
    }
  } catch (error) {
    console.error('  ❌ 無法讀取錯誤日誌檔案:', error.message);
  }
}

/**
 * 顯示今天的 API 呼叫統計
 */
function showTodayApiStats() {
  const today = new Date().toISOString().split('T')[0];
  const apiLogFile = path.join(logDir, `api-${today}.log`);

  console.log('\n📊 今天的 API 呼叫統計:');
  console.log('=====================================');

  if (!fs.existsSync(apiLogFile)) {
    console.log('  📄 今天沒有 API 日誌檔案');
    return;
  }

  try {
    const apiLogs = fs.readFileSync(apiLogFile, 'utf8');
    const lines = apiLogs.split('\n').filter(line => line.trim().length > 0);

    if (lines.length === 0) {
      console.log('  📄 API 日誌檔案為空');
      return;
    }

    // 統計資料
    const stats = {
      total: lines.length,
      methods: {},
      endpoints: {},
      errors: 0
    };

    lines.forEach(line => {
      // 解析 API 日誌格式: API GET /api/endpoint - Status: 200 - 15ms
      const match = line.match(/API (\w+) (\/[^\s]+) - Status: (\d+)/);
      if (match) {
        const [, method, endpoint, status] = match;
        
        // 統計方法
        stats.methods[method] = (stats.methods[method] || 0) + 1;
        
        // 統計端點
        stats.endpoints[endpoint] = (stats.endpoints[endpoint] || 0) + 1;
        
        // 統計錯誤
        if (parseInt(status) >= 400) {
          stats.errors++;
        }
      }
    });

    console.log(`  📈 總 API 呼叫次數: ${stats.total}`);
    console.log(`  ❌ 錯誤呼叫次數: ${stats.errors}`);
    console.log(`  ✅ 成功率: ${((stats.total - stats.errors) / stats.total * 100).toFixed(1)}%`);

    console.log('\n  📋 HTTP 方法統計:');
    Object.entries(stats.methods)
      .sort(([,a], [,b]) => b - a)
      .forEach(([method, count]) => {
        console.log(`    ${method}: ${count} 次`);
      });

    console.log('\n  🎯 熱門端點 (前 10 名):');
    Object.entries(stats.endpoints)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .forEach(([endpoint, count]) => {
        console.log(`    ${endpoint}: ${count} 次`);
      });

  } catch (error) {
    console.error('  ❌ 無法讀取 API 日誌檔案:', error.message);
  }
}

/**
 * 顯示指定檔案的日誌內容
 */
function showLogFile(filename, lines = 50) {
  const logFile = path.join(logDir, filename);

  if (!fs.existsSync(logFile)) {
    console.log(`  ❌ 日誌檔案不存在: ${filename}`);
    return;
  }

  try {
    const content = fs.readFileSync(logFile, 'utf8');
    const allLines = content.split('\n').filter(line => line.trim().length > 0);
    
    console.log(`\n📄 ${filename} (顯示最後 ${lines} 行):`);
    console.log('=====================================');
    
    if (allLines.length === 0) {
      console.log('  📄 檔案為空');
      return;
    }

    const displayLines = allLines.slice(-lines);
    displayLines.forEach(line => {
      console.log(`  ${line}`);
    });

    if (allLines.length > lines) {
      console.log(`\n  ... (省略 ${allLines.length - lines} 行，總共 ${allLines.length} 行)`);
    }

  } catch (error) {
    console.error(`  ❌ 無法讀取日誌檔案: ${error.message}`);
  }
}

/**
 * 清理舊日誌檔案
 */
function cleanOldLogs(daysToKeep = 30) {
  console.log(`\n🧹 清理 ${daysToKeep} 天前的日誌檔案:`);
  console.log('=====================================');

  if (!fs.existsSync(logDir)) {
    console.log('  📁 日誌目錄不存在');
    return;
  }

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

  const logFiles = fs.readdirSync(logDir);
  let deletedCount = 0;

  logFiles.forEach(file => {
    const filePath = path.join(logDir, file);
    const stats = fs.statSync(filePath);
    
    if (stats.mtime < cutoffDate) {
      try {
        fs.unlinkSync(filePath);
        console.log(`  🗑️  已刪除: ${file}`);
        deletedCount++;
      } catch (error) {
        console.error(`  ❌ 無法刪除 ${file}: ${error.message}`);
      }
    }
  });

  if (deletedCount === 0) {
    console.log('  ✅ 沒有需要清理的舊日誌檔案');
  } else {
    console.log(`  ✅ 已清理 ${deletedCount} 個舊日誌檔案`);
  }
}

/**
 * 顯示幫助資訊
 */
function showHelp() {
  console.log('\n📚 日誌管理工具使用說明:');
  console.log('=====================================');
  console.log('  node log-manager.js [command] [options]');
  console.log('');
  console.log('可用命令:');
  console.log('  list                    - 列出所有日誌檔案');
  console.log('  errors                  - 顯示今天的錯誤日誌');
  console.log('  stats                   - 顯示今天的 API 統計');
  console.log('  show <filename> [lines] - 顯示指定日誌檔案的內容');
  console.log('  clean [days]            - 清理舊日誌檔案 (預設保留 30 天)');
  console.log('  help                    - 顯示此幫助資訊');
  console.log('');
  console.log('範例:');
  console.log('  node log-manager.js list');
  console.log('  node log-manager.js show api-2024-07-24.log 100');
  console.log('  node log-manager.js clean 7');
}

/**
 * 主程式
 */
function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'list';

  console.log('🔍 GDG Portal 日誌管理工具');
  console.log(`📅 執行時間: ${new Date().toISOString()}`);

  switch (command) {
    case 'list':
      listLogFiles();
      break;
    
    case 'errors':
      showTodayErrors();
      break;
    
    case 'stats':
      showTodayApiStats();
      break;
    
    case 'show':
      if (args[1]) {
        const lines = parseInt(args[2]) || 50;
        showLogFile(args[1], lines);
      } else {
        console.log('  ❌ 請指定要查看的日誌檔案名稱');
        showHelp();
      }
      break;
    
    case 'clean':
      const daysToKeep = parseInt(args[1]) || 30;
      cleanOldLogs(daysToKeep);
      break;
    
    case 'help':
    default:
      showHelp();
      break;
  }

  console.log(''); // 空行結尾
}

// 執行主程式
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default {
  listLogFiles,
  showTodayErrors,
  showTodayApiStats,
  showLogFile,
  cleanOldLogs
};

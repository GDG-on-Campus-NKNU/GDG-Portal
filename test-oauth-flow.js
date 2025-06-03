#!/usr/bin/env node

/**
 * 測試 Google OAuth 流程的腳本
 * 此腳本會檢查當前的配置並提供建議
 */

const dotenv = require('dotenv');
const path = require('path');

// 載入環境變數
dotenv.config({ path: path.join(__dirname, 'server', '.env') });

console.log('🔍 Google OAuth 配置檢查');
console.log('========================');

// 檢查環境變數
console.log('\n📋 環境變數:');
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`PORT: ${process.env.PORT}`);
console.log(`CLIENT_URL: ${process.env.CLIENT_URL}`);
console.log(`GOOGLE_CLIENT_ID: ${process.env.GOOGLE_CLIENT_ID ? '✅ 已設定' : '❌ 未設定'}`);
console.log(`GOOGLE_CLIENT_SECRET: ${process.env.GOOGLE_CLIENT_SECRET ? '✅ 已設定' : '❌ 未設定'}`);

// 檢查 CLIENT_URL 設定
console.log('\n🔗 CLIENT_URL 分析:');
const clientUrl = process.env.CLIENT_URL;
if (clientUrl) {
  const url = new URL(clientUrl);
  console.log(`協議: ${url.protocol}`);
  console.log(`主機: ${url.hostname}`);
  console.log(`端口: ${url.port || (url.protocol === 'https:' ? '443' : '80')}`);

  if (url.hostname === 'localhost') {
    console.log('⚠️  當前設定為 localhost，如果使用 Ngrok，請更新為 Ngrok URL');
  } else if (url.hostname.includes('ngrok')) {
    console.log('✅ 檢測到 Ngrok URL');
  } else {
    console.log('ℹ️  使用自定義域名');
  }
} else {
  console.log('❌ CLIENT_URL 未設定，將使用動態檢測');
}

// 提供測試建議
console.log('\n🧪 測試建議:');
console.log('1. 本地開發 (localhost):');
console.log('   CLIENT_URL=http://localhost:5173');
console.log('   前端: npm run dev (在 client 目錄)');
console.log('   後端: npm run dev (在 server 目錄)');

console.log('\n2. Ngrok 測試:');
console.log('   步驟 1: 啟動 ngrok http 5000');
console.log('   步驟 2: 複製 ngrok URL (例如: https://abc123.ngrok.io)');
console.log('   步驟 3: 更新 CLIENT_URL 為前端 URL (例如: https://abc123.ngrok.io:5173)');
console.log('   或者移除 CLIENT_URL 讓系統自動檢測');

console.log('\n3. OAuth 流程測試步驟:');
console.log('   1. 訪問 /auth/google 進行登入');
console.log('   2. 檢查回調 URL 是否正確重定向到前端');
console.log('   3. 檢查瀏覽器控制台是否有錯誤');

// 檢查常見問題
console.log('\n❗ 常見問題檢查:');

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log('❌ Google OAuth 憑證未完整設定');
}

if (process.env.CLIENT_URL && process.env.CLIENT_URL.includes('localhost') && process.argv.includes('--ngrok')) {
  console.log('⚠️  CLIENT_URL 設定為 localhost，但您可能想要使用 Ngrok');
  console.log('   建議: 暫時移除 CLIENT_URL 或設定為 Ngrok URL');
}

// 動態檢測邏輯示例
console.log('\n🤖 動態檢測邏輯 (伺服器會使用):');
console.log('如果 CLIENT_URL 未設定，伺服器會:');
console.log('1. 檢查請求的 host header');
console.log('2. 如果包含 "ngrok" 或 "localhost"，將端口從 5000 改為 5173');
console.log('3. 使用相同的協議 (http/https)');

console.log('\n✅ 檢查完成！');

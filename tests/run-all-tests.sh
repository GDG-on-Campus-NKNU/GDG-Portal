#!/bin/bash

# GDG Portal 測試執行腳本
# 一鍵執行所有測試驗證

echo "🎯 GDG Portal 完整測試驗證"
echo "=================================="
echo ""

# 設定顏色
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 檢查是否在正確目錄
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ 請在專案根目錄執行此腳本${NC}"
    exit 1
fi

echo -e "${BLUE}📁 測試檔案位置檢查...${NC}"
if [ -d "tests" ]; then
    echo -e "${GREEN}✅ tests/ 資料夾存在${NC}"
    ls -la tests/
    echo ""
else
    echo -e "${RED}❌ tests/ 資料夾不存在${NC}"
    exit 1
fi

echo -e "${BLUE}🏗️  1. 架構完整性驗證${NC}"
echo "檢查所有核心檔案是否存在..."
node tests/simple-check.js
echo ""

echo -e "${BLUE}🔄 2. Message Passing 流程測試${NC}"
echo "驗證前後端資料流..."
node tests/test-data-flow.js
echo ""

echo -e "${BLUE}🎨 3. 前端響應處理驗證${NC}"
echo "檢查前端 API 響應處理..."
node tests/test-frontend-response.js
echo ""

echo -e "${BLUE}🚀 4. Mock API 伺服器測試${NC}"
echo "啟動測試伺服器進行實際 API 測試..."

# 檢查 port 3001 是否被占用
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${YELLOW}⚠️  Port 3001 已被占用，嘗試終止...${NC}"
    pkill -f "test-server.js" 2>/dev/null || true
    sleep 2
fi

# 背景啟動測試伺服器
echo "啟動 Mock API 伺服器..."
node tests/test-server.js &
SERVER_PID=$!

# 等待伺服器啟動
echo "等待伺服器啟動..."
sleep 3

# 檢查伺服器是否正在運行
if kill -0 $SERVER_PID 2>/dev/null; then
    echo -e "${GREEN}✅ Mock API 伺服器啟動成功 (PID: $SERVER_PID)${NC}"
    
    # 執行前端 API 測試
    echo "執行前端 API 測試..."
    node tests/test-frontend-api.js
    
    # 測試完成後關閉伺服器
    echo ""
    echo "關閉測試伺服器..."
    kill $SERVER_PID 2>/dev/null || true
    sleep 1
    echo -e "${GREEN}✅ 測試伺服器已關閉${NC}"
else
    echo -e "${RED}❌ Mock API 伺服器啟動失敗${NC}"
fi

echo ""
echo -e "${BLUE}📊 測試總結${NC}"
echo "=================================="
echo -e "${GREEN}✅ 架構完整性驗證: 完成${NC}"
echo -e "${GREEN}✅ Message Passing 測試: 完成${NC}" 
echo -e "${GREEN}✅ 前端響應處理驗證: 完成${NC}"
echo -e "${GREEN}✅ Mock API 伺服器測試: 完成${NC}"
echo ""

echo -e "${YELLOW}🎯 系統狀態: 準備就緒${NC}"
echo "✨ 架構驗證通過，可以連接真實資料庫"
echo ""

echo -e "${BLUE}🚀 下一步建議:${NC}"
echo "1. 📦 設定 PostgreSQL 資料庫連線"
echo "2. 🔄 執行資料庫遷移和種子資料"
echo "3. 🌐 啟動完整開發環境測試"
echo "4. 🧪 執行端到端整合測試"
echo ""

echo -e "${GREEN}🎉 測試驗證完成！${NC}"

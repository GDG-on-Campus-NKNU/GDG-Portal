#!/bin/bash

# GDG Portal 快速啟動腳本

echo "🚀 GDG Portal 快速啟動腳本"
echo "=================================="

# 檢查目前位置
if [ ! -d "server" ] || [ ! -d "client" ]; then
    echo "❌ 請在 GDG-Portal 根目錄執行此腳本"
    exit 1
fi

# 顯示選項
echo ""
echo "請選擇啟動模式:"
echo "1. 啟動後端開發伺服器 (npm run dev)"
echo "2. 啟動前端開發伺服器 (npm run dev)"
echo "3. 啟動測試伺服器 (模擬資料)"
echo "4. 執行架構檢查"
echo "5. 執行 API 測試"
echo "6. 同時啟動前後端"
echo "7. 安裝所有依賴"
echo ""

read -p "請輸入選項 (1-7): " choice

case $choice in
    1)
        echo "🔧 啟動後端開發伺服器..."
        cd server
        if [ ! -d "node_modules" ]; then
            echo "📦 安裝後端依賴..."
            npm install
        fi
        npm run dev
        ;;
    2)
        echo "🎨 啟動前端開發伺服器..."
        cd client
        if [ ! -d "node_modules" ]; then
            echo "📦 安裝前端依賴..."
            npm install
        fi
        npm run dev
        ;;
    3)
        echo "🧪 啟動測試伺服器..."
        cd server
        node test-server.js
        ;;
    4)
        echo "🔍 執行架構檢查..."
        node simple-check.js
        ;;
    5)
        echo "🧪 執行 API 測試..."
        echo "啟動測試伺服器..."
        cd server
        node test-server.js &
        SERVER_PID=$!
        
        sleep 3
        
        echo ""
        echo "執行 API 測試..."
        echo "1. 健康檢查:"
        curl -s "http://localhost:3001/api/health" | jq '.'
        
        echo ""
        echo "2. 事件列表:"
        curl -s "http://localhost:3001/api/events" | jq '.events | length'
        
        echo ""
        echo "3. 關鍵字搜尋:"
        curl -s "http://localhost:3001/api/events?keyword=flutter" | jq '.events[].title'
        
        echo ""
        echo "4. 分頁測試:"
        curl -s "http://localhost:3001/api/events?page=1&limit=2" | jq '{totalCount, currentPage, totalPages}'
        
        echo ""
        echo "停止測試伺服器..."
        kill $SERVER_PID
        ;;
    6)
        echo "🚀 同時啟動前後端..."
        echo "在新終端視窗中啟動後端..."
        gnome-terminal -- bash -c "cd server && npm run dev; exec bash" 2>/dev/null || \
        osascript -e 'tell app "Terminal" to do script "cd '"$(pwd)"'/server && npm run dev"' 2>/dev/null || \
        echo "請手動在新終端執行: cd server && npm run dev"
        
        sleep 2
        
        echo "啟動前端..."
        cd client
        npm run dev
        ;;
    7)
        echo "📦 安裝所有依賴..."
        
        echo "安裝後端依賴..."
        cd server
        npm install
        cd ..
        
        echo "安裝前端依賴..."
        cd client
        npm install
        cd ..
        
        echo "✅ 所有依賴安裝完成"
        ;;
    *)
        echo "❌ 無效選項"
        exit 1
        ;;
esac

echo ""
echo "✅ 操作完成"

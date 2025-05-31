#!/bin/bash

# 🚀 GDG Portal 自動化部署腳本

echo "🔧 GDG Portal 自動化部署開始..."

# 檢查是否在正確的目錄
if [ ! -f "package.json" ] || [ ! -d "client" ] || [ ! -d "server" ]; then
    echo "❌ 錯誤：請在專案根目錄執行此腳本"
    exit 1
fi

# 1. 安裝所有依賴
echo "📦 安裝專案依賴..."
npm run install:all

if [ $? -ne 0 ]; then
    echo "❌ 依賴安裝失敗"
    exit 1
fi

# 2. 建置前端
echo "🏗️ 建置前端應用程式..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 前端建置失敗"
    exit 1
fi

# 3. 檢查建置結果
if [ ! -f "server/public/index.html" ]; then
    echo "❌ 建置失敗：找不到 index.html"
    exit 1
fi

echo "✅ 建置成功！前端檔案已輸出到 server/public/"

# 4. 顯示啟動說明
echo ""
echo "🚀 部署完成！現在可以使用以下指令啟動："
echo ""
echo "   開發模式（前後端分離）:"
echo "   npm run dev"
echo ""
echo "   生產模式（單一伺服器）:"
echo "   npm start"
echo ""
echo "   僅啟動後端伺服器："
echo "   cd server && npm start"
echo ""

# 5. 可選：自動啟動伺服器
read -p "是否要立即啟動生產伺服器？(y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 啟動生產伺服器..."
    cd server && npm start
fi

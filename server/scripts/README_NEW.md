# GDG Portal 資料庫腳本

## 📋 腳本說明

### 🚀 資料庫初始化
- **`generate-all-sql.js`** - 生成完整的資料庫初始化 SQL 腳本
- **`gdg_portal_complete_init.sql`** - 生成的 SQL 檔案，包含所有樣本資料
- **`init-database.js`** - Node.js 資料庫初始化腳本（程式化方式）

### 🔍 測試與檢查
- **`check-database.js`** - 檢查資料庫連線和表格狀態
- **`test-init-database.js`** - 測試資料庫初始化功能

### 🖼️ 檔案管理
- **`create-placeholder-images.sh`** - 創建 SQL 所需的佔位圖片檔案

### 📚 文件
- **`SQL_USAGE.md`** - SQL 腳本詳細使用指南

## 🎯 快速開始

### 1. 生成並執行 SQL 初始化
```bash
# 生成 SQL 腳本
node generate-all-sql.js

# 創建佔位圖片（如需要）
./create-placeholder-images.sh

# 執行 SQL（在 MySQL 中）
mysql -u username -p database_name < gdg_portal_complete_init.sql
```

### 2. 檢查結果
```bash
# 檢查資料庫狀態
node check-database.js
```

## 📁 檔案路徑說明

### ✅ 已解決的路徑問題
- **舊問題**: SQL 使用 `/uploads/` 但專案使用 `/assets/`
- **解決方案**: 統一改為 `/assets/` 路徑
- **檔案位置**: `client/public/assets/`

### 🗂️ 目錄結構
```
client/public/assets/
├── members/          # 成員頭像
├── gallery/          # 相簿圖片
│   ├── founding_event/
│   ├── react_workshop/
│   ├── gcp_lecture/
│   └── team_building/
├── announcements/    # 公告圖片
├── events/          # 活動圖片
└── speakers/        # 講者圖片
```

## 🚀 未來功能準備

### 檔案上傳系統
- 已安裝 multer 套件（在主 package.json 中）
- 已創建 `server/utils/fileUpload.js` 工具
- 已建立 `server/routes/uploadRoutes.js` 路由
- 前端已有 `FileUploader` 元件

## 📊 包含的樣本資料

- **👥 Core Team**: 1 位成員（顏榕嶙）
- **📋 分類**: 10 個分類
- **📢 公告**: 2 則公告
- **🎉 活動**: 2 個活動
- **📸 相簿**: 4 個相簿

詳細資料說明請參考 `SQL_USAGE.md`。

## 🔧 環境設定

確保 `server/.env` 檔案包含正確的資料庫設定：

```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
DB_PORT=3306
```

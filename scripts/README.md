# 資料庫初始化指南

## 概述

這個目錄包含了 GDG Portal 專案的資料庫初始化腳本，用於設置和管理資料庫中的樣本資料。

## 檔案說明

### 腳本檔案

- **`init-database.js`** - 主要的資料庫初始化腳本
- **`check-database.js`** - 資料庫連接檢查腳本
- **`setup-database.sh`** - 互動式資料庫設置腳本

## 使用方法

### 1. 環境準備

確保已設置好環境變數檔案 `server/.env`：

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=gdg_portal
DB_USER=your_username
DB_PASSWORD=your_password
NODE_ENV=development
```

### 2. 檢查資料庫連接

在進行任何操作前，先檢查資料庫連接：

```bash
npm run db:check
```

### 3. 初始化資料庫

#### 方法一：使用互動式腳本（推薦）

```bash
npm run db:setup
```

這將啟動互動式設置程序，提供以下選項：
1. 初始化資料庫並插入樣本資料
2. 清空資料庫並重新初始化
3. 僅檢查資料庫連接

#### 方法二：直接執行指令

```bash
# 初始化資料庫
npm run db:init

# 清空資料庫並重新初始化
npm run db:clear
```

## 樣本資料

### Core Team 成員資料

腳本會插入以下樣本 Core Team 成員：

1. **顏榕嶙** - Technical Education Lead
   - 部門：Technical Education
   - 技能：JavaScript, Node.js, React, Python, Workshop Design
   - 成就：組織 15+ 技術工作坊、指導 50+ 學生

2. **Jane Smith** - Community Manager
   - 部門：Community Relations
   - 技能：Community Building, Event Management, Social Media
   - 成就：社群成長至 1000+ 成員、組織 30+ 社群活動

3. **Alex Johnson** - Development Lead
   - 部門：Engineering
   - 技能：Full-stack Development, System Architecture, DevOps
   - 成就：領導 5+ 開源專案、優化系統效能 40%

### 分類資料

腳本會創建以下成員分類：

- **Technical Education** - 技術教育
- **Community Relations** - 社群關係
- **Engineering** - 工程開發
- **Design** - 設計
- **Marketing** - 行銷

## 資料庫結構

### Core Team 表格欄位

- `id` - 自動遞增主鍵
- `user_id` - 使用者 ID（可選）
- `name` - 姓名
- `title` - 職稱
- `photo` - 照片路徑
- `department` - 部門
- `year` - 年份
- `skills` - 技能（JSON 格式）
- `bio` - 個人簡介
- `achievements` - 成就（JSON 格式）
- `contact_email` - 聯絡信箱
- `social_links` - 社群連結（JSON 格式）
- `additional_photos` - 額外照片（JSON 格式）
- `is_active` - 是否啟用
- `position` - 排序位置

### Categories 表格欄位

- `id` - 自動遞增主鍵
- `name` - 分類名稱
- `type` - 分類類型（member, event, announcement）
- `color` - 顏色代碼
- `is_active` - 是否啟用

### Core Team Categories 關聯表

- `id` - 自動遞增主鍵
- `core_team_id` - Core Team 成員 ID
- `category_id` - 分類 ID

## 故障排除

### 常見問題

1. **資料庫連接失敗**
   - 檢查資料庫服務是否運行
   - 驗證 `.env` 檔案中的資料庫憑證
   - 確保資料庫存在
   - 檢查網路連接

2. **權限錯誤**
   - 確保資料庫使用者有建立表格的權限
   - 檢查資料庫使用者權限設定

3. **模組未找到錯誤**
   - 確保已安裝所有依賴：`npm install`
   - 檢查 Node.js 版本（建議 18+）

### 除錯模式

如需查看詳細的 SQL 查詢日誌，在 `.env` 檔案中設定：

```env
NODE_ENV=development
```

## 安全注意事項

- 生產環境中請勿使用預設的樣本資料
- 確保資料庫憑證安全
- 定期備份資料庫
- 在生產環境中關閉 SQL 查詢日誌

## 支援

如有問題或需要協助，請聯繫開發團隊或查看專案文件。

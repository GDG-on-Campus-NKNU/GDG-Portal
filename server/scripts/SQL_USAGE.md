# GDG Portal 資料庫 SQL 腳本使用指南

## 📋 檔案說明

### `generate-all-sql.js`
- **用途**: 生成完整的資料庫初始化 SQL 腳本
- **包含資料**: Core Team 成員、分類、公告、活動、相簿
- **輸出檔案**: `gdg_portal_complete_init.sql`

## 🚀 快速開始

### 1. 生成 SQL 腳本
```bash
cd /workspaces/GDG-Portal/scripts
node generate-all-sql.js
```

### 2. 執行 SQL 腳本
在你的 MySQL 環境中執行：

```bash
# 方法 1: 命令列執行
mysql -u [username] -p [database_name] < gdg_portal_complete_init.sql

# 方法 2: MySQL 命令列內執行
mysql> SOURCE gdg_portal_complete_init.sql;
```

## 📊 包含的資料

### 👥 Core Team 成員 (1位)
- **顏榕嶙** - Technical Education Lead

### 📋 分類 (10個)
- member, event, announcement (基本分類)
- frontend, backend, mobile, cloud, ai (技術分類)  
- workshop, lecture (活動類型)

### 📢 公告 (2則)
- 歡迎加入 GDG on Campus NKNU
- 技術分享會報名開始

### 🎉 活動 (2個)
- React 進階工作坊
- Google Cloud Platform 入門講座

### 📸 相簿 (4個)
- GDG on Campus NKNU 成立活動
- React 工作坊活動花絮
- Google Cloud Platform 講座紀錄
- 團隊建設活動

## 🔧 檔案路徑

### ✅ 正確路徑 (已修正)
所有圖片路徑都使用 `/assets/` 前綴：
- `/assets/members/yen_profile.jpg`
- `/assets/gallery/founding_event/cover.jpg`
- `/assets/gallery/react_workshop/cover.jpg`
- `/assets/gallery/gcp_lecture/cover.jpg`
- `/assets/gallery/team_building/cover.jpg`

### 📁 對應的實際檔案位置
```
client/public/assets/
├── members/
│   └── yen_profile.jpg
├── gallery/
│   ├── founding_event/
│   │   └── cover.jpg
│   ├── react_workshop/
│   │   └── cover.jpg
│   ├── gcp_lecture/
│   │   └── cover.jpg
│   └── team_building/
│       └── cover.jpg
├── announcements/
├── events/
└── speakers/
```

## 🎯 使用場景

### 開發環境
- 本地開發時快速初始化資料庫
- 測試資料的準備

### 生產部署
- 新環境的基礎資料建立
- 示範資料的載入

## ⚠️ 注意事項

1. **資料庫結構**: 確保資料庫表格已經建立
2. **檔案權限**: 確保圖片檔案存在於對應路徑
3. **資料衝突**: SQL 使用 `ON DUPLICATE KEY UPDATE` 避免重複插入
4. **事務處理**: 所有操作都在事務中執行，確保資料一致性

## 🔍 驗證方法

執行 SQL 後，可以運行腳本中的驗證查詢：
- 檢查各表格的資料筆數
- 確認關聯資料的正確性
- 驗證圖片路徑的有效性

## 🛠️ 自訂資料

如需修改樣本資料，請編輯 `generate-all-sql.js` 中的以下變數：
- `sampleCoreTeamData` - Core Team 成員
- `sampleCategories` - 分類資料
- `sampleAnnouncements` - 公告資料
- `sampleEvents` - 活動資料
- `sampleGalleryData` - 相簿資料

修改後重新執行 `node generate-all-sql.js` 即可生成新的 SQL 腳本。

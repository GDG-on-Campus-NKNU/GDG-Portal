# GDG on Campus NKNU 會員入口網站 🌐

這是一個為 GDG on Campus NKNU 量身打造的網站系統，提供社員註冊、Profile 管理、公告通知、活動報名、技術資源共享等功能，強化社群互動與學習效率。

## 🚀 專案目的
打造一個統整 GDG on Campus 運作的全端式網站平台，讓社員能夠一站式管理資訊、學習資源、參與活動並展現自我技術成就。

---

## 📁 專案架構

```
GDG-Portal/
├── client/                  # 前端 (React + Vite)
│   ├── public/              # 靜態資源
│   │   ├── assets/          # 圖片、Logo、預設檔案等
│   │   └── resources/       # 其他資源檔案
│   ├── src/
│   │   ├── components/      # 可重用元件
│   │   │   ├── common/      # 通用元件 (Navbar, Footer 等)
│   │   │   ├── main/        # 主要頁面元件
│   │   │   └── ui/          # UI 元件庫
│   │   ├── data/            # 模擬資料與靜態資料
│   │   ├── hooks/           # 自定義 React Hooks
│   │   ├── pages/           # 頁面元件
│   │   ├── services/        # API 服務層
│   │   ├── utils/           # 工具函數
│   │   ├── App.jsx          # 主應用元件
│   │   └── main.jsx         # 應用入口點
│   ├── eslint.config.js     # ESLint 配置
│   ├── tailwind.config.js   # Tailwind CSS 配置
│   ├── vite.config.js       # Vite 構建配置
│   └── package.json
│
├── server/                  # 後端 (Node.js + Express)
│   ├── config/              # 配置檔案
│   │   ├── database.js      # 資料庫連線設定
│   │   └── passport.js      # Google OAuth 配置
│   ├── controllers/         # 業務邏輯控制器
│   │   ├── announcementController.js
│   │   ├── coreteamController.js
│   │   ├── eventController.js
│   │   ├── galleryController.js
│   │   └── userController.js
│   ├── middlewares/         # 中間件
│   │   ├── auth.js          # JWT 認證中間件
│   │   ├── errorHandler.js  # 錯誤處理
│   │   ├── logger.js        # 日誌記錄
│   │   └── validation.js    # 資料驗證
│   ├── model/               # Sequelize 資料模型
│   │   ├── index.js         # 模型初始化
│   │   ├── associations.js  # 模型關聯定義
│   │   ├── userModel.js     # 使用者模型
│   │   ├── profileModel.js  # 個人檔案模型
│   │   ├── eventModel.js    # 活動模型
│   │   ├── announcementModel.js
│   │   ├── coreteamModel.js
│   │   └── galleryModel.js
│   ├── routes/              # API 路由定義
│   │   ├── auth_routes.js   # 認證相關路由
│   │   ├── eventRoutes.js   # 活動相關路由
│   │   ├── announcementRoutes.js
│   │   ├── coreteamRoutes.js
│   │   ├── galleryRoutes.js
│   │   └── uploadRoutes.js
│   ├── scripts/             # 資料庫初始化腳本
│   │   ├── init-database.js # 資料庫初始化
│   │   ├── check-database.js
│   │   └── setup-database.sh
│   ├── utils/               # 工具函數
│   │   ├── jwt.js           # JWT 相關工具
│   │   ├── fileUpload.js    # 檔案上傳處理
│   │   ├── imageHandler.js  # 圖片處理
│   │   └── dataTransform.js # 資料轉換
│   ├── public/              # 靜態檔案服務
│   ├── index.js             # 伺服器入口點
│   └── package.json
│
├── docs/                    # 專案文檔
│   ├── 專案說明文件 (必看!!!).md
│   ├── 後端系統設計文檔.md
│   ├── 資料庫設計.md
│   ├── 路由規劃與資料表.md
│   ├── ERD.md               # 資料庫關係圖
│   └── 一些注意事項.md
│
├── tests/                   # 測試相關
│   ├── test-server.js       # 伺服器測試
│   ├── test-database-scripts.js
│   ├── test-frontend-api.js
│   └── run-all-tests.sh
│
├── dev-runner.mjs           # 開發環境啟動腳本
├── package.json             # 根目錄套件配置
├── ARCHITECTURE_REPORT.md  # 架構報告
├── CHANGELOG.md             # 更新日誌
└── README.md                # 專案說明文件
```

---

## 🔧 開發方式

### 快速開始

1. **Clone 專案**
```bash
git clone https://github.com/GDG-on-Campus-NKNU/GDG-Portal
cd GDG-Portal
```

2. **安裝所有套件**
```bash
# 一次性安裝根目錄、前端和後端的所有套件
npm run install:all
```

3. **設定環境變數**
```bash
# 後端環境變數
cp server/.env.example server/.env
# 前端環境變數
cp client/.env.example client/.env

# 編輯配置檔案
# Windows: notepad server/.env
# macOS/Linux: nano server/.env
```

4. **初始化資料庫**
```bash
# 檢查資料庫連接
npm run db:check

# 初始化資料庫結構和基礎資料
npm run db:init

# 如需重置資料庫
npm run db:clear
```

### 開發環境啟動

**方法一：使用開發腳本（推薦）**
```bash
# 在根目錄執行，會同時啟動前後端
node dev-runner.mjs
```

**方法二：分別啟動前後端**
```bash
# 同時啟動前端和後端（需要 concurrently）
npm run dev

# 或分別在不同終端機啟動
npm run dev:server  # 後端 (localhost:5000)
npm run dev:client  # 前端 (localhost:5173)
```

### 生產環境部署

```bash
# 建置前端
npm run build

# 啟動生產環境伺服器
npm start
```
---

## 📦 技術棧

### 前端技術：
- **框架**: React 19 + Vite
- **樣式**: Tailwind CSS + 原生 CSS
- **路由**: React Router DOM v7
- **狀態管理**: React Hooks + Context API
- **動畫**: Framer Motion
- **地圖**: Leaflet
- **HTTP 請求**: Axios
- **日期處理**: date-fns
- **JWT**: jwt-decode

### 後端技術：
- **運行環境**: Node.js
- **框架**: Express.js
- **資料庫**: MySQL (使用 Sequelize ORM)
- **認證**: JWT + Google OAuth 2.0 (Passport.js)
- **密碼加密**: bcryptjs
- **檔案上傳**: Multer
- **跨域處理**: CORS
- **日誌記錄**: Morgan
- **資料驗證**: express-validator
- **開發工具**: nodemon

### 開發工具：
- **程式碼規範**: ESLint
- **版本控制**: Git
- **API 測試**: Postman
- **資料庫管理**: MySQL Workbench
- **部署**: ngrok (開發測試)

---

## 📌 功能模組

| 功能分類         | 功能說明                                 | 開發狀態 |
|------------------|------------------------------------------|----------|
| **認證系統**     | Google OAuth 登入、JWT Token 管理       | ✅ 完成  |
| **使用者管理**   | 個人資料編輯、頭像/橫幅上傳             | ✅ 完成  |
| **活動系統**     | 活動列表、詳細頁面、報名功能             | ✅ 完成  |
| **公告系統**     | 公告發佈、瀏覽、管理                     | ✅ 完成  |
| **幹部管理**     | 幹部介紹頁面、權限管理                   | ✅ 完成  |
| **照片集**       | 活動照片上傳、瀏覽、管理                 | ✅ 完成  |
| **檔案上傳**     | 圖片上傳、頭像/橫幅處理                 | ✅ 完成  |
| **響應式設計**   | 手機、平板、桌面適配                     | ✅ 完成  |
| **權限控制**     | 基於角色的存取控制 (RBAC)               | ✅ 完成  |
| **資料庫**       | MySQL + Sequelize ORM                   | ✅ 完成  |

### 已實現的核心功能：
- 🔐 **Google OAuth 認證系統**
- 👤 **完整的使用者個人檔案管理**
- 📅 **活動管理與報名系統**
- 📢 **公告發佈與管理**
- 👥 **幹部團隊展示**
- 📸 **照片集管理系統**
- 🔒 **基於角色的權限控制**
- 📱 **響應式網頁設計**

---

## 🤝 貢獻方式

1. **Fork 專案並建立新分支**
```bash
git checkout -b feature/[功能名稱]
# 或
git checkout -b fix/[修正名稱]
```

2. **進行開發並測試**
```bash
# 執行測試
npm run test:all

# 檢查程式碼風格
npm run lint
```

3. **提交變更**
```bash
git add .
git commit -m "feat: 新增功能描述"
# 或
git commit -m "fix: 修正問題描述"
```

4. **推送並建立 Pull Request**
```bash
git push origin feature/[功能名稱]
```

### 分支命名規範：
- `feature/[功能名]` - 新功能開發
- `fix/[修正名]` - 錯誤修正
- `docs/[文檔名]` - 文檔更新
- `refactor/[重構名]` - 程式碼重構
- `test/[測試名]` - 測試相關

---

## 🧪 測試與開發工具

### 可用的 npm 腳本：
```bash
# 開發相關
npm run dev              # 同時啟動前後端
npm run dev:client       # 僅啟動前端 (Vite)
npm run dev:server       # 僅啟動後端 (Express)

# 建置與部署
npm run build            # 建置前端到 server/public
npm start                # 啟動生產環境伺服器

# 資料庫相關
npm run db:init          # 初始化資料庫
npm run db:check         # 檢查資料庫連線
npm run db:clear         # 清空並重建資料庫

# 套件管理
npm run install:all      # 安裝所有套件 (根目錄+前端+後端)

# 測試
npm run test:all         # 執行所有測試
```

### 開發注意事項：
- 前端開發伺服器：`http://localhost:5173`
- 後端 API 伺服器：`http://localhost:5000`
- 資料庫：MySQL (需自行安裝並設定)
- 環境變數請參考 `.env.example` 檔案
- 詳細的 API 文檔請參考 `docs/` 資料夾

---

GDG on Campus NKNU Together, Let’s Build & Grow! 🚀

# 注意：**目前 `master` 分支的穩定版本僅包含前端主頁面；如需查看最新變動，請切換至 `develop` 分支。

# GDG on Campus NKNU 會員入口網站 🌐

這是一個為 GDG on Campus NKNU 量身打造的網站系統，提供社員註冊、Profile 管理、公告通知、活動報名、技術資源共享等功能，強化社群互動與學習效率。

---

## 🚀 專案目的
打造一個統整 GDG on Campus 運作的全端式網站平台，讓社員能夠一站式管理資訊、學習資源、參與活動並展現自我技術成就。

---

## 📁 專案架構

```
GDG on Campus-portal/
├── client/                  # 前端 (建議使用 Next.js 或 React)
│   ├── public/              # 靜態資源 (logo, favicon, 全域 CSS)
│       ├── assets/          # 圖片、影片等資源
│   └── src/
│       ├── components/      # 通用元件（Navbar, Footer, ProfileCard 等）
│       ├── pages/           # 頁面 (index.jsx, profile.jsx, register.jsx...)
│       ├── hooks/           # 自定義 hooks
│       ├── utils/           # 前端工具 (API handler, formatter...)
│       ├── tests/           # 前端測試
│       ├── App.js
│       └── index.js
│
├── server/                  # 後端 (Express / Fastify)
│   ├── config/              # 環境變數與資料庫設定
│   ├── controllers/         # API 邏輯控制層
│   ├── middlewares/         # 驗證、錯誤處理等中介層
│   ├── models/              # 資料模型 (會員、公告、活動...)
│   ├── routes/              # API 路由設定
│   ├── utils/               # JWT、hash、工具類
│   ├── app.js               # Express 主入口
│   └── package.json
│
├── docs/                    # 系統設計文檔 (架構圖、流程圖、規格)
│   └── architecture.md
│
├── .env                     # 環境變數設定檔
├── .gitignore               # 忽略清單
└── README.md                # 專案說明文件
```

---

## 🔧 開發方式

1. **Clone 專案**
```bash
git clone https://github.com/GDG-on-Campus-NKNU/GDG-Portal
cd GDG on Campus-portal
```

2. **安裝前後端套件**
```bash
cd client
npm install
cd ../server
npm install
```

3. **啟動開發環境 (於根目錄下)**
```bash
node dev-runner.mjs
```

---

## 📦 使用技術

### 前端：
- React / Next.js
- Tailwind CSS / Shadcn UI
- Axios / SWR
- React Router / Next Router

### 後端：
- Node.js + Express
- MongoDB / PostgreSQL (預計)
- JWT 驗證、bcrypt 密碼加密
- RESTful API 架構

---

## 📌 功能模組（規劃中）

| 功能             | 說明                                 |
|------------------|--------------------------------------|
| NFC 註冊系統     | 利用卡片編號綁定個人帳號              |
| 個人 Profile     | 顯示基本資料、技能、參與活動、徽章    |
| 公告管理         | 幹部發佈消息，社員可留言互動          |
| 行事曆與報名     | 顯示近期活動並支援一鍵報名            |
| 技術資源         | 社內課程影片、簡報、推薦學習資源區    |

---

## 🤝 貢獻方式

1. Fork 專案並建立新分支  
2. 開發功能並提 PR  
3. 依照開發規範命名分支：`feature/[功能名]`、`fix/[修正名]`  

---

## 🛠 分工表及協作者

| 使用者                               | 貢獻領域                 |
|--------------------------------------|--------------------------|
| @calculusfkyou                       | 共同前端開發             |
| @CipherCapricorn                     | 後端路由與服務創建       |
| @lin0813you                          | 使用者驗證以及資料庫管理 |
| @unforgettableeternalproject         | 主要網頁架構開發         |

---

## 🧪 其他

- 環境變數請參考 `.env.example`  
- 資料庫結構詳見 `docs/architecture.md` (尚在規劃中)  

---

## GDG on Campus Together, Let’s Build & Grow! 🚀

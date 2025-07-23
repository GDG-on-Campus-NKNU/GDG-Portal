# GDG Portal

> 🚀 **GDG on Campus 社團管理系統** - 為 Google Developer Groups on Campus 設計的完整社群管理平台

### 本專案提供多語言 README.md 檔案
[![Static Badge](https://img.shields.io/badge/lang-en-red)](./README.md) [![Static Badge](https://img.shields.io/badge/lang-zh--tw-yellow)](./README.zh-tw.md)

## 快速開始

### 🐳 Docker 一鍵部署 (推薦)

最簡單的啟動方式就是使用 Docker：

```bash
# 複製專案
git clone <repository-url>
cd GDG-Portal

# 執行一鍵部署腳本
.\deploy-docker.bat
```

部署完成後可存取：
- **主要網站**: http://localhost:3000
- **資料庫管理**: http://localhost:8080 (Adminer)

### 📝 環境需求

- **Docker Desktop** (推薦方式)
- 或者 **Node.js 18+** + **MySQL** (本地開發)

## 🔧 常用指令

### 根目錄 NPM 指令
```bash
# 開發環境
npm run dev              # 同時啟動前後端
npm run dev:client       # 僅前端 (Vite)
npm run dev:server       # 僅後端 (Nodemon)

# 安裝與建置
npm run install:all      # 安裝所有依賴
npm run build           # 建置前端

# 資料庫管理
npm run db:init         # 初始化資料庫
npm run db:check        # 檢查連線狀態
npm run db:clear        # 清空並重新初始化
```

### Docker 指令
```bash
# 查看服務狀態
docker-compose ps

# 查看應用程式日誌
docker-compose logs -f app

# 重新啟動
docker-compose restart

# 停止所有服務
docker-compose down
```

## 📚 完整文檔

本專案提供詳細的技術文檔，建議按順序閱讀：

### 📖 文檔目錄

1. **[專案架構](docs/01-專案架構.md)** - 整體架構和技術棧介紹
2. **[Message Passing 流程](docs/02-Message-Passing流程.md)** - 前後端資料流程 (新手必讀)
3. **[前後端開發說明](docs/03-前後端開發說明.md)** - 開發流程和最佳實踐
4. **[資料表架構範例](docs/04-資料表架構範例.md)** - 資料庫設計和 SQL 範例
5. **[環境說明](docs/05-環境說明.md)** - 開發 vs 部署環境配置
6. **[Docker 容器說明](docs/06-Docker容器說明.md)** - 容器化部署詳解
7. **[Git 工作流](docs/07-Git工作流.md)** - Git 分支策略和提交規範

### 🎯 適合不同角色

- **網頁開發新手** → 先讀文檔 1, 2, 3, 7
- **前端開發者** → 重點讀文檔 2, 3, 5, 7
- **後端開發者** → 重點讀文檔 3, 4, 6, 7
- **系統管理者** → 重點讀文檔 5, 6

## 🛠 技術棧

- **前端**: React 18 + Vite + Tailwind CSS
- **後端**: Node.js + Express + Sequelize ORM
- **資料庫**: MySQL 8.0 (utf8mb4 中文支援)
- **部署**: Docker + Docker Compose
- **管理**: Adminer 資料庫管理介面

## 🔐 預設帳號

Docker 環境的預設設定：
- **資料庫**: gdg_portal
- **使用者**: gdg_admin
- **密碼**: gdg_secure_2025

## 🤝 貢獻

我們歡迎各種形式的貢獻！請在貢獻前閱讀我們的 [Git 工作流指南](docs/07-Git工作流.md)。

### 快速貢獻步驟：
1. Fork 此專案
2. 創建功能分支：`git checkout -b feature/你的功能名稱`
3. 進行變更並使用正確的提交訊息格式：`訊息.YYYY-MM-DD`
4. 推送並創建 Pull Request

## 📞 支援

如有問題或建議：
1. 先查看對應的技術文檔
2. 在此 repository 建立 issue
3. 聯繫 GDG on Campus 團隊

## 📄 授權

本專案採用 MIT 授權條款。

---

**💡 小提示**: 這是專為 GDG on Campus 社群設計的管理系統，使用前請確保遵循 Google 品牌規範。

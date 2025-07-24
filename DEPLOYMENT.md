# GDG Portal 部署指南

本文件提供 GDG Portal 從 GitHub 克隆到完整部署的詳細步驟。

## 📋 系統需求

- **Node.js**: 18.x 或更高版本
- **Docker**: 20.x 或更高版本
- **Docker Compose**: 2.x 或更高版本
- **Git**: 最新版本
- **MySQL**: 8.0（如果不使用 Docker）

## 🚀 快速開始

### ⚡ 超快速 Docker 部署

```bash
# 1. 複製專案
git clone https://github.com/GDG-on-Campus-NKNU/GDG-Portal.git
cd GDG-Portal && git checkout develop

# 2. 配置環境
cp .env.docker.example .env.docker
# 編輯 .env.docker 填入必要配置

# 3. 一鍵部署（Windows）
.\deploy-docker.bat
```

### ⚡ 超快速開發環境

```bash
# 1. 克隆專案
git clone https://github.com/GDG-on-Campus-NKNU/GDG-Portal.git
cd GDG-Portal && git checkout develop

# 2. 安裝依賴
npm run install:all

# 3. 配置開發環境
cp server/.env.example server/.env.development
cp client/.env.example client/.env.development

# 4. 啟動資料庫並初始化
docker-compose up -d mysql
npm run db:init

# 5. 啟動開發環境
npm run dev
```

## 📋 詳細部署步驟

### 步驟 1: 複製存放庫

```bash
# 克隆專案
git clone https://github.com/GDG-on-Campus-NKNU/GDG-Portal.git

# 進入專案目錄
cd GDG-Portal

# 切換到開發分支
git checkout develop
```

### 步驟 2: 安裝依賴套件

```bash
# 使用便捷腳本一次安裝所有依賴套件
npm run install:all

# 或手動安裝每個部分
npm install          # 根目錄依賴
cd client && npm install && cd ..    # 前端依賴
cd server && npm install && cd ..    # 後端依賴
```

### 步驟 3: 環境配置

本專案使用分離的環境配置檔案，每個環境都有獨立的配置：

```bash
# Docker 環境配置
.env.docker.example     # Docker 環境範本

# 伺服器端環境配置
server/.env.example     # 伺服器端範本
server/.env.development # 開發環境配置
server/.env.production  # 生產環境配置
server/.env.docker      # Docker 環境配置

# 前端環境配置
client/.env.example     # 前端範本
client/.env.development # 開發環境配置
client/.env.production  # 生產環境配置
client/.env.docker      # Docker 環境配置
```

**配置步驟：**

1. **Docker 環境配置**：
```bash
cp .env.docker.example .env.docker
# 編輯 .env.docker 填入實際值
```

2. **開發環境配置**：
```bash
# 伺服器端
cp server/.env.example server/.env.development
# 前端
cp client/.env.example client/.env.development
```

3. **生產環境配置**：
```bash
# 伺服器端
cp server/.env.example server/.env.production
# 前端
cp client/.env.example client/.env.production
```

## 🐳 Docker 部署（推薦）

### 步驟 4: 建立和啟動容器

```bash
# 建立 Docker 映像檔
docker-compose build

# 啟動服務（包含 MySQL、應用程式、Adminer）
docker-compose up -d

# 等待服務完全啟動（約 30-60 秒）
sleep 60

# 查看運行狀態
docker-compose ps

# 查看日誌確認啟動狀態
docker-compose logs -f app
```

### 步驟 5: 資料庫自動初始化

Docker 環境會自動初始化資料庫：
- MySQL 容器啟動後會自動建立資料庫
- 應用程式容器啟動時會自動執行資料庫初始化腳本
- 創建所有必要的資料表和初始資料

如需手動重新初始化：
```bash
# 進入應用程式容器
docker-compose exec app sh

# 執行初始化腳本
node scripts/init-database.js
```

### 步驟 6: 驗證部署

訪問以下網址確認服務正常：

- **主應用程式**: http://localhost:3000
- **資料庫管理**: http://localhost:8080 (Adminer)
  - 伺服器: `mysql`
  - 使用者名稱: `gdg_admin`
  - 密碼: `gdg_secure_NEW_2025`
  - 資料庫: `gdg_portal`

### Docker 管理指令

```bash
# 停止所有服務
docker-compose down

# 重新建立並啟動
docker-compose up -d --build

# 查看特定服務日誌
docker-compose logs -f mysql
docker-compose logs -f app

# 進入容器
docker-compose exec app sh
docker-compose exec mysql mysql -u gdg_admin -p gdg_portal
```

## 💻 開發環境部署

### 步驟 4: 準備環境配置

確保開發環境配置檔案存在：
```bash
# 檢查是否有開發環境配置檔案
ls server/.env.development
ls client/.env.development

# 如果不存在，從範本複製
cp server/.env.example server/.env.development
cp client/.env.example client/.env.development
```

### 步驟 5: 啟動 MySQL（使用 Docker）

```bash
# 只啟動 MySQL 服務
docker-compose up -d mysql

# 等待 MySQL 完全啟動（約 30 秒）
docker-compose logs -f mysql
```

### 步驟 6: 初始化資料庫

```bash
# 使用便捷腳本初始化資料庫
npm run db:init

# 或手動執行
cd server
node scripts/init-database.js
cd ..
```

### 步驟 7: 啟動開發環境

```bash
# 同時啟動前端和後端開發伺服器
npm run dev
```

開發環境服務：
- **前端開發伺服器**: http://localhost:5173
- **後端 API 伺服器**: http://localhost:5000
- **資料庫管理**: http://localhost:8080

### 開發環境管理指令

```bash
# 安裝所有依賴
npm run install:all

# 只啟動前端
npm run dev:client

# 只啟動後端
npm run dev:server

# 生產模式構建
npm run build

# 資料庫管理
npm run db:init          # 初始化資料庫
npm run db:check         # 檢查資料庫連線
npm run db:clear         # 清空並重新初始化資料庫
npm run db:generate-sql  # 生成 SQL 檔案

# 檢查程式碼
npm run lint

# 執行測試
npm run test:all
```

## 🗄️ 資料庫管理

### 自動初始化

- **Docker 環境**: 容器啟動時自動初始化資料庫
- **開發環境**: 需要手動執行 `npm run db:init`

### 初始資料

系統會自動創建以下初始資料：
- **管理員帳號**: admin@gdg.nknu.edu.tw / admin123
- **Core Team 成員**: 顏榕嶙 (Bernie)
- **基本分類**: Technical Education, Community Relations, Engineering

### 資料庫腳本

```bash
# 檢查資料庫連線
npm run db:check

# 初始化資料庫
npm run db:init

# 清空並重新初始化資料庫（危險操作）
npm run db:clear

# 生成 SQL 檔案
npm run db:generate-sql

# 手動執行（如果需要）
cd server
node scripts/check-database.js
node scripts/init-database.js
node scripts/generate-all-sql.js
cd ..
```

## ⚙️ 環境配置詳解

### 配置檔案結構

```
專案根目錄/
├── .env.docker                # Docker 環境配置
├── .env.docker.example        # Docker 環境範本
├── server/
│   ├── .env.development       # 伺服器開發環境
│   ├── .env.production        # 伺服器生產環境
│   └── .env.example           # 伺服器配置範本
└── client/
    ├── .env.development       # 前端開發環境
    ├── .env.production        # 前端生產環境
    └── .env.example           # 前端配置範本
```

### 環境變數載入順序

1. **開發環境**: 載入 `server/.env.development` 和 `client/.env.development`
2. **生產環境**: 載入 `server/.env.production` 和 `client/.env.production`  
3. **Docker 環境**: 載入根目錄的 `.env.docker`

### 必要配置項目

**伺服器端 (server/.env.*)**:
- `NODE_ENV`: 環境模式
- `PORT`: 伺服器埠號
- `DB_*`: 資料庫連線資訊
- `JWT_*`: JWT 金鑰配置
- `GOOGLE_*`: Google OAuth 配置

**前端 (client/.env.*)**:
- `VITE_API_URL`: API 伺服器網址
- `VITE_OAUTH_*`: OAuth 相關配置

## 🔧 故障排除

### 常見問題

#### 1. Docker 容器無法啟動
```bash
# 清理 Docker 系統
docker system prune -a

# 重新建立映像檔
docker-compose build --no-cache
```

#### 2. 資料庫連線失敗
```bash
# 檢查 MySQL 容器狀態
docker-compose logs mysql

# 重啟 MySQL 服務
docker-compose restart mysql
```

#### 3. 前端白屏問題
```bash
# 清理前端建構快取
cd client
rm -rf dist node_modules
npm install
npm run build
```

#### 4. 權限問題（Linux/Mac）
```bash
# 修正檔案權限
sudo chown -R $USER:$USER .
chmod -R 755 .
```

### 日誌檢查

```bash
# 查看應用程式日誌
docker-compose logs -f app

# 查看資料庫日誌
docker-compose logs -f mysql

# 查看所有服務日誌
docker-compose logs -f
```

## 📚 其他資源

- **API 文件**: `/docs/後端系統設計文檔.md`
- **資料庫設計**: `/docs/資料庫設計.md`
- **專案說明**: `/docs/專案說明文件 (必看!!!).md`
- **開發指南**: `/docs/專案整體發想與設計.md`

## 🤝 開發團隊

如有任何問題，請聯繫：
- **Bernie (顏榕嶙)**: 專案負責人
- **GitHub Issues**: [提交問題](https://github.com/GDG-on-Campus-NKNU/GDG-Portal/issues)

---

**注意**: 第一次部署時請確保按照順序執行所有步驟，特別是環境變數配置和資料庫初始化。

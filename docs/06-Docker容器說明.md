# Docker 容器說明

## Docker 架構概述

本專案採用 **Docker Compose** 多服務架構，將應用程式拆分為三個獨立的容器服務，確保開發和部署的一致性。

```
┌─────────────────────────────────────────────────────────────┐
│                    Docker Compose 網路                      │
├─────────────────┬─────────────────┬─────────────────────────┤
│   App Container │ MySQL Container │   Adminer Container     │
│   (Node.js)     │   (Database)    │   (DB Management)       │
│   Port: 3000    │   Port: 3306    │   Port: 8080           │
└─────────────────┴─────────────────┴─────────────────────────┘
```

## 服務詳細說明

### 1. App Container (應用程式容器)

**映像基礎：** `node:18-alpine`  
**用途：** 運行 Node.js 後端和服務前端靜態檔案  
**端口：** 3000

#### Dockerfile 配置
```dockerfile
# 多階段建置：前端建置階段
FROM node:18-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci --only=production
COPY client/ ./
RUN npm run build

# 生產階段：後端 + 前端靜態檔案
FROM node:18-alpine
WORKDIR /app

# 安裝後端依賴
COPY server/package*.json ./server/
RUN cd server && npm ci --only=production

# 複製後端程式碼
COPY server/ ./server/

# 複製前端建置結果
COPY --from=client-builder /app/client/dist ./server/public

# 複製環境設定檔
COPY .env.docker ./server/.env

# 健康檢查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

EXPOSE 3000
CMD ["node", "server/index.js"]
```

#### 容器特色
- **多階段建置** - 分離前端建置和生產環境
- **健康檢查** - 自動監控應用程式狀態
- **最小化映像** - 使用 Alpine Linux 減少映像大小
- **環境隔離** - 使用專門的 Docker 環境配置

### 2. MySQL Container (資料庫容器)

**映像基礎：** `mysql:8.0`  
**用途：** 提供 MySQL 資料庫服務  
**端口：** 3306

#### 配置詳情
```yaml
mysql:
  image: mysql:8.0
  container_name: gdg-mysql
  ports:
    - "3306:3306"
  environment:
    MYSQL_ROOT_PASSWORD: rootpassword123
    MYSQL_DATABASE: gdg_portal
    MYSQL_USER: gdg_admin
    MYSQL_PASSWORD: gdg_secure_2024
  command: >
    --character-set-server=utf8mb4 
    --collation-server=utf8mb4_unicode_ci 
    --default-authentication-plugin=mysql_native_password
  volumes:
    - mysql_data:/var/lib/mysql
  restart: unless-stopped
```

#### 重要特性
- **UTF8MB4 編碼** - 完整支援中文和表情符號
- **原生認證** - 使用 mysql_native_password 確保相容性
- **資料持久化** - 使用 Docker Volume 保存資料
- **自動重啟** - 容器異常時自動重啟

#### 中文支援配置
```sql
-- 確保資料庫支援中文
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

-- 範例：建立支援中文的表格
CREATE TABLE example (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
);
```

### 3. Adminer Container (資料庫管理容器)

**映像基礎：** `adminer:latest`  
**用途：** 提供網頁版資料庫管理介面  
**端口：** 8080

#### 配置說明
```yaml
adminer:
  image: adminer:latest
  container_name: gdg-adminer
  ports:
    - "8080:8080"
  depends_on:
    - mysql
  restart: unless-stopped
```

#### 使用說明
1. **存取網址：** http://localhost:8080
2. **登入資訊：**
   - 系統：MySQL
   - 伺服器：mysql (容器名稱)
   - 使用者名稱：gdg_admin
   - 密碼：gdg_secure_2024
   - 資料庫：gdg_portal

#### Adminer 功能
- **資料瀏覽** - 查看和編輯資料表內容
- **SQL 執行** - 執行 SQL 查詢和指令
- **資料匯出** - 匯出資料為 SQL、CSV 等格式
- **結構檢視** - 查看資料表結構和關聯
- **使用者管理** - 管理資料庫使用者權限

## Docker Compose 編排

### 完整配置檔案
```yaml
version: '3.8'

services:
  app:
    build: .
    container_name: gdg-app
    ports:
      - "3000:3000"
      - "5000:5000"
    depends_on:
      - mysql
    environment:
      NODE_ENV: production
      PORT: 3000
      DB_HOST: mysql
      DB_PORT: 3306
      DB_NAME: gdg_portal
      DB_USER: gdg_admin
      DB_PASSWORD: ${DB_PASSWORD:-your_secure_password}
      JWT_SECRET: ${JWT_SECRET:-your_jwt_secret_here}
      GOOGLE_CLIENT_ID: ${GOOGLE_CLIENT_ID:-your_google_oauth_client_id}
      GOOGLE_CLIENT_SECRET: ${GOOGLE_CLIENT_SECRET:-your_google_oauth_client_secret}
    volumes:
      - uploads_data:/app/server/public/assets/uploads
      - static_assets:/app/server/public/assets
      - resources_data:/app/server/public/resources
    restart: unless-stopped
    networks:
      - gdg-network

  mysql:
    image: mysql:8.0
    container_name: gdg-mysql
    ports:
      - "3307:3306"
    environment:
      MYSQL_ROOT_PASSWORD: gdg_root_password_2025
      MYSQL_DATABASE: gdg_portal
      MYSQL_USER: gdg_admin
      MYSQL_PASSWORD: gdg_secure_2025
    command: >
      --character-set-server=utf8mb4 
      --collation-server=utf8mb4_unicode_ci 
      --default-authentication-plugin=mysql_native_password
    volumes:
      - mysql_data:/var/lib/mysql
      - ./mysql-init:/docker-entrypoint-initdb.d
    restart: unless-stopped
    networks:
      - gdg-network

  adminer:
    image: adminer:latest
    container_name: gdg-adminer
    ports:
      - "8080:8080"
    environment:
      ADMINER_DEFAULT_SERVER: mysql
      ADMINER_DESIGN: pepa-linha
    depends_on:
      - mysql
    restart: unless-stopped
    networks:
      - gdg-network

volumes:
  mysql_data:
  uploads_data:
  static_assets:
  resources_data:

networks:
  gdg-network:
    driver: bridge
```

### 容器間通訊
- **內部網路** - 所有容器連接到 `gdg-network`
- **服務發現** - 容器可以用服務名稱互相存取
- **依賴管理** - 使用 `depends_on` 確保啟動順序

## 部署和管理

### 一鍵部署
使用提供的 `deploy-docker.bat` 腳本：

```bash
# Windows 環境
.\deploy-docker.bat

# 腳本會自動執行：
# 1. 檢查 Docker 安裝
# 2. 停止現有容器
# 3. 建置新映像
# 4. 啟動所有服務
# 5. 等待 MySQL 就緒
# 6. 初始化資料庫
```

### 手動管理指令

#### 建置和啟動
```bash
# 建置並啟動所有服務
docker-compose up --build -d

# 僅啟動特定服務
docker-compose up mysql -d

# 重新建置 (清除快取)
docker-compose build --no-cache
```

#### 監控和除錯
```bash
# 查看所有容器狀態
docker-compose ps

# 查看特定容器日誌
docker-compose logs app
docker-compose logs mysql
docker-compose logs adminer

# 即時監控日誌
docker-compose logs -f app

# 查看容器資源使用
docker stats gdg-app gdg-mysql gdg-adminer
```

#### 容器操作
```bash
# 進入應用程式容器
docker-compose exec app sh

# 進入 MySQL 容器
docker-compose exec mysql bash

# 在 MySQL 容器中執行 SQL
docker-compose exec mysql mysql -u gdg_admin -p gdg_portal

# 重啟特定服務
docker-compose restart app
```

#### 停止和清理
```bash
# 停止所有服務
docker-compose down

# 停止並刪除 volumes (會清除資料庫資料)
docker-compose down -v

# 清理未使用的映像和容器
docker system prune -a
```

## 資料持久化

### 重要概念
本專案使用 **Docker Volumes** 來確保重要資料的持久化，避免容器重建時資料遺失。

### MySQL 資料存儲
```bash
# 資料存儲位置
Volume: mysql_data
Location: /var/lib/docker/volumes/gdg-portal_mysql_data

# 備份資料庫
docker-compose exec mysql mysqldump -u gdg_admin -p gdg_portal > backup.sql

# 還原資料庫
docker-compose exec -i mysql mysql -u gdg_admin -p gdg_portal < backup.sql
```

### 檔案上傳與資源存儲
```bash
# 📁 多層級檔案持久化策略

# 1. 動態上傳檔案 (用戶上傳的內容)
Volume: uploads_data
Container path: /app/server/public/assets/uploads
用途: 成員照片、活動照片、用戶上傳檔案

# 2. 靜態資源檔案 (預設的資源)
Volume: static_assets  
Container path: /app/server/public/assets
用途: 預設頭像、LOGO、圖示等靜態資源

# 3. 文檔資源檔案 (可下載的文檔)
Volume: resources_data
Container path: /app/server/public/resources
用途: PDF檔案、教學文件、工具下載等
```

### Volume 配置說明
```yaml
# 在 docker-compose.yml 中的 volumes 設定
volumes:
  mysql_data:           # 資料庫資料
  uploads_data:         # 用戶上傳檔案
  static_assets:        # 靜態資源
  resources_data:       # 文檔資源
```

### 檔案管理優勢
```markdown
✅ **容器重建不影響檔案** - 所有檔案都儲存在 Docker Volume 中
✅ **動態新增檔案** - 無需重建容器即可新增檔案
✅ **分類管理** - 不同類型檔案分別存儲，便於管理
✅ **備份容易** - 可以獨立備份不同類型的資料
```

### 實際檔案操作
```bash
# 檢視 Volume 中的檔案
docker-compose exec app ls -la /app/server/public/assets/uploads
docker-compose exec app ls -la /app/server/public/assets  
docker-compose exec app ls -la /app/server/public/resources

# 新增檔案到容器 (從主機複製到容器)
docker cp ./local-file.pdf gdg-portal-app:/app/server/public/resources/

# 從容器複製檔案到主機 (備份)
docker cp gdg-portal-app:/app/server/public/assets/uploads ./backup/

# 備份整個 Volume
docker run --rm -v gdg-portal_uploads_data:/data -v $(pwd):/backup alpine tar czf /backup/uploads_backup.tar.gz /data

# 還原 Volume 備份
docker run --rm -v gdg-portal_uploads_data:/data -v $(pwd):/backup alpine tar xzf /backup/uploads_backup.tar.gz -C /
```

## 網路配置

### 端口映射
```
主機端口 → 容器端口
3000    → 3000 (應用程式主端口)
5000    → 5000 (應用程式備用端口)
3307    → 3306 (MySQL - 避免本機 MySQL 衝突)
8080    → 8080 (Adminer 資料庫管理)
```

### 防火牆設定 (生產環境)
```bash
# 允許特定端口
sudo ufw allow 3000/tcp
sudo ufw allow 5000/tcp
sudo ufw allow 8080/tcp

# 限制 MySQL 僅本地存取 (注意是 3307)
sudo ufw deny 3307/tcp
```

## 效能最佳化

### 容器最佳化
```dockerfile
# 使用 .dockerignore 減少建置內容
node_modules
.git
*.log
.env*

# 多階段建置減少映像大小
FROM node:18-alpine AS builder
# ... 建置階段
FROM node:18-alpine AS production
# ... 生產階段
```

### 資料庫最佳化
```sql
-- 調整 MySQL 配置 (my.cnf)
[mysqld]
innodb_buffer_pool_size = 256M
max_connections = 100
query_cache_type = 1
query_cache_size = 64M
```

### 監控配置
```yaml
# 添加健康檢查
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

## 疑難排解

### 常見問題

#### 1. 容器無法啟動
```bash
# 檢查日誌
docker-compose logs app

# 檢查端口衝突
netstat -tulpn | grep :3000

# 重建容器
docker-compose build --no-cache app
```

#### 2. 資料庫連線失敗
```bash
# 確認 MySQL 容器運行
docker-compose ps mysql

# 檢查 MySQL 日誌
docker-compose logs mysql

# 測試連線
docker-compose exec app ping mysql
```

#### 3. 中文字符顯示問題
```sql
-- 檢查資料庫編碼
SHOW VARIABLES LIKE 'character_set%';
SHOW VARIABLES LIKE 'collation%';

-- 應該顯示 utf8mb4
```

#### 4. 檔案上傳與存取問題
```bash
# 檢查 Volume 是否正確掛載
docker-compose exec app ls -la /app/server/public/assets/uploads
docker-compose exec app ls -la /app/server/public/resources

# 檢查 Volume 使用情況
docker volume ls
docker volume inspect gdg-portal_uploads_data
docker volume inspect gdg-portal_static_assets

# 檢查容器內目錄權限
docker-compose exec app ls -la /app/server/public/

# 檢查容器可用空間
docker-compose exec app df -h

# 測試檔案寫入權限
docker-compose exec app touch /app/server/public/assets/uploads/test.txt
docker-compose exec app rm /app/server/public/assets/uploads/test.txt
```

### 除錯技巧
```bash
# 進入容器除錯
docker-compose exec app sh

# 在容器內檢查環境變數
docker-compose exec app env

# 測試應用程式端點
docker-compose exec app curl http://localhost:3000/api/health

# 檢查網路連通性
docker-compose exec app ping mysql
docker-compose exec app nslookup mysql
```

這個 Docker 容器化解決方案提供了完整的開發和部署環境，確保了跨平台的一致性和易於管理的特性。

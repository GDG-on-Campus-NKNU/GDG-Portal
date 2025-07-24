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

# 4. 系統日誌檔案 (應用程式運行日誌)
Volume: logs_data
Container path: /app/server/logs
用途: 系統運行日誌、API 呼叫記錄、錯誤日誌等
```

### Volume 配置說明
```yaml
# 在 docker-compose.yml 中的 volumes 設定
volumes:
  mysql_data:           # 資料庫資料
  uploads_data:         # 用戶上傳檔案
  static_assets:        # 靜態資源
  resources_data:       # 文檔資源
  logs_data:            # 系統日誌
```

### 檔案管理優勢
```markdown
✅ **容器重建不影響檔案** - 所有檔案都儲存在 Docker Volume 中
✅ **動態新增檔案** - 無需重建容器即可新增檔案
✅ **分類管理** - 不同類型檔案分別存儲，便於管理
✅ **備份容易** - 可以獨立備份不同類型的資料
✅ **日誌持久化** - 系統日誌檔案永久保存，便於除錯和監控
```

### 實際檔案操作
```bash
# 檢視 Volume 中的檔案
docker-compose exec app ls -la /app/server/public/assets/uploads
docker-compose exec app ls -la /app/server/public/assets  
docker-compose exec app ls -la /app/server/public/resources
docker-compose exec app ls -la /app/server/logs

# 新增檔案到容器 (從主機複製到容器)
docker cp ./local-file.pdf gdg-portal-app:/app/server/public/resources/

# 從容器複製檔案到主機 (備份)
docker cp gdg-portal-app:/app/server/public/assets/uploads ./backup/

# 備份整個 Volume
docker run --rm -v gdg-portal_uploads_data:/data -v $(pwd):/backup alpine tar czf /backup/uploads_backup.tar.gz /data

# 還原 Volume 備份
docker run --rm -v gdg-portal_uploads_data:/data -v $(pwd):/backup alpine tar xzf /backup/uploads_backup.tar.gz -C /
```

## 日誌系統管理

### 日誌檔案分類
本專案的日誌系統會自動產生不同類型的日誌檔案，按日期分類存儲：

```bash
# 日誌檔案命名格式
/app/server/logs/
├── access-2024-07-24.log    # HTTP 存取日誌
├── api-2024-07-24.log       # API 呼叫日誌  
├── error-2024-07-24.log     # 錯誤日誌
└── ...                      # 其他日期的日誌檔案
```

### 日誌內容說明
```bash
# Access 日誌 - 記錄所有 HTTP 請求
[2024-07-24T10:30:15.123Z] 127.0.0.1 - - [24/Jul/2024:10:30:15 +0000] "GET /api/core-team HTTP/1.1" 200 1234 "-" "Mozilla/5.0..."

# API 日誌 - 記錄 API 呼叫詳情
[2024-07-24T10:30:15.123Z] API GET /api/core-team - Status: 200 - 45ms

# Error 日誌 - 記錄錯誤資訊
[2024-07-24T10:30:15.123Z] API Error - GET /api/users/999 - User not found
```

### 查看日誌的方法

#### 方法 1：使用日誌管理工具 (推薦)
```bash
# 進入容器並使用日誌管理工具
docker-compose exec app node server/scripts/log-manager.js

# 列出所有日誌檔案
docker-compose exec app node server/scripts/log-manager.js list

# 查看今天的錯誤日誌
docker-compose exec app node server/scripts/log-manager.js errors

# 查看今天的 API 統計
docker-compose exec app node server/scripts/log-manager.js stats

# 查看指定日誌檔案 (顯示最後 100 行)
docker-compose exec app node server/scripts/log-manager.js show api-2024-07-24.log 100

# 清理 7 天前的舊日誌
docker-compose exec app node server/scripts/log-manager.js clean 7
```

#### 方法 2：直接查看檔案
```bash
# 查看日誌目錄內容
docker-compose exec app ls -la /app/server/logs

# 查看今天的 API 日誌
docker-compose exec app cat /app/server/logs/api-$(date +%Y-%m-%d).log

# 即時監控日誌 (類似 tail -f)
docker-compose exec app tail -f /app/server/logs/api-$(date +%Y-%m-%d).log

# 搜尋特定關鍵字
docker-compose exec app grep "Error" /app/server/logs/error-*.log
```

#### 方法 3：複製日誌到主機
```bash
# 複製今天的所有日誌到主機
docker cp gdg-portal-app:/app/server/logs ./local-logs

# 複製特定日誌檔案
docker cp gdg-portal-app:/app/server/logs/api-2024-07-24.log ./api-log.txt

# 在主機上查看
type local-logs\api-2024-07-24.log
```

#### 方法 4：Docker Compose 日誌
```bash
# 查看容器終端輸出 (開發模式才會有詳細輸出)
docker-compose logs -f app

# 查看最近 100 行日誌
docker-compose logs --tail=100 app

# 查看特定時間範圍的日誌
docker-compose logs --since="2024-07-24T10:00:00" app
```

### 日誌監控和分析

#### 即時監控腳本範例
```bash
# 建立監控腳本 monitor-logs.sh
#!/bin/bash
echo "🔍 GDG Portal 日誌即時監控"
echo "============================="

# 同時監控多種日誌
docker-compose exec app sh -c "
  echo '📊 API 日誌:' && tail -n 5 /app/server/logs/api-\$(date +%Y-%m-%d).log 2>/dev/null || echo '無 API 日誌'
  echo ''
  echo '🚨 錯誤日誌:' && tail -n 5 /app/server/logs/error-\$(date +%Y-%m-%d).log 2>/dev/null || echo '無錯誤日誌'
  echo ''
  echo '📈 存取日誌:' && tail -n 3 /app/server/logs/access-\$(date +%Y-%m-%d).log 2>/dev/null || echo '無存取日誌'
"
```

#### 日誌分析指令
```bash
# 統計今天的 API 呼叫次數
docker-compose exec app sh -c "grep -c 'API' /app/server/logs/api-\$(date +%Y-%m-%d).log 2>/dev/null || echo 0"

# 統計錯誤數量
docker-compose exec app sh -c "grep -c 'Error' /app/server/logs/error-\$(date +%Y-%m-%d).log 2>/dev/null || echo 0"

# 找出最常被呼叫的 API 端點
docker-compose exec app sh -c "grep 'API' /app/server/logs/api-\$(date +%Y-%m-%d).log 2>/dev/null | awk '{print \$4}' | sort | uniq -c | sort -nr | head -10"
```

### 日誌維護

#### 自動清理設定
```bash
# 在生產環境中，建議設定定期清理舊日誌的 cron job
# 例如：每週清理 30 天前的日誌
0 2 * * 0 docker-compose exec app node server/scripts/log-manager.js clean 30
```

#### 日誌備份
```bash
# 備份日誌 Volume
docker run --rm -v gdg-portal_logs_data:/data -v $(pwd):/backup alpine tar czf /backup/logs_backup_$(date +%Y%m%d).tar.gz /data

# 還原日誌備份
docker run --rm -v gdg-portal_logs_data:/data -v $(pwd):/backup alpine tar xzf /backup/logs_backup_20240724.tar.gz -C /
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
docker-compose exec app ls -la /app/server/logs

# 檢查 Volume 使用情況
docker volume ls
docker volume inspect gdg-portal_uploads_data
docker volume inspect gdg-portal_static_assets
docker volume inspect gdg-portal_logs_data

# 檢查容器內目錄權限
docker-compose exec app ls -la /app/server/public/

# 檢查容器可用空間
docker-compose exec app df -h

# 測試檔案寫入權限
docker-compose exec app touch /app/server/public/assets/uploads/test.txt
docker-compose exec app rm /app/server/public/assets/uploads/test.txt

# 測試日誌寫入權限
docker-compose exec app touch /app/server/logs/test.log
docker-compose exec app rm /app/server/logs/test.log
```

#### 5. 日誌相關問題
```bash
# 檢查日誌檔案是否正常產生
docker-compose exec app ls -la /app/server/logs

# 檢查日誌檔案權限
docker-compose exec app ls -la /app/server/logs/*.log

# 手動測試日誌寫入
docker-compose exec app node server/scripts/log-manager.js list

# 如果日誌檔案無法產生，檢查目錄權限
docker-compose exec app mkdir -p /app/server/logs
docker-compose exec app chmod 755 /app/server/logs

# 查看日誌相關的環境變數
docker-compose exec app env | grep NODE_ENV
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

# 測試日誌功能
docker-compose exec app node server/scripts/log-manager.js list
docker-compose exec app curl http://localhost:3000/api/core-team
docker-compose exec app node server/scripts/log-manager.js stats
```

### 日誌除錯流程
```bash
# 1. 確認日誌目錄存在
docker-compose exec app ls -la /app/server/logs

# 2. 測試 API 呼叫以產生日誌
docker-compose exec app curl http://localhost:3000/api/health
docker-compose exec app curl http://localhost:3000/api/core-team

# 3. 檢查是否有新的日誌檔案
docker-compose exec app ls -la /app/server/logs

# 4. 查看日誌內容
docker-compose exec app node server/scripts/log-manager.js list
docker-compose exec app node server/scripts/log-manager.js stats

# 5. 如果沒有日誌，檢查 logger 中間件是否正確載入
docker-compose logs app | grep -i "log\|middleware"
```

## 系統特色總結

這個 Docker 容器化解決方案提供了完整的開發和部署環境，具備以下特色：

### 🚀 **部署特色**
- **一鍵部署** - 使用 `docker-compose up --build -d` 即可完成整個系統部署
- **環境隔離** - 每個服務運行在獨立容器中，避免環境衝突
- **跨平台** - 在 Windows、macOS、Linux 上都能保持一致的運行環境
- **可擴展性** - 容易添加新的服務或擴展現有功能

### 📊 **監控特色**  
- **多層級日誌** - 分離 access、api、error 不同類型的日誌
- **智能分析** - 內建日誌管理工具提供統計和分析功能
- **即時監控** - 支援即時日誌監控和告警
- **自動清理** - 可設定自動清理舊日誌，避免磁碟空間不足

### 🛠️ **管理特色**
- **資料持久化** - 所有重要資料都使用 Docker Volume 持久化存儲
- **便捷備份** - 獨立的 Volume 設計讓備份和還原變得簡單
- **健康檢查** - 自動監控應用程式健康狀態
- **優雅管理** - 提供完整的管理指令和疑難排解流程

### 🔧 **開發特色**
- **快速啟動** - 新開發者可以在幾分鐘內建立完整開發環境
- **一致性保證** - 開發、測試、生產環境完全一致
- **除錯友善** - 提供多種除錯方法和工具
- **文檔完整** - 詳細的文檔說明和範例

這個解決方案確保了 GDG Portal 專案的高可靠性、易維護性和優秀的開發體驗。

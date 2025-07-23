@echo off
setlocal enabledelayedexpansion

echo 🚀 Starting GDG Portal Docker Deployment...

REM 檢查 Docker 是否已安裝
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

docker-compose version >nul 2>&1
if errorlevel 1 (
    docker compose version >nul 2>&1
    if errorlevel 1 (
        echo ❌ Docker Compose is not available. Please install Docker Compose.
        pause
        exit /b 1
    )
)

REM 檢查是否有 .env 檔案
if not exist .env (
    if exist .env.example (
        echo 📋 Copying .env.example to .env...
        copy .env.example .env
        echo ⚠️  Please edit .env file with your actual configuration before running the application.
    ) else (
        echo ❌ No .env.example file found. Please create a .env file with your configuration.
        pause
        exit /b 1
    )
)

REM 停止現有的容器
echo 🛑 Stopping existing containers...
docker-compose down

REM 構建並啟動服務
echo 🏗️  Building and starting services...
docker-compose up --build -d

REM 等待 MySQL 啟動
echo ⏳ Waiting for MySQL to be ready...
timeout /t 30 /nobreak >nul

REM 檢查 MySQL 是否已準備就緒
echo 🔍 Checking MySQL status...
:check_mysql
docker-compose exec mysql mysqladmin ping -h"localhost" --silent >nul 2>&1
if errorlevel 1 (
    echo    MySQL is not ready yet. Waiting...
    timeout /t 5 /nobreak >nul
    goto check_mysql
)

echo ✅ MySQL is ready!

REM 初始化資料庫
echo 📊 Initializing database...
docker-compose exec app node server/scripts/docker-init-database.js

REM 顯示服務狀態
echo 📋 Service Status:
docker-compose ps

echo.
echo 🎉 GDG Portal has been successfully deployed!
echo.
echo 📍 Application URL: http://localhost:3000
echo 📍 MySQL Port: 3306
echo.
echo 📝 Useful commands:
echo    View logs: docker-compose logs -f
echo    Stop services: docker-compose down
echo    Restart services: docker-compose restart
echo    Access app container: docker-compose exec app sh
echo    Access MySQL: docker-compose exec mysql mysql -u gdg_admin -p gdg_portal
echo.
echo ⚠️  Don't forget to:
echo    1. Update the .env file with your actual secrets
echo    2. Configure Google OAuth credentials
echo    3. Set up proper domain and SSL for production use
echo.
pause

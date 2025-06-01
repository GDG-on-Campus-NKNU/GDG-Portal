#!/bin/bash
# filepath: /workspaces/GDG-Portal/scripts/setup-database.sh

echo "🗄️  GDG Portal Database Setup Script"
echo "===================================="

# 檢查 Node.js 是否安裝
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# 檢查 .env 檔案是否存在
if [ ! -f "./server/.env" ]; then
    echo "❌ Environment file not found at ./server/.env"
    echo "Please create the .env file with database configuration."
    exit 1
fi

echo "📋 Available commands:"
echo "  1. Initialize database with sample data"
echo "  2. Clear database and reinitialize"
echo "  3. Check database connection only"
echo ""

# 獲取用戶選擇
read -p "Please select an option (1-3): " choice

case $choice in
    1)
        echo "🚀 Initializing database with sample data..."
        node scripts/init-database.js
        ;;
    2)
        echo "⚠️  This will clear all existing data! Are you sure? (y/N)"
        read -p "" confirm
        if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
            echo "🗑️  Clearing and reinitializing database..."
            node scripts/init-database.js --clear
        else
            echo "🚫 Operation cancelled."
        fi
        ;;
    3)
        echo "📡 Checking database connection..."
        node scripts/check-database.js
        ;;
    *)
        echo "❌ Invalid option. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "✅ Database setup completed!"
echo "You can now start the server with: npm run dev"

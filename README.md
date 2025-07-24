# GDG Portal

> 🚀 **GDG on Campus Community Management Platform** - A comprehensive community management platform designed for Google Developer Groups on Campus

### This project provides multilanguage README.md file
[![Static Badge](https://img.shields.io/badge/lang-en-red)](./README.md) [![Static Badge](https://img.shields.io/badge/lang-zh--tw-yellow)](./README.zh-tw.md)

## Quick Start

📖 **[完整部署指南 Complete Deployment Guide](./DEPLOYMENT.md)**

### 🐳 One-Click Docker Deployment (Recommended)

The easiest way to get started is using Docker:

```bash
# Clone the repository
git clone https://github.com/GDG-on-Campus-NKNU/GDG-Portal.git
cd GDG-Portal

# First time setup: Configure environment variables
copy .env.docker.example .env.docker
notepad .env.docker  # Edit with your actual values

# Run the one-click deployment script
.\deploy-docker.bat
```

> **⚠️ Important**: Before first deployment, you must create `.env.docker` from the example template and fill in your actual values:
> - Google OAuth credentials (Client ID & Secret)
> - JWT & session secrets (use strong random strings)
> - Database passwords

For detailed step-by-step instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)
> - Other sensitive configuration

After deployment, access:
- **Main Website**: http://localhost:3000
- **Database Management**: http://localhost:8080 (Adminer)

### 📝 Requirements

- **Docker Desktop** (recommended)
- Or **Node.js 18+** + **MySQL** (for local development)

## 🔧 Common Commands

### Root NPM Scripts
```bash
# Development
npm run dev              # Start both frontend and backend
npm run dev:client       # Frontend only (Vite)
npm run dev:server       # Backend only (Nodemon)

# Installation & Build
npm run install:all      # Install all dependencies
npm run build           # Build frontend

# Database Management
npm run db:init         # Initialize database
npm run db:check        # Check connection status
npm run db:clear        # Clear and reinitialize
```

### Docker Commands
```bash
# View service status
docker-compose ps

# View application logs
docker-compose logs -f app

# Restart services
docker-compose restart

# Stop all services
docker-compose down
```

## 📚 Complete Documentation

This project provides detailed technical documentation, recommended reading order:

### 📖 Documentation Index

1. **[Project Architecture](docs/01-專案架構.md)** - Overall architecture and tech stack
2. **[Message Passing Flow](docs/02-Message-Passing流程.md)** - Frontend-backend data flow (Must-read for beginners)
3. **[Frontend & Backend Development Guide](docs/03-前後端開發說明.md)** - Development workflow and best practices
4. **[Database Schema Examples](docs/04-資料表架構範例.md)** - Database design and SQL examples
5. **[Environment Configuration](docs/05-環境說明.md)** - Development vs deployment environment setup
6. **[Docker Container Guide](docs/06-Docker容器說明.md)** - Containerized deployment details
7. **[Git Workflow](docs/07-Git工作流.md)** - Git branching strategy and commit conventions
8. **[Feature Planning & Development Roadmap](docs/08-功能規劃與開發路線圖.md)** - Future features and implementation plans

## 🛠 Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js + Express + Sequelize ORM
- **Database**: MySQL 8.0 (utf8mb4 Chinese support)
- **Deployment**: Docker + Docker Compose
- **Management**: Adminer database management interface

## 🔐 Default Credentials

Docker environment default settings:
- **Database**: gdg_portal
- **Username**: gdg_admin
- **Password**: gdg_secure_2025

## 🤝 Contributing

We welcome contributions! Please read our [Git Workflow Guide](docs/07-Git工作流.md) before contributing.

### Quick Contribution Steps:
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes with proper commit messages: `message.YYYY-MM-DD`
4. Push and create a Pull Request

## 📞 Support

For questions or suggestions:
1. Check the corresponding technical documentation first
2. Create an issue in this repository
3. Contact the GDG on Campus team

## 📄 License

This project is licensed under the MIT License.

---

**💡 Note**: This is a management system designed specifically for GDG on Campus communities. Please ensure compliance with Google brand guidelines before use.
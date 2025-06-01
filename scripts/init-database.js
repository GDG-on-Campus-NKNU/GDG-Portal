#!/usr/bin/env node
// filepath: /workspaces/GDG-Portal/scripts/init-database.js

/**
 * 資料庫初始化腳本
 * 用於創建表格和插入樣本 Core Team 成員資料
 */

import { fileURLToPath } from 'url';
import path from 'path';

// 設定環境變數路徑
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 手動載入環境變數
import fs from 'fs';
const envPath = path.join(__dirname, '../server/.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  const envLines = envConfig.split('\n');
  envLines.forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  });
}

// 動態導入 Sequelize 和模型（確保在 server 目錄執行）
process.chdir(path.join(__dirname, '../server'));

const { Sequelize } = await import('sequelize');

// 創建 Sequelize 實例
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: false,
  },
});

// 定義模型
const { DataTypes } = Sequelize;

// CoreTeam 核心團隊成員模型
const CoreTeam = sequelize.define('CoreTeam', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  photo: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  department: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  year: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  skills: {
    type: DataTypes.JSON,
    allowNull: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  achievements: {
    type: DataTypes.JSON,
    allowNull: true
  },
  contact_email: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  social_links: {
    type: DataTypes.JSON,
    allowNull: true
  },
  additional_photos: {
    type: DataTypes.JSON,
    allowNull: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  position: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'core_team',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Categories 分類模型
const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('member', 'event', 'announcement'),
    allowNull: false
  },
  color: {
    type: DataTypes.STRING(7),
    defaultValue: '#3B82F6'
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'categories',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// CoreTeamCategories 關聯表模型
const CoreTeamCategory = sequelize.define('CoreTeamCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  core_team_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'core_team_categories',
  timestamps: false
});

/**
 * 樣本 Core Team 成員資料
 */
const sampleCoreTeamData = [
  {
    name: '顏榕嶙',
    title: 'Technical Education Lead',
    department: 'Technical Education',
    year: '2024',
    bio: 'Passionate about teaching and sharing knowledge in software development. Experienced in organizing technical workshops and educational programs.',
    skills: [
      'JavaScript',
      'Node.js',
      'React',
      'Python',
      'Workshop Design',
      'Technical Writing',
      'Public Speaking'
    ],
    achievements: [
      'Organized 15+ technical workshops',
      'Mentored 50+ students in programming',
      'Speaker at 5 technology conferences',
      'Published 20+ technical articles'
    ],
    contact_email: 'technical.education@gdg.dev',
    social_links: {
      linkedin: 'https://linkedin.com/in/technical-lead',
      github: 'https://github.com/technical-lead',
      twitter: 'https://twitter.com/technical_lead'
    },
    is_active: true,
    position: 1
  },
  {
    name: 'Jane Smith',
    title: 'Community Manager',
    department: 'Community Relations',
    year: '2024',
    bio: 'Dedicated to building and nurturing our developer community. Focused on creating inclusive spaces for learning and collaboration.',
    skills: [
      'Community Building',
      'Event Management',
      'Social Media',
      'Partnership Development',
      'Content Creation'
    ],
    achievements: [
      'Grew community to 1000+ members',
      'Organized 30+ community events',
      'Established partnerships with 10+ tech companies',
      'Launched mentorship program'
    ],
    contact_email: 'community@gdg.dev',
    social_links: {
      linkedin: 'https://linkedin.com/in/community-manager',
      twitter: 'https://twitter.com/community_mgr'
    },
    is_active: true,
    position: 2
  },
  {
    name: 'Alex Johnson',
    title: 'Development Lead',
    department: 'Engineering',
    year: '2024',
    bio: 'Full-stack developer with expertise in modern web technologies. Leads technical initiatives and code reviews for GDG projects.',
    skills: [
      'Full-stack Development',
      'System Architecture',
      'Database Design',
      'DevOps',
      'Code Review',
      'Team Leadership'
    ],
    achievements: [
      'Led development of 5+ open source projects',
      'Contributed to Google Developer libraries',
      'Optimized system performance by 40%',
      'Mentored junior developers'
    ],
    contact_email: 'development@gdg.dev',
    social_links: {
      github: 'https://github.com/dev-lead',
      linkedin: 'https://linkedin.com/in/dev-lead'
    },
    is_active: true,
    position: 3
  }
];

/**
 * 樣本分類資料
 */
const sampleCategories = [
  {
    name: 'Technical Education',
    type: 'member',
    color: '#4F46E5',
    is_active: true
  },
  {
    name: 'Community Relations',
    type: 'member',
    color: '#059669',
    is_active: true
  },
  {
    name: 'Engineering',
    type: 'member',
    color: '#DC2626',
    is_active: true
  },
  {
    name: 'Design',
    type: 'member',
    color: '#7C3AED',
    is_active: true
  },
  {
    name: 'Marketing',
    type: 'member',
    color: '#EA580C',
    is_active: true
  }
];

/**
 * 初始化資料庫
 */
async function initializeDatabase() {
  try {
    console.log('🚀 Starting database initialization...');
    
    // 1. 測試資料庫連接
    console.log('📡 Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    // 2. 同步模型（創建表格）
    console.log('🔄 Synchronizing database models...');
    await sequelize.sync({ alter: true });
    console.log('✅ Database models synchronized successfully.');
    
    // 3. 插入分類資料
    console.log('📋 Inserting category data...');
    for (const categoryData of sampleCategories) {
      const [category, created] = await Category.findOrCreate({
        where: { name: categoryData.name, type: categoryData.type },
        defaults: categoryData
      });
      
      if (created) {
        console.log(`  ✅ Created category: ${category.name}`);
      } else {
        console.log(`  ℹ️  Category already exists: ${category.name}`);
      }
    }
    
    // 4. 插入 Core Team 成員資料
    console.log('👥 Inserting Core Team member data...');
    for (const memberData of sampleCoreTeamData) {
      const [member, created] = await CoreTeam.findOrCreate({
        where: { name: memberData.name },
        defaults: memberData
      });
      
      if (created) {
        console.log(`  ✅ Created Core Team member: ${member.name} (${member.title})`);
        
        // 5. 建立成員與分類的關聯
        const category = await Category.findOne({
          where: { name: memberData.department, type: 'member' }
        });
        
        if (category) {
          await CoreTeamCategory.findOrCreate({
            where: {
              core_team_id: member.id,
              category_id: category.id
            }
          });
          console.log(`    🔗 Linked ${member.name} to ${category.name} category`);
        }
      } else {
        console.log(`  ℹ️  Core Team member already exists: ${member.name}`);
      }
    }
    
    // 6. 顯示結果統計
    const totalMembers = await CoreTeam.count();
    const totalCategories = await Category.count({ where: { type: 'member' } });
    const totalLinks = await CoreTeamCategory.count();
    
    console.log('\n📊 Database initialization completed!');
    console.log(`   👥 Total Core Team members: ${totalMembers}`);
    console.log(`   📋 Total member categories: ${totalCategories}`);
    console.log(`   🔗 Total member-category links: ${totalLinks}`);
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
    console.log('🔌 Database connection closed.');
  }
}

/**
 * 清空資料庫（僅用於開發環境）
 */
async function clearDatabase() {
  try {
    console.log('⚠️  Clearing database...');
    
    await CoreTeamCategory.destroy({ where: {} });
    await CoreTeam.destroy({ where: {} });
    await Category.destroy({ where: {} });
    
    console.log('✅ Database cleared successfully.');
  } catch (error) {
    console.error('❌ Failed to clear database:', error);
    throw error;
  }
}

/**
 * 主執行函數
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--clear')) {
    await clearDatabase();
  }
  
  await initializeDatabase();
}

// 如果直接執行此腳本
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('💥 Script execution failed:', error);
    process.exit(1);
  });
}

export { initializeDatabase, clearDatabase, sampleCoreTeamData, sampleCategories };

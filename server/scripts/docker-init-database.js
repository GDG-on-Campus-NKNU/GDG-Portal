#!/usr/bin/env node
/**
 * Docker 環境專用的資料庫初始化腳本
 * 簡化版本，專為容器環境設計
 */

import { Sequelize, DataTypes } from 'sequelize';

// 從環境變數讀取資料庫配置
const sequelize = new Sequelize(
  process.env.DB_NAME || 'gdg_portal',
  process.env.DB_USER || 'gdg_admin',
  process.env.DB_PASSWORD || 'gdg_admin_password_2024',
  {
    host: process.env.DB_HOST || 'mysql',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: true,
      underscored: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    },
  }
);

// 定義模型
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
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  full_bio: {
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
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'core_team',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

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

const CoreTeamCategory = sequelize.define('CoreTeamCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  member_id: {
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
 * 樣本資料 - 只保留顏榕嶙
 */
const sampleCoreTeamData = [
  {
    name: '顏榕嶙',
    title: 'Technical Education Lead',
    photo: '/assets/members/yen_profile.png',
    department: '軟體工程與管理學系',
    year: '大三',
    description: 'Technical Education Lead - 負責技術教育規劃、工作坊設計與技術分享活動推廣',
    full_bio: '技術教育專家，致力於推廣現代 Web 開發技術與最佳實踐。擁有豐富的前端框架經驗，特別專精於 React 和 Vue.js 開發。熱衷於教學分享，希望能透過技術傳授幫助更多同學成長。',
    skills: [
      'JavaScript',
      'TypeScript',
      'Node.js',
      'React',
      'Vue.js',
      'Python',
      'Workshop Design',
      'Technical Writing',
      'Public Speaking'
    ],
    achievements: [
      '組織 15+ 場技術工作坊',
      '指導 50+ 位學生程式設計',
      '在 5 場技術研討會擔任講者',
      '發表 20+ 篇技術文章',
      '建立校園技術學習社群',
      '推動開源專案參與文化'
    ],
    contact_email: 'technical.education@gdg.nknu.edu.tw',
    social_links: {
      linkedin: 'https://linkedin.com/in/yen-jung-lin',
      github: 'https://github.com/yen-jung-lin',
      twitter: 'https://twitter.com/yen_jung_lin',
      facebook: 'https://facebook.com/yen.jung.lin'
    },
    additional_photos: [
      '/assets/members/yen_workshop_1.jpg',
      '/assets/members/yen_workshop_2.jpg',
      '/assets/members/yen_team_photo.jpg'
    ],
    is_active: true,
    sort_order: 1
  }
];

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
  }
];

/**
 * 初始化資料庫
 */
async function initializeDatabase() {
  try {
    console.log('🚀 Starting database initialization for Docker...');

    // 測試資料庫連接
    console.log('📡 Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // 同步模型
    console.log('🔄 Synchronizing database models...');
    await sequelize.sync({ alter: true });
    console.log('✅ Database models synchronized successfully.');

    // 插入分類資料
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

    // 插入 Core Team 成員資料
    console.log('👥 Inserting Core Team member data...');
    for (const memberData of sampleCoreTeamData) {
      const [member, created] = await CoreTeam.findOrCreate({
        where: { name: memberData.name },
        defaults: memberData
      });

      if (created) {
        console.log(`  ✅ Created Core Team member: ${member.name} (${member.title})`);

        // 建立成員與分類的關聯
        const category = await Category.findOne({
          where: { name: 'Technical Education', type: 'member' }
        });

        if (category) {
          await CoreTeamCategory.findOrCreate({
            where: {
              member_id: member.id,
              category_id: category.id
            }
          });
          console.log(`    🔗 Linked ${member.name} to ${category.name} category`);
        }
      } else {
        console.log(`  ℹ️  Core Team member already exists: ${member.name}`);
      }
    }

    // 顯示結果統計
    const totalMembers = await CoreTeam.count();
    const totalCategories = await Category.count({ where: { type: 'member' } });
    const totalLinks = await CoreTeamCategory.count();

    console.log('\n📊 Database initialization completed!');
    console.log(`   👥 Total Core Team members: ${totalMembers}`);
    console.log(`   📋 Total member categories: ${totalCategories}`);
    console.log(`   🔗 Total member-category links: ${totalLinks}`);

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  } finally {
    await sequelize.close();
    console.log('🔌 Database connection closed.');
  }
}

// 執行初始化
if (process.argv.includes('--clear')) {
  console.log('⚠️  Clear flag detected, but not implemented in Docker version');
}

// 導出初始化函數以供其他模組使用
export default initializeDatabase;

// 如果直接執行此腳本
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeDatabase()
    .then(() => {
      console.log('✅ Docker database initialization completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Docker database initialization failed:', error);
      process.exit(1);
    });
}

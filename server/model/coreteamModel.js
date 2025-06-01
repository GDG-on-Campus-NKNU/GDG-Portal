import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

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

export { CoreTeam, Category, CoreTeamCategory };

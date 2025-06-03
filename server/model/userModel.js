import { DataTypes, Op } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  google_id: {
    type: DataTypes.STRING(255),
    allowNull: true,
    // 不使用單獨的 unique 索引，後續通過聯合索引處理
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true
    }
    // 不使用單獨的 unique 索引，後續通過聯合索引處理
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false // 密碼為必填，Google 登入在綁定時也需要設定密碼
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  avatar_url: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  role: {
    type: DataTypes.ENUM('admin', 'core', 'member'),
    defaultValue: 'member'
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  email_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  refresh_token: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  last_login: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    // 為 email 和 google_id 分別添加索引，確保唯一性
    {
      unique: true,
      fields: ['email'],
      // 僅當 email 不為 null 時添加 unique 約束
      where: {
        email: {
          [Op.ne]: null
        }
      }
    },
    {
      unique: true,
      fields: ['google_id'],
      // 僅當 google_id 不為 null 時添加 unique 約束
      where: {
        google_id: {
          [Op.ne]: null
        }
      }
    }
  ]
});

export default User;

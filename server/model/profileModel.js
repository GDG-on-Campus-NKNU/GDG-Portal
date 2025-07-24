import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  banner_url: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '個人頁面橫幅圖片URL'
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  company: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  website: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isValidUrl: function(value) {
        if (value && value.trim() !== '') {
          // 只有當值存在且不為空時才驗證 URL
          const urlPattern = /^https?:\/\/.+/;
          if (!urlPattern.test(value)) {
            throw new Error('網站必須是有效的 URL（需包含 http:// 或 https://）');
          }
        }
      }
    }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  linkedin_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isValidUrl: function(value) {
        if (value && value.trim() !== '') {
          // 只有當值存在且不為空時才驗證 URL
          const urlPattern = /^https?:\/\/.+/;
          if (!urlPattern.test(value)) {
            throw new Error('LinkedIn URL 必須是有效的 URL（需包含 http:// 或 https://）');
          }
        }
      }
    }
  },
  github_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isValidUrl: function(value) {
        if (value && value.trim() !== '') {
          // 只有當值存在且不為空時才驗證 URL
          const urlPattern = /^https?:\/\/.+/;
          if (!urlPattern.test(value)) {
            throw new Error('GitHub URL 必須是有效的 URL（需包含 http:// 或 https://）');
          }
        }
      }
    }
  },
  twitter_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isValidUrl: function(value) {
        if (value && value.trim() !== '') {
          // 只有當值存在且不為空時才驗證 URL
          const urlPattern = /^https?:\/\/.+/;
          if (!urlPattern.test(value)) {
            throw new Error('Twitter URL 必須是有效的 URL（需包含 http:// 或 https://）');
          }
        }
      }
    }
  },
  skills: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  interests: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  education: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  experience: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  }
}, {
  tableName: 'profiles',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Profile;

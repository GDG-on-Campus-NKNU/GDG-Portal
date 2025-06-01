import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Announcement 公告模型
const Announcement = sequelize.define('Announcement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  excerpt: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  coverImage: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  isPinned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  viewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('draft', 'published', 'archived'),
    defaultValue: 'draft'
  },
  publishedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'announcements',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// AnnouncementTag 公告標籤模型
const AnnouncementTag = sequelize.define('AnnouncementTag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  announcementId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'announcements',
      key: 'id'
    }
  },
  tagName: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'announcement_tags',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['announcementId', 'tagName']
    }
  ]
});

// 定義關聯
Announcement.hasMany(AnnouncementTag, { 
  foreignKey: 'announcementId',
  as: 'tags',
  onDelete: 'CASCADE'
});

AnnouncementTag.belongsTo(Announcement, { foreignKey: 'announcementId' });

export default Announcement;
export { AnnouncementTag };


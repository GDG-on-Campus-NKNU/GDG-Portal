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
  cover_image: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  is_pinned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  view_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('draft', 'published', 'archived'),
    defaultValue: 'draft'
  },
  published_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'announcements',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// AnnouncementTag 公告標籤關聯表
const AnnouncementTag = sequelize.define('AnnouncementTag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  announcement_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'announcements',
      key: 'id'
    }
  },
  tag_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'announcement_tags',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['announcement_id', 'tag_name']
    }
  ]
});

// 定義關聯
Announcement.hasMany(AnnouncementTag, { 
  foreignKey: 'announcement_id',
  as: 'tags',
  onDelete: 'CASCADE'
});

AnnouncementTag.belongsTo(Announcement, { foreignKey: 'announcement_id' });

export { Announcement, AnnouncementTag };


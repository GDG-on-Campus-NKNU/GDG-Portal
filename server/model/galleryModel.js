import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Gallery 模型 - 活動照片集
const Gallery = sequelize.define('Gallery', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '照片集標題'
  },
  description: {
    type: DataTypes.TEXT,
    comment: '照片集描述'
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '關聯的活動ID'
  },
  cover_image: {
    type: DataTypes.STRING(500),
    allowNull: false,
    comment: '封面圖片URL'
  },
  photos: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
    comment: '照片列表，包含URL、描述等資訊'
  },
  photographer: {
    type: DataTypes.STRING(100),
    comment: '攝影師'
  },
  photo_date: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: '拍攝日期'
  },
  is_published: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: '是否發布'
  },
  view_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '瀏覽次數'
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '創建者ID'
  }
}, {
  tableName: 'galleries',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});

export default Gallery;

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Gallery 模型 - 活動照片集
const Gallery = sequelize.define('Gallery', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '關聯的活動ID'
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: '照片集標題'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '照片集描述'
  },
  cover_image: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '封面圖片URL'
  },
  images: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: '照片列表，包含URL、描述等資訊'
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: '標籤列表'
  },
  photographer: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: '攝影師'
  },
  date_taken: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    comment: '拍攝日期'
  },
  view_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '瀏覽次數'
  },
  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: '是否為精選'
  }
}, {
  tableName: 'gallery',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});

export default Gallery;

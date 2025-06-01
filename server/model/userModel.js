import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  google_id: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
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
  }
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default User;

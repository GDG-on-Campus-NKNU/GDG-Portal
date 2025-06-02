import User from './userModel.js';
import Profile from './profileModel.js';

// 建立 User 和 Profile 之間的關聯
// User 有一個 Profile (1:1 關係)
User.hasOne(Profile, {
  foreignKey: 'user_id',
  as: 'profile',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Profile 屬於一個 User
Profile.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

export { User, Profile };

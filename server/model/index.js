import sequelize from '../config/database.js';
import User from './userModel.js';
import Profile from './profileModel.js';
import { CoreTeam, Category, CoreTeamCategory } from './coreteamModel.js';
import { Event, EventSpeaker, EventTag, EventRegistration } from './eventModel.js';
import { Announcement, AnnouncementTag } from './announcementModel.js';
import Gallery from './galleryModel.js';

// 導入關聯定義 - 這會建立 User-Profile 關聯
import './associations.js';

// 定義模型關聯
const defineAssociations = () => {
  // User 和 CoreTeam 的關聯
  User.hasOne(CoreTeam, {
    foreignKey: 'user_id',
    as: 'coreTeam', // 修改別名，避免與其他關聯衝突
    onDelete: 'SET NULL', // 使用者被刪除時，保留 CoreTeam 記錄但清除關聯
    onUpdate: 'CASCADE'
  });

  CoreTeam.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });

  // CoreTeam 和 Category 的多對多關聯
  CoreTeam.belongsToMany(Category, {
    through: CoreTeamCategory,
    foreignKey: 'member_id',
    otherKey: 'category_id',
    as: 'categories'
  });

  Category.belongsToMany(CoreTeam, {
    through: CoreTeamCategory,
    foreignKey: 'category_id',
    otherKey: 'member_id',
    as: 'members'
  });

  // Event 關聯
  Event.hasMany(EventSpeaker, {
    foreignKey: 'event_id',
    as: 'speakers',
    onDelete: 'CASCADE'
  });

  EventSpeaker.belongsTo(Event, {
    foreignKey: 'event_id',
    as: 'event'
  });

  Event.hasMany(EventTag, {
    foreignKey: 'event_id',
    as: 'eventTags',
    onDelete: 'CASCADE'
  });

  EventTag.belongsTo(Event, {
    foreignKey: 'event_id',
    as: 'event'
  });

  Event.hasMany(EventRegistration, {
    foreignKey: 'event_id',
    as: 'registrations',
    onDelete: 'CASCADE'
  });

  EventRegistration.belongsTo(Event, {
    foreignKey: 'event_id',
    as: 'event'
  });

  EventRegistration.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
  });

  // Announcement 關聯 - 移除錯誤的 belongsToMany 關聯
  // 實際關聯已經在 announcementModel.js 中定義
  // Announcement.hasMany(AnnouncementTag, { foreignKey: 'announcement_id', as: 'tags' })

  // Gallery 關聯
  Gallery.belongsTo(Event, {
    foreignKey: 'event_id',
    as: 'event'
  });

  Event.hasMany(Gallery, {
    foreignKey: 'event_id',
    as: 'galleries'
  });

  Gallery.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'creator'
  });

  // User 關聯 (合併到一起避免重複)
  User.hasMany(EventRegistration, {
    foreignKey: 'user_id',
    as: 'registrations'
  });

  User.hasMany(Gallery, {
    foreignKey: 'created_by',
    as: 'createdGalleries'  // 改變別名避免衝突
  });
};

// 初始化資料庫
const initializeDatabase = async () => {
  try {
    // 先驗證連接
    await sequelize.authenticate();
    console.log('資料庫連接成功');

    // 先同步 User 模型，確保基本表格結構正確
    await User.sync({ force: false });
    console.log('User 模型同步完成');

    // 定義關聯
    defineAssociations();

    // 同步模型（開發環境）
    if (process.env.NODE_ENV === 'development') {
      // 避免索引過多問題，改用單純 sync 而非 alter
      await sequelize.sync({ force: false });
      console.log('資料庫模型同步完成');
    }

    return true;
  } catch (error) {
    console.error('資料庫初始化失敗:', error);
    throw error;
  }
};

// 匯出所有模型和初始化函數
export {
  sequelize,
  User,
  Profile,
  CoreTeam,
  Category,
  CoreTeamCategory,
  Event,
  EventSpeaker,
  EventTag,
  EventRegistration,
  Announcement,
  AnnouncementTag,
  Gallery,
  initializeDatabase
};

import sequelize from '../config/database.js';
import User from './userModel.js';
import { CoreTeam, Category, CoreTeamCategory } from './coreteamModel.js';
import { Event, EventSpeaker, EventTag, EventRegistration } from './eventModel.js';
import { Announcement, AnnouncementTag } from './announcementModel.js';
import Gallery from './galleryModel.js';

// 定義模型關聯
const defineAssociations = () => {
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

  Event.belongsToMany(EventTag, { 
    through: 'event_tag_relationships',
    foreignKey: 'event_id',
    otherKey: 'tag_id',
    as: 'tags'
  });
  
  EventTag.belongsToMany(Event, { 
    through: 'event_tag_relationships',
    foreignKey: 'tag_id',
    otherKey: 'event_id',
    as: 'events'
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

  // Announcement 關聯
  Announcement.belongsToMany(AnnouncementTag, { 
    through: 'announcement_tag_relationships',
    foreignKey: 'announcement_id',
    otherKey: 'tag_id',
    as: 'tags'
  });
  
  AnnouncementTag.belongsToMany(Announcement, { 
    through: 'announcement_tag_relationships',
    foreignKey: 'tag_id',
    otherKey: 'announcement_id',
    as: 'announcements'
  });

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

  // User 關聯
  User.hasMany(EventRegistration, { 
    foreignKey: 'user_id',
    as: 'registrations'
  });

  User.hasMany(Gallery, { 
    foreignKey: 'created_by',
    as: 'galleries'
  });
};

// 初始化資料庫
const initializeDatabase = async () => {
  try {
    // 定義關聯
    defineAssociations();
    
    // 驗證連接
    await sequelize.authenticate();
    console.log('資料庫連接成功');
    
    // 同步模型（開發環境）
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
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

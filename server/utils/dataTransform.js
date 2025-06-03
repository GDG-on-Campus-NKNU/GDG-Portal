// 轉換 CoreTeam 資料格式以匹配前端期望
function transformCoreTeamMember(member) {
  if (!member) return null;

  const memberData = member.get ? member.get({ plain: true }) : member;

  return {
    // 基本資訊
    id: memberData.id,
    userId: memberData.user_id, // 添加 user_id 欄位
    name: memberData.name,
    title: memberData.title,
    photo: memberData.photo,
    department: memberData.department,
    year: memberData.year,

    // 前端期望的欄位名稱
    description: memberData.description, // 職務介紹
    fullBio: memberData.full_bio, // 個人自我介紹
    contactEmail: memberData.contact_email, // snake_case -> camelCase
    socialLinks: memberData.social_links || {},
    additionalPhotos: memberData.additional_photos || [],

    // JSON 欄位
    skills: memberData.skills || [],
    achievements: memberData.achievements || [],

    // 狀態
    isActive: memberData.is_active,
    sortOrder: memberData.sort_order, // position -> sortOrder

    // 分類 (如果有關聯)
    categories: memberData.Categories ? memberData.Categories.map(cat => cat.name) : [],

    // 關聯的使用者資料 (如果有)
    user: memberData.user ? {
      id: memberData.user.id,
      name: memberData.user.name,
      email: memberData.user.email,
      avatarUrl: memberData.user.avatar_url
    } : null,

    // 時間戳
    createdAt: memberData.created_at,
    updatedAt: memberData.updated_at
  };
};

// 轉換 Event 資料格式
function transformEvent(event) {
  if (!event) return null;

  const eventData = event.get ? event.get({ plain: true }) : event;

  return {
    id: eventData.id,
    title: eventData.title,
    description: eventData.description,
    excerpt: eventData.excerpt,
    date: eventData.start_date,        // start_date 改名
    endDate: eventData.end_date,       // snake_case -> camelCase
    location: eventData.location,
    coverImage: eventData.cover_image,
    registrationUrl: eventData.registration_url,
    maxAttendees: eventData.max_attendees,
    currentAttendees: eventData.current_attendees,
    status: eventData.status,
    isFeatured: eventData.is_featured,
    createdBy: eventData.created_by,

    // 關聯資料
    speakers: eventData.speakers || [],
    tags: eventData.eventTags ? eventData.eventTags.map(tag => tag.tag_name) : [], // 使用正確的欄位名稱
    registrations: eventData.registrations || [],

    // 時間戳
    createdAt: eventData.created_at,
    updatedAt: eventData.updated_at
  };
};

// 轉換 Announcement 資料格式
function transformAnnouncement(announcement) {
  if (!announcement) return null;

  const announcementData = announcement.get ? announcement.get({ plain: true }) : announcement;

  return {
    id: announcementData.id,
    title: announcementData.title,
    content: announcementData.content,
    excerpt: announcementData.excerpt,
    coverImage: announcementData.cover_image,
    authorId: announcementData.author_id,
    isPinned: announcementData.is_pinned,
    viewCount: announcementData.view_count,
    status: announcementData.status,
    publishedAt: announcementData.published_at,

    // 前端期望的 date 欄位
    date: announcementData.published_at || announcementData.created_at,

    // 關聯資料
    tags: announcementData.tags ? announcementData.tags.map(tag => tag.tag_name || tag.name) : [],

    // 時間戳
    createdAt: announcementData.created_at,
    updatedAt: announcementData.updated_at
  };
};

// 轉換 Gallery 資料格式
function transformGallery(gallery) {
  const galleryData = gallery.get ? gallery.get({ plain: true }) : gallery;

  // 將images字串陣列轉換為物件陣列
  const processedImages = Array.isArray(galleryData.images)
    ? galleryData.images.map((imageUrl, index) => ({
        id: `${galleryData.id}_${index + 1}`,
        url: imageUrl,
        caption: `圖片 ${index + 1}`,
        alt: `${galleryData.title} - 圖片 ${index + 1}`
      }))
    : [];

  // 從tags推導eventType
  const tags = galleryData.tags || [];
  let eventType = 'other';
  if (tags.includes('workshop')) eventType = 'workshop';
  else if (tags.includes('lecture') || tags.includes('talk')) eventType = 'talk';
  else if (tags.includes('community') || tags.includes('team-building')) eventType = 'social';
  else if (tags.includes('hackathon')) eventType = 'hackathon';

  return {
    id: galleryData.id,
    title: galleryData.title,
    description: galleryData.description,
    coverImage: galleryData.cover_image,
    images: processedImages, // 使用處理過的圖片結構
    imageCount: processedImages.length, // 前端期望的欄位名
    photoCount: processedImages.length, // 保持向後相容
    tags: tags,
    photographer: galleryData.photographer,
    date: galleryData.date_taken, // 前端期望的欄位名
    dateTaken: galleryData.date_taken, // 保持向後相容
    isFeatured: galleryData.is_featured,
    eventId: galleryData.event_id,
    eventType: eventType, // 新增前端期望的欄位
    event: galleryData.event ? {
      id: galleryData.event.id,
      title: galleryData.event.title,
      type: galleryData.event.event_type || eventType
    } : null,
    createdAt: galleryData.created_at,
    updatedAt: galleryData.updated_at
  };
};

// 轉換 User 資料格式
function transformUser(user) {
  if (!user) return null;

  const userData = user.get ? user.get({ plain: true }) : user;

  // 取 profile 物件
  const profile = userData.profile || {};

  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
    // 優先取 profile.avatarUrl，否則取 user.avatar_url
    avatarUrl: profile.avatarUrl || profile.avatar_url || userData.avatar_url || null,
    googleId: userData.google_id,
    isActive: userData.is_active,
    emailVerified: userData.email_verified,
    lastLogin: userData.last_login,

    // Profile 資料 (優先取 profile，否則取 userData)
    bio: profile.bio || userData.bio || null,
    bannerUrl: profile.bannerUrl || profile.banner_url || userData.banner_url || null,
    location: profile.location || userData.location || null,
    company: profile.company || userData.company || null,
    website: profile.website || userData.website || null,
    phone: profile.phone || userData.phone || null,
    linkedinUrl: profile.linkedinUrl || profile.linkedin_url || userData.linkedin_url || null,
    githubUrl: profile.githubUrl || profile.github_url || userData.github_url || null,
    twitterUrl: profile.twitterUrl || profile.twitter_url || userData.twitter_url || null,
    skills: profile.skills || userData.skills || [],
    interests: profile.interests || userData.interests || [],
    education: profile.education || userData.education || [],
    experience: profile.experience || userData.experience || [],

    // 時間戳
    createdAt: userData.created_at,
    updatedAt: userData.updated_at,
    profileCreatedAt: profile.created_at || null,
    profileUpdatedAt: profile.updated_at || null,
  };
}

// 匯出所有轉換函式
export {
  transformCoreTeamMember,
  transformEvent,
  transformAnnouncement,
  transformGallery,
  transformUser
};

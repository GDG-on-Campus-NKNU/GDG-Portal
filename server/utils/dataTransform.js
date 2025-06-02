// 轉換 CoreTeam 資料格式以匹配前端期望
export const transformCoreTeamMember = (member) => {
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
export const transformEvent = (event) => {
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
    tags: eventData.eventTags ? eventData.eventTags.map(tag => tag.name) : 
          eventData.tags ? eventData.tags.map(tag => tag.name) : [], // 支援兩種別名
    registrations: eventData.registrations || [],
    
    // 時間戳
    createdAt: eventData.created_at,
    updatedAt: eventData.updated_at
  };
};

// 轉換 Announcement 資料格式
export const transformAnnouncement = (announcement) => {
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
export const transformGallery = (gallery) => {
  if (!gallery) return null;

  const galleryData = gallery.get ? gallery.get({ plain: true }) : gallery;

  return {
    id: galleryData.id,
    title: galleryData.title,
    description: galleryData.description,
    eventId: galleryData.event_id,
    coverImage: galleryData.cover_image,
    images: galleryData.photos || galleryData.images || [], // 支援兩種欄位名稱
    tags: galleryData.tags || [],               
    photographer: galleryData.photographer,
    dateTaken: galleryData.photo_date || galleryData.date_taken, // 支援兩種欄位名稱
    isFeatured: galleryData.is_published || galleryData.is_featured, // 支援兩種欄位名稱
    viewCount: galleryData.view_count,
    
    // 關聯資料
    event: galleryData.event,
    
    // 時間戳
    createdAt: galleryData.created_at,
    updatedAt: galleryData.updated_at
  };
};

// 轉換 User 資料格式
export const transformUser = (user) => {
  if (!user) return null;

  const userData = user.get ? user.get({ plain: true }) : user;

  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
    avatarUrl: userData.avatar_url,        // snake_case -> camelCase
    googleId: userData.google_id,          // snake_case -> camelCase
    isActive: userData.is_active,          // snake_case -> camelCase
    emailVerified: userData.email_verified, // snake_case -> camelCase
    lastLogin: userData.last_login,        // snake_case -> camelCase
    
    // Profile 資料 (如果存在)
    bio: userData.profile?.bio || null,
    location: userData.profile?.location || null,
    company: userData.profile?.company || null,
    website: userData.profile?.website || null,
    phone: userData.profile?.phone || null,
    linkedinUrl: userData.profile?.linkedin_url || null,
    githubUrl: userData.profile?.github_url || null,
    twitterUrl: userData.profile?.twitter_url || null,
    skills: userData.profile?.skills || [],
    interests: userData.profile?.interests || [],
    education: userData.profile?.education || [],
    experience: userData.profile?.experience || [],
    
    // 時間戳
    createdAt: userData.created_at,
    updatedAt: userData.updated_at,
    
    // Profile 時間戳 (如果存在)
    profileCreatedAt: userData.profile?.created_at || null,
    profileUpdatedAt: userData.profile?.updated_at || null,
    
    // 隱藏敏感資訊
    // password 和 refresh_token 不應該回傳到前端
  };
};

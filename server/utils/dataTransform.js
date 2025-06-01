
// 轉換 CoreTeam 資料格式以匹配前端期望
export const transformCoreTeamMember = (member) => {
  if (!member) return null;

  const memberData = member.get ? member.get({ plain: true }) : member;

  return {
    // 基本資訊
    id: memberData.id,
    name: memberData.name,
    title: memberData.title,
    photo: memberData.photo,
    department: memberData.department,
    year: memberData.year,
    
    // 前端期望的欄位名稱
    description: memberData.bio, // bio -> description
    fullBio: memberData.bio,
    contactEmail: memberData.contact_email, // snake_case -> camelCase
    socialLinks: memberData.social_links || {},
    additionalPhotos: memberData.additional_photos || [],
    
    // JSON 欄位
    skills: memberData.skills || [],
    achievements: memberData.achievements || [],
    
    // 狀態
    isActive: memberData.is_active,
    position: memberData.position,
    
    // 分類 (如果有關聯)
    categories: memberData.Categories ? memberData.Categories.map(cat => cat.name) : [],
    
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
    date: eventData.date,
    endDate: eventData.end_date, // snake_case -> camelCase
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
    tags: eventData.tags ? eventData.tags.map(tag => tag.name) : [],
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
    
    // 關聯資料
    tags: announcementData.tags ? announcementData.tags.map(tag => tag.name) : [],
    
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
    photos: galleryData.photos || [],
    photographer: galleryData.photographer,
    photoDate: galleryData.photo_date,
    isPublished: galleryData.is_published,
    viewCount: galleryData.view_count,
    createdBy: galleryData.created_by,
    
    // 關聯資料
    event: galleryData.event,
    
    // 時間戳
    createdAt: galleryData.created_at,
    updatedAt: galleryData.updated_at
  };
};

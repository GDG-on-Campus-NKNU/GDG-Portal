import { body, validationResult } from 'express-validator';

// 統一的驗證錯誤處理中間件
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: '輸入資料驗證失敗',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

// 使用者註冊驗證
export const validateUserRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('姓名長度必須在 2-50 個字元之間')
    .notEmpty()
    .withMessage('姓名為必填欄位'),

  body('email')
    .isEmail()
    .withMessage('請輸入有效的電子郵件地址')
    .normalizeEmail()
    .notEmpty()
    .withMessage('電子郵件為必填欄位'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('密碼長度至少需要 8 個字元')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('密碼必須包含至少一個大寫字母、一個小寫字母和一個數字'),

  handleValidationErrors
];

// 使用者登入驗證
export const validateUserLogin = [
  body('email')
    .isEmail()
    .withMessage('請輸入有效的電子郵件地址')
    .normalizeEmail()
    .notEmpty()
    .withMessage('電子郵件為必填欄位'),

  body('password')
    .notEmpty()
    .withMessage('密碼為必填欄位'),

  handleValidationErrors
];

// 修改密碼驗證
export const validatePasswordChange = [
  body('currentPassword')
    .notEmpty()
    .withMessage('目前密碼為必填欄位'),

  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('新密碼長度至少需要 8 個字元')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('新密碼必須包含至少一個大寫字母、一個小寫字母和一個數字'),

  handleValidationErrors
];

// 更新個人資料驗證
export const validateProfileUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('姓名長度必須在 2-50 個字元之間'),

  body('avatarUrl')
    .optional()
    .custom(value => {
      // 檢查是否為 base64 圖片
      const isBase64 = typeof value === 'string' && value.startsWith('data:image/');
      // 檢查是否為合法 URL
      const isUrl = /^https?:\/\/|^\/\//.test(value);
      if (!isBase64 && !isUrl) {
        throw new Error('請輸入有效的頭像網址或 base64 圖片');
      }
      return true;
    })
    .withMessage('請輸入有效的頭像網址'),

  handleValidationErrors
];

// 活動創建驗證
export const validateEvent = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('活動標題長度必須在 3-200 個字元之間')
    .notEmpty()
    .withMessage('活動標題為必填欄位'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('活動描述長度不能超過 5000 個字元'),

  body('excerpt')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('活動摘要長度不能超過 500 個字元'),

  body('date')
    .isISO8601()
    .withMessage('請輸入有效的日期格式')
    .notEmpty()
    .withMessage('活動日期為必填欄位'),

  body('end_date')
    .optional()
    .isISO8601()
    .withMessage('請輸入有效的結束日期格式'),

  body('location')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('活動地點長度不能超過 200 個字元'),

  body('max_attendees')
    .optional()
    .isInt({ min: 1 })
    .withMessage('最大參與人數必須是正整數'),

  body('registration_url')
    .optional()
    .isURL()
    .withMessage('請輸入有效的報名網址'),

  handleValidationErrors
];

// 活動更新驗證 (所有欄位都是可選的)
export const validateEventUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('活動標題長度必須在 3-200 個字元之間'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('活動描述長度不能超過 5000 個字元'),

  body('excerpt')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('活動摘要長度不能超過 500 個字元'),

  body('date')
    .optional()
    .isISO8601()
    .withMessage('請輸入有效的日期格式'),

  body('end_date')
    .optional()
    .isISO8601()
    .withMessage('請輸入有效的結束日期格式'),

  body('location')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('活動地點長度不能超過 200 個字元'),

  body('max_attendees')
    .optional()
    .isInt({ min: 1 })
    .withMessage('最大參與人數必須是正整數'),

  body('registration_url')
    .optional()
    .isURL()
    .withMessage('請輸入有效的報名網址'),

  handleValidationErrors
];

// 公告創建驗證
export const validateAnnouncement = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('公告標題長度必須在 3-200 個字元之間')
    .notEmpty()
    .withMessage('公告標題為必填欄位'),

  body('content')
    .optional()
    .trim()
    .isLength({ max: 10000 })
    .withMessage('公告內容長度不能超過 10000 個字元'),

  body('excerpt')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('公告摘要長度不能超過 500 個字元'),

  body('type')
    .optional()
    .isIn(['general', 'urgent', 'event', 'course', 'recruitment'])
    .withMessage('無效的公告類型'),

  body('is_pinned')
    .optional()
    .isBoolean()
    .withMessage('置頂狀態必須是布林值'),

  body('publish_date')
    .optional()
    .isISO8601()
    .withMessage('請輸入有效的發布日期格式'),

  handleValidationErrors
];

// 公告更新驗證 (所有欄位都是可選的)
export const validateAnnouncementUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('公告標題長度必須在 3-200 個字元之間'),

  body('content')
    .optional()
    .trim()
    .isLength({ max: 10000 })
    .withMessage('公告內容長度不能超過 10000 個字元'),

  body('excerpt')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('公告摘要長度不能超過 500 個字元'),

  body('type')
    .optional()
    .isIn(['general', 'urgent', 'event', 'course', 'recruitment'])
    .withMessage('無效的公告類型'),

  body('is_pinned')
    .optional()
    .isBoolean()
    .withMessage('置頂狀態必須是布林值'),

  body('publish_date')
    .optional()
    .isISO8601()
    .withMessage('請輸入有效的發布日期格式'),

  handleValidationErrors
];

// 核心成員創建驗證
export const validateCoreTeamMember = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('姓名長度必須在 2-100 個字元之間')
    .notEmpty()
    .withMessage('姓名為必填欄位'),

  body('title')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('職位標題長度不能超過 100 個字元'),

  body('bio')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('個人簡介長度不能超過 1000 個字元'),

  body('email')
    .optional()
    .isEmail()
    .withMessage('請輸入有效的電子郵件地址')
    .normalizeEmail(),

  body('avatar')
    .optional()
    .isURL()
    .withMessage('請輸入有效的頭像網址'),

  body('sort_order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('排序順序必須是非負整數'),

  handleValidationErrors
];

// 核心成員更新驗證 (所有欄位都是可選的)
export const validateCoreTeamMemberUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('姓名長度必須在 2-100 個字元之間'),

  body('title')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('職位標題長度不能超過 100 個字元'),

  body('bio')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('個人簡介長度不能超過 1000 個字元'),

  body('email')
    .optional()
    .isEmail()
    .withMessage('請輸入有效的電子郵件地址')
    .normalizeEmail(),

  body('avatar')
    .optional()
    .isURL()
    .withMessage('請輸入有效的頭像網址'),

  body('sort_order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('排序順序必須是非負整數'),

  handleValidationErrors
];

// 照片集創建驗證
export const validateGallery = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('照片集標題長度必須在 3-200 個字元之間')
    .notEmpty()
    .withMessage('照片集標題為必填欄位'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('照片集描述長度不能超過 1000 個字元'),

  body('event_date')
    .optional()
    .isISO8601()
    .withMessage('請輸入有效的活動日期格式'),

  body('location')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('活動地點長度不能超過 200 個字元'),

  body('is_featured')
    .optional()
    .isBoolean()
    .withMessage('精選狀態必須是布林值'),

  body('photos')
    .optional()
    .isArray()
    .withMessage('照片必須是陣列格式'),

  body('photos.*.url')
    .optional()
    .isURL()
    .withMessage('照片網址格式無效'),

  body('photos.*.caption')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('照片說明長度不能超過 200 個字元'),

  handleValidationErrors
];

// 照片集更新驗證 (所有欄位都是可選的)
export const validateGalleryUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('照片集標題長度必須在 3-200 個字元之間'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('照片集描述長度不能超過 1000 個字元'),

  body('event_date')
    .optional()
    .isISO8601()
    .withMessage('請輸入有效的活動日期格式'),

  body('location')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('活動地點長度不能超過 200 個字元'),

  body('is_featured')
    .optional()
    .isBoolean()
    .withMessage('精選狀態必須是布林值'),

  body('photos')
    .optional()
    .isArray()
    .withMessage('照片必須是陣列格式'),

  body('photos.*.url')
    .optional()
    .isURL()
    .withMessage('照片網址格式無效'),

  body('photos.*.caption')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('照片說明長度不能超過 200 個字元'),

  handleValidationErrors
];

// ID 參數驗證
export const validateId = [
  body('id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('ID 必須是正整數'),

  handleValidationErrors
];

// 分頁參數驗證
export const validatePagination = (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  if (isNaN(pageNum) || pageNum < 1) {
    return res.status(400).json({ message: '頁碼必須是正整數' });
  }

  if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
    return res.status(400).json({ message: '每頁數量必須在 1-100 之間' });
  }

  req.pagination = {
    page: pageNum,
    limit: limitNum,
    offset: (pageNum - 1) * limitNum
  };

  next();
};

// 搜尋參數驗證
export const validateSearch = (req, res, next) => {
  const { search } = req.query;

  if (search && typeof search !== 'string') {
    return res.status(400).json({ message: '搜尋關鍵字必須是字串' });
  }

  if (search && search.length > 100) {
    return res.status(400).json({ message: '搜尋關鍵字長度不能超過 100 個字元' });
  }

  next();
};

// 結合分頁和搜尋驗證的中間件
export const validatePaginationAndSearch = [validatePagination, validateSearch];

import announcementModel from '../model/announcementModel.js';

// 獲取所有公告
export const getAllAnnouncements = (req, res) => {
  try {
    const queryParams = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
      keyword: req.query.keyword || '',
      tags: req.query.tags ? req.query.tags.split(',') : [],
      isPinned: req.query.isPinned
    };

    const result = announcementModel.getAllAnnouncements(queryParams);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getAllAnnouncements:', error);
    res.status(500).json({ message: '發生錯誤', error: error.message });
  }
};

// 獲取置頂公告
export const getPinnedAnnouncements = (req, res) => {
  try {
    const queryParams = {
      page: 1,
      limit: parseInt(req.query.limit) || 5,
      isPinned: 'true'
    };

    const result = announcementModel.getAllAnnouncements(queryParams);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getPinnedAnnouncements:', error);
    res.status(500).json({ message: '發生錯誤', error: error.message });
  }
};

// 獲取單個公告
export const getAnnouncementById = (req, res) => {
  try {
    const announcementId = parseInt(req.params.id);
    const announcement = announcementModel.getAnnouncementById(announcementId);

    if (!announcement) {
      return res.status(404).json({ message: '找不到此公告' });
    }

    res.status(200).json(announcement);
  } catch (error) {
    console.error('Error in getAnnouncementById:', error);
    res.status(500).json({ message: '發生錯誤', error: error.message });
  }
};

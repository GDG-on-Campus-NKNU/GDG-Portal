import { Announcement, AnnouncementTag } from '../model/announcementModel.js';
import { Op } from 'sequelize';

// 獲取所有公告
export const getAllAnnouncements = async (req, res) => {
  try {
    const queryParams = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
      keyword: req.query.keyword || '',
      tags: req.query.tags ? req.query.tags.split(',') : [],
      isPinned: req.query.isPinned
    };

    // 構建查詢條件
    const whereClause = {};
    const includeClause = [{
      model: AnnouncementTag,
      as: 'tags'
    }];

    // 關鍵字搜尋
    if (queryParams.keyword) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${queryParams.keyword}%` } },
        { content: { [Op.like]: `%${queryParams.keyword}%` } }
      ];
    }

    // 置頂篩選
    if (queryParams.isPinned === 'true') {
      whereClause.is_pinned = true;
    } else if (queryParams.isPinned === 'false') {
      whereClause.is_pinned = false;
    }

    // 標籤篩選
    if (queryParams.tags.length > 0) {
      includeClause[0].where = {
        name: { [Op.in]: queryParams.tags }
      };
    }

    // 計算偏移量
    const offset = (queryParams.page - 1) * queryParams.limit;

    // 執行查詢
    const { count, rows } = await Announcement.findAndCountAll({
      where: whereClause,
      include: includeClause,
      limit: queryParams.limit,
      offset: offset,
      order: [
        ['is_pinned', 'DESC'],
        ['created_at', 'DESC']
      ],
      distinct: true
    });

    const result = {
      announcements: rows,
      totalCount: count,
      totalPages: Math.ceil(count / queryParams.limit),
      currentPage: queryParams.page,
      hasNext: queryParams.page * queryParams.limit < count,
      hasPrevious: queryParams.page > 1
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getAllAnnouncements:', error);
    res.status(500).json({ message: '發生錯誤', error: error.message });
  }
};

// 獲取置頂公告
export const getPinnedAnnouncements = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const announcements = await Announcement.findAll({
      where: {
        is_pinned: true
      },
      include: [{
        model: AnnouncementTag,
        as: 'tags'
      }],
      limit: limit,
      order: [['created_at', 'DESC']]
    });

    const result = {
      announcements,
      totalCount: announcements.length,
      totalPages: 1,
      currentPage: 1,
      hasNext: false,
      hasPrevious: false
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getPinnedAnnouncements:', error);
    res.status(500).json({ message: '發生錯誤', error: error.message });
  }
};

// 獲取單個公告
export const getAnnouncementById = async (req, res) => {
  try {
    const announcementId = parseInt(req.params.id);
    
    const announcement = await Announcement.findByPk(announcementId, {
      include: [{
        model: AnnouncementTag,
        as: 'tags'
      }]
    });

    if (!announcement) {
      return res.status(404).json({ message: '找不到此公告' });
    }

    res.status(200).json(announcement);
  } catch (error) {
    console.error('Error in getAnnouncementById:', error);
    res.status(500).json({ message: '發生錯誤', error: error.message });
  }
};

// 創建新公告
export const createAnnouncement = async (req, res) => {
  try {
    const { title, content, is_pinned, tags } = req.body;

    // 創建公告
    const announcement = await Announcement.create({
      title,
      content,
      is_pinned: is_pinned || false,
      created_at: new Date(),
      updated_at: new Date()
    });

    // 如果有標籤，處理標籤關聯
    if (tags && Array.isArray(tags) && tags.length > 0) {
      // 查找或創建標籤
      const tagInstances = [];
      for (const tagName of tags) {
        const [tag] = await AnnouncementTag.findOrCreate({
          where: { name: tagName.trim() },
          defaults: { name: tagName.trim() }
        });
        tagInstances.push(tag);
      }

      // 建立關聯
      await announcement.setTags(tagInstances);
    }

    // 獲取完整的公告資料（包含標籤）
    const createdAnnouncement = await Announcement.findByPk(announcement.id, {
      include: [{
        model: AnnouncementTag,
        as: 'tags'
      }]
    });

    res.status(201).json({
      message: '公告創建成功',
      announcement: createdAnnouncement
    });
  } catch (error) {
    console.error('Error in createAnnouncement:', error);
    res.status(500).json({ message: '創建公告失敗', error: error.message });
  }
};

// 更新公告
export const updateAnnouncement = async (req, res) => {
  try {
    const announcementId = parseInt(req.params.id);
    const { title, content, is_pinned, tags } = req.body;

    // 查找公告
    const announcement = await Announcement.findByPk(announcementId);
    if (!announcement) {
      return res.status(404).json({ message: '找不到該公告' });
    }

    // 更新公告基本資料
    const updateData = {
      updated_at: new Date()
    };

    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (is_pinned !== undefined) updateData.is_pinned = is_pinned;

    await announcement.update(updateData);

    // 如果有標籤更新，處理標籤關聯
    if (tags !== undefined && Array.isArray(tags)) {
      if (tags.length === 0) {
        // 移除所有標籤
        await announcement.setTags([]);
      } else {
        // 查找或創建標籤
        const tagInstances = [];
        for (const tagName of tags) {
          const [tag] = await AnnouncementTag.findOrCreate({
            where: { name: tagName.trim() },
            defaults: { name: tagName.trim() }
          });
          tagInstances.push(tag);
        }

        // 更新關聯
        await announcement.setTags(tagInstances);
      }
    }

    // 獲取更新後的完整資料
    const updatedAnnouncement = await Announcement.findByPk(announcementId, {
      include: [{
        model: AnnouncementTag,
        as: 'tags'
      }]
    });

    res.status(200).json({
      message: '公告更新成功',
      announcement: updatedAnnouncement
    });
  } catch (error) {
    console.error('Error in updateAnnouncement:', error);
    res.status(500).json({ message: '更新公告失敗', error: error.message });
  }
};

// 刪除公告
export const deleteAnnouncement = async (req, res) => {
  try {
    const announcementId = parseInt(req.params.id);

    // 查找公告
    const announcement = await Announcement.findByPk(announcementId);
    if (!announcement) {
      return res.status(404).json({ message: '找不到該公告' });
    }

    // 移除標籤關聯
    await announcement.setTags([]);

    // 刪除公告
    await announcement.destroy();

    res.status(200).json({ message: '公告刪除成功' });
  } catch (error) {
    console.error('Error in deleteAnnouncement:', error);
    res.status(500).json({ message: '刪除公告失敗', error: error.message });
  }
};

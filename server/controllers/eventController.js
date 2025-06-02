import { Event, EventSpeaker, EventTag, EventRegistration } from '../model/eventModel.js';
import { Op } from 'sequelize';
import { transformEvent } from '../utils/dataTransform.js';

// 獲取所有活動
export const getAllEvents = async (req, res) => {
  try {
    const queryParams = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
      keyword: req.query.keyword || '',
      tags: req.query.tags ? req.query.tags.split(',') : [],
      future: req.query.future,
      sort: req.query.sort || 'desc'
    };

    // 構建查詢條件
    const whereClause = {};
    const includeClause = [
      {
        model: EventSpeaker,
        as: 'speakers'
      },
      {
        model: EventTag,
        as: 'eventTags'
      }
    ];

    // 關鍵字搜尋
    if (queryParams.keyword) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${queryParams.keyword}%` } },
        { description: { [Op.like]: `%${queryParams.keyword}%` } },
        { location: { [Op.like]: `%${queryParams.keyword}%` } }
      ];
    }

    // 時間篩選
    if (queryParams.future === 'true') {
      whereClause.start_date = { [Op.gte]: new Date() };
    } else if (queryParams.future === 'false') {
      whereClause.start_date = { [Op.lt]: new Date() };
    }

    // 標籤篩選
    if (queryParams.tags.length > 0) {
      includeClause[1].where = {
        tag_name: { [Op.in]: queryParams.tags }
      };
    }

    // 計算偏移量
    const offset = (queryParams.page - 1) * queryParams.limit;

    // 排序設定
    const order = queryParams.sort === 'asc' 
      ? [['start_date', 'ASC']] 
      : [['start_date', 'DESC']];

    // 執行查詢
    const { count, rows } = await Event.findAndCountAll({
      where: whereClause,
      include: includeClause,
      limit: queryParams.limit,
      offset: offset,
      order: order,
      distinct: true
    });

    // 轉換資料格式
    const transformedEvents = rows.map(event => transformEvent(event));

    const result = {
      events: transformedEvents,
      totalCount: count,
      totalPages: Math.ceil(count / queryParams.limit),
      currentPage: queryParams.page,
      hasNext: queryParams.page * queryParams.limit < count,
      hasPrevious: queryParams.page > 1
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getAllEvents:', error);
    res.status(500).json({ message: '發生錯誤', error: error.message });
  }
};

// 獲取單個活動詳情
export const getEventById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    const event = await Event.findByPk(id, {
      include: [
        {
          model: EventSpeaker,
          as: 'speakers'
        },
        {
          model: EventTag,
          as: 'eventTags'
        },
        {
          model: EventRegistration,
          as: 'registrations'
        }
      ]
    });

    if (!event) {
      return res.status(404).json({ message: '找不到活動' });
    }

    // 轉換資料格式
    const transformedEvent = transformEvent(event);

    res.status(200).json(transformedEvent);
  } catch (error) {
    console.error('Error in getEventById:', error);
    res.status(500).json({ message: '發生錯誤', error: error.message });
  }
};

// 根據日期範圍獲取活動
export const getEventsByDateRange = async (req, res) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({ message: '需要提供開始和結束日期' });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    const events = await Event.findAll({
      where: {
        start_date: {
          [Op.between]: [startDate, endDate]
        }
      },
      include: [
        {
          model: EventSpeaker,
          as: 'speakers'
        },
        {
          model: EventTag,
          as: 'eventTags'
        }
      ],
      order: [['start_date', 'ASC']]
    });

    // 轉換資料格式
    const transformedEvents = events.map(event => transformEvent(event));

    res.status(200).json({ events: transformedEvents });
  } catch (error) {
    console.error('Error in getEventsByDateRange:', error);
    res.status(500).json({ message: '發生錯誤', error: error.message });
  }
};

// 獲取歷史活動
export const getHistoricalEvents = async (req, res) => {
  try {
    const { keyword, tags, page = 1, limit = 10 } = req.query;
    const tagArray = tags ? tags.split(',') : [];
    
    // 構建查詢條件
    const whereClause = {
      start_date: { [Op.lt]: new Date() } // 只獲取過去的活動
    };
    
    const includeClause = [
      {
        model: EventSpeaker,
        as: 'speakers'
      },
      {
        model: EventTag,
        as: 'eventTags'
      }
    ];

    // 關鍵字搜尋
    if (keyword) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${keyword}%` } },
        { description: { [Op.like]: `%${keyword}%` } },
        { location: { [Op.like]: `%${keyword}%` } }
      ];
    }

    // 標籤篩選
    if (tagArray.length > 0) {
      includeClause[1].where = {
        tag_name: { [Op.in]: tagArray }
      };
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows } = await Event.findAndCountAll({
      where: whereClause,
      include: includeClause,
      limit: parseInt(limit),
      offset: offset,
      order: [['start_date', 'DESC']],
      distinct: true
    });

    // 轉換資料格式
    const transformedEvents = rows.map(event => transformEvent(event));

    const result = {
      events: transformedEvents,
      totalCount: count,
      totalPages: Math.ceil(count / parseInt(limit)),
      currentPage: parseInt(page),
      hasNext: parseInt(page) * parseInt(limit) < count,
      hasPrevious: parseInt(page) > 1
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getHistoricalEvents:', error);
    res.status(500).json({ message: '獲取歷史活動失敗', error: error.message });
  }
};

// 獲取所有活動標籤
export const getEventTags = async (req, res) => {
  try {
    const tags = await EventTag.findAll({
      order: [['name', 'ASC']]
    });
    
    res.status(200).json({ tags });
  } catch (error) {
    console.error('Error in getEventTags:', error);
    res.status(500).json({ message: '獲取活動標籤失敗', error: error.message });
  }
};

// 創建新活動 (管理員專用)
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      excerpt,
      date,
      end_date,
      location,
      max_attendees,
      registration_url,
      speakers = [],
      tags = []
    } = req.body;

    // 創建活動
    const event = await Event.create({
      title,
      description,
      excerpt,
      start_date: date, // 前端傳入的 date 對應資料庫的 start_date
      end_date,
      location,
      max_attendees,
      registration_url,
      created_by: req.user.id, // 來自 JWT 認證
    });

    // 添加講者 (如果有)
    if (speakers.length > 0) {
      const eventSpeakers = speakers.map(speaker => ({
        event_id: event.id,
        ...speaker
      }));
      await EventSpeaker.bulkCreate(eventSpeakers);
    }

    // 添加標籤 (如果有)
    if (tags.length > 0) {
      const eventTags = tags.map(tag => ({
        event_id: event.id,
        name: tag
      }));
      await EventTag.bulkCreate(eventTags);
    }

    // 獲取完整的活動資料 (包含關聯)
    const createdEvent = await Event.findByPk(event.id, {
      include: [
        { model: EventSpeaker, as: 'speakers' },
        { model: EventTag, as: 'eventTags' }
      ]
    });

    // 轉換資料格式
    const transformedEvent = transformEvent(createdEvent);

    res.status(201).json({
      message: '活動創建成功',
      event: transformedEvent
    });
  } catch (error) {
    console.error('Error in createEvent:', error);
    res.status(500).json({ message: '創建活動失敗', error: error.message });
  }
};

// 更新活動 (管理員專用)
export const updateEvent = async (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    const updateData = req.body;

    // 檢查活動是否存在
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: '活動不存在' });
    }

    // 更新活動基本資料
    await event.update(updateData);

    // 如果有講者資料，更新講者
    if (updateData.speakers) {
      await EventSpeaker.destroy({ where: { event_id: eventId } });
      if (updateData.speakers.length > 0) {
        const eventSpeakers = updateData.speakers.map(speaker => ({
          event_id: eventId,
          ...speaker
        }));
        await EventSpeaker.bulkCreate(eventSpeakers);
      }
    }

    // 如果有標籤資料，更新標籤
    if (updateData.tags) {
      await EventTag.destroy({ where: { event_id: eventId } });
      if (updateData.tags.length > 0) {
        const eventTags = updateData.tags.map(tag => ({
          event_id: eventId,
          name: tag
        }));
        await EventTag.bulkCreate(eventTags);
      }
    }

    // 獲取更新後的完整活動資料
    const updatedEvent = await Event.findByPk(eventId, {
      include: [
        { model: EventSpeaker, as: 'speakers' },
        { model: EventTag, as: 'eventTags' }
      ]
    });

    // 轉換資料格式
    const transformedEvent = transformEvent(updatedEvent);

    res.status(200).json({
      message: '活動更新成功',
      event: transformedEvent
    });
  } catch (error) {
    console.error('Error in updateEvent:', error);
    res.status(500).json({ message: '更新活動失敗', error: error.message });
  }
};

// 刪除活動 (管理員專用)
export const deleteEvent = async (req, res) => {
  try {
    const eventId = parseInt(req.params.id);

    // 檢查活動是否存在
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: '活動不存在' });
    }

    // 刪除關聯資料 (講者、標籤、報名記錄)
    await EventSpeaker.destroy({ where: { event_id: eventId } });
    await EventTag.destroy({ where: { event_id: eventId } });
    await EventRegistration.destroy({ where: { event_id: eventId } });

    // 刪除活動
    await event.destroy();

    res.status(200).json({ message: '活動刪除成功' });
  } catch (error) {
    console.error('Error in deleteEvent:', error);
    res.status(500).json({ message: '刪除活動失敗', error: error.message });
  }
};

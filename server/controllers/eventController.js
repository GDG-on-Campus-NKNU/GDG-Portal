import eventModel from '../model/eventModel.js';

// 獲取所有活動
export const getAllEvents = (req, res) => {
  try {
    const queryParams = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
      keyword: req.query.keyword || '',
      tags: req.query.tags ? req.query.tags.split(',') : [],
      future: req.query.future,
      sort: req.query.sort || 'desc'
    };

    const result = eventModel.getAllEvents(queryParams);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getAllEvents:', error);
    res.status(500).json({ message: '發生錯誤', error: error.message });
  }
};

// 獲取單個活動詳情
export const getEventById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const event = eventModel.getEventById(id);

    if (!event) {
      return res.status(404).json({ message: '找不到活動' });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error('Error in getEventById:', error);
    res.status(500).json({ message: '發生錯誤', error: error.message });
  }
};

// 根據日期範圍獲取活動
export const getEventsByDateRange = (req, res) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({ message: '需要提供開始和結束日期' });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    const events = eventModel.getEventsByDateRange(startDate, endDate);
    res.status(200).json({ events });
  } catch (error) {
    console.error('Error in getEventsByDateRange:', error);
    res.status(500).json({ message: '發生錯誤', error: error.message });
  }
};

// 獲取歷史活動
export const getHistoricalEvents = (req, res) => {
  try {
    const { keyword, tags, page = 1, limit = 10 } = req.query;

    // 處理標籤參數
    const tagArray = tags ? tags.split(',') : [];

    // 呼叫模型方法獲取歷史活動
    const result = eventModel.getHistoricalEvents({
      keyword,
      tags: tagArray,
      page: parseInt(page),
      limit: parseInt(limit)
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getHistoricalEvents:', error);
    res.status(500).json({ message: '獲取歷史活動失敗', error: error.message });
  }
};

// 獲取所有活動標籤
export const getEventTags = (req, res) => {
  try {
    const tagOptions = eventModel.getEventTags();
    res.status(200).json({ tags: tagOptions });
  } catch (error) {
    console.error('Error in getEventTags:', error);
    res.status(500).json({ message: '獲取活動標籤失敗', error: error.message });
  }
};

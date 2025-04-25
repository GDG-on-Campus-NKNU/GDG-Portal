import coreteamModel from '../model/coreteamModel.js';

// 獲取所有幹部
export const getAllMembers = (req, res) => {
  try {
    const queryParams = {
      keyword: req.query.keyword || '',
      categories: req.query.categories ? req.query.categories.split(',') : [],
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10
    };

    const result = coreteamModel.getAllMembers(queryParams);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getAllMembers:', error);
    res.status(500).json({ message: '獲取幹部資料失敗', error: error.message });
  }
};

// 獲取單一幹部
export const getMemberById = (req, res) => {
  try {
    const memberId = parseInt(req.params.id);
    const member = coreteamModel.getMemberById(memberId);

    if (!member) {
      return res.status(404).json({ message: '找不到該幹部' });
    }

    res.status(200).json(member);
  } catch (error) {
    console.error('Error in getMemberById:', error);
    res.status(500).json({ message: '獲取幹部資料失敗', error: error.message });
  }
};

// 獲取分類選項
export const getCategoryOptions = (req, res) => {
  try {
    const categories = coreteamModel.getCategoryOptions();
    res.status(200).json({ categories });
  } catch (error) {
    console.error('Error in getCategoryOptions:', error);
    res.status(500).json({ message: '獲取分類選項失敗', error: error.message });
  }
};

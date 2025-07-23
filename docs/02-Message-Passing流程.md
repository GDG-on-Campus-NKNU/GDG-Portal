# Message Passing 流程說明

## 什麼是 Message Passing？

在 Web 開發中，**Message Passing** 指的是前端 (client) 和後端 (server) 之間的資料傳遞過程。簡單來說，就是「前端如何向後端要資料」以及「後端如何回傳資料給前端」。

## 基本概念

### 前端 (React)
- 運行在使用者的瀏覽器中
- 負責顯示介面和處理使用者互動
- 需要向後端請求資料來顯示內容

### 後端 (Node.js + Express)
- 運行在伺服器上
- 負責處理業務邏輯和資料庫操作
- 提供 API 端點供前端呼叫

### 資料庫 (MySQL)
- 儲存所有資料
- 只有後端可以直接存取
- 前端必須透過後端來讀寫資料

## 完整的資料流程

```
前端組件 → API 呼叫 → 後端路由 → 控制器 → 資料庫
   ↓                                        ↑
   ↓ ← ← ← ← JSON 回應 ← ← ← ← ← ← ← ← ← ← ← ←  ↑
```

## 實際範例：取得成員列表

### 步驟 1：前端發起請求

**檔案位置：** `client/src/hooks/useCoreTeamData.js`

```javascript
// 前端使用 fetch 向後端發送 HTTP 請求
const response = await fetch('/api/coreteam');
const data = await response.json();
```

### 步驟 2：後端接收請求

**檔案位置：** `server/routes/coreteamRoutes.js`

```javascript
// 路由定義：當收到 GET /api/coreteam 請求時
router.get('/', coreteamController.getAllCoreTeamMembers);
```

### 步驟 3：控制器處理邏輯

**檔案位置：** `server/controllers/coreteamController.js`

```javascript
// 控制器呼叫資料庫模型
const getAllCoreTeamMembers = async (req, res) => {
  try {
    const members = await CoreTeam.findAll({
      include: [{ model: Profile }]
    });
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### 步驟 4：資料庫查詢

**檔案位置：** `server/model/coreteamModel.js`

```javascript
// Sequelize 模型定義，對應資料庫表格
const CoreTeam = sequelize.define('CoreTeam', {
  name: { type: DataTypes.STRING },
  position: { type: DataTypes.STRING },
  // ... 其他欄位
});
```

### 步驟 5：回傳資料給前端

```javascript
// 後端回傳 JSON 格式的資料
{
  "id": 1,
  "name": "顏榕嶙",
  "position": "負責人",
  "email": "example@email.com",
  "profile": {
    "photo": "/assets/members/yen_profile.png"
  }
}
```

### 步驟 6：前端接收並顯示

**檔案位置：** `client/src/components/member/MemberCard.jsx`

```javascript
// React 組件使用接收到的資料
function MemberCard({ member }) {
  return (
    <div className="member-card">
      <img src={member.profile.photo} alt={member.name} />
      <h3>{member.name}</h3>
      <p>{member.position}</p>
    </div>
  );
}
```

## HTTP 方法說明

### GET - 取得資料
```javascript
// 前端
fetch('/api/coreteam')  // 取得所有成員

// 後端
router.get('/', controller.getAll);
```

### POST - 新增資料
```javascript
// 前端
fetch('/api/coreteam', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: '新成員', position: '職位' })
});

// 後端
router.post('/', controller.create);
```

### PUT - 更新資料
```javascript
// 前端
fetch('/api/coreteam/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: '更新後的名字' })
});

// 後端
router.put('/:id', controller.update);
```

### DELETE - 刪除資料
```javascript
// 前端
fetch('/api/coreteam/1', { method: 'DELETE' });

// 後端
router.delete('/:id', controller.delete);
```

## 錯誤處理

### 前端錯誤處理
```javascript
try {
  const response = await fetch('/api/coreteam');
  if (!response.ok) {
    throw new Error('無法取得資料');
  }
  const data = await response.json();
} catch (error) {
  console.error('錯誤:', error);
  // 顯示錯誤訊息給使用者
}
```

### 後端錯誤處理
```javascript
const getAllMembers = async (req, res) => {
  try {
    const members = await CoreTeam.findAll();
    res.json(members);
  } catch (error) {
    console.error('資料庫錯誤:', error);
    res.status(500).json({ 
      error: '伺服器錯誤，請稍後再試' 
    });
  }
};
```

## 除錯技巧

### 檢查網路請求
1. 開啟瀏覽器開發者工具 (F12)
2. 點選 "Network" 標籤
3. 重新載入頁面，觀察 API 請求
4. 檢查請求狀態碼和回應內容

### 常見狀態碼
- **200** - 成功
- **400** - 請求格式錯誤
- **401** - 未授權
- **404** - 找不到資源
- **500** - 伺服器錯誤

### 後端日誌
```bash
# 查看 Docker 容器日誌
docker-compose logs app

# 即時監控日誌
docker-compose logs -f app
```

這個流程確保了前端和後端之間的有效溝通，讓使用者可以看到正確的資料並與應用程式互動。

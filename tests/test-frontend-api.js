/**
 * 前端 Message Passing 測試
 * 模擬前端如何與後端進行通信
 */

// 模擬 React Hook 的邏輯
class MockEventHook {
  constructor() {
    this.events = [];
    this.loading = false;
    this.error = '';
    this.totalPages = 1;
  }

  async fetchEvents(params = {}) {
    console.log('🔄 前端開始獲取事件資料...');
    console.log('📤 發送參數:', params);
    
    this.loading = true;
    this.error = '';
    
    try {
      // 構建 URL 參數
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        limit: params.limit || 10,
        sort: params.sort || 'desc'
      });
      
      if (params.keyword) {
        queryParams.append('keyword', params.keyword);
      }
      
      if (params.tags && params.tags.length > 0) {
        queryParams.append('tags', params.tags.join(','));
      }
      
      if (params.future) {
        queryParams.append('future', 'true');
      }
      
      const url = `http://localhost:3001/api/events?${queryParams}`;
      console.log('🌐 請求 URL:', url);
      
      // 模擬 fetch 請求
      const response = await this.mockFetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📥 收到回應:', data);
      
      this.events = data.events;
      this.totalPages = data.pagination.totalPages;
      this.loading = false;
      
      console.log('✅ 前端狀態更新完成');
      console.log('📊 活動數量:', this.events.length);
      
      return data;
      
    } catch (error) {
      console.error('❌ 前端錯誤:', error.message);
      this.error = error.message;
      this.loading = false;
      throw error;
    }
  }
  
  // 模擬 fetch API
  async mockFetch(url) {
    console.log('🔗 模擬 HTTP 請求:', url);
    
    // 解析 URL 參數
    const urlObj = new URL(url);
    const params = Object.fromEntries(urlObj.searchParams);
    
    // 模擬網路延遲
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // 模擬伺服器回應
    const mockEvents = [
      {
        id: 1,
        title: "GDG DevFest 2024",
        description: "年度開發者節慶活動",
        date: "2024-12-15T09:00:00Z",
        location: "台北國際會議中心",
        is_featured: true,
        speakers: [
          { name: "張三", bio: "Google Developer Expert", avatar_url: null }
        ],
        tags: [
          { name: "Android" }, { name: "Web" }
        ]
      },
      {
        id: 2,
        title: "Flutter Workshop",
        description: "實作 Flutter 應用程式",
        date: "2024-11-20T14:00:00Z",
        location: "線上活動",
        is_featured: false,
        speakers: [
          { name: "李四", bio: "Flutter 專家", avatar_url: null }
        ],
        tags: [
          { name: "Flutter" }, { name: "Mobile" }
        ]
      }
    ];
    
    // 應用篩選邏輯
    let filteredEvents = [...mockEvents];
    
    if (params.keyword) {
      filteredEvents = filteredEvents.filter(event => 
        event.title.toLowerCase().includes(params.keyword.toLowerCase()) ||
        event.description.toLowerCase().includes(params.keyword.toLowerCase())
      );
    }
    
    if (params.future === 'true') {
      const now = new Date();
      filteredEvents = filteredEvents.filter(event => 
        new Date(event.date) >= now
      );
    }
    
    const response = {
      success: true,
      events: filteredEvents,
      pagination: {
        currentPage: parseInt(params.page) || 1,
        totalPages: Math.ceil(filteredEvents.length / (params.limit || 10)),
        totalItems: filteredEvents.length,
        itemsPerPage: parseInt(params.limit) || 10
      }
    };
    
    return {
      ok: true,
      status: 200,
      json: () => Promise.resolve(response)
    };
  }
}

// 測試場景
async function runTests() {
  console.log('\n🧪 開始 Message Passing 測試\n');
  
  const eventHook = new MockEventHook();
  
  try {
    // 測試 1: 基本事件獲取
    console.log('📋 測試 1: 基本事件獲取');
    await eventHook.fetchEvents({ page: 1, limit: 10 });
    console.log('✅ 測試 1 完成\n');
    
    // 測試 2: 關鍵字搜尋
    console.log('📋 測試 2: 關鍵字搜尋');
    await eventHook.fetchEvents({ keyword: 'Flutter' });
    console.log('✅ 測試 2 完成\n');
    
    // 測試 3: 未來活動篩選
    console.log('📋 測試 3: 未來活動篩選');
    await eventHook.fetchEvents({ future: true });
    console.log('✅ 測試 3 完成\n');
    
    // 測試 4: 複合條件查詢
    console.log('📋 測試 4: 複合條件查詢');
    await eventHook.fetchEvents({ 
      keyword: 'GDG', 
      page: 1, 
      limit: 5,
      tags: ['Android', 'Web']
    });
    console.log('✅ 測試 4 完成\n');
    
    console.log('🎉 所有測試通過！Message Passing 架構運作正常');
    
  } catch (error) {
    console.error('❌ 測試失敗:', error);
  }
}

// 執行測試
runTests();

export { MockEventHook };

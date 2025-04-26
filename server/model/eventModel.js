// 活動資料模型
class EventModel {
  constructor() {
    this.events = [
      {
        id: 1,
        title: '全棧網頁應用實戰 5 - Full-Stack Web Development in Action',
        date: '2025-05-06T18:30:00',
        endDate: '2025-05-06T21:30:00',
        location: 'E202 教室',
        tags: ['offline', 'workshop'],
        excerpt: '系列課程第五講，學習如何開發完整的全端網頁應用。',
        description: '本課程為全棧開發系列課程第五講，將深入探討如何整合前後端技術，建立完整的網頁應用。課程內容包括 API 設計、狀態管理、資料庫整合、使用者驗證等重要議題。適合已有基礎 JavaScript 知識的開發者參加。',
        speakers: [
          {
            name: '王大明',
            role: 'Google 軟體工程師',
            bio: '擁有 5 年全棧開發經驗，目前在 Google 負責使用者體驗相關開發工作。',
            avatar: '/assets/speakers/speaker1.jpg'
          }
        ],
        registrationUrl: 'https://gdg.community.dev/events/details/google-gdg-taipei-presents-build-with-ai-2025-taipei-7-56/',
        coverImage: '/assets/events/fullstack-workshop.jpg'
      },
      {
        id: 2,
        title: 'Google I/O 2025 觀賞派對',
        date: '2025-05-25T18:00:00',
        endDate: '2025-05-25T22:00:00',
        location: '學生活動中心',
        tags: ['offline', 'talk'],
        excerpt: '一起觀看 Google I/O 2025 開發者大會，了解 Google 最新技術和產品。',
        description: '加入我們的 Google I/O 2025 觀賞派對！一同觀看開發者大會直播，了解 Google 最新的平台更新、產品發布和技術趨勢。活動中我們將有 Google 開發專家現場解說，還有互動問答環節和小活動，機會贏取 Google 周邊商品。',
        speakers: [],
        registrationUrl: 'https://gdg.community.dev/events/details/google-gdg-taipei-presents-google-io-extended-2025-taipei/cohost-gdg-taipei',
        coverImage: '/assets/events/io-extended.jpg'
      },
      {
        id: 3,
        title: 'Firebase 後端實作課程',
        date: '2025-05-20T18:30:00',
        endDate: '2025-05-20T21:30:00',
        location: 'E202 教室',
        tags: ['offline', 'workshop'],
        excerpt: '學習如何使用 Firebase 建立後端服務，快速開發應用程式。',
        description: '這個實作課程將教你如何利用 Firebase 平台提供的服務，快速建立強大的後端功能。我們會涵蓋 Firebase Authentication、Firestore、Storage、Cloud Functions 等核心功能，以及如何整合至前端應用程式。每位參加者都將完成一個具備完整功能的應用。',
        speakers: [
          {
            name: '林小華',
            role: 'Firebase GDE',
            bio: 'Google 開發者專家，專注於 Firebase 和雲端服務整合開發。',
            avatar: '/assets/speakers/speaker2.jpg'
          }
        ],
        registrationUrl: 'https://gdg.community.dev/events/details/google-gdg-taichung-presents-code-your-path-cheng-shi-she-ji-kai-fa-shi-zhan/cohost-gdg-taichung',
        coverImage: '/assets/events/firebase-workshop.jpg'
      },
      {
        id: 4,
        title: 'Flutter 跨平台分享會',
        date: '2025-05-15T18:30:00',
        endDate: '2025-05-15T20:30:00',
        location: '線上 Zoom',
        tags: ['online', 'talk'],
        excerpt: '了解如何使用 Flutter 開發跨平台應用程式，一次寫程式，到處執行。',
        description: '在這次線上分享會中，我們將討論 Flutter 框架的最新進展，以及如何利用它開發高質量的跨平台應用。內容包括 Flutter 3.0 新特性、性能優化技巧、狀態管理、與原生功能的整合等。會有實際案例分析和常見問題解決方案分享。',
        speakers: [
          {
            name: '張小明',
            role: 'Flutter 技術顧問',
            bio: '資深行動應用開發者，專注於 Flutter 跨平台解決方案。',
            avatar: '/assets/speakers/speaker3.jpg'
          }
        ],
        registrationUrl: 'https://gdg.community.dev/events/details/google-gdg-taichung-presents-build-with-ai-2025-x-iwd-taichung-2025/',
        coverImage: '/assets/events/flutter-meetup.jpg'
      },
      {
        id: 5,
        title: 'Android 開發入門工作坊',
        date: '2025-05-10T18:30:00',
        endDate: '2025-05-10T21:30:00',
        location: 'E101 教室',
        tags: ['offline', 'workshop'],
        excerpt: '從零開始學習 Android 應用程式開發，適合初學者參加。',
        description: '這個入門工作坊專為 Android 開發新手設計，無需任何 Android 開發經驗。我們將從環境設置開始，逐步引導你創建第一個 Android 應用。課程涵蓋 Android Studio 使用、基本 UI 元素、活動生命週期、意圖和導航等概念。每位學員將在課程結束時完成一個功能完整的簡易應用。',
        speakers: [
          {
            name: '李大方',
            role: 'Android 開發者',
            bio: '5+ 年 Android 應用開發經驗，曾開發多款下載量百萬的應用。',
            avatar: '/assets/speakers/speaker4.jpg'
          }
        ],
        registrationUrl: 'https://gdg.community.dev/events/details/google-gdg-taichung-presents-wu-yue-build-with-ai-taichung/',
        coverImage: '/assets/events/android-workshop.jpg'
      },
      {
        id: 6,
        title: '深入淺出 Chrome 開發者工具 (DevTools)',
        date: '2025-04-29T18:30:00',
        endDate: '2025-04-29T21:30:00',
        location: 'E101 教室',
        tags: ['offline', 'workshop'],
        excerpt: '學習如何使用 Chrome DevTools 進行網頁除錯與效能優化。',
        description: '本工作坊將深入探討 Chrome 開發者工具的強大功能，幫助前端開發者提升除錯效率和網頁性能。內容包括元素檢查與修改、網路請求分析、JavaScript 除錯技巧、效能分析與優化、記憶體洩漏檢測等。適合所有想提升開發技巧的網頁開發者。',
        speakers: [
          {
            name: '陳效能',
            role: 'Web 效能專家',
            bio: '專注於網頁前端優化和效能分析，協助多家企業提升網站速度和使用者體驗。',
            avatar: '/assets/speakers/speaker5.jpg'
          }
        ],
        registrationUrl: 'https://gdg.community.dev/events/details/google-gdg-taichung-presents-liu-yue-build-with-ai-taichung/',
        coverImage: '/assets/events/devtools-workshop.jpg'
      },
      {
        id: 7,
        title: 'React 進階開發技巧與狀態管理',
        date: '2025-04-27T18:30:00',
        endDate: '2025-04-27T21:30:00',
        location: 'E203 教室',
        tags: ['offline', 'workshop'],
        excerpt: '探討 React 進階開發技巧，包括 Context API、自定義 Hooks 和多種狀態管理解決方案。',
        description: '這個進階 React 工作坊專為有 React 基礎的開發者設計，將深入探討如何組織複雜的 React 應用。我們會覆蓋 Context API 的高級應用、自定義 Hooks 開發、Redux vs. MobX vs. Zustand 的比較、React Query 資料獲取、性能優化策略等主題。學員將獲得一套實用的技巧來優化 React 應用架構。',
        speakers: [
          {
            name: '鄭小航',
            role: 'React 資深開發者',
            bio: '擁有豐富的 React 專案經驗，目前致力於大型 SPA 架構設計和優化。',
            avatar: '/assets/speakers/speaker6.jpg'
          }
        ],
        registrationUrl: 'https://gdg.community.dev/events/details/google-gdg-tainan-presents-build-with-ai-tainan-2025-2-bigquery-gemini-amp-looker-studio-feat-shi-yong-zhe-yan-jiu-gong-zuo-fang/',
        coverImage: '/assets/events/react-workshop.jpg'
      },
      {
        id: 8,
        title: 'Express.js 與 Node.js 實戰工作坊',
        date: '2025-04-26T18:30:00',
        endDate: '2025-04-26T21:30:00',
        location: 'E203 教室',
        tags: ['offline', 'workshop'],
        excerpt: '學習如何使用 Express.js 和 Node.js 開發 RESTful API，並與前端應用程式整合。',
        description: '本課程將從零開始教你如何使用 Express.js 和 Node.js 建立後端服務。我們會涵蓋 RESTful API 設計原則、中間件應用、資料庫整合、身份驗證與授權、API 文檔生成等主題。課程結束後，你將掌握如何創建一個安全、可擴展的後端服務，並與前端應用無縫集成。',
        speakers: [
          {
            name: '黃後端',
            role: 'Node.js 開發專家',
            bio: '8 年 Node.js 開發經驗，專精於可擴展的微服務架構和 API 設計。',
            avatar: '/assets/speakers/speaker7.jpg'
          }
        ],
        registrationUrl: 'https://gdg.community.dev/events/details/google-gdg-tainan-presents-build-with-ai-tainan-2025-3-gemini-agent-amp-n8n-feat-shi-yong-zhe-yan-jiu-gong-zuo-fang/',
        coverImage: '/assets/events/express-workshop.jpg'
      },
      {
        id: 9,
        title: 'AI 開發實戰工作坊 - TensorFlow.js 入門',
        date: '2025-04-04T18:30:00',
        endDate: '2025-04-04T21:30:00',
        location: '線上 Zoom',
        tags: ['online', 'workshop'],
        excerpt: '使用 TensorFlow.js 在瀏覽器中實現機器學習模型，無需後端即可打造智慧型應用。',
        description: '本線上工作坊將引導你進入 TensorFlow.js 的世界，學習如何在瀏覽器環境中運行機器學習模型。我們將從基本概念出發，教你如何使用預訓練模型、自定義模型訓練、模型優化與部署等。課程包含多個實際案例，如圖像識別、自然語言處理等應用場景。適合對 AI 開發感興趣的前端開發者。',
        speakers: [
          {
            name: '吳智能',
            role: 'AI 研發工程師',
            bio: '專注於機器學習模型的前端整合與應用場景開發，熟悉多種 ML 框架。',
            avatar: '/assets/speakers/speaker8.jpg'
          }
        ],
        registrationUrl: 'https://gdg.community.dev/events/details/google-gdg-tainan-presents-build-with-ai-tainan-2025-4-feat-shi-yong-zhe-yan-jiu-gong-zuo-fang/',
        coverImage: '/assets/events/tensorflowjs-workshop.jpg'
      },
      {
        id: 10,
        title: '網路安全與資料隱私專題講座',
        date: '2025-03-22T19:00:00',
        endDate: '2025-03-22T21:00:00',
        location: '學生活動中心',
        tags: ['offline', 'talk'],
        excerpt: '探討最新網路安全威脅與資料隱私保護策略，以及如何在應用開發中實踐安全原則。',
        description: '隨著資安威脅不斷演變，開發者需更加重視應用安全性。本講座將介紹當前主要的網路安全威脅類型、常見漏洞及其防護措施、資料加密策略、用戶隱私保護法規遵循、安全開發生命週期等內容。講者將分享實際案例和實用的開發建議，幫助你在開發過程中更好地保護用戶資料和應用安全。',
        speakers: [
          {
            name: '謝安全',
            role: '資安顧問',
            bio: '資深資安專家，專長於 Web 應用安全測試和隱私合規諮詢。',
            avatar: '/assets/speakers/speaker9.jpg'
          }
        ],
        registrationUrl: 'https://gdg.community.dev/events/details/google-gdg-kaohsiung-presents-build-with-ai-kaohsiung-2025-may-first-workshop/',
        coverImage: '/assets/events/security-talk.jpg'
      },
      {
        id: 11,
        title: 'DevOps 與 CI/CD 自動化實務',
        date: '2025-03-17T18:30:00',
        endDate: '2025-03-17T21:30:00',
        location: 'E101 教室',
        tags: ['offline', 'workshop'],
        excerpt: '學習如何建置自動化部署流程，使用 GitHub Actions、Docker 和 Kubernetes 實現 CI/CD。',
        description: '這個工作坊將介紹現代 DevOps 實踐和 CI/CD 流程的建立。內容涵蓋版本控制策略、GitHub Actions 配置、Docker 容器化應用、Kubernetes 部署管理、自動化測試整合等。學員將動手實作一個完整的 CI/CD 管道，從程式碼提交到自動部署到測試/生產環境。適合想提升開發流程效率的開發者和團隊負責人。',
        speakers: [
          {
            name: '趙雲端',
            role: 'DevOps 工程師',
            bio: '專注於開發與營運自動化，有豐富的容器化和 Kubernetes 部署經驗。',
            avatar: '/assets/speakers/speaker10.jpg'
          }
        ],
        registrationUrl: 'https://gdg.community.dev/events/details/google-gdg-kaohsiung-presents-build-with-ai-kaohsiung-2025-may-life-workshop/',
        coverImage: '/assets/events/devops-workshop.jpg'
      },
      {
        id: 12,
        title: '網頁效能最佳化技巧分享',
        date: '2025-03-05T19:00:00',
        endDate: '2025-03-05T21:00:00',
        location: '線上 Zoom',
        tags: ['online', 'talk'],
        excerpt: '分析並改善網頁載入速度的實用技巧，包括資源最佳化、延遲載入和快取策略。',
        description: '網站速度對使用者體驗和 SEO 至關重要。本次線上分享會將深入探討提升網頁效能的各種技術和策略。內容包括關鍵渲染路徑優化、資源壓縮和合併、圖片優化技巧、延遲載入策略、快取最佳實踐、SSR vs. CSR 的應用場景等。講者將展示如何使用現代工具分析網站效能並實施有效的優化措施。',
        speakers: [
          {
            name: '楊速度',
            role: 'Web 效能專家',
            bio: '前端效能優化專家，協助多家電商網站提升載入速度和轉換率。',
            avatar: '/assets/speakers/speaker11.jpg'
          }
        ],
        registrationUrl: 'https://gdg.community.dev/events/details/google-gdg-kaohsiung-presents-build-with-ai-kaohsiung-2025-jump-into-june-workshop/',
        coverImage: '/assets/events/performance-talk.jpg'
      },
      {
        id: 13,
        title: 'PWA 實戰工作坊 - 打造離線可用的網頁應用',
        date: '2025-02-22T18:30:00',
        endDate: '2025-02-22T21:30:00',
        location: 'E202 教室',
        tags: ['offline', 'workshop'],
        excerpt: '學習如何將既有網頁轉換為漸進式網頁應用 (PWA)，實現離線使用、推送通知和安裝到主螢幕功能。',
        description: '漸進式網頁應用（PWA）結合了網頁和原生應用的優點，提供更豐富的使用者體驗。本工作坊將教你如何將現有網站轉為 PWA，內容包括 Service Worker 實作、應用資源快取策略、推送通知功能、添加到主畫面、背景同步等進階功能。參與者將實際開發一個具備完整 PWA 特性的應用，適合想要提升網頁應用能力的前端開發者。',
        speakers: [
          {
            name: '蘇離線',
            role: 'PWA 專家',
            bio: '專精於 Progressive Web Apps 開發，致力於推廣 Web 平台的先進特性。',
            avatar: '/assets/speakers/speaker12.jpg'
          }
        ],
        registrationUrl: 'https://gdg.community.dev/events/details/google-gdg-on-campus-national-chengchi-university-taipei-taiwan-presents-gdg-on-campus-nccu-build-with-ai-2025-1/',
        coverImage: '/assets/events/pwa-workshop.jpg'
      },
      {
        id: 14,
        title: 'Google Cloud 應用開發與部署實戰',
        date: '2025-01-31T14:00:00',
        endDate: '2025-01-31T18:00:00',
        location: '學生活動中心',
        tags: ['offline', 'workshop'],
        excerpt: '學習如何使用 Google Cloud 平台開發、測試和部署高可擴展性的應用程式。',
        description: '這個實作工作坊將帶你深入了解 Google Cloud 平台的核心服務，並學習如何有效地利用它們來構建現代雲端應用。你將學習到 Google Cloud 的基礎架構、Compute Engine、App Engine、Cloud Functions、Cloud Run 等服務的使用方式，以及如何整合 Storage、Database 和 AI/ML 服務。工作坊中將通過實際案例演示，從應用開發到部署的完整流程，並提供最佳實踐建議。',
        speakers: [
          {
            name: '林雲端',
            role: 'Google Cloud 技術主管',
            bio: '10 年雲端架構經驗，專精於大規模分佈式系統設計和雲端遷移策略。曾主導多家企業的雲端轉型項目。',
            avatar: '/assets/speakers/speaker13.jpg'
          },
          {
            name: '何容器',
            role: 'DevOps 技術專家',
            bio: '熟悉容器化技術和自動化部署流程，致力於推廣 Cloud Native 應用開發方法。',
            avatar: '/assets/speakers/speaker14.jpg'
          }
        ],
        registrationUrl: 'https://gdg.community.dev/events/details/google-gdg-on-campus-national-central-university-taoyuan-city-taiwan-presents-2025-zi-an-ti-yan-ying-cong-gong-fang-shi-zhan-dao-yun-duan-fang-xian/',
        coverImage: '/assets/events/cloud-workshop.jpg'
      },
      {
        id: 15,
        title: 'Web3 開發入門：區塊鏈技術與去中心化應用',
        date: '2025-06-28T19:00:00',
        endDate: '2025-06-28T22:00:00',
        location: '線上 Zoom',
        tags: ['online', 'talk'],
        excerpt: '探索區塊鏈技術基礎與開發去中心化應用 (DApps) 的實際方法。',
        description: '這場線上分享會將為開發者提供 Web3 和區塊鏈技術的全面介紹。內容從區塊鏈基礎概念開始，逐步深入智能合約開發、代幣標準、去中心化金融 (DeFi)、NFT 應用等主題。我們將討論當前主流區塊鏈平台的開發差異，以及如何將 Web2 技能轉化為 Web3 開發能力。講者還將分享成功案例和常見陷阱，以及未來技術趨勢展望。無論你是對區塊鏈開發感興趣的新手，還是尋找新方向的資深開發者，都能從中獲益。',
        speakers: [
          {
            name: '陳鏈結',
            role: 'Web3 開發者倡導者',
            bio: '早期區塊鏈技術採用者，專注於去中心化應用架構和智能合約安全。經常在技術社群分享實用開發知識。',
            avatar: '/assets/speakers/speaker15.jpg'
          }
        ],
        registrationUrl: 'https://gdg.community.dev/events/details/google-gdg-on-campus-national-university-of-kaohsiung-kaohsiung-city-taiwan-presents-gdg-on-campus-nuk-build-with-ai-2025-april-ii/',
        coverImage: '/assets/events/web3-talk.jpg'
      }
    ];
  }

  // 獲取所有活動
  getAllEvents(queryParams = {}) {
    const { page = 1, limit = 10, keyword = '', tags = [], future, sort = 'desc' } = queryParams;

    // 複製一份資料，避免修改原始資料
    let filteredEvents = [...this.events];

    // 只顯示未來活動
    if (future === 'true' || future === true) {
      const now = new Date();
      filteredEvents = filteredEvents.filter(event => {
        // 結束時間必須在當前時間之後才算是未來活動
        const endDate = new Date(event.endDate || event.date);
        return endDate > now;
      });
    } else if (future === 'false' || future === false) {
      // 顯示過去的活動
      const now = new Date();
      filteredEvents = filteredEvents.filter(event => {
        const endDate = new Date(event.endDate || event.date);
        return endDate < now;
      });
    }

    // 關鍵字搜尋
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      filteredEvents = filteredEvents.filter(event =>
        event.title.toLowerCase().includes(lowerKeyword) ||
        event.excerpt.toLowerCase().includes(lowerKeyword) ||
        event.location.toLowerCase().includes(lowerKeyword)
      );
    }

    // 標籤篩選
    if (tags && tags.length > 0) {
      const tagArray = typeof tags === 'string' ? tags.split(',') : tags;
      if (tagArray.length > 0) {
        filteredEvents = filteredEvents.filter(event =>
          tagArray.some(tag => event.tags.includes(tag))
        );
      }
    }

    filteredEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 計算總頁數
    const totalEvents = filteredEvents.length;
    const totalPages = Math.ceil(totalEvents / limit) || 1;

    // 分頁
    const startIndex = (page - 1) * limit;
    const paginatedEvents = filteredEvents.slice(startIndex, startIndex + limit);

    return {
      events: paginatedEvents,
      totalPages,
      currentPage: parseInt(page),
      totalEvents
    };
  }

  // 根據 ID 獲取單個活動
  getEventById(id) {
    return this.events.find(event => event.id === parseInt(id));
  }

  // 根據時間範圍獲取活動
  getEventsByDateRange(startDate, endDate) {
    return this.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= startDate && eventDate <= endDate;
    });
  }

  // 獲取歷史活動 (過去的活動)
  // 修正歷史活動的篩選方法

  getHistoricalEvents({ keyword = '', tags = [], page = 1, limit = 10 } = {}) {
    const currentDate = new Date();

    // 先過濾出所有已結束的活動 (使用 endDate 判斷)
    let filteredEvents = this.events.filter(event => {
      const endDate = new Date(event.endDate);
      return endDate < currentDate;
    });

    // 根據關鍵字搜尋
    if (keyword) {
      const lowercasedKeyword = keyword.toLowerCase();
      filteredEvents = filteredEvents.filter(event =>
        event.title.toLowerCase().includes(lowercasedKeyword) ||
        event.description.toLowerCase().includes(lowercasedKeyword) ||
        event.location.toLowerCase().includes(lowercasedKeyword)
      );
    }

    // 根據標籤過濾
    if (tags && tags.length > 0) {
      filteredEvents = filteredEvents.filter(event =>
        tags.some(tag => event.tags.includes(tag))
      );
    }

    // 根據結束日期排序 (最近結束的排前面)
    filteredEvents.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

    // 計算分頁資訊
    const totalEvents = filteredEvents.length;
    const totalPages = Math.ceil(totalEvents / limit) || 1;

    // 套用分頁
    const startIndex = (page - 1) * limit;
    const pagedEvents = filteredEvents.slice(startIndex, startIndex + limit);

    return {
      events: pagedEvents,
      page,
      totalPages,
      totalEvents
    };
  }

  getEventTags() {
    // 從所有活動中收集唯一的標籤
    const allTags = new Set();
    this.events.forEach(event => {
      if (event.tags && Array.isArray(event.tags)) {
        event.tags.forEach(tag => allTags.add(tag));
      }
    });

    // 轉換為帶有 label 和 value 的格式
    const tagList = Array.from(allTags).map(tag => ({
      value: tag,
      label: this.formatTagLabel(tag)
    }));

    // 定義標籤的優先順序
    const tagPriority = {
      'online': 1,    // 線上優先
      'offline': 2,   // 實體次之
      'workshop': 3,  // 工作坊
      'talk': 4,      // 分享會
      // 其他標籤...
    };

    // 根據優先順序排序
    return tagList.sort((a, b) => {
      // 如果兩個標籤都有優先順序，按優先順序排序
      if (tagPriority[a.value] && tagPriority[b.value]) {
        return tagPriority[a.value] - tagPriority[b.value];
      }
      // 如果只有 a 有優先順序，a 排前面
      else if (tagPriority[a.value]) {
        return -1;
      }
      // 如果只有 b 有優先順序，b 排前面
      else if (tagPriority[b.value]) {
        return 1;
      }
      // 如果都沒有優先順序，按名稱字母順序排序
      else {
        return a.label.localeCompare(b.label);
      }
    });
  }

  // 格式化標籤顯示名稱
  formatTagLabel(tag) {
    const labelMap = {
      'online': "線上",
      'offline': "實體",
      'workshop': "工作坊",
      'talk': "分享會",
    };

    return labelMap[tag] || tag.charAt(0).toUpperCase() + tag.slice(1);
  }
}

// 匯出單例
export default new EventModel();

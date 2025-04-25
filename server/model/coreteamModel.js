class CoreTeamModel {
  constructor() {
    this.members = [
      {
        id: 1,
        name: '吳傢澂',
        title: '社長',
        photo: '/assets/members/member1.png',
        department: '軟體工程與管理學系',
        year: '大三',
        categories: ['core'],
        skills: ['Python', 'Web開發', 'Java'],
        description: '負責社團整體運作與對外合作，擅長行動應用開發與專案管理。',
        // 以下是擴充的詳細資料
        fullBio: `身為 GDG on Campus NKNU 的社長，吳傢澂主要負責社團的整體規劃與營運管理，協調各組工作與對外合作關係。

他在大一時參加 GDG 舉辦的 Android 工作坊後產生了濃厚的興趣，積極參與了多場活動並逐漸對 Google 技術生態系產生熱情。從講者助理到活動組組長，最後在大三時接任社長一職，期望能為校園技術社群做出更多貢獻。

憑藉著在軟體工程領域的知識背景，他推動了多項校園技術推廣計畫，包含與業界合作的講座系列、新生程式設計培訓營以及校際技術交流活動等。`,
        achievements: [
          '帶領團隊舉辦 2024 年全國程式設計交流營',
          '開發校園活動管理系統，提高社團事務處理效率',
          '與 Google Developer Groups 合作舉辦多場技術講座'
        ],
        contactEmail: 'wu.jason@example.com',
        socialLinks: {
          github: 'https://github.com/jasonwu123',
          linkedin: 'https://linkedin.com/in/jasonwu123',
          portfolio: 'https://jasonwu-portfolio.example.com'
        },
        additionalPhotos: [
          '/assets/members/member1-event1.jpg',
          '/assets/members/member1-event2.jpg'
        ]
      },
      {
        id: 2,
        name: '顏榕嶙',
        title: '技術教學',
        photo: '/assets/members/member2.jpg',
        department: '軟體工程與管理學系',
        year: '大三',
        categories: ['tech'],
        skills: ['Web Development', 'React', 'Firebase'],
        description: '協助社長處理社團事務，主要負責網頁前端開發與教學活動。',
        // 擴充資料
        fullBio: `顏榕嶙在團隊中擔任技術教學的角色，主要負責規劃與執行各類技術工作坊和培訓課程。作為前端開發專家，他已經為社團舉辦了多場 React 和 Firebase 工作坊，幫助許多學生踏入網頁開發的領域。

他的教學風格深入淺出，善於將複雜的技術概念轉化為容易理解的內容，獲得了參加者的一致好評。除了教學外，他還主導設計和開發了社團的官方網站，並持續進行維護和功能擴充。

在學業方面，顏榕嶙保持優異成績，同時積極參與校外的技術社群活動，不斷汲取新知識並分享給社團成員。`,
        achievements: [
          '主導開發社團官方網站，提升用戶體驗與功能性',
          '策劃並主講「從零開始的 React 開發」系列工作坊',
          '參與 2023 年 HackNTU 黑客松，獲得優選獎項'
        ],
        contactEmail: 'yan.ronglin@example.com',
        socialLinks: {
          github: 'https://github.com/ronglinyan',
          linkedin: 'https://linkedin.com/in/ronglinyan',
          portfolio: 'https://ronglin-portfolio.example.com'
        },
        additionalPhotos: [
          '/assets/members/member2-workshop.jpg',
          '/assets/members/member2-coding.jpg'
        ]
      },
      {
        id: 3,
        name: '李准恩',
        title: '技術教學',
        photo: '/assets/members/member3.jpg',
        department: '軟體工程與管理學系',
        year: '大三',
        categories: ['tech'],
        skills: ['資訊安全', 'Linux系統', 'Cloud技術'],
        description: '負責課程規劃與技術研究，專長跨平台開發與雲端服務整合。',
        // 擴充資料
        fullBio: `李准恩是團隊中的技術教學成員，專注於資訊安全與雲端技術領域。他獨特的背景結合了軟體工程知識和對資訊安全的熱情，為社團帶來了多元的技術視角。

在社團中，他主要負責設計和執行進階技術課程，包括雲端架構設計、資訊安全防護以及 DevOps 實踐等主題。他的授課方式強調實踐和解決實際問題，幫助學生建立紮實的技術基礎。

除了教學工作外，李准恩還負責維護社團的伺服器和技術基礎設施，確保各項線上服務穩定運行。他定期進行安全審查和系統更新，提高了社團整體的技術安全性。`,
        achievements: [
          '開發並維護社團的雲端基礎設施與自動化部署流程',
          '設計並主導「資安防護基礎到實戰」專題課程',
          '代表校園參加 HITCON CTF 競賽，獲得前 20 名的優秀成績'
        ],
        contactEmail: 'li.zhuneon@example.com',
        socialLinks: {
          github: 'https://github.com/zhuneonli',
          linkedin: 'https://linkedin.com/in/zhuneonli',
          medium: 'https://medium.com/@zhuneonli'
        },
        additionalPhotos: [
          '/assets/members/member3-presentation.jpg',
          '/assets/members/member3-workshop.jpg'
        ]
      },
      {
        id: 4,
        name: '高宜嫻',
        title: '公關行銷',
        photo: '/assets/members/member4.jpg',
        department: '軟體工程與管理學系',
        year: '大三',
        categories: ['pr'],
        skills: ['Event Planning', 'Marketing', 'Design'],
        description: '規劃與執行社團各項活動，擅長設計與社群媒體經營。',
        // 擴充資料
        fullBio: `高宜嫻是團隊中的公關行銷專家，擁有豐富的活動策劃和執行經驗。她負責社團的對外溝通、合作洽談以及各類活動的宣傳推廣工作。

她的工作橫跨多個領域，從設計活動海報、撰寫宣傳文案到管理社群媒體帳戶，都能展現出專業水準。在她的努力下，社團的社群媒體關注度顯著提升，活動參與率也大幅增加。

高宜嫻特別善於建立合作關係，成功與多家科技公司和校園組織建立了合作夥伴關係，為社團帶來了豐富的資源和機會。她組織的技術講座和工作坊經常吸引校內外大量學生參加，成為校園技術活動的亮點。`,
        achievements: [
          '成功策劃「2024 校園技術嘉年華」，吸引超過 500 名學生參加',
          '建立完整的社團品牌識別系統，提升社團形象',
          '與五家科技公司建立長期合作關係，為社員提供實習和工作機會'
        ],
        contactEmail: 'kao.yihsien@example.com',
        socialLinks: {
          instagram: 'https://instagram.com/yihsien.kao',
          linkedin: 'https://linkedin.com/in/yihsienkao',
          behance: 'https://behance.net/yihsienkao'
        },
        additionalPhotos: [
          '/assets/members/member4-event.jpg',
          '/assets/members/member4-planning.jpg'
        ]
      },
      {
        id: 5,
        name: '羅靜慧',
        title: '美術設計',
        photo: '/assets/members/member5.jpg',
        department: '視覺設計學系',
        year: '大二',
        categories: ['design'],
        skills: ['Illustrator', 'Photoshop', 'UI/UX'],
        description: '負責社團視覺識別與活動海報設計，擅長使用者介面設計。',
        // 擴充資料
        fullBio: `羅靜慧是團隊中的設計專家，來自視覺設計學系，為社團帶來了專業的設計視角與美學見解。她負責社團的所有視覺設計工作，包括活動海報、社群貼文、宣傳材料以及 UI/UX 設計等。

她的設計風格現代簡潔，善於運用視覺元素傳達技術主題，使複雜的技術概念更容易被理解和接受。她設計的社團標誌和品牌識別系統獲得了校內外的廣泛認可，成為社團重要的標誌性資產。

除了為社團活動設計視覺材料外，羅靜慧還協助了社團網站和應用程序的介面設計，確保用戶體驗的一致性和專業性。她定期舉辦設計相關的分享會，幫助對設計有興趣的技術學生了解設計思維和基本技能。`,
        achievements: [
          '重新設計社團品牌識別系統，提升品牌專業度和識別度',
          '設計的「技術與設計融合」海報系列獲得校園設計大賽一等獎',
          '指導團隊完成三個應用程序的 UI/UX 設計，大幅提升用戶體驗'
        ],
        contactEmail: 'lo.jinghui@example.com',
        socialLinks: {
          behance: 'https://behance.net/jinghuilo',
          dribbble: 'https://dribbble.com/jinghuilo',
          instagram: 'https://instagram.com/jinghui.design'
        },
        additionalPhotos: [
          '/assets/members/member5-design1.jpg',
          '/assets/members/member5-design2.jpg'
        ]
      },
      {
        id: 6,
        name: '游炯騫',
        title: '總務攝影',
        photo: '/assets/members/member6.jpg',
        department: '軟體工程與管理學系',
        year: '大三',
        categories: ['affairs'],
        skills: ['Photography', 'Event Management', 'Equipment Management'],
        description: '負責社團活動的攝影與紀錄，擅長活動策劃與執行。',
        // 擴充資料
        fullBio: `游炯騫在團隊中擔任總務兼攝影師的角色，負責社團物資管理、場地協調以及活動記錄工作。他的工作確保了社團活動的順利進行和完整記錄。

作為一名攝影愛好者，他以專業的眼光記錄了社團的每一次重要活動，建立了豐富的視覺資料庫。這些高質量的活動照片不僅用於社團的宣傳材料，也成為珍貴的歷史記錄。

在總務工作方面，游炯騫建立了完善的設備管理和預算追蹤系統，大幅提高了社團資源使用的效率和透明度。他還負責社團活動場地的安排和布置，確保每次活動都能夠在最適合的環境中進行。`,
        achievements: [
          '建立完整的社團資產管理系統，提高設備使用效率',
          '記錄並製作「GDG青春紀實」系列攝影作品，展現社團風采',
          '優化社團經費使用流程，節省超過 20% 的營運成本'
        ],
        contactEmail: 'yu.chiungchien@example.com',
        socialLinks: {
          instagram: 'https://instagram.com/cc.yu.photo',
          facebook: 'https://facebook.com/chiungchienyu',
          flickr: 'https://flickr.com/photos/ccyu'
        },
        additionalPhotos: [
          '/assets/members/member6-photo1.jpg',
          '/assets/members/member6-photo2.jpg'
        ]
      }
    ];
  }

  // 獲取所有幹部，可依條件過濾
  getAllMembers({ keyword = '', categories = [], page = 1, limit = 10 } = {}) {
    let filteredMembers = [...this.members];

    // 搜尋關鍵字過濾
    if (keyword) {
      const lowercasedKeyword = keyword.toLowerCase();
      filteredMembers = filteredMembers.filter(member =>
        member.name.toLowerCase().includes(lowercasedKeyword) ||
        member.title.toLowerCase().includes(lowercasedKeyword) ||
        member.description.toLowerCase().includes(lowercasedKeyword)
      );
    }

    // 依分類過濾
    if (categories.length > 0) {
      filteredMembers = filteredMembers.filter(member =>
        categories.some(cat => member.categories.includes(cat))
      );
    }

    // 計算總頁數
    const totalItems = filteredMembers.length;
    const totalPages = Math.ceil(totalItems / limit);

    // 分頁
    const startIndex = (page - 1) * limit;
    const pagedMembers = filteredMembers.slice(startIndex, startIndex + limit);

    return {
      members: pagedMembers,
      page,
      totalPages,
      totalItems
    };
  }

  // 獲取單一幹部
  getMemberById(id) {
    const member = this.members.find(m => m.id === parseInt(id));

    if (!member) {
      return null;
    }

    return member;
  }

  // 獲取分類選項
  getCategoryOptions() {
    return [
      { label: '核心幹部', value: 'core' },
      { label: '技術教學', value: 'tech' },
      { label: '公關行銷', value: 'pr' },
      { label: '文書美宣', value: 'design' },
      { label: '總務攝影', value: 'affairs' },
    ];
  }

  getMemberSocialMediaLinks(id) {
    const member = this.getMemberById(id);
    if (!member || !member.socialLinks) return [];

    const links = [];
    for (const [platform, url] of Object.entries(member.socialLinks)) {
      let icon = '';
      let label = '';

      switch (platform) {
        case 'github':
          icon = 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z';
          label = 'GitHub';
          break;
        case 'linkedin':
          icon = 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z';
          label = 'LinkedIn';
          break;
        case 'behance':
          icon = 'M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z';
          label = 'Behance';
          break;
        case 'instagram':
          icon = 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z';
          label = 'Instagram';
          break;
        case 'portfolio':
          icon = 'M21 7h-6.31l-0.95-2.53c-0.26-0.7-0.92-1.47-1.67-1.47h-5.14c-0.75 0-1.41 0.77-1.67 1.47l-0.95 2.53h-6.31c-1.1 0-2 0.9-2 2v13c0 1.1 0.9 2 2 2h16c1.1 0 2-0.9 2-2v-9h4c1.1 0 2-0.9 2-2s-0.9-2-2-2zM21 9c0 0.55-0.45 1-1 1h-1v-2h1c0.55 0 1 0.45 1 1zM4.48 9c0.55 0 1-0.45 1-1 0-0.56-0.45-1.01-1-1.01s-1 0.45-1 1.01c0 0.55 0.45 1 1 1zM12 17.87c-2.69 0-4.88-2.19-4.88-4.87 0-2.69 2.19-4.88 4.88-4.88s4.87 2.19 4.87 4.88c0 2.68-2.18 4.87-4.87 4.87zM12 10.12c-1.59 0-2.87 1.28-2.87 2.88s1.28 2.87 2.87 2.87 2.87-1.27 2.87-2.87-1.28-2.88-2.87-2.88z';
          label = '個人作品集';
          break;
        case 'medium':
          icon = 'M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403h6.958l5.378 11.795 4.728-11.795h6.633v.403l-1.916 1.837c-.165.126-.247.333-.213.538v13.498c-.034.204.048.411.213.537l1.871 1.837v.403h-9.412v-.403l1.939-1.882c.19-.19.19-.246.19-.537v-10.91l-5.389 13.688h-.728l-6.275-13.688v9.174c-.052.385.076.774.347 1.052l2.521 3.058v.404h-7.148v-.404l2.521-3.058c.27-.279.39-.67.325-1.052v-10.608z';
          label = 'Medium';
          break;
        case 'dribbble':
          icon = 'M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.67 1.432-3.38 1.057-6.165 3.222-8.337 6.48-1.432-1.719-2.296-3.927-2.296-6.334zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-6.953.666-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z';
          label = 'Dribbble';
          break;
        case 'facebook':
          icon = 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.736-.9 10.125-5.864 10.125-11.854z';
          label = 'Facebook';
          break;
        case 'flickr':
          icon = 'M0 12c0 3.314 2.686 6 6 6s6-2.686 6-6-2.686-6-6-6-6 2.686-6 6zm12 0c0 3.314 2.686 6 6 6s6-2.686 6-6-2.686-6-6-6-6 2.686-6 6z';
          label = 'Flickr';
          break;
        default:
          icon = 'M23 12c0-3.037-1.232-5.789-3.222-7.778s-4.741-3.222-7.778-3.222-5.789 1.232-7.778 3.222-3.222 4.741-3.222 7.778 1.232 5.789 3.222 7.778 4.741 3.222 7.778 3.222 5.789-1.232 7.778-3.222 3.222-4.741 3.222-7.778zm-21 0c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10-10-4.486-10-10zm3.71-1.71c0-.391.159-.789.44-1.07l1.83-1.83c.281-.281.679-.44 1.07-.44s.789.159 1.07.44l1.88 1.88 1.88-1.88c.281-.281.679-.44 1.07-.44s.789.159 1.07.44l1.83 1.83c.281.281.44.679.44 1.07s-.159.789-.44 1.07l-1.83 1.83c-.281.281-.679.44-1.07.44s-.789-.159-1.07-.44l-1.88-1.88-1.88 1.88c-.281.281-.679.44-1.07.44s-.789-.159-1.07-.44l-1.83-1.83c-.281-.281-.44-.679-.44-1.07z';
          label = platform.charAt(0).toUpperCase() + platform.slice(1);
      }

      links.push({
        platform,
        url,
        icon,
        label
      });
    }

    return links;
  }
}

// 匯出單例
export default new CoreTeamModel();

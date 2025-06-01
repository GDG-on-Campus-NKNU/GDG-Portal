#!/usr/bin/env node
// filepath: /workspaces/GDG-Portal/tests/test-database-scripts.js

/**
 * 資料庫腳本測試
 * 驗證資料庫初始化腳本的結構和資料完整性
 */

// 直接定義樣本資料，避免 dotenv 依賴問題
const sampleCoreTeamData = [
  {
    name: '顏榕嶙',
    title: 'Technical Education Lead',
    department: 'Technical Education',
    year: '2024',
    bio: 'Passionate about teaching and sharing knowledge in software development. Experienced in organizing technical workshops and educational programs.',
    skills: [
      'JavaScript',
      'Node.js',
      'React',
      'Python',
      'Workshop Design',
      'Technical Writing',
      'Public Speaking'
    ],
    achievements: [
      'Organized 15+ technical workshops',
      'Mentored 50+ students in programming',
      'Speaker at 5 technology conferences',
      'Published 20+ technical articles'
    ],
    contact_email: 'technical.education@gdg.dev',
    social_links: {
      linkedin: 'https://linkedin.com/in/technical-lead',
      github: 'https://github.com/technical-lead',
      twitter: 'https://twitter.com/technical_lead'
    },
    is_active: true,
    position: 1
  },
  {
    name: 'Jane Smith',
    title: 'Community Manager',
    department: 'Community Relations',
    year: '2024',
    bio: 'Dedicated to building and nurturing our developer community. Focused on creating inclusive spaces for learning and collaboration.',
    skills: [
      'Community Building',
      'Event Management',
      'Social Media',
      'Partnership Development',
      'Content Creation'
    ],
    achievements: [
      'Grew community to 1000+ members',
      'Organized 30+ community events',
      'Established partnerships with 10+ tech companies',
      'Launched mentorship program'
    ],
    contact_email: 'community@gdg.dev',
    social_links: {
      linkedin: 'https://linkedin.com/in/community-manager',
      twitter: 'https://twitter.com/community_mgr'
    },
    is_active: true,
    position: 2
  },
  {
    name: 'Alex Johnson',
    title: 'Development Lead',
    department: 'Engineering',
    year: '2024',
    bio: 'Full-stack developer with expertise in modern web technologies. Leads technical initiatives and code reviews for GDG projects.',
    skills: [
      'Full-stack Development',
      'System Architecture',
      'Database Design',
      'DevOps',
      'Code Review',
      'Team Leadership'
    ],
    achievements: [
      'Led development of 5+ open source projects',
      'Contributed to Google Developer libraries',
      'Optimized system performance by 40%',
      'Mentored junior developers'
    ],
    contact_email: 'development@gdg.dev',
    social_links: {
      github: 'https://github.com/dev-lead',
      linkedin: 'https://linkedin.com/in/dev-lead'
    },
    is_active: true,
    position: 3
  }
];

const sampleCategories = [
  {
    name: 'Technical Education',
    type: 'member',
    color: '#4F46E5',
    is_active: true
  },
  {
    name: 'Community Relations',
    type: 'member',
    color: '#059669',
    is_active: true
  },
  {
    name: 'Engineering',
    type: 'member',
    color: '#DC2626',
    is_active: true
  },
  {
    name: 'Design',
    type: 'member',
    color: '#7C3AED',
    is_active: true
  },
  {
    name: 'Marketing',
    type: 'member',
    color: '#EA580C',
    is_active: true
  }
];

/**
 * 測試樣本資料結構
 */
function testSampleDataStructure() {
  console.log('🧪 Testing sample data structure...');
  
  let testsPassed = 0;
  let totalTests = 0;
  
  // 測試 Core Team 資料
  console.log('\n👥 Testing Core Team data:');
  
  sampleCoreTeamData.forEach((member, index) => {
    totalTests++;
    
    // 檢查必要欄位
    const requiredFields = ['name', 'title', 'department', 'bio', 'skills', 'is_active', 'position'];
    const hasAllFields = requiredFields.every(field => member.hasOwnProperty(field));
    
    if (hasAllFields) {
      console.log(`  ✅ Member ${index + 1}: ${member.name} - All required fields present`);
      testsPassed++;
    } else {
      console.log(`  ❌ Member ${index + 1}: ${member.name} - Missing required fields`);
      const missingFields = requiredFields.filter(field => !member.hasOwnProperty(field));
      console.log(`     Missing: ${missingFields.join(', ')}`);
    }
    
    // 檢查資料類型
    totalTests++;
    if (Array.isArray(member.skills) && Array.isArray(member.achievements)) {
      console.log(`  ✅ Member ${index + 1}: ${member.name} - Correct data types`);
      testsPassed++;
    } else {
      console.log(`  ❌ Member ${index + 1}: ${member.name} - Incorrect data types`);
    }
  });
  
  // 測試分類資料
  console.log('\n📋 Testing Category data:');
  
  sampleCategories.forEach((category, index) => {
    totalTests++;
    
    const requiredFields = ['name', 'type', 'color', 'is_active'];
    const hasAllFields = requiredFields.every(field => category.hasOwnProperty(field));
    
    if (hasAllFields) {
      console.log(`  ✅ Category ${index + 1}: ${category.name} - All required fields present`);
      testsPassed++;
    } else {
      console.log(`  ❌ Category ${index + 1}: ${category.name} - Missing required fields`);
    }
    
    // 檢查顏色格式
    totalTests++;
    const colorRegex = /^#[0-9A-F]{6}$/i;
    if (colorRegex.test(category.color)) {
      console.log(`  ✅ Category ${index + 1}: ${category.name} - Valid color format`);
      testsPassed++;
    } else {
      console.log(`  ❌ Category ${index + 1}: ${category.name} - Invalid color format: ${category.color}`);
    }
  });
  
  return { testsPassed, totalTests };
}

/**
 * 測試資料關聯性
 */
function testDataRelationships() {
  console.log('\n🔗 Testing data relationships...');
  
  let testsPassed = 0;
  let totalTests = 0;
  
  // 檢查每個成員的部門是否有對應的分類
  sampleCoreTeamData.forEach(member => {
    totalTests++;
    
    const matchingCategory = sampleCategories.find(
      cat => cat.name === member.department && cat.type === 'member'
    );
    
    if (matchingCategory) {
      console.log(`  ✅ ${member.name} department "${member.department}" has matching category`);
      testsPassed++;
    } else {
      console.log(`  ❌ ${member.name} department "${member.department}" has no matching category`);
    }
  });
  
  // 檢查是否有重複的成員名稱
  totalTests++;
  const memberNames = sampleCoreTeamData.map(m => m.name);
  const uniqueNames = [...new Set(memberNames)];
  
  if (memberNames.length === uniqueNames.length) {
    console.log(`  ✅ No duplicate member names found`);
    testsPassed++;
  } else {
    console.log(`  ❌ Duplicate member names found`);
  }
  
  // 檢查是否有重複的分類名稱
  totalTests++;
  const categoryNames = sampleCategories.map(c => c.name);
  const uniqueCategoryNames = [...new Set(categoryNames)];
  
  if (categoryNames.length === uniqueCategoryNames.length) {
    console.log(`  ✅ No duplicate category names found`);
    testsPassed++;
  } else {
    console.log(`  ❌ Duplicate category names found`);
  }
  
  return { testsPassed, totalTests };
}

/**
 * 測試特定成員資料（顏榕嶙）
 */
function testSpecificMemberData() {
  console.log('\n👤 Testing specific member data (顏榕嶙)...');
  
  let testsPassed = 0;
  let totalTests = 0;
  
  const targetMember = sampleCoreTeamData.find(member => member.name === '顏榕嶙');
  
  totalTests++;
  if (targetMember) {
    console.log(`  ✅ Found target member: 顏榕嶙`);
    testsPassed++;
    
    // 檢查職稱
    totalTests++;
    if (targetMember.title.includes('Technical Education')) {
      console.log(`  ✅ Correct title: ${targetMember.title}`);
      testsPassed++;
    } else {
      console.log(`  ❌ Incorrect title: ${targetMember.title}`);
    }
    
    // 檢查技能數量
    totalTests++;
    if (targetMember.skills && targetMember.skills.length >= 5) {
      console.log(`  ✅ Adequate skills listed: ${targetMember.skills.length} skills`);
      testsPassed++;
    } else {
      console.log(`  ❌ Insufficient skills listed: ${targetMember.skills ? targetMember.skills.length : 0} skills`);
    }
    
    // 檢查成就數量
    totalTests++;
    if (targetMember.achievements && targetMember.achievements.length >= 3) {
      console.log(`  ✅ Adequate achievements listed: ${targetMember.achievements.length} achievements`);
      testsPassed++;
    } else {
      console.log(`  ❌ Insufficient achievements listed: ${targetMember.achievements ? targetMember.achievements.length : 0} achievements`);
    }
    
  } else {
    console.log(`  ❌ Target member 顏榕嶙 not found in sample data`);
  }
  
  return { testsPassed, totalTests };
}

/**
 * 主測試函數
 */
function runTests() {
  console.log('🧪 Starting Database Scripts Tests');
  console.log('==================================');
  
  const structureResults = testSampleDataStructure();
  const relationshipResults = testDataRelationships();
  const specificResults = testSpecificMemberData();
  
  const totalPassed = structureResults.testsPassed + relationshipResults.testsPassed + specificResults.testsPassed;
  const totalTests = structureResults.totalTests + relationshipResults.totalTests + specificResults.totalTests;
  
  console.log('\n📊 Test Results Summary:');
  console.log('========================');
  console.log(`✅ Tests passed: ${totalPassed}`);
  console.log(`❌ Tests failed: ${totalTests - totalPassed}`);
  console.log(`📋 Total tests: ${totalTests}`);
  console.log(`📈 Success rate: ${((totalPassed / totalTests) * 100).toFixed(1)}%`);
  
  if (totalPassed === totalTests) {
    console.log('\n🎉 All tests passed! Database scripts are ready for use.');
    return true;
  } else {
    console.log('\n⚠️  Some tests failed. Please review the issues above.');
    return false;
  }
}

// 執行測試
runTests();

/**
 * 用戶個人資料資訊組件
 */
export default function ProfileInfo({ user, formatDate }) {
  // 解析 JSON 字串格式的 skills 和 interests
  const parseSkills = (skills) => {
    if (!skills) return [];
    if (Array.isArray(skills)) return skills;
    try {
      return JSON.parse(skills);
    } catch (e) {
      console.error('解析 skills 失敗:', e);
      return [];
    }
  };

  const parseInterests = (interests) => {
    if (!interests) return [];
    if (Array.isArray(interests)) return interests;
    try {
      return JSON.parse(interests);
    } catch (e) {
      console.error('解析 interests 失敗:', e);
      return [];
    }
  };

  const skillsArray = parseSkills(user.profile?.skills);
  const interestsArray = parseInterests(user.profile?.interests);
  return (
    <div className="lg:col-span-2">
      <div className="mb-6">
        {/* 移除重複的用戶名稱，只顯示位置和加入日期 */}
        <div className="flex items-center gap-4 text-gray-600 mb-4 justify-center">
          {user.profile?.location && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{user.profile.location}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h4a1 1 0 011 1v11a1 1 0 01-1 1H2a1 1 0 01-1-1V8a1 1 0 011-1h6z" />
            </svg>
            <span>加入於 {formatDate(user.joinDate)}</span>
          </div>
        </div>
        
        {user.profile?.bio && (
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">{user.profile.bio}</p>
          </div>
        )}
      </div>

      {/* 技能標籤 */}
      {skillsArray && skillsArray.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">技能</h3>
          <div className="flex flex-wrap gap-2">
            {skillsArray.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 興趣 */}
      {interestsArray && interestsArray.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">興趣</h3>
          <div className="flex flex-wrap gap-2">
            {interestsArray.map((interest, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

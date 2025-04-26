import { useNavigate } from 'react-router-dom';

export function PostCard({
  id,
  title,
  date,
  excerpt,
  tags = [],
  isPinned = false
}) {
  const navigate = useNavigate();

  const handleReadMore = (e) => {
    e.preventDefault(); // 阻止默認行為
    navigate(`/announcements/${id}`);
  };

  return (
    <article className="bg-white shadow rounded-lg p-5 border border-gray-100 hover:shadow-lg transition duration-300 relative">
      {isPinned && (
        <div className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full p-1 shadow-md" title="置頂公告">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      )}
      <h2 className="text-lg font-semibold text-gray-800 mb-1">{title}</h2>
      <p className="text-sm text-gray-500 mb-2">{date}</p>
      <p className="text-sm text-gray-700 mb-3">{excerpt}</p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map(tag => (
            <span
              key={tag}
              className={`text-xs px-2 py-1 rounded-full ${tag === 'tech' ? 'bg-blue-100 text-blue-700' :
                  tag === 'event' ? 'bg-purple-100 text-purple-700' :
                    tag === 'notice' ? 'bg-green-100 text-green-700' :
                      tag === 'course' ? 'bg-yellow-100 text-yellow-700' :
                        tag === 'internship' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-700'
                }`}
            >
              {tag === 'tech' ? '技術' :
                tag === 'event' ? '活動' :
                  tag === 'notice' ? '公告' :
                    tag === 'course' ? '課程' :
                      tag === 'internship' ? '實習' : tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-end mt-3">
        <button
          onClick={handleReadMore}
          className="text-sm text-blue-600 hover:text-blue-800 transition focus:outline-none"
        >
          View details →
        </button>
      </div>
    </article>
  );
}

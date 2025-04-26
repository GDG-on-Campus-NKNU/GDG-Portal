import LoadingSpinner from '../general/LoadingSpinner';

export default function PinnedAnnouncements({ pinnedAnnouncements, loading }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        置頂公告
      </h3>

      {loading ? (
        <div className="flex justify-center p-3">
          <LoadingSpinner size={6} />
        </div>
      ) : (
        <div className="space-y-3">
          {pinnedAnnouncements && pinnedAnnouncements.length > 0 ? (
            pinnedAnnouncements.map(announcement => (
              <a
                key={announcement.id}
                href={`/announcements/${announcement.id}`}
                className="block bg-gray-50 rounded hover:bg-gray-100 transition"
              >
                <div className="border-l-4 border-yellow-500 p-3">
                  <h4 className="font-medium text-gray-800">{announcement.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(announcement.date).toLocaleDateString()}
                  </p>
                  {announcement.tags && announcement.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {announcement.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-yellow-50 text-yellow-600 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </a>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-2">目前沒有置頂公告</p>
          )}

          <div className="mt-4 text-center">
            <a href="/announcements" className="text-blue-600 text-sm hover:underline">查看所有公告 →</a>
          </div>
        </div>
      )}
    </div>
  );
}

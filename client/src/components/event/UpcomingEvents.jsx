import React from 'react';
import LoadingSpinner from '../general/LoadingSpinner';

const UpcomingEvents = ({ events, loading, formatEventTimeRange, getTagLabel }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
        </svg>
        即將到來的活動
      </h3>

      {loading ? (
        <div className="flex justify-center p-3">
          <LoadingSpinner size={6} />
        </div>
      ) : (
        <div className="space-y-3">
          {events && events.length > 0 ? (
            events.map(ev => (
              <a
                key={ev.id}
                href={`/events/${ev.id}`}
                className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition"
              >
                <h4 className="font-medium text-blue-600">{ev.title}</h4>
                <p className="text-xs text-gray-500">
                  {ev.endDate ? formatEventTimeRange(ev.date, ev.endDate) : new Date(ev.date).toLocaleDateString()}
                </p>
                <div className="flex mt-1 gap-1">
                  {ev.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                      {getTagLabel(tag)}
                    </span>
                  ))}
                </div>
              </a>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-2">
              近兩週內沒有活動
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;

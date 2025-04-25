import { useNavigate } from 'react-router-dom';

export default function MemberCard({
  id,
  name,
  title,
  photo,
  department,
  year,
  skills = [],
  description
}) {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/members/${id}`);
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="relative h-56">
        <img
          className="w-full h-full object-cover"
          src={photo || 'https://via.placeholder.com/300x400?text=No+Photo'}
          alt={`${name} - ${title}`}
        />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800">{name}</h3>
        <p className="text-blue-600 font-medium">{title}</p>

        <div className="mt-2 text-sm text-gray-500">
          <p>
            {department} · {year}
          </p>
        </div>

        <p className="mt-3 text-gray-600 text-sm line-clamp-3">{description}</p>

        {skills.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-1">
              {skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 3 && (
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                  +{skills.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <button onClick={handleViewDetail} className="text-blue-600 text-sm hover:text-blue-800 transition">
            View details →
          </button>
        </div>
      </div>
    </div>
  );
}

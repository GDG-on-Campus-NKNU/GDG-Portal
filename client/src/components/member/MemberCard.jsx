import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    <motion.div
      className="group bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onClick={handleViewDetail}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          src={photo || 'https://via.placeholder.com/300x400?text=No+Photo'}
          alt={`${name} - ${title}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg text-slate-900">{name}</h3>
        <p className="text-blue-600 font-medium">{title}</p>

        <div className="mt-2 text-sm text-slate-500">
          <p>
            {department} · {year}
          </p>
        </div>

        <p className="mt-3 text-slate-600 text-sm line-clamp-3">{description}</p>

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
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700">
                  +{skills.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <span className="text-blue-600 text-sm group-hover:text-blue-700 transition-colors flex items-center">
            查看詳情
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

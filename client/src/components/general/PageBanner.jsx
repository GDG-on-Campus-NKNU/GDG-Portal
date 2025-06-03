import { motion } from 'framer-motion';

export default function PageBanner({
  title,
  description,
  style
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={style}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4" />
      <h1 className="text-3xl font-bold mb-2 relative z-10">{title}</h1>
      <p className="text-blue-100 max-w-2xl relative z-10">
        {description}
      </p>
    </motion.div>
  );
}

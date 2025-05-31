import { motion } from 'framer-motion'

export default function FilterPanel({
  filters = [],        // [{ label: '標籤1', value: 'tag1' }, …]
  selected = [],       // ['tag1', 'tag3']
  onToggle = () => { },
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-3 shadow-lg">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
          </svg>
        </div>
        <h4 className="text-lg font-semibold text-slate-800">篩選條件</h4>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {filters.map((f, index) => {
          const active = selected.includes(f.value);
          return (
            <motion.button
              key={f.value}
              onClick={() => onToggle(f.value)}
              className={`
                relative px-4 py-2 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm border
                ${active
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-300/30 shadow-blue-200/50'
                  : 'bg-white/60 text-slate-700 border-white/30 hover:bg-white/80 hover:border-blue-200/50'}
              `}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {active && (
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <span className="relative flex items-center">
                {active && (
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {f.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

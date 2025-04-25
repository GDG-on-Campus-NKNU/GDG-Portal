export default function FilterPanel({
  filters = [],        // [{ label: '標籤1', value: 'tag1' }, …]
  selected = [],       // ['tag1', 'tag3']
  onToggle = () => { },
}) {
  return (
    <div className="mb-4">
      <h4 className="font-medium mb-2">篩選條件</h4>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = selected.includes(f.value);
          return (
            <button
              key={f.value}
              onClick={() => onToggle(f.value)}
              className={`
                px-3 py-1 rounded-full border
                ${active
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}
                transition
              `}
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

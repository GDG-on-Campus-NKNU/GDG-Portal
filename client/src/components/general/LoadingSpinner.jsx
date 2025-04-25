export default function LoadingSpinner({ size = 8, overlay = false, className = '' }) {
  const spinner = (
    <div
      className={`
        animate-spin
        rounded-full
        border-4 border-gray-200
        border-t-blue-600
        ${`w-${size} h-${size}`}
        ${className}
      `}
    />
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
        {spinner}
      </div>
    );
  }
  return spinner;
}

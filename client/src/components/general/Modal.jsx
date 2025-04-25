export default function Modal({
  isOpen,
  onClose,
  title = '',
  children,
  footer = null,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </header>
        <div className="mb-4">
          {children}
        </div>
        {footer && (
          <footer className="flex justify-end space-x-2">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}

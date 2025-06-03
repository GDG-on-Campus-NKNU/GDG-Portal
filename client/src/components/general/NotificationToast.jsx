import { useEffect, useState } from 'react';

export default function NotificationToast({
  message,
  type = 'info',    // 'success' | 'error' | 'warning' | 'info'
  duration = 3000,
  onClose = () => { },
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`
          ${colors[type]} text-white px-4 py-2 rounded shadow-lg
          flex items-center space-x-2
        `}
      >
        <span>{message}</span>
        <button onClick={() => { setVisible(false); onClose(); }}>&times;</button>
      </div>
    </div>
  );
}

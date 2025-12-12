import { useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react';

export type ToastType = 'error' | 'success' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const icons = {
    error: <AlertCircle className="w-5 h-5 text-red-600" />,
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    info: <Info className="w-5 h-5 text-blue-600" />
  };

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border-2 shadow-lg max-w-md ${styles[type]} animate-slide-in`}>
      {icons[type]}
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="p-1 hover:bg-black/5 rounded transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
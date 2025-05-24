import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

const toastColors = {
  success: "bg-gray-50 text-green-600 border-green-300",
  error: "bg-gray-100 text-red-700 border-red-500",
  info: "bg-gray-100 text-blue-700 border-blue-500",
};

const icons = {
  success: (
    <svg
      className="w-6 h-6 text-green-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg
      className="w-6 h-6 text-red-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
  info: (
    <svg
      className="w-6 h-6 text-blue-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M12 12h.01"
      />
    </svg>
  ),
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onClose, 300); // Espera a animação de saída antes de fechar
    }, 9000); // Mostra por 3 segundos

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center space-x-3 border px-4 py-2 rounded shadow transition-all duration-300 transform ${
        toastColors[type]
      } ${exiting ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}
      role="alert"
    >
      {icons[type]}
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default Toast;

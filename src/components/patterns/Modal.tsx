import { XCircle } from "lucide-react";
import { ReactNode } from "react";

type ModalType = {
  title: string;
  description: string;
  isOpen: boolean;
  confirmLabel: string;
  confirmColor: string;
  onConfirm: () => void;
  onClose: () => void;
  children: ReactNode;
  icon?: ReactNode;
};

export default function Modal({
  title,
  description,
  isOpen,
  onConfirm,
  confirmColor,
  confirmLabel,
  onClose,
  children,
  icon,
}: ModalType) {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 transition-all duration-300 ${
        isOpen
          ? "scale-100 opacity-100"
          : "scale-95 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          {icon}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>

        {/* Custom Content */}
        <div className="mb-4">{children}</div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded ${confirmColor}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

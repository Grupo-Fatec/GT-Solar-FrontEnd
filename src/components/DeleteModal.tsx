type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
};

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Exclusão de item',
  description = 'Tem certeza que deseja excluir este item?',
}: DeleteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">{title}</h2>
        <p className="mb-6 text-sm sm:text-base">{description}</p>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-6 py-2 rounded bg-red-700 text-white hover:bg-red-800 transition"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

import React, { useState } from "react";
import { CashFlow } from "../types/CashFlow";
import { Pencil, Trash2, Eye } from "lucide-react";

interface CashFlowTableProps {
  cashFlow: CashFlow[];
  onEdit: (cashFlowId: number) => void;
  onDelete: (cashFlowId: number) => void;
  onView: (cashFlowId: number) => void;
}

const CashFlowTable: React.FC<CashFlowTableProps> = ({
  cashFlow,
  onEdit,
  onDelete,
  onView,
}) => {
  const [selectedCashFlows, setSelectedCashFlows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 7;

  const totalPages = Math.ceil(cashFlow.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = cashFlow.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const toggleCashFlowSelection = (cashFlowId: number) => {
    setSelectedCashFlows((prevSelected) =>
      prevSelected.includes(cashFlowId)
        ? prevSelected.filter((id) => id !== cashFlowId)
        : [...prevSelected, cashFlowId]
    );
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-12 px-3 py-3 text-left">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Tipo</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Descrição</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Valor</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Data</th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-3 py-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={selectedCashFlows.includes(item.id)}
                  onChange={() => toggleCashFlowSelection(item.id)}
                />
              </td>
              <td className="px-6 py-3 text-sm text-gray-900 whitespace-nowrap">{item.tipo}</td>
              <td className="px-6 py-3 text-sm text-gray-900 whitespace-nowrap max-w-xs truncate">{item.descricao}</td>
              <td className="px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                R$ {item.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </td>
              <td className="px-6 py-3 text-sm text-gray-500">{item.dataInicio}</td>
              <td className="px-6 py-3 text-right text-sm flex justify-end space-x-2">
                <button onClick={() => onView(item.id)} className="text-gray-400 hover:text-green-500">
                  <Eye size={18} />
                </button>
                <button onClick={() => onEdit(item.id)} className="text-gray-400 hover:text-blue-500">
                  <Pencil size={18} />
                </button>
                <button onClick={() => onDelete(item.id)} className="text-gray-400 hover:text-red-500">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
        <p className="text-sm text-gray-700">
          Exibindo{" "}
          <span className="font-medium">{startIndex + 1}</span> a{" "}
          <span className="font-medium">{Math.min(startIndex + ITEMS_PER_PAGE, cashFlow.length)}</span>{" "}
          de <span className="font-medium">{cashFlow.length}</span> resultados
        </p>
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            ←
          </button>
          <span className="px-4 py-2 border border-gray-300 bg-white text-sm text-gray-700">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            →
          </button>
        </nav>
      </div>
    </div>
  );
};

export default CashFlowTable;

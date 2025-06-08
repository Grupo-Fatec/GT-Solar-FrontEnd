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

  const toggleCashFlowSelection = (cashFlowId: number) => {
    setSelectedCashFlows((prevSelected) =>
      prevSelected.includes(cashFlowId)
        ? prevSelected.filter((id) => id !== cashFlowId)
        : [...prevSelected, cashFlowId]
    );
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-12 px-3 py-3 text-left">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              Tipo
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              Descrição
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              Valor
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              Data
            </th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {cashFlow.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-3 py-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={selectedCashFlows.includes(item.id)}
                  onChange={() => toggleCashFlowSelection(item.id)}
                />
              </td>
              <td className="px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                {item.tipo}
              </td>
              <td className="px-6 py-3 text-sm text-gray-900 whitespace-nowrap max-w-xs truncate">
                {item.descricao}
              </td>
              <td className="px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                R$ {item.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </td>
              <td className="px-6 py-3 text-sm text-gray-500">{item.dataInicio}</td>
              <td className="px-6 py-3 text-right text-sm flex justify-end space-x-2">
                <button
                  onClick={() => onView(item.id)}
                  className="text-gray-400 hover:text-green-500"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => onEdit(item.id)}
                  className="text-gray-400 hover:text-blue-500"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CashFlowTable;

import React, { useState } from "react";
import { Commission } from "../types/Commission";
import { Pencil, Trash2, Eye } from "lucide-react";
import StatusBadgeCom from "./StatusBadgeCom";

interface CommissionsTableProps {
  commissions: Commission[];
  onEdit: (commissionId: number) => void;
  onDelete: (commissionId: number) => void;
  onView: (commissionId: number) => void;
}

const CommissionsTable: React.FC<CommissionsTableProps> = ({
  commissions,
  onEdit,
  onDelete,
  onView,
}) => {
  const [selectedCommissions, setSelectedCommissions] = useState<number[]>([]);

  const toggleCommissionSelection = (commissionId: number) => {
    setSelectedCommissions((prevSelected) =>
      prevSelected.includes(commissionId)
        ? prevSelected.filter((id) => id !== commissionId)
        : [...prevSelected, commissionId]
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
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Vendedor</th>
            {/* Removida a coluna Cliente */}
            
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Valor</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Data</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {commissions.map((commission) => (
            <tr key={commission.id} className="hover:bg-gray-50">
              <td className="px-3 py-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={selectedCommissions.includes(commission.id)}
                  onChange={() => toggleCommissionSelection(commission.id)}
                />
              </td>
              <td className="px-6 py-3 text-sm text-gray-900">{commission.vendedor}</td>
              {/* Removida a célula Cliente */}
              
              <td className="px-6 py-3 text-sm text-gray-900">
                R$ {commission.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </td>
              <td className="px-6 py-3 text-sm text-gray-500">{commission.dataInicio}</td>
              <td className="px-6 py-3">
                <StatusBadgeCom status={commission.status} />
              </td>
              <td className="px-6 py-3 text-right text-sm flex justify-end space-x-2">
                <button onClick={() => onView(commission.id)} className="text-gray-400 hover:text-green-500">
                  <Eye size={18} />
                </button>
                <button onClick={() => onEdit(commission.id)} className="text-gray-400 hover:text-blue-500">
                  <Pencil size={18} />
                </button>
                <button onClick={() => onDelete(commission.id)} className="text-gray-400 hover:text-red-500">
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

export default CommissionsTable;

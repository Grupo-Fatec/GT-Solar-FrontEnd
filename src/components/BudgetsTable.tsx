import React, { useState } from "react";

import { Pencil, Trash2 } from "lucide-react";
import { IProject } from "@/interfaces/IProjects";
import StatusBadge from "./StatusBadge";
import { StatusEnum } from "@/enums/StatusEnum";

interface BudgetsTableProps {
  budgets: IProject[];
}

const BudgetsTable: React.FC<BudgetsTableProps> = ({ budgets }) => {
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([]); // Alterado de selectedProjects para selectedBudgets

  const toggleBudgetSelection = (budgetId: string) => {
    setSelectedBudgets((prev) =>
      prev.includes(budgetId)
        ? prev.filter((id) => id !== budgetId)
        : [...prev, budgetId]
    );
  };

  /* 
    const toggleSelectAll = () => {
    if (selectedBudgets.length === budgets.length) {
      setSelectedBudgets([]);
    } else {
      setSelectedBudgets(budgets.map((b) => b.id));
    }
  };
  */

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="w-12 px-3 py-3 text-left">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                checked={selectedBudgets.length === budgets.length} // Alterado de projects para budgets
              />
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              Nome do cliente
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              Valor aprovado
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              Status
            </th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {budgets.map(
            (
              budget // Alterado de projects para budgets
            ) => (
              <tr key={budget.id} className="hover:bg-gray-50">
                <td className="px-3 py-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                    checked={selectedBudgets.includes(budget.id)} // Alterado de selectedProjects para selectedBudgets
                    onChange={() => toggleBudgetSelection(budget.id)} // Alterado de toggleProjectSelection para toggleBudgetSelection
                  />
                </td>
                <td className="px-6 py-3">
                  <div className="text-sm font-medium text-gray-900">
                    {budget.client.name}
                  </div>
                </td>
                {/*
                <td className="px-6 py-3">
                <div className="text-sm text-gray-500">{budget.dataInicio}</div>
              </td>
                */}
                <td className="px-6 py-3">
                  <div className="text-sm text-gray-900">
                    R$ {budget.approvedValue.toLocaleString("pt-BR")}
                  </div>
                </td>
                <td className="px-6 py-3">
                  <StatusBadge status={StatusEnum[budget.status]} />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
        <p className="text-sm text-gray-700">
          Exibindo <span className="font-medium">{budgets.length}</span> de{" "}
          <span className="font-medium">{budgets.length}</span> resultados
        </p>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Anterior</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              1
            </button>
            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Próxima</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BudgetsTable;

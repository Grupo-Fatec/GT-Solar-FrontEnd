import React from "react";
import { CashFlow } from "@/types/CashFlow";

type Props = {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  cashFlow: CashFlow[];
};

const calcularResumoFinanceiro = (cashFlow: CashFlow[]) => {
  const receitaMensal = cashFlow
    .filter((item) => item.tipo === "Entrada")
    .reduce((acc, item) => acc + item.valor, 0);

  const despesasMensais = cashFlow
    .filter((item) => item.tipo === "Saída")
    .reduce((acc, item) => acc + item.valor, 0);

  const saldoAtual = receitaMensal - despesasMensais;

  return { saldoAtual, receitaMensal, despesasMensais };
};

export const CashFlowDashboard: React.FC<Props> = ({
  searchTerm,
  onSearchTermChange,
  cashFlow,
}) => {
  const { saldoAtual, receitaMensal, despesasMensais } =
    calcularResumoFinanceiro(cashFlow);

  return (
    <div className="p-4 sm:p-6 md:p-8 m-2 sm:m-6g ">
      {/* Header */}
      <div className="mb-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Saldo Atual</p>
            <p className="text-xl sm:text-2xl font-semibold text-gray-800">
              R$ {saldoAtual.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Receita por mês</p>
            <p className="text-xl sm:text-2xl font-semibold text-gray-800">
              R$ {receitaMensal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Despesas por mês</p>
            <p className="text-xl sm:text-2xl font-semibold text-gray-800">
              R$ {despesasMensais.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

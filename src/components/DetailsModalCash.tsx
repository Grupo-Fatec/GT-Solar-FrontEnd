import React from "react";
import { CashFlow } from "@/types/CashFlow";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DetailsModalProps {
  cashFlow: CashFlow | null;
  onClose: () => void;
  onViewHistory: (tipo: string) => void;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ cashFlow, onClose, onViewHistory }) => {
  if (!cashFlow) return null;

  return (
    <Dialog open={!!cashFlow} onOpenChange={onClose}>
      <DialogContent className="
    w-full
    max-w-[340px]  /* limitar para telas pequenas */
    sm:max-w-lg
    md:max-w-xl
    lg:max-w-2xl
    max-h-[80vh]
    overflow-auto
    p-6 sm:p-8
    rounded-lg
    mx-auto         /* centralizar horizontalmente com margem automática */
  ">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900">Detalhes do Fluxo de Caixa</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-900 font-semibold">
          <p><strong>Tipo:</strong> {cashFlow.tipo}</p>
          <p><strong>Descrição:</strong> {cashFlow.descricao}</p>

          <div className="flex flex-col sm:flex-row sm:gap-12 mb-4">
            <p><strong>Valor:</strong> R$ {cashFlow.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-12">
            <p><strong>Data:</strong> {cashFlow.dataInicio}</p>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={() => onViewHistory(cashFlow.tipo)}
              className="px-4 py-2 bg-[#4F8A6E] hover:bg-[#2B5337] text-white rounded transition text-sm sm:text-base"
            >
              Visualizar histórico do tipo
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;

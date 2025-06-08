import React from "react";
import { Commission } from "@/types/Commission";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DetailsModalProps {
  commission: Commission | null;
  onClose: () => void;
  onViewHistory: (vendedor: string) => void;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ commission, onClose, onViewHistory }) => {
  if (!commission) return null;

  return (
    <Dialog open={!!commission} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md sm:max-w-2xl max-h-[80vh] overflow-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center sm:text-left">
            Detalhes da Comissão
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 sm:space-y-6 text-base sm:text-xl text-gray-900 font-semibold">
          <p><strong>Vendedor:</strong> {commission.vendedor}</p>
          <p><strong>Cliente:</strong> {commission.cliente}</p>

          <div className="flex flex-col sm:flex-row gap-6 mb-4 sm:mb-6">
            <p><strong>Orçamento:</strong> R$ {commission.orcamento.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
            <p><strong>Valor:</strong> R$ {commission.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <p><strong>Data de Início:</strong> {commission.dataInicio}</p>
            <p><strong>Status:</strong> {commission.status}</p>
          </div>

          <div className="flex justify-center sm:justify-end mt-6">
            <button
              onClick={() => onViewHistory(commission.vendedor)}
              className="w-full sm:w-auto px-4 py-2 bg-[#4F8A6E] hover:bg-[#2B5337] text-white rounded transition"
            >
              Visualizar histórico do vendedor
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;

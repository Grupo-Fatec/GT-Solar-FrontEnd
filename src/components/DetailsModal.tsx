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
      <DialogContent className="w-full max-w-md sm:max-w-2xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Detalhes da Comissão</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 text-xl text-gray-900 font-semibold">
          <p><strong>Vendedor:</strong> {commission.vendedor}</p>
          <p><strong>Cliente:</strong> {commission.cliente}</p>

          <div className="flex flex-col sm:flex-row gap-8 mb-6">
            <p><strong>Orçamento:</strong> R$ {commission.orcamento.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
            <p><strong>Valor:</strong> R$ {commission.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8">
            <p><strong>Data de Início:</strong> {commission.dataInicio}</p>
            <p><strong>Status:</strong> {commission.status}</p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => onViewHistory(commission.vendedor)}
              className="mt-6 px-4 py-2 bg-[#4F8A6E] hover:bg-[#2B5337] text-white rounded transition"
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


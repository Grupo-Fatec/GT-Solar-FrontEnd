import React from "react";
import { Commission } from "@/types/Commission";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StatusBadgeCom from "./StatusBadgeCom";
import jsPDF from "jspdf";

interface SellerHistoryModalProps {
  seller: string;
  commissions: Commission[];
  onClose: () => void;
}

const SellerHistoryModal: React.FC<SellerHistoryModalProps> = ({ seller, commissions, onClose }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Histórico do Vendedor: ${seller}`, 10, 10);

    const headers = ["Cliente", "Orçamento", "Valor", "Data", "Status"];
    let y = 20;
    const xPositions = [10, 60, 100, 140, 170];

    headers.forEach((header, i) => {
      doc.text(header, xPositions[i], y);
    });

    y += 10;

    commissions.forEach((c) => {
      doc.text(c.cliente, xPositions[0], y);
      doc.text(`R$ ${c.orcamento.toFixed(2)}`, xPositions[1], y);
      doc.text(`R$ ${c.valor.toFixed(2)}`, xPositions[2], y);
      doc.text(c.dataInicio, xPositions[3], y);
      doc.text(c.status, xPositions[4], y);
      y += 10;
    });

    doc.save(`Historico-${seller}.pdf`);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-5xl max-h-[90vh] overflow-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center sm:text-left">
            Histórico do Vendedor: {seller}
          </DialogTitle>
        </DialogHeader>

        {/* Container para scroll horizontal em telas pequenas */}
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Cliente
                </th>
                <th className="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Orçamento
                </th>
                <th className="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Valor
                </th>
                <th className="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Data
                </th>
                <th className="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {commissions.map((commission) => (
                <tr key={commission.id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-900 whitespace-nowrap">{commission.cliente}</td>
                  <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-900 whitespace-nowrap">
                    R$ {commission.orcamento.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-900 whitespace-nowrap">
                    R$ {commission.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500 whitespace-nowrap">{commission.dataInicio}</td>
                  <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                    <StatusBadgeCom status={commission.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded shadow-sm transition"
          >
            Voltar
          </button>

          <button
            onClick={generatePDF}
            className="w-full sm:w-auto bg-[#4F8A6E] hover:bg-[#2B5337] text-white font-semibold px-4 py-2 rounded shadow transition"
          >
            Gerar PDF
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SellerHistoryModal;

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
      <DialogContent className="w-[90vw] max-w-5xl max-h-[90vh] overflow-auto">

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Histórico do Vendedor: {seller}</DialogTitle>
        </DialogHeader>

        <table className="min-w-full divide-y divide-gray-200 mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold ">Cliente</th>
              <th className="px-4 py-2 text-left text-sm font-semibold ">Orçamento</th>
              <th className="px-4 py-2 text-left text-sm font-semibold ">Valor</th>
              <th className="px-4 py-2 text-left text-sm font-semibold ">Data</th>
              <th className="px-4 py-2 text-left text-sm font-semibold ">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {commissions.map((commission) => (
              <tr key={commission.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-900">{commission.cliente}</td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  R$ {commission.orcamento.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  R$ {commission.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">{commission.dataInicio}</td>
                <td className="px-4 py-2">
                  <StatusBadgeCom status={commission.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded shadow-sm"
          >
            Voltar
          </button>

          <button
            onClick={generatePDF}
            className="bg-[#4F8A6E] hover:bg-[#2B5337] text-white font-semibold px-4 py-2 rounded shadow"
          >
            Gerar PDF
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SellerHistoryModal;

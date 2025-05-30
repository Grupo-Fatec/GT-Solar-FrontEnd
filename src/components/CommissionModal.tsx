import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Commission } from "../types/Commission";
import { Label } from "@/components/ui/label";

interface CommissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (commission: Commission) => void;
  commissionToEdit?: Commission | null;
}

const CommissionModal: React.FC<CommissionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  commissionToEdit,
}) => {
  const [vendedor, setVendedor] = useState("");
  const [cliente, setCliente] = useState("");
  const [orcamento, setOrcamento] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [valor, setValor] = useState("");
  const [status, setStatus] = useState<"Pago" | "Não pago">("Pago");

  const [errors, setErrors] = useState({
    vendedor: "",
    cliente: "",
    orcamento: "",
    dataInicio: "",
    valor: "",
    status: "",
  });

  useEffect(() => {
    if (commissionToEdit) {
      setVendedor(commissionToEdit.vendedor);
      setCliente(commissionToEdit.cliente);
      setOrcamento(commissionToEdit.orcamento.toString());
      setDataInicio(commissionToEdit.dataInicio.split("/").reverse().join("-"));
      setValor(commissionToEdit.valor.toString());
      setStatus(commissionToEdit.status);
    }
  }, [commissionToEdit]);

  useEffect(() => {
    if (!isOpen) {
      setVendedor("");
      setCliente("");
      setOrcamento("");
      setDataInicio("");
      setValor("");
      setStatus("Pago");
      setErrors({
        vendedor: "",
        cliente: "",
        orcamento: "",
        dataInicio: "",
        valor: "",
        status: "",
      });
    }
  }, [isOpen]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      vendedor: "",
      cliente: "",
      orcamento: "",
      dataInicio: "",
      valor: "",
      status: "",
    };

    if (!vendedor.trim()) {
      newErrors.vendedor = "Vendedor é obrigatório";
      isValid = false;
    }
    if (!cliente.trim()) {
      newErrors.cliente = "Cliente é obrigatório";
      isValid = false;
    }
    if (!orcamento || isNaN(Number(orcamento))) {
      newErrors.orcamento = "Orçamento deve ser um número válido";
      isValid = false;
    }
    if (!dataInicio) {
      newErrors.dataInicio = "Data é obrigatória";
      isValid = false;
    }
    if (!valor || isNaN(Number(valor))) {
      newErrors.valor = "Valor deve ser um número válido";
      isValid = false;
    }
    if (!status) {
      newErrors.status = "Status é obrigatório";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const formattedDate = dataInicio.split("-").reverse().join("/");

    onSave({
      id: commissionToEdit ? commissionToEdit.id : Math.random(),
      vendedor,
      cliente,
      orcamento: Number(orcamento),
      dataInicio: formattedDate,
      valor: parseFloat(valor),
      status,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-4xl p-4 sm:p-6 md:p-8 rounded-2xl">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle>
            {commissionToEdit ? "Editar Comissão" : "Nova Comissão"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Vendedor */}
          <div>
            <Label>Vendedor</Label>
            <Input
              value={vendedor}
              onChange={(e) => setVendedor(e.target.value)}
              placeholder="Nome do vendedor"
            />
            {errors.vendedor && (
              <p className="text-red-500 text-sm">{errors.vendedor}</p>
            )}
          </div>

          {/* Cliente */}
          <div>
            <Label>Cliente</Label>
            <Input
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              placeholder="Nome do cliente"
            />
            {errors.cliente && (
              <p className="text-red-500 text-sm">{errors.cliente}</p>
            )}
          </div>

          {/* Orçamento e Data */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label>Orçamento</Label>
              <Input
                type="number"
                value={orcamento}
                onChange={(e) => setOrcamento(e.target.value)}
                placeholder="Número do orçamento"
              />
              {errors.orcamento && (
                <p className="text-red-500 text-sm">{errors.orcamento}</p>
              )}
            </div>

            <div className="flex-1">
              <Label>Data</Label>
              <Input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
              {errors.dataInicio && (
                <p className="text-red-500 text-sm">{errors.dataInicio}</p>
              )}
            </div>
          </div>

          {/* Valor e Status */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label>Valor</Label>
              <Input
                type="number"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="Valor da comissão"
              />
              {errors.valor && (
                <p className="text-red-500 text-sm">{errors.valor}</p>
              )}
            </div>

            <div className="flex-1">
              <Label>Status</Label>
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "Pago" | "Não pago")
                }
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="Pago">Pago</option>
                <option value="Não pago">Não pago</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status}</p>
              )}
            </div>
          </div>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row justify-end sm:space-x-2 space-y-2 sm:space-y-0 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-[#4F8A6E] hover:bg-[#2B5337] text-white rounded-md px-6 w-full sm:w-auto"
            >
              {commissionToEdit ? "Salvar alterações" : "Criar comissão"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommissionModal;

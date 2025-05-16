import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Budget } from '../types/Budget';
import { NumericFormat } from 'react-number-format';

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (budget: Budget) => void;
  budgetToEdit?: Budget;
}

const BudgetModal: React.FC<BudgetModalProps> = ({
  isOpen,
  onClose,
  onSave,
  budgetToEdit
}) => {
  const [nome, setNome] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [valor, setValor] = useState('');
  const [status, setStatus] = useState<'Pendente' | 'Aprovado' | 'Recusado'>('Pendente');

  const [errors, setErrors] = useState({
    nome: '',
    dataInicio: '',
    valor: '',
    status: '',
  });

  useEffect(() => {
    if (budgetToEdit) {
      setNome(budgetToEdit.cliente);
      // Converter dd/mm/yyyy para yyyy-mm-dd para o input date
      const formattedDate = budgetToEdit.dataInicio.split('/').reverse().join('-');
      setDataInicio(formattedDate);
      setValor(budgetToEdit.valor.toString());
      setStatus(budgetToEdit.status);
    }
  }, [budgetToEdit]);

  useEffect(() => {
    if (!isOpen) {
      setNome('');
      setDataInicio('');
      setValor('');
      setStatus('Pendente');
      setErrors({
        nome: '',
        dataInicio: '',
        valor: '',
        status: '',
      });
    }
  }, [isOpen]);

  const handleValorChange = (values: { value: string; floatValue?: number }) => {
    setValor(values.value);

    if (!values.value || values.floatValue === undefined) {
      setErrors((prev) => ({
        ...prev,
        valor: 'Valor é obrigatório e deve conter apenas números',
      }));
    } else {
      setErrors((prev) => ({ ...prev, valor: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors = { nome: '', dataInicio: '', valor: '', status: '' };
    let isValid = true;

    if (!nome || /[^A-Za-zÀ-ÿ\s]/.test(nome)) {
      newErrors.nome = 'Nome é obrigatório e deve conter apenas letras';
      isValid = false;
    }

    if (!dataInicio) {
      newErrors.dataInicio = 'Data de início é obrigatória';
      isValid = false;
    }

    if (!valor || isNaN(Number(valor))) {
      newErrors.valor = 'Valor é obrigatório e deve conter apenas números';
      isValid = false;
    }

    if (!status) {
      newErrors.status = 'Status é obrigatório';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    // Converter yyyy-mm-dd para dd/mm/yyyy
    const [year, month, day] = dataInicio.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    onSave({
      id: budgetToEdit ? budgetToEdit.id : Math.random(),
      cliente: nome,
      dataInicio: formattedDate,
      valor: parseFloat(valor),
      status,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-8 rounded-2xl">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-xl">
            {budgetToEdit ? 'Editar Orçamento' : 'Cadastrar Orçamento'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <Input 
              placeholder="Nome" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
            />
            {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
              <Input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
              {errors.dataInicio && <p className="text-red-500 text-sm">{errors.dataInicio}</p>}
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
              <NumericFormat
                value={valor}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                allowNegative={false}
                onValueChange={handleValorChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              {errors.valor && <p className="text-red-500 text-sm">{errors.valor}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="w-full border border-gray-300 p-2 rounded-md"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as 'Pendente' | 'Aprovado' | 'Recusado')
              }
            >
              <option value="Pendente">Pendente</option>
              <option value="Aprovado">Aprovado</option>
              <option value="Recusado">Recusado</option>
            </select>


            {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSubmit}
              className="bg-[#4F8A6E] hover:bg-[#2B5337] text-white rounded-md px-6"
            >
              {budgetToEdit ? 'Salvar Alterações' : 'Salvar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetModal;

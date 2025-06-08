import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { CashFlow } from '../types/CashFlow';
import { NumericFormat } from 'react-number-format';

interface CashFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cashFlow: CashFlow) => void;
  cashFlowToEdit?: CashFlow;
}

const CashFlowModal: React.FC<CashFlowModalProps> = ({
  isOpen,
  onClose,
  onSave,
  cashFlowToEdit
}) => {
  const [tipo, setTipo] = useState<'Entrada' | 'Saída'>('Entrada');
  const [descricao, setDescricao] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [valor, setValor] = useState('');

  const [errors, setErrors] = useState({
    tipo: '',
    descricao: '',
    dataInicio: '',
    valor: '',
  });

  useEffect(() => {
    if (cashFlowToEdit) {
      setTipo(cashFlowToEdit.tipo as 'Entrada' | 'Saída');
      setDescricao(cashFlowToEdit.descricao);
      setDataInicio(cashFlowToEdit.dataInicio); // já em formato ISO
      setValor(cashFlowToEdit.valor.toString());
    }
  }, [cashFlowToEdit]);

  useEffect(() => {
    if (!isOpen) {
      setTipo('Entrada');
      setDescricao('');
      setDataInicio('');
      setValor('');
      setErrors({
        tipo: '',
        descricao: '',
        dataInicio: '',
        valor: '',
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
    const newErrors = { tipo: '', descricao: '', dataInicio: '', valor: '' };
    let isValid = true;

    if (!tipo || (tipo !== 'Entrada' && tipo !== 'Saída')) {
      newErrors.tipo = 'Tipo deve ser "Entrada" ou "Saída"';
      isValid = false;
    }

    if (!descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
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

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    onSave({
      id: cashFlowToEdit ? cashFlowToEdit.id : Math.floor(Math.random() * 1000000),
      tipo,
      descricao,
      dataInicio,
      valor: parseFloat(valor),
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-8 rounded-2xl">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-xl">
            {cashFlowToEdit ? 'Editar Lançamento' : 'Cadastrar Lançamento'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              className="w-full border border-gray-300 p-2 rounded-md"
              value={tipo}
              onChange={(e) => setTipo(e.target.value as 'Entrada' | 'Saída')}
            >
              <option value="Entrada">Entrada</option>
              <option value="Saída">Saída</option>
            </select>
            {errors.tipo && <p className="text-red-500 text-sm">{errors.tipo}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <Input
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            {errors.descricao && <p className="text-red-500 text-sm">{errors.descricao}</p>}
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

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSubmit}
              className="bg-[#4F8A6E] hover:bg-[#2B5337] text-white rounded-md px-6"
            >
              {cashFlowToEdit ? 'Salvar Alterações' : 'Salvar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CashFlowModal;

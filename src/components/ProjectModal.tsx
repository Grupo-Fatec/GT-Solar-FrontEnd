import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Project } from '../types/Project';
import { NumericFormat } from 'react-number-format';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  projectToEdit?: Project;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  projectToEdit
}) => {
  const [nome, setNome] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [valor, setValor] = useState('');
  const [status, setStatus] = useState<'Execução' | 'Finalização' | 'Planejamento'>('Execução');

  const [errors, setErrors] = useState({
    nome: '',
    dataInicio: '',
    valor: '',
    status: '',
  });

  useEffect(() => {
    if (projectToEdit) {
      setNome(projectToEdit.cliente);
      const formattedDate = projectToEdit.dataInicio.split('/').reverse().join('-');
      setDataInicio(formattedDate);
      setValor(projectToEdit.valor.toString());
      setStatus(projectToEdit.status);
    }
  }, [projectToEdit]);

  useEffect(() => {
    if (!isOpen) {
      setNome('');
      setDataInicio('');
      setValor('');
      setStatus('Execução');
      setErrors({ nome: '', dataInicio: '', valor: '', status: '' });
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

    const [year, month, day] = dataInicio.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    onSave({
      id: projectToEdit ? projectToEdit.id : Math.random(),
      cliente: nome,
      dataInicio: formattedDate,
      valor: parseFloat(valor),
      status,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-6 sm:p-8 rounded-2xl bg-white">
        <DialogHeader className="flex justify-between items-center mb-4">
          <DialogTitle className="text-lg sm:text-xl font-semibold">
            {projectToEdit ? 'Editar Projeto' : 'Cadastrar Projeto'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">

          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <Input 
              placeholder="Nome do Cliente"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
          </div>

          {/* Data e Valor */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
              <Input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
              {errors.dataInicio && <p className="text-red-500 text-sm">{errors.dataInicio}</p>}
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
              <NumericFormat
                value={valor}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                allowNegative={false}
                onValueChange={handleValorChange}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F8A6E]"
              />
              {errors.valor && <p className="text-red-500 text-sm">{errors.valor}</p>}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F8A6E]"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'Execução' | 'Finalização' | 'Planejamento')}
            >
              <option value="Execução">Execução</option>
              <option value="Finalização">Finalização</option>
              <option value="Planejamento">Planejamento</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
          </div>

          {/* Botão */}
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              className="bg-[#4F8A6E] hover:bg-[#2B5337] text-white rounded-md px-6 py-2 transition-colors duration-200"
            >
              {projectToEdit ? 'Salvar Alterações' : 'Salvar'}
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;

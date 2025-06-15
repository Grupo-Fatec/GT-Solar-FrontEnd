import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { NumericFormat } from 'react-number-format';
import { IInsertProject, IProject } from '@/interfaces/IProjects';
import { StatusEnum } from '@/enums/StatusEnum';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: IInsertProject) => void;
  projectToEdit?: IInsertProject;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  projectToEdit
}) => {
  // Estado para o nome do cliente (string)
  const [nome, setNome] = useState('');
  // Estado para a data no padrão ISO yyyy-mm-dd para o input date
  const [dataInicio, setDataInicio] = useState('');
  // Valor como string para o input formatado
  const [valor, setValor] = useState('');
  // Status do projeto, obrigatório, usando o enum StatusEnum
  const [status, setStatus] = useState<StatusEnum>(StatusEnum.EXECUTION);

  const [errors, setErrors] = useState({
    nome: '',
    dataInicio: '',
    valor: '',
    status: '',
  });

  // Ao carregar projeto para edição, inicializa estados
  useEffect(() => {
    if (projectToEdit) {
      setNome(projectToEdit.clientId);
    }
  }, [projectToEdit]);

  // Quando modal fecha, limpa os campos
  useEffect(() => {
    if (!isOpen) {
      setNome('');
      setDataInicio('');
      setValor('');
      setStatus(StatusEnum.EXECUTION);
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
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-8 rounded-2xl">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-xl">
            {projectToEdit ? 'Editar Projeto' : 'Cadastrar Projeto'}
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
              onChange={(e) => setStatus(e.target.value as StatusEnum)}
            >
              <option value={StatusEnum.EXECUTION}>Execução</option>
              <option value={StatusEnum.DONE}>Finalização</option>
              <option value={StatusEnum.PLANNING}>Planejamento</option>
              <option value={StatusEnum.IN_PROGRESS}>Em progresso</option>
              <option value={StatusEnum.CANCELED}>Cancelado</option>
            </select>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSubmit}
              className="bg-[#4F8A6E] hover:bg-[#2B5337] text-white rounded-md px-6"
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

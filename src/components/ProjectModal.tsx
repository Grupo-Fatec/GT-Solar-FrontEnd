import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Project } from '../types/Project';

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
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!nome || !dataInicio || !valor || !status) return;

    const [year, month, day] = dataInicio.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    onSave({
      id: projectToEdit ? projectToEdit.id : Math.random(),
      cliente: nome,
      dataInicio: formattedDate,
      valor: parseFloat(valor.replace(/[^\d.-]/g, '')),
      status
    });

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
            <Input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
              <Input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
              <Input
                type="text"
                placeholder="Valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="w-full border border-gray-300 p-2 rounded-md"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'Execução' | 'Finalização' | 'Planejamento')}
            >
              <option value="Execução">Execução</option>
              <option value="Finalização">Finalização</option>
              <option value="Planejamento">Planejamento</option>
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

import ProjectModal from '@/components/ProjectModal';
import { useEffect, useState } from 'react';
import { Project } from "@/types/Project";
import ProjectsTable from '@/components/ProjectsTable';
import { Button } from '@/components/ui/button';
import DeleteModal from '@/components/DeleteModal';
import SearchBar from '@/components/SearchBar';
import Toast from '@/components/Toast';


const projectsData: Project[] = [
  { id: 1, cliente: 'Carla Pereira da Silva', dataInicio: '11/03/2025', valor: 8000, status: 'Execução' },
  { id: 2, cliente: 'Augusto Souza ', dataInicio: '27/02/2018', valor: 8000, status: 'Finalização' },
  { id: 3, cliente: 'Lais Cardoso ', dataInicio: '30/01/2022', valor: 8000, status: 'Planejamento' },
  { id: 4, cliente: 'Humberto Gonçalves', dataInicio: '09/11/2025', valor: 8000, status: 'Execução' },
  { id: 5, cliente: 'Luana Carvalho', dataInicio: '12/05/2023', valor: 8000, status: 'Finalização' },
  { id: 6, cliente: 'Bruno Ribeiro Silva', dataInicio: '15/12/20254', valor: 8000, status: 'Planejamento' },
  
];

const Projects: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");
  const [showToast, setShowToast] = useState(false);


  useEffect(() => {
    if (searchQuery) {
      const filtered = projectsData.filter((project) =>
        project.cliente.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProjects(filtered);
    } else {
      setProjects(projectsData);
    }
  }, [searchQuery]);

  const handleEditProject = (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setProjectToEdit(project);
      setProjectModalOpen(true);
    }
  };

  const handleAddProjectClick = () => {
    setProjectToEdit(null);
    setProjectModalOpen(true);
  };

  const handleDeleteClick = (projectId: number) => {
    setSelectedProjectId(projectId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedProjectId !== null) {
      setProjects(projects.filter((project) => project.id !== selectedProjectId));
      setSelectedProjectId(null);
      setDeleteModalOpen(false);
      triggerToast('Projeto projeto com sucesso!', 'success');
    }
  };

  const handleSaveProject = (project: Project) => {
    if (projectToEdit) {
      setProjects(projects.map(p => p.id === project.id ? project : p));
      triggerToast('Projeto editado com sucesso!', 'success');
    } else {
      setProjects([...projects, project]);
      triggerToast('Projeto cadastrado com sucesso!', 'success');
    }
    setProjectModalOpen(false);
    setProjectToEdit(null);
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const triggerToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-8 bg-white rounded-tl-3xl">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Projetos</h1>
            </div>
            <div className="mb-6">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Pesquisar nome do cliente"
              />
            </div>
            <div className="bg-white rounded-lg shadow">
              <ProjectsTable
                projects={projects}
                onEdit={handleEditProject}
                onDelete={handleDeleteClick}
              />
            </div>
            <div className="mt-8 flex justify-end">
              <Button
                className="bg-[#4F8A6E] hover:bg-[#2B5337] text-white"
                onClick={handleAddProjectClick}
              >
                Adicionar projeto
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* Modal de exclusão genérico */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Excluir projeto"
        description={`Tem certeza que deseja excluir o projeto de ${selectedProject?.cliente}?`}
      />

      {/* Modal de criação/edição */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        onSave={handleSaveProject}
        projectToEdit={projectToEdit}
      />
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default Projects;

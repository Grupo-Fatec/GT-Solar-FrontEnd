import { useEffect, useState } from 'react';
import { Project } from "@/types/Project";
import ProjectModal from '@/components/ProjectModal';
import ProjectsTable from '@/components/ProjectsTable';
import { Button } from '@/components/ui/button';
import DeleteModal from '@/components/DeleteModal';
import SearchBar from '@/components/SearchBar';
import Toast from '@/components/Toast';

import SolarQuoteModal from '@/components/SolarQuoteModal';
import { ProjectService } from '@/services/ProjectService';

const Projects: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");
  const [showToast, setShowToast] = useState(false);
  const [isSolarQuoteModalOpen, setSolarQuoteModalOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = allProjects.filter(project =>
        project.cliente.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProjects(filtered);
    } else {
      setProjects(allProjects);
    }
  }, [searchQuery, allProjects]);

  const fetchProjects = async () => {
    try {
      const data = await ProjectService.getAll();
      setAllProjects(data);
      setProjects(data);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
      triggerToast("Erro ao buscar projetos", "error");
    }
  };

  const handleEditProject = async (projectId: number) => {
    try {
      const project = await ProjectService.getById(projectId);
      setProjectToEdit(project);
      setProjectModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar projeto:", error);
      triggerToast("Erro ao buscar projeto", "error");
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

  const confirmDelete = async () => {
    if (selectedProjectId !== null) {
      try {
        await ProjectService.delete(selectedProjectId);
        setDeleteModalOpen(false);
        setSelectedProjectId(null);
        fetchProjects();
        triggerToast('Projeto excluído com sucesso!', 'success');
      } catch (error) {
        console.error("Erro ao deletar projeto:", error);
        triggerToast("Erro ao deletar projeto", "error");
      }
    }
  };

  const handleSaveProject = async (project: Project) => {
    try {
      if (projectToEdit) {
        await ProjectService.update(project.id, project);
        triggerToast('Projeto editado com sucesso!', 'success');
      } else {
        await ProjectService.create(project);
        triggerToast('Projeto cadastrado com sucesso!', 'success');
      }
      setProjectModalOpen(false);
      setProjectToEdit(null);
      fetchProjects();
    } catch (error) {
      console.error("Erro ao salvar projeto:", error);
      triggerToast("Erro ao salvar projeto", "error");
    }
  };

  const handleOpenSolarQuoteModal = () => {
    setSolarQuoteModalOpen(true);
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
            <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-between gap-4">
              <Button
                className="bg-[#4F8A6E] hover:bg-[#2B5337] text-white"
                onClick={handleOpenSolarQuoteModal}
              >
                Gerar Orçamento Solar
              </Button>
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

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Excluir projeto"
        description={`Tem certeza que deseja excluir o projeto de ${selectedProject?.cliente}?`}
      />

      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        onSave={handleSaveProject}
        projectToEdit={projectToEdit}
      />

      <SolarQuoteModal
        isOpen={isSolarQuoteModalOpen}
        onClose={() => setSolarQuoteModalOpen(false)}
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

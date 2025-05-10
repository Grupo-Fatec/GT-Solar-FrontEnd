import ProjectModal from '@/components/ProjectModal';
import { useEffect, useState } from 'react';
import { Project } from "@/types/Project";
import ProjectsTable from '@/components/ProjectsTable';
import { Button } from '@/components/ui/button';
import DeleteModal from '@/components/DeleteModal';
import SearchBar from '@/components/SearchBar';


const projectsData: Project[] = [
  { id: 1, cliente: 'Carla Pereira da Silva', dataInicio: '11/03/2025', valor: 8000, status: 'Execução' },
  { id: 2, cliente: 'Carla Pereira da Silva', dataInicio: '11/03/2025', valor: 8000, status: 'Finalização' },
  { id: 3, cliente: 'Carla Pereira da Silva', dataInicio: '11/03/2025', valor: 8000, status: 'Planejamento' },
  { id: 4, cliente: 'Carla Pereira da Silva', dataInicio: '11/03/2025', valor: 8000, status: 'Execução' },
  { id: 5, cliente: 'Carla Pereira da Silva', dataInicio: '11/03/2025', valor: 8000, status: 'Finalização' },
  { id: 6, cliente: 'Carla Pereira da Silva', dataInicio: '11/03/2025', valor: 8000, status: 'Planejamento' },
  { id: 7, cliente: 'Carla Pereira da Silva', dataInicio: '11/03/2025', valor: 8000, status: 'Execução' },
  // Outros projetos
];

const Projects: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [projects, setProjects] = useState<Project[]>(projectsData);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isProjectModalOpen, setProjectModalOpen] = useState(false);
    const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  
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
      setProjectToEdit(null);  // Resetando o projeto para garantir que o modal estará em modo de criação
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
      }
    };
  
    const handleSaveProject = (project: Project) => {
      if (projectToEdit) {
        setProjects(projects.map(p => p.id === project.id ? project : p));
      } else {
        setProjects([...projects, project]);
      }
      setProjectModalOpen(false);
      setProjectToEdit(null);  // Resetar projeto após salvar
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
                  placeholder="Pesquisar nome do projeto"
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
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={confirmDelete}
        />
        <ProjectModal
          isOpen={isProjectModalOpen}
          onClose={() => setProjectModalOpen(false)}
          onSave={handleSaveProject}
          projectToEdit={projectToEdit}
        />
      </div>
    );
  };
  
  export default Projects;
  
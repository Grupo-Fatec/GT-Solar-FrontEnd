import React, { useState } from "react";
import StatusBadge from "./StatusBadge";
import ProjectDetailsModal from "./ProjectDetailsModal";
import { Project } from "../types/Project";
import { Pencil, Trash2, Eye } from "lucide-react";

interface ProjectsTableProps {
  projects: Project[];
  onEdit: (projectId: number) => void;
  onDelete: (projectId: number) => void;
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({
  projects,
  onEdit,
  onDelete,
}) => {
  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleProjectSelection = (projectId: number) => {
    if (selectedProjects.includes(projectId)) {
      setSelectedProjects(selectedProjects.filter((id) => id !== projectId));
    } else {
      setSelectedProjects([...selectedProjects, projectId]);
    }
  };

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="w-12 px-3 py-3 text-left">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                onChange={() => {}}
              />
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
              Nome
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider whitespace-nowrap">
              Data de início
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
              Valor
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
              Status
            </th>
            <th className="relative px-6 py-3 text-sm font-medium text-gray-500">
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-gray-50">
              <td className="px-3 py-3 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={selectedProjects.includes(project.id)}
                  onChange={() => toggleProjectSelection(project.id)}
                />
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {project.cliente}
                </div>
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                <div className="text-sm text-gray-500">{project.dataInicio}</div>
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  R$ {project.valor.toLocaleString("pt-BR")}
                </div>
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                <StatusBadge status={project.status} />
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium flex justify-end space-x-2">
                <button
                  onClick={() => handleViewDetails(project)}
                  className="text-gray-400 hover:text-green-500"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => onEdit(project.id)}
                  className="text-gray-400 hover:text-blue-500"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(project.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Detalhes */}
      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProjectsTable;

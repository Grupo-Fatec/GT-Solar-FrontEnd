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
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 7;
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = projects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const toggleProjectSelection = (projectId: number) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-12 px-3 py-3 text-left">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                onChange={() => {}}
              />
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Nome</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">Data de início</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Valor</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
            <th className="relative px-6 py-3 text-sm font-medium text-gray-500">
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((project) => (
            <tr key={project.id} className="hover:bg-gray-50">
              <td className="px-3 py-3 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={selectedProjects.includes(project.id)}
                  onChange={() => toggleProjectSelection(project.id)}
                />
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                {project.cliente}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                {project.dataInicio}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                R$ {project.valor.toLocaleString("pt-BR")}
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

      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
        <p className="text-sm text-gray-700">
          Exibindo{" "}
          <span className="font-medium">{startIndex + 1}</span> a{" "}
          <span className="font-medium">
            {Math.min(startIndex + ITEMS_PER_PAGE, projects.length)}
          </span>{" "}
          de <span className="font-medium">{projects.length}</span> resultados
        </p>
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            ←
          </button>
          <span className="px-4 py-2 border border-gray-300 bg-white text-sm text-gray-700">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            →
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ProjectsTable;

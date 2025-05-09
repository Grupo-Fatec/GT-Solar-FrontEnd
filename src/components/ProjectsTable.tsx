import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import { Project } from '../types/Project';
import { Pencil, Trash2 } from 'lucide-react';

interface ProjectsTableProps {
  projects: Project[];
  onEdit: (projectId: number) => void;
  onDelete: (projectId: number) => void;
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({ 
  projects, 
  onEdit, 
  onDelete 
}) => {
  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);

  const toggleProjectSelection = (projectId: number) => {
    if (selectedProjects.includes(projectId)) {
      setSelectedProjects(selectedProjects.filter(id => id !== projectId));
    } else {
      setSelectedProjects([...selectedProjects, projectId]);
    }
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
            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
              Nome
            </th>
            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
              Data de início
            </th>
            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
              Valor
            </th>
            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
              Status
            </th>
            <th scope="col" className="relative px-6 py-3 text-sm font-medium text-gray-500">
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
                <div className="text-sm font-medium text-gray-900">{project.cliente}</div>
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                <div className="text-sm text-gray-500">{project.dataInicio}</div>
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                <div className="text-sm text-gray-900">R$ {project.valor.toLocaleString('pt-BR')}</div>
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                <StatusBadge status={project.status} />
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium flex justify-end space-x-2">
                
                <button
                  onClick={() => onEdit(project.id)}
                  className="text-gray-400 hover:text-gray-600"
                ><Pencil size={18} />
                  
                </button>
                <button
                  onClick={() => onDelete(project.id)}
                  className="text-gray-400 hover:text-gray-600"
                ><Trash2 size={18} />
                 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Anterior
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Próxima
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Exibindo <span className="font-medium">7</span> de <span className="font-medium">7</span> resultados
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Anterior</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">1</button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Próxima</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsTable;

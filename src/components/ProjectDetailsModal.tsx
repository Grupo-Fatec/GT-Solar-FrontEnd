import React from "react";
import { Project } from "../types/Project";
import StatusBadge from "./StatusBadge";


interface ProjectDetailsModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative">
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Detalhes do Projeto
        </h2>
        <div className="space-y-4 text-base text-gray-700">
          <p>
            <strong className="text-gray-900">Cliente:</strong>{" "}
            <span className="text-lg font-semibold text-gray-800">
              {project.cliente}
            </span>
          </p>
          <p>
            <strong className="text-gray-900">Data de Início:</strong>{" "}
            {project.dataInicio}
          </p>
          <p>
            <strong className="text-gray-900">Valor:</strong>{" "}
            R$ {project.valor.toLocaleString("pt-BR")}
          </p>
          <p>
            <strong className="text-gray-900">Status:</strong>{" "}
            <StatusBadge status={project.status} />
          </p>
          {/* Adicione mais campos se necessário */}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;

import { IClient } from "@/interfaces/person/client/IClient";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import ClientDetailsModal from "./ClientDetailsModal"; // ajuste o caminho conforme sua estrutura

interface ClientTableProps {
  clients: IClient[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ClientTable = ({ clients, onEdit, onDelete }: ClientTableProps) => {
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedClient, setSelectedClient] = useState<IClient | null>(null);

  const toggleClientSelection = (clientId: string) => {
    if (selectedClients.includes(clientId)) {
      setSelectedClients(selectedClients.filter((id) => id !== clientId));
    } else {
      setSelectedClients([...selectedClients, clientId]);
    }
  };

  const handleViewDetails = (client: IClient) => {
    setSelectedClient(client);
    setShowDetails(true);
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
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Endereço</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
            <th className="relative px-6 py-3 text-sm font-medium text-gray-500">
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clients.map((client) => (
            <tr key={client.id} className="hover:bg-gray-50">
              <td className="px-3 py-3 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={selectedClients.includes(client.id)}
                  onChange={() => toggleClientSelection(client.id)}
                />
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{client.name}</div>
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {client.street}, {client.houseNumber} - {client.uf}
                </div>
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                <div className="text-sm text-gray-900">{client.email}</div>
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium flex justify-end space-x-2">
                <button
                  onClick={() => handleViewDetails(client)}
                  className="text-gray-400 hover:text-green-500"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => onEdit(client.id)}
                  className="text-gray-400 hover:text-blue-500"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(client.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      

      {/* Modal de detalhes */}
      {showDetails && selectedClient && (
        <ClientDetailsModal
          client={selectedClient}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};

export default ClientTable;

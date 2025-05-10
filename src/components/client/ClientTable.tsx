import { IClient } from "@/interfaces/IClient";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface ClientTableProps {
  clients: IClient[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ClientTable = ({ clients, onEdit, onDelete }: ClientTableProps) => {
  const [selectedClients, setselectedClients] = useState<string[]>([]);

  const toggleClientSelection = (projectId: string) => {
    if (selectedClients.includes(projectId)) {
      setselectedClients(selectedClients.filter((id) => id !== projectId));
    } else {
      setselectedClients([...selectedClients, projectId]);
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
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
              Nome
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
              Endereço
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
              email
            </th>
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
                <div className="text-sm font-medium text-gray-900">
                  {client.name}
                </div>
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                <div className="text-sm text-gray-500">{client.street}, {client.houseNumber} - {client.uf}</div>
              </td>

              <td className="px-6 py-3 whitespace-nowrap">
                <div className="text-sm text-gray-900">{client.email}</div>
              </td>

              <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium flex justify-end space-x-2">
                <button
                  onClick={() => onEdit(client.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(client.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;

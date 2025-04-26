
import { Pencil, Trash2 } from 'lucide-react';

interface Client {
  id: number;
  name: string;
  address: string;
  consumption: string;
}

interface ClientTableProps {
  clients: Client[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ClientTable = ({ clients, onEdit, onDelete }: ClientTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-50">
            <th className="w-12 py-4 px-6 text-left">
              <input type="checkbox" className="rounded border-gray-300" />
            </th>
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Nome</th>
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Endereço</th>
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Consumo</th>
            <th className="py-4 px-6 text-right text-sm font-medium text-gray-500">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {clients.map((client) => (
            <tr key={client.id} className="hover:bg-gray-50">
              <td className="py-4 px-6">
                <input type="checkbox" className="rounded border-gray-300" />
              </td>
              <td className="py-4 px-6 text-sm">{client.name}</td>
              <td className="py-4 px-6 text-sm">{client.address}</td>
              <td className="py-4 px-6 text-sm">{client.consumption}</td>
              <td className="py-4 px-6 text-right space-x-2">
                <button
                  onClick={() => onEdit(client.id)}
                  className="text-gray-500 hover:text-[#4F8A6E]"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(client.id)}
                  className="text-gray-500 hover:text-red-600"
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

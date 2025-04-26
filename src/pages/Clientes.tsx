import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ClientTable from "../components/ClientTable";
import { ClientForm } from "../components/ClientForm";
import { DeleteConfirmationDialog } from "../components/DeleteConfirmationDialog";

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<any | null>(null); // Cliente a ser editado
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Carla Pereira da Silva",
      address: "Rua das Oliveiras",
      consumption: "700 kWh",
    },
    {
      id: 2,
      name: "Carlos Souza",
      address: "Rua da Paz",
      consumption: "450 kWh",
    },
  ]);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false); // Controle do modal de exclusão
  const [clientToDelete, setClientToDelete] = useState<any | null>(null); // Cliente a ser excluído

  // Função para editar um cliente
  const handleEdit = (id: number) => {
    const client = clients.find((c) => c.id === id);
    if (client) {
      setClientToEdit(client);
      setShowForm(true);
    }
  };

  // Função para abrir o modal de confirmação de exclusão
  const handleDeleteClick = (id: number) => {
    const client = clients.find((c) => c.id === id);
    if (client) {
      setClientToDelete(client); // Armazena o cliente a ser excluído
      setDeleteDialogOpen(true); // Abre o modal
    }
  };

  // Função para excluir o cliente
  const handleDelete = () => {
    if (clientToDelete) {
      setClients(clients.filter((c) => c.id !== clientToDelete.id)); // Exclui o cliente da lista
      setDeleteDialogOpen(false); // Fecha o modal
      setClientToDelete(null); // Reseta o cliente a ser excluído
    }
  };

  // Função para cancelar a exclusão
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false); // Fecha o modal sem excluir
    setClientToDelete(null); // Reseta o cliente a ser excluído
  };

  // Função para adicionar um novo cliente
  const handleAddClient = (newClient: any) => {
    const formattedClient = {
      id: clients.length + 1,
      name: newClient.name,
      address: newClient.address,
      consumption: "0 kWh", // Valor pode ser calculado depois
    };

    setClients([...clients, formattedClient]);
    setShowForm(false); // Volta para a tabela
    setClientToEdit(null); // Reseta o cliente a ser editado
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {!showForm ? (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                  Clientes
                </h1>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <Input
                      type="text"
                      placeholder="Pesquisar cliente"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow">
                <ClientTable
                  clients={clients}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick} // Passa a função para abrir o modal de confirmação
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => console.log("Previous page")}
                  >
                    {"<"}
                  </Button>
                  <span className="text-sm text-gray-600">1</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => console.log("Next page")}
                  >
                    {">"}
                  </Button>
                </div>
                <Button
                  className="bg-[#4F8A6E] hover:bg-[#2B5337] text-white"
                  onClick={() => setShowForm(true)}
                >
                  Adicionar cliente
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">
                  {clientToEdit ? "Editar Cliente" : "Novo Cliente"}
                </h1>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Voltar
                </Button>
              </div>
              <ClientForm
                onSubmit={handleAddClient}
                clientData={clientToEdit} // Passa os dados do cliente para editar (se houver)
              />
            </>
          )}
        </div>
      </div>

      {/* Modal de confirmação de exclusão */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteCancel} // Fecha o modal sem excluir
        onConfirm={handleDelete} // Confirma a exclusão
      />
    </div>
  );
};

export default Clientes;

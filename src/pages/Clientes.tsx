import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import ClientTable from "../components/client/ClientTable";
import { ClientForm } from "../components/client/ClientForm";
import { DeleteConfirmationDialog } from "../components/DeleteConfirmationDialog";
import { IClient } from "@/interfaces/IClient";
import { ModalComponent } from "@/components/ModalComponent";
import { emptyClient } from "@/utils/emptyObjects/Client.empty.obj";
import { ClientService } from "@/services/ClientService";

const clientService = new ClientService();

const Clientes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [clientList, setClientList] = useState<IClient[]>([]);
  const [client, setClient] = useState<IClient>(emptyClient);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [createForm, setCreateForm] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  const [clientToDeleteId, setClientToDeleteId] = useState<string | null>(null);

  // Buscar todos os clientes ao carregar
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await clientService.getAll();
        setClientList(data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    }
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const data = await clientService.getAll();
      setClientList(data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  // Abrir modal de edição
  const openEditClient = async (id: string) => {
    try {
      const selectedClient = await clientService.getById(id);
      setClient(selectedClient);
      setEditModal(true);
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
      alert("Erro ao buscar cliente");
    }
  };

  const handleUpdateClient = async (updatedClient: IClient) => {
    try {
      await clientService.update(updatedClient.id, updatedClient);
      setEditModal(false);
      fetchClients();
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      alert("Erro ao atualizar cliente");
    }
  };

  // Criar cliente
  const openCreateClient = () => {
    setClient(emptyClient);
    setCreateForm(true);
    setShowForm(true);
  };

  const handleCreateClient = async (newClient: IClient) => {
    try {
      await clientService.create(newClient);
      setShowForm(false);
      fetchClients();
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
      alert("Erro ao criar cliente");
    }
  };

  // Excluir cliente
  const confirmDeleteClient = async () => {
    if (!clientToDeleteId) return;
    try {
      await clientService.delete(clientToDeleteId);
      setDeleteModal(false);
      fetchClients();
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      alert("Erro ao deletar cliente");
    }
  };

  const openDeleteDialog = (id: string) => {
    setClientToDeleteId(id);
    setDeleteModal(true);
  };

  return (
    <div className="flex h-screen">
      {!showForm ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-8 bg-white rounded-tl-3xl">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
              </div>
              <div className="mb-6">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Pesquisar nome do cliente"
                />
              </div>
              <div className="bg-white rounded-lg shadow">
                <ClientTable
                  clients={clientList.filter((c) =>
                    c.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )}
                  onEdit={openEditClient}
                  onDelete={openDeleteDialog}
                />
              </div>
              <div className="mt-8 flex justify-end">
                <Button
                  className="bg-[#4F8A6E] hover:bg-[#2B5337] text-white"
                  onClick={openCreateClient}
                >
                  Adicionar cliente
                </Button>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <>
          <div className="p-4">
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Voltar
            </Button>
          </div>
          <div className="p-8">
            <ClientForm
              clientData={client}
              onSubmit={handleCreateClient}
              onChange={(handleUpdateClient) => setClient(handleUpdateClient)}
            />
          </div>
        </>
      )}

      <ModalComponent
        isOpen={editModal}
        title="Editar cliente"
        subtitle="Fazer a edição do cliente"
        close={() => setEditModal(false)}
      >
        <ClientForm
          clientData={client}
          onSubmit={handleUpdateClient}
          onChange={(updatedClient) => setClient(updatedClient)}
        />
      </ModalComponent>

      <DeleteConfirmationDialog
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={confirmDeleteClient}
      />
    </div>
  );
};

export default Clientes;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ClientTable from "../components/client/ClientTable";
import { ClientForm } from "../components/client/ClientForm";
import { DeleteConfirmationDialog } from "../components/DeleteConfirmationDialog";
import { IClient } from "@/interfaces/IClient";
import SearchBar from "@/components/SearchBar";
import { ModalComponent } from "@/components/ModalComponent";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/ui/dialog";
import ProjectModal from "@/components/ProjectModal";
import { Project } from "@/types/Project";
import { emptyClient } from "@/utils/emptyObjects/Client.empty.obj";

const Clientes = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [client, setClient] = useState<IClient>();

  const [editModal, setEditModal] = useState<boolean>(false);
  const [createForm, setCreateForm] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  // buscar a lista de clientes
  const [clientList, setClientList] = useState<IClient[]>([
    {
      id: "1",
      name: "Ana Souza",
      document: "123.456.789-00",
      email: "ana.souza@email.com",
      phone: "(11) 91234-5678",
      street: "Rua das Flores",
      houseNumber: "123",
      complement: "Apto 202",
      neighbor: "Jardins",
      city: "São Paulo",
      uf: "SP",
      cep: "01001-000",
      roofType: "Telha cerâmica",
      property: "Apartamento",
      observations: "Cliente prefere atendimento pela manhã.",
      created_at: "2024-11-01T10:00:00",
      updated_at: "2024-12-01T12:30:00",
    },
    {
      id: "2",
      name: "Carlos Mendes",
      document: "987.654.321-00",
      email: "carlos.mendes@email.com",
      phone: "(21) 99876-5432",
      street: "Av. Atlântica",
      houseNumber: "456",
      complement: "",
      neighbor: "Copacabana",
      city: "Rio de Janeiro",
      uf: "RJ",
      cep: "22010-000",
      roofType: "Laje",
      property: "Cobertura",
      observations: "Solicitou projeto para energia solar.",
      created_at: "2025-01-10T14:45:00",
      updated_at: "2025-01-15T09:20:00",
    },
    {
      id: "3",
      name: "Beatriz Lima",
      document: "321.654.987-00",
      email: "beatriz.lima@email.com",
      phone: "(31) 92345-6789",
      street: "Rua Ouro Preto",
      houseNumber: "789",
      complement: "Casa fundos",
      neighbor: "Funcionários",
      city: "Belo Horizonte",
      uf: "MG",
      cep: "30140-000",
      roofType: "Telhado colonial",
      property: "Casa",
      observations: "Cliente indicou outro possível interessado.",
      created_at: "2025-03-03T08:10:00",
      updated_at: "2025-03-04T10:15:00",
    },
    {
      id: "4",
      name: "Diego Fernandes",
      document: "111.222.333-44",
      email: "diego.fernandes@email.com",
      phone: "(41) 93456-7890",
      street: "Av. Sete de Setembro",
      houseNumber: "1010",
      complement: "",
      neighbor: "Centro",
      city: "Curitiba",
      uf: "PR",
      cep: "80060-000",
      roofType: "Telhado metálico",
      property: "Loja",
      observations: "Reforma prevista para o segundo semestre.",
      created_at: "2024-09-18T11:00:00",
      updated_at: "2024-10-01T14:25:00",
    },
    {
      id: "5",
      name: "Fernanda Ribeiro",
      document: "555.666.777-88",
      email: "fernanda.ribeiro@email.com",
      phone: "(71) 91234-0000",
      street: "Rua das Palmeiras",
      houseNumber: "55",
      complement: "",
      neighbor: "Pituba",
      city: "Salvador",
      uf: "BA",
      cep: "41810-000",
      roofType: "Telhado embutido",
      property: "Casa geminada",
      observations: "Cliente deseja orçamento detalhado.",
      created_at: "2025-02-01T16:30:00",
      updated_at: "2025-02-05T17:45:00",
    },
    {
      id: "6",
      name: "Eduardo Silva",
      document: "999.888.777-66",
      email: "eduardo.silva@email.com",
      phone: "(51) 98765-4321",
      street: "Av. Ipiranga",
      houseNumber: "888",
      complement: "Sala 1502",
      neighbor: "Praia de Belas",
      city: "Porto Alegre",
      uf: "RS",
      cep: "90160-093",
      roofType: "Laje impermeabilizada",
      property: "Escritório",
      observations: "Agendar visita técnica com antecedência.",
      created_at: "2024-12-20T09:00:00",
      updated_at: "2024-12-22T11:00:00",
    },
  ]);
  // crud de clientes aqui
  // -> selecionar cliente e passar para modal de edição
  const openEditClient = (id: string) => {
    const element = clientList.find((e) => e.id === id);
    if (!element) {
      alert("Elemento não encontrado");
      return;
    }
    setClient(element);
    setEditModal(true);
  };

  const editClient = () => {
    Object.assign(client, emptyClient);
  };

  // -> selecionar cliente e passar para modal de criação
  const openCreateClient = () => {
    setShowForm(true);
    setCreateForm(true);
    Object.assign(client, emptyClient);
  };

  const createClient = () => {
    Object.assign(client, emptyClient);
  };

  // -> selecionar cliente e passar para modal de deleção
  const deleteClient = () => {};

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
                  placeholder="Pesquisar nome do cliente "
                />
              </div>
              <div className="bg-white rounded-lg shadow">
                <ClientTable
                  clients={clientList}
                  onEdit={(id) => openEditClient(id)}
                  onDelete={() => setDeleteModal(true)}
                />
              </div>
              <div className="mt-8 flex justify-end">
                <Button
                  className="bg-[#4F8A6E] hover:bg-[#2B5337] text-white"
                  onClick={() => openCreateClient()}
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
          {createForm ? <>form para criar cliente</> : <>form para atualizar cliente</>}
        </>
      )}

      <ModalComponent
        isOpen={editModal}
        title="Editar cliente"
        subtitle="Fazer a edição do cliente"
        close={() => setEditModal(false)}
        children={<form></form>}
      />
      <DeleteConfirmationDialog
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={() => alert("deletado")}
      />
    </div>
  );
};

export default Clientes;

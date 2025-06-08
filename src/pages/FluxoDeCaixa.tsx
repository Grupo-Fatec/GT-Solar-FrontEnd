import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DeleteModal from "@/components/DeleteModal";
import SearchBar from "@/components/SearchBar";
import Toast from "@/components/Toast";
import CashFlowModal from "@/components/CashFlowModal";
import CashFlowTable from "@/components/CashFlowTable";
import DetailsModalCash from "@/components/DetailsModalCash";
import { CashFlow } from "@/types/CashFlow";
import { CashFlowDashboard } from '@/components/CashFlowDashboard'; // ajuste o caminho se precisar


const initialCashFlowData: CashFlow[] = [
  { id: 1, tipo: "Entrada", descricao: "Venda serviço A", valor: 5000, dataInicio: "01/05/2025" },
  { id: 2, tipo: "Saída", descricao: "Pagamento fornecedor", valor: 1200, dataInicio: "03/05/2025" },
  { id: 3, tipo: "Entrada", descricao: "Venda produto B", valor: 2300, dataInicio: "06/05/2025" },
  { id: 4, tipo: "Saída", descricao: "Salário funcionários", valor: 3000, dataInicio: "10/05/2025" },
];

function getCurrentDateString(): string {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}

const CashFlowPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cashFlow, setCashFlow] = useState<CashFlow[]>(initialCashFlowData);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<CashFlow | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");
  const [showToast, setShowToast] = useState(false);
  const [detailsItem, setDetailsItem] = useState<CashFlow | null>(null);

  useEffect(() => {
    if (searchQuery) {
      const filtered = initialCashFlowData.filter((item) =>
        item.descricao.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCashFlow(filtered);
    } else {
      setCashFlow(initialCashFlowData);
    }
  }, [searchQuery]);

  const handleEdit = (id: number) => {
    const item = cashFlow.find((i) => i.id === id);
    if (item) {
      setItemToEdit(item);
      setModalOpen(true);
    }
  };

  const handleAddClick = () => {
    setItemToEdit(null);
    setModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedId !== null) {
      setCashFlow(cashFlow.filter((item) => item.id !== selectedId));
      setSelectedId(null);
      setDeleteModalOpen(false);
      triggerToast("Registro excluído com sucesso!", "success");
    }
  };

  const handleSaveCashFlow = (item: CashFlow) => {
    if (itemToEdit) {
      setCashFlow(cashFlow.map((i) => (i.id === item.id ? item : i)));
      triggerToast("Registro editado com sucesso!", "success");
    } else {
      const newItem = {
        ...item,
        id: Date.now(),
        dataInicio: getCurrentDateString(),
      };
      setCashFlow([...cashFlow, newItem]);
      triggerToast("Registro adicionado com sucesso!", "success");
    }
    setModalOpen(false);
    setItemToEdit(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setItemToEdit(null);
  };

  const handleView = (id: number) => {
    const item = cashFlow.find((i) => i.id === id);
    if (item) {
      setDetailsItem(item);
    }
  };

  const handleCloseDetailsModal = () => {
    setDetailsItem(null);
  };

  const triggerToast = (message: string, type: "success" | "error" | "info") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const selectedItem = cashFlow.find((i) => i.id === selectedId);

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-8 bg-white rounded-tl-3xl">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Fluxo de Caixa</h1>
            </div>
            <CashFlowDashboard
              searchTerm={searchQuery}
              onSearchTermChange={setSearchQuery}
              cashFlow={cashFlow}
            />


            <div className="mb-6">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Pesquisar por descrição"
              />
            </div>
            <div className="bg-white rounded-lg shadow">
              <CashFlowTable
                cashFlow={cashFlow}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                onView={handleView}
              />
            </div>
            <div className="mt-8 flex justify-end">
              <Button
                className="bg-[#4F8A6E] hover:bg-[#2B5337] text-white"
                onClick={handleAddClick}
              >
                Adicionar registro
              </Button>
            </div>
          </div>
        </main>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Excluir registro"
        description={`Tem certeza que deseja excluir o registro "${selectedItem?.descricao}"?`}
      />

      <CashFlowModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCashFlow}
        cashFlowToEdit={itemToEdit}
      />

      <DetailsModalCash
        cashFlow={detailsItem}
        onClose={handleCloseDetailsModal}
        onViewHistory={(tipo) => {
          alert(`Histórico do tipo: ${tipo}`);
        }}
      />

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default CashFlowPage;

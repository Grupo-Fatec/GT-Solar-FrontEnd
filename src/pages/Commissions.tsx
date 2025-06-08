import CommissionModal from '@/components/CommissionModal';
import { useEffect, useState } from 'react';
import { Commission } from "@/types/Commission";
import CommissionsTable from '@/components/CommissionsTable';
import { Button } from '@/components/ui/button';
import DeleteModal from '@/components/DeleteModal';
import SearchBar from '@/components/SearchBar';
import Toast from '@/components/Toast';
import DetailsModal from '@/components/DetailsModal';
import SellerHistoryModal from '@/components/SellerHistoryModal';

const commissionsData: Commission[] = [
  { id: 1, vendedor: 'Lucas Silva', cliente: 'Empresa A', orcamento: 2000, valor: 12000, dataInicio: '10/03/2025', status: 'Pago' },
  { id: 2, vendedor: 'Ana Paula Souza', cliente: 'Cliente B', orcamento: 1500, valor: 7500, dataInicio: '15/03/2025', status: 'Não pago' },
  { id: 3, vendedor: 'Marcos Lima', cliente: 'Loja C', orcamento: 3000, valor: 18000, dataInicio: '20/03/2025', status: 'Pago' },
  { id: 4, vendedor: 'Fernanda Rocha', cliente: 'Serviços D', orcamento: 2500, valor: 9500, dataInicio: '25/03/2025', status: 'Não pago' },
  { id: 5, vendedor: 'Thiago Martins', cliente: 'Empresa E', orcamento: 4000, valor: 22000, dataInicio: '28/03/2025', status: 'Pago' },
  { id: 6, vendedor: 'Gabriela Almeida', cliente: 'Cliente F', orcamento: 1000, valor: 5800, dataInicio: '01/04/2025', status: 'Não pago' },
  { id: 7, vendedor: 'Ricardo Pires', cliente: 'Loja G', orcamento: 3500, valor: 32000, dataInicio: '05/04/2025', status: 'Pago' },
];

const Commissions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [commissions, setCommissions] = useState<Commission[]>(commissionsData);
  const [selectedCommissionId, setSelectedCommissionId] = useState<number | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isCommissionModalOpen, setCommissionModalOpen] = useState(false);
  const [commissionToEdit, setCommissionToEdit] = useState<Commission | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");
  const [showToast, setShowToast] = useState(false);
  const [detailsCommission, setDetailsCommission] = useState<Commission | null>(null);
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);

  useEffect(() => {
    if (searchQuery) {
      const filtered = commissionsData.filter((commission) =>
        commission.vendedor.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCommissions(filtered);
    } else {
      setCommissions(commissionsData);
    }
  }, [searchQuery]);

  const handleEditCommission = (commissionId: number) => {
    const commission = commissions.find(c => c.id === commissionId);
    if (commission) {
      setCommissionToEdit(commission);
      setCommissionModalOpen(true);
    }
  };

  const handleAddCommissionClick = () => {
    setCommissionToEdit(null);
    setCommissionModalOpen(true);
  };

  const handleDeleteClick = (commissionId: number) => {
    setSelectedCommissionId(commissionId);
    setDeleteModalOpen(true);
  };

  const handleViewDetails = (commissionId: number) => {
    const commission = commissions.find(c => c.id === commissionId);
    if (commission) {
      setDetailsCommission(commission);
    }
  };

  const confirmDelete = () => {
    if (selectedCommissionId !== null) {
      setCommissions(commissions.filter((commission) => commission.id !== selectedCommissionId));
      setSelectedCommissionId(null);
      setDeleteModalOpen(false);
      triggerToast('Comissão excluída com sucesso!', 'success');
    }
  };

  const handleSaveCommission = (commission: Commission) => {
    if (commissionToEdit) {
      setCommissions(commissions.map(c => c.id === commission.id ? commission : c));
      triggerToast('Comissão editada com sucesso!', 'success');
    } else {
      setCommissions([...commissions, commission]);
      triggerToast('Comissão cadastrada com sucesso!', 'success');
    }
    setCommissionModalOpen(false);
    setCommissionToEdit(null);
  };

  const triggerToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };
  const handleCloseDetailsModal = () => {
  setDetailsCommission(null);
};
const handleViewHistory = (vendedor: string) => {
    setDetailsCommission(null); // fecha o modal de detalhes
    setSelectedSeller(vendedor);
  };
  

  const selectedCommission = commissions.find(c => c.id === selectedCommissionId);

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-8 bg-white rounded-tl-3xl">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Comissões</h1>
            </div>
            <div className="mb-6">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Pesquisar nome do cliente"
              />
            </div>
            <div className="bg-white rounded-lg shadow">
              <CommissionsTable
                commissions={commissions}
                onEdit={handleEditCommission}
                onDelete={handleDeleteClick}
                onView={handleViewDetails}
              />
            </div>
            <div className="mt-8 flex justify-end">
              <Button
                className="bg-[#4F8A6E] hover:bg-[#2B5337] text-white"
                onClick={handleAddCommissionClick}
              >
                Adicionar comissão
              </Button>
            </div>
          </div>
        </main>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Excluir comissão"
        description={`Tem certeza que deseja excluir a comissão de ${selectedCommission?.vendedor}?`}
      />

      <CommissionModal
        isOpen={isCommissionModalOpen}
        onClose={() => setCommissionModalOpen(false)}
        onSave={handleSaveCommission}
        commissionToEdit={commissionToEdit}
      />

      {detailsCommission && (
          <DetailsModal
            commission={detailsCommission}
            onClose={handleCloseDetailsModal}
            onViewHistory={handleViewHistory}  // aqui está o problema se faltar
          />
        )}
        {selectedSeller && (
        <SellerHistoryModal
          seller={selectedSeller}
          commissions={commissions.filter(c => c.vendedor === selectedSeller)}
          onClose={() => setSelectedSeller(null)}
        />
      )}

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

export default Commissions;

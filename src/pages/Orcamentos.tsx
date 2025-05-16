import BudgetModal from '@/components/BudgetModal';
import { useEffect, useState } from 'react';
import { Budget } from "@/types/Budget"; // Garantir que você tem o tipo correto
import BudgetTable from '@/components/BudgetsTable';
import { Button } from '@/components/ui/button';
import DeleteModal from '@/components/DeleteModal';
import SearchBar from '@/components/SearchBar';

const budgetsData: Budget[] = [
  { id: 1, cliente: 'Carla Pereira da Silva', dataInicio: '11/03/2025', valor: 8000, status: 'Pendente' },
  { id: 2, cliente: 'Carla Pereira da Silva', dataInicio: '11/03/2025', valor: 8000, status: 'Aprovado' },
  { id: 3, cliente: 'Carla Pereira da Silva', dataInicio: '11/03/2025', valor: 8000, status: 'Recusado' },
  { id: 4, cliente: 'Carla Pereira da Silva', dataInicio: '11/03/2025', valor: 8000, status: 'Aprovado' },
  { id: 5, cliente: 'Carla Pereira da Silva', dataInicio: '11/03/2025', valor: 8000, status: 'Recusado' },
  { id: 6, cliente: 'Carla Pereira da Silva', dataInicio: '11/03/2025', valor: 8000, status: 'Aprovado' },
  { id: 7, cliente: 'Carla Pereira da Silva', dataInicio: '11/03/2025', valor: 8000, status: 'Recusado' },
];

const Budgets: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [budgets, setBudgets] = useState<Budget[]>(budgetsData);
  const [selectedBudgetId, setSelectedBudgetId] = useState<number | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isBudgetModalOpen, setBudgetModalOpen] = useState(false);
  const [budgetToEdit, setBudgetToEdit] = useState<Budget | null>(null);

  useEffect(() => {
    if (searchQuery) {
      const filtered = budgetsData.filter((budget) =>
        budget.cliente.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setBudgets(filtered);
    } else {
      setBudgets(budgetsData);
    }
  }, [searchQuery]);

  const handleEditBudget = (budgetId: number) => {
    const budget = budgets.find(b => b.id === budgetId);
    if (budget) {
      setBudgetToEdit(budget);
      setBudgetModalOpen(true);
    }
  };

  const handleAddBudgetClick = () => {
    setBudgetToEdit(null);
    setBudgetModalOpen(true);
  };

  const handleDeleteClick = (budgetId: number) => {
    setSelectedBudgetId(budgetId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedBudgetId !== null) {
      setBudgets(budgets.filter((budget) => budget.id !== selectedBudgetId));
      setSelectedBudgetId(null);
      setDeleteModalOpen(false);
    }
  };

  const handleSaveBudget = (budget: Budget) => {
    if (budgetToEdit) {
      setBudgets(budgets.map(b => b.id === budget.id ? budget : b));
    } else {
      setBudgets([...budgets, budget]);
    }
    setBudgetModalOpen(false);
    setBudgetToEdit(null);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-8 bg-white rounded-tl-3xl">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Orçamentos</h1>
            </div>
            <div className="mb-6">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Pesquisar nome do cliente"
              />
            </div>
            <div className="bg-white rounded-lg shadow">
              <BudgetTable
                budgets={budgets}
                onEdit={handleEditBudget}
                onDelete={handleDeleteClick}
              />
            </div>
            <div className="mt-8 flex justify-end">
              <Button
                className="bg-[#4F8A6E] hover:bg-[#2B5337] text-white"
                onClick={handleAddBudgetClick}
              >
                Adicionar orçamento
              </Button>
            </div>
          </div>
        </main>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Excluir orçamento"
        description={`Tem certeza que deseja excluir o orçamento de ${budgets.find(b => b.id === selectedBudgetId)?.cliente}?`}
      />

      <BudgetModal
        isOpen={isBudgetModalOpen}
        onClose={() => setBudgetModalOpen(false)}
        onSave={handleSaveBudget}
        budgetToEdit={budgetToEdit}
      />
    </div>
  );
};

export default Budgets;


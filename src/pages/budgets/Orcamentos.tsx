import BudgetModal from "@/components/BudgetModal";
import { useEffect, useState } from "react";
import { Budget } from "@/types/Budget"; // Garantir que você tem o tipo correto
import BudgetTable from "@/components/BudgetsTable";
import { Button } from "@/components/ui/button";
import DeleteModal from "@/components/DeleteModal";
import SearchBar from "@/components/SearchBar";
import Toast from "@/components/Toast";
import { IProject } from "@/interfaces/IProjects";
import { ProjectService } from "@/services/ProjectService";

const Budgets = () => {
  const service = new ProjectService();
  const [searchQuery, setSearchQuery] = useState("");
  const [budgets, setBudgets] = useState<IProject[]>([]);
  const  [budget, setBudget] = useState<IProject>();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isBudgetModalOpen, setBudgetModalOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">(
    "success"
  );

  const [showToast, setShowToast] = useState(false);

  const handleEditBudget = (budgetId: string) => {
    const budget = budgets.find((b) => b.id === budgetId);
    if (budget) {
      setBudgetModalOpen(true);
    }
  };

  const handleAddBudgetClick = () => {
    setBudgetModalOpen(true);
  };

  const handleDeleteClick = (budgetId: string) => {
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {

  };

  const handleSaveBudget = () => {

  };

  useEffect(() => {
    const fetchProject = async () => {
      const data = await service.getAll();
      setBudgets(data);
      console.log(data)
    }
    fetchProject();
  }, []);

  const triggerToast = (
    message: string,
    type: "success" | "error" | "info" = "success"
  ) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
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
              />
            </div>
          </div>
        </main>
      </div>

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

export default Budgets;

import { useNavigate } from "react-router-dom";
import { Users, Calculator, DollarSign } from "lucide-react";
import StatCard from "@/components/StatCard";

interface DashboardStats {
  totalClientes: number;
  orcamentosPendentes: number;
  comissoesAPagar: number;
  totalCaixa: number;
}

const Index = () => {
  const navigate = useNavigate();

  // Aqui você pode buscar dados da API, ou usar props, estado etc.
  const stats: DashboardStats = {
    totalClientes: 120,        // substituir pelo dado real
    orcamentosPendentes: 5,    // substituir pelo dado real
    comissoesAPagar: 3,        // substituir pelo dado real
    totalCaixa: 50000          // substituir pelo dado real
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <main className="ml-16 p-8 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">GT Solar</h1>
            <p className="text-xl text-gray-600 mt-2">Olá, Débora 👋</p>
          </div>

          {/* Estatísticas principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <StatCard title="Total de clientes" value={stats.totalClientes.toString()} icon={<Users size={24} />} />
            <StatCard title="Orçamentos pendentes" value={stats.orcamentosPendentes.toString()} icon={<Calculator size={24} />} />
          </div>

          {/* Informações financeiras */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard title="Comissões a pagar" value={stats.comissoesAPagar.toString()} icon={<Calculator size={24} />} />
            <StatCard title="Total em caixa" value={`R$ ${stats.totalCaixa.toLocaleString('pt-BR')}`} icon={<DollarSign size={24} />} />
          </div>

          {/* Ações rápidas */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ações rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-900">Cadastrar novo cliente</h3>
                <p className="text-gray-600 mt-2">Adicione um novo cliente ao sistema.</p>
                <button
                  className="mt-4 bg-blue-500 text-white p-2 rounded"
                  onClick={() => navigate("/pages/clientes")}
                >
                  Adicionar Cliente
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-900">Gerar orçamento</h3>
                <p className="text-gray-600 mt-2">Crie um orçamento para um cliente.</p>
                <button
                  className="mt-4 bg-green-500 text-white p-2 rounded"
                  onClick={() => navigate("/pages/orcamentos")}
                >
                  Criar Orçamento
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-900">Visualizar projetos</h3>
                <p className="text-gray-600 mt-2">Acesse os projetos existentes</p>
                <button
                  className="mt-4 bg-yellow-500 text-white p-2 rounded"
                  onClick={() => navigate("/pages/projects")} 
                >
                  Ver Projetos
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;


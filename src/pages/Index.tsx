import { Users, Calculator, DollarSign } from "lucide-react";
import Sidebar from "../layouts/SidebarLayout";
import StatCard from "../components/StatCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <main className="ml-16 p-8 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">GT Solar</h1>
            <p className="text-xl text-gray-600 mt-2">Olá 👋</p>
          </div>

          {/* Estatísticas principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <StatCard
              title="Total de clientes"
              value="120"
              icon={<Users size={24} />}
            />
            <StatCard
              title="Orçamentos pendentes"
              value="5"
              icon={<Calculator size={24} />}
            />
          </div>

          {/* Informações financeiras */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard
              title="Comissões a pagar"
              value="3"
              icon={<Calculator size={24} />}
            />
            <StatCard
              title="Total em caixa"
              value="R$ 50.000"
              icon={<DollarSign size={24} />}
            />
          </div>

          {/* Seção de mensagens ou ações rápidas */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ações rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-900">Cadastrar novo cliente</h3>
                <p className="text-gray-600 mt-2">Adicione um novo cliente ao sistema.</p>
                <button className="mt-4 bg-blue-500 text-white p-2 rounded">Adicionar Cliente</button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-900">Gerar orçamento</h3>
                <p className="text-gray-600 mt-2">Crie um orçamento para um cliente.</p>
                <button className="mt-4 bg-green-500 text-white p-2 rounded">Criar Orçamento</button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-900">Ver relatórios</h3>
                <p className="text-gray-600 mt-2">Acesse relatórios de vendas e finanças.</p>
                <button className="mt-4 bg-yellow-500 text-white p-2 rounded">Ver Relatórios</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

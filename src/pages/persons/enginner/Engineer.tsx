// pages/admin/engineer/[id].tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IEngineer } from "@/interfaces/person/IEngineer";
import { PersonService } from "@/services/PersonService";
import { Button } from "@/components/ui/button";

const EngineerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [engineer, setEngineer] = useState<IEngineer>();
  const service = new PersonService();

  useEffect(() => {
    const fetchEngineer = async () => {
      if (id) {
        const data = await service.findEngineerById(id);
        setEngineer(data);
      }
    };
    fetchEngineer();
  }, []);

  return (
    <main className="min-h-screen p-10 bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
        <div className="mb-4">
        <Button variant="outline" onClick={() => navigate("/pages/projects")}>
          Voltar
        </Button>
      </div>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-[#4F8A6E]">Detalhes do Engenheiro</h1>

        {engineer && (
          <div className="bg-white dark:bg-gray-900 shadow p-6 rounded-xl">
            <h2 className="text-2xl font-semibold">{engineer?.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{engineer?.email}</p>
            <p className="mt-2">CREA: <strong>{engineer?.crea}</strong></p>
            <p>Especialização: <strong>{engineer?.specialization}</strong></p>
            <p>Valor por kWh: <strong>R$ {engineer?.valuePerKwh.toFixed(2)}</strong></p>

            <h3 className="text-xl font-bold mt-6 mb-2">Projetos Relacionados</h3>
            <div className="space-y-4">
              {engineer?.projects?.map((project) => (
                <div
                  key={project.id}
                  className="border rounded-lg p-4 bg-gray-100 dark:bg-gray-800"
                >
                  <p><strong>Projeto:</strong> {project.name}</p>
                  <p><strong>Status:</strong> {project.status}</p>
                  <p><strong>Valor do Projeto:</strong> R$ {project.approvedValue.toFixed(2)}</p>
                  <p><strong>Cliente:</strong> {project.client?.name} ({project.client.email})</p>
                  <p><strong>Endereço:</strong> {project.client?.cep}</p>
                  <p><strong>Consumo estimado:</strong> {project?.energyConsumption} kWh</p>
                  <p className="text-green-700 dark:text-green-400">
                    <strong>Valor a receber:</strong> R$ {(engineer?.valuePerKwh * project?.energyConsumption).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default EngineerDetails;

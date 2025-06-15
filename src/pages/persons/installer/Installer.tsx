import { IInstaller } from "@/interfaces/person/IInstaller";
import { PersonService } from "@/services/PersonService";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const Installer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [installer, setInstaller] = useState<IInstaller | null>(null);
  const service = new PersonService();

  useEffect(() => {
    const fetchInstaller = async () => {
      if (!id) return;
      const data = await service.findInstallerById(id);
      setInstaller(data);
    };
    fetchInstaller();
  }, []);

  if (!installer) return <p className="p-10">Carregando instalador...</p>;

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <div className="mb-4">
        <Button variant="outline" onClick={() => navigate("/pages/installers")}>
          Voltar
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-4 text-gray-900">{installer?.name}</h1>

      <Card className="mb-6">
        <CardContent className="p-6 space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Informações do Instalador</h2>
          <Separator className="my-2" />
          <p><strong>Email:</strong> {installer?.email}</p>
          <p><strong>Preço por kWp:</strong> R$ {installer?.pricePerKwp?.toFixed(2)}</p>
          <p><strong>Disponível?</strong> {installer?.isAvailable ? "Sim" : "Não"}</p>
          <p><strong>Dias disponíveis:</strong> {installer?.availableDays}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Projetos Relacionados</h2>
          <Separator className="my-2" />

          {installer?.projects?.length > 0 ? (
            <ul className="space-y-3">
              {installer.projects.map((project) => (
                <li key={project?.id} className="border rounded-lg p-4 shadow-sm">
                  <p><strong>Projeto:</strong> {project?.name}</p>
                  <p><strong>Valor Aprovado:</strong> R$ {project?.approvedValue?.toFixed(2)}</p>
                  <p><strong>Cliente:</strong> {project?.client?.name}</p>
                  <p><strong>Email do Cliente:</strong> {project?.client?.email}</p>
                  <p><strong>Endereço do Cliente:</strong> {project?.client?.cep}</p>
                  <p className="text-green-700 font-semibold mt-2">
                    Valor que o instalador vai receber: R$ {(installer.pricePerKwp * project?.energyConsumption).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Nenhum projeto relacionado encontrado.</p>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default Installer;

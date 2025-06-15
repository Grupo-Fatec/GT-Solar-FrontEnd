import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectService } from "@/services/ProjectService";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IProject } from "@/interfaces/IProjects";
import StatusBadge from "@/components/StatusBadge";
import { StatusEnum } from "@/enums/StatusEnum";
import { Button } from "@/components/ui/button";

const Project = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState<IProject | null>(null);
  const projectService = new ProjectService();

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      const result = await projectService.getById(id);
      setProject(result);
      console.log(result);
    };
    fetchProject();
  }, []);

  if (!project)
    return <p className="p-10 text-gray-700">Carregando projeto...</p>;

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <div className="mb-4">
        <Button variant="outline" onClick={() => navigate("/pages/projects")}>
          Voltar
        </Button>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{project?.name}</h1>
      <Badge className="mb-6"></Badge>

      <Card>
        <CardContent className="p-6 space-y-4">
          <section>
            <h2 className="text-xl font-semibold text-gray-800">
              Informações Gerais
            </h2>
            <Separator className="my-2" />
            <div className="text-gray-700 space-y-1">
              <p>
                <strong>Consumo:</strong> {project.energyConsumption} kWh
              </p>
              <p>
                <strong>Valor Aprovado:</strong> R${" "}
                {project.approvedValue?.toFixed(2)}
              </p>
              <p>
                <strong>Admin responsável:</strong> {project.createdBy?.email}
              </p>
              <p>
                <strong>Situação do projeto:</strong>{" "}
                <StatusBadge status={StatusEnum[project.status]} />
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mt-4">
              Pessoas Envolvidas
            </h2>
            <Separator className="my-2" />
            <div className="text-gray-700 space-y-1">
              <p>
                <strong>Engenheiro:</strong> {project.engineer?.name}
              </p>
              <p>
                <strong>Cliente:</strong> {project.client?.name}
              </p>
              <p>
                <strong>Instalador:</strong> {project.installer?.name}
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mt-4">
              Equipamentos
            </h2>
            <Separator className="my-2" />
            {project.equipments?.length > 0 ? (
              <ul className="text-gray-700 list-disc list-inside space-y-1">
                {project.equipments.map((eq) => (
                  <li key={eq.id}>
                    {eq?.name} - {eq?.power} - R$ {eq.price.toFixed(2)} (
                    {eq?.type})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                Nenhum equipamento vinculado.
              </p>
            )}
          </section>
        </CardContent>
      </Card>
    </main>
  );
};

export default Project;

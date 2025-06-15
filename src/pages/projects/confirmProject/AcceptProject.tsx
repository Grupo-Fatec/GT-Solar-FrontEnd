import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";

interface ProjectData {
  id: string;
  name: string;
  email: string;
  totalValue: number;
  kwh: number;
  pricePerKwh: number;
}

const AcceptProject = () => {
  const router = useParams();
  const navigate = useNavigate();
  const { id, userType } = router;
  const [project, setProject] = useState<ProjectData | null>(null);

  // se userType for engineer -> faremos uma chamada diferente para o backend
  // se o userType for installer
  // se o userType for client
  useEffect(() => {
    if (id && userType) {
      // Simulação de fetch
      setProject({
        id: id as string,
        name: "Empresa Exemplo LTDA",
        email: "contato@empresaexemplo.com",
        totalValue: 15000,
        kwh: 5000,
        pricePerKwh: 1.2,
      });
    }
  }, [id, userType]);

  const handleAction = async (accepted: boolean) => {
    navigate(`/project/accepted/${id}`);
  };

  const earnings = project ? project.kwh * project.pricePerKwh : 0;

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4">
      <Card className="max-w-xl w-full rounded-2xl shadow-md border border-gray-200 dark:border-gray-800">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-[#4F8A6E] text-center">
            Confirmação de Projeto
          </h2>
          {project && (
            <div className="space-y-2 text-center">
              <p>
                <strong>Nome:</strong> {project.name}
              </p>
              <p>
                <strong>Email:</strong> {project.email}
              </p>
              <p>
                <strong>Valor total do projeto:</strong> R${" "}
                {project.totalValue.toFixed(2)}
              </p>
              <p>
                <strong>Você receberá:</strong> R$ {earnings.toFixed(2)}
              </p>
            </div>
          )}
          <div className="flex justify-center gap-4 pt-4">
            <Button
              onClick={() => handleAction(true)}
              className="bg-[#4F8A6E] text-white px-6 py-2 rounded-xl hover:opacity-90 transition"
            >
              Aceitar
            </Button>
            <Button
              onClick={() => handleAction(false)}
              className="bg-gray-400 text-white px-6 py-2 rounded-xl hover:opacity-80 transition"
            >
              Recusar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcceptProject;

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IEngineer } from "@/interfaces/person/IEngineer";
import { PersonService } from "@/services/PersonService";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/patterns/Modal";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Engineers = () => {
  const navigate = useNavigate();
  const service = new PersonService();
  const emptyEngineer: IEngineer = {
    id: null,
    crea: "",
    name: "",
    email: "",
    specialization: "",
    type: "",
    valuePerKwh: 0,
    projects: [],
  };
  const [engineers, setEngineers] = useState<IEngineer[]>([]);
  const [engineer, setEngineer] = useState<IEngineer>(emptyEngineer);

  const [createModal, setCreateModal] = useState<boolean>(false);

  const goTo = (route: string) => {
    navigate(route);
  };

  const onCreate = () => {
    setCreateModal(true);
    setEngineer(emptyEngineer);
  };

  const handleCreate = async () => {
    alert(engineer.name.length);
    const res = await service.createEngineer(engineer);
    

    if (!res) {
      alert("Deu erro mermão");
    }
    engineers.push(res);
    setEngineer(emptyEngineer);
    setCreateModal(false);
  };

  useEffect(() => {
    const fetchEngineers = async () => {
      const data = await service.findAllEngineers();
      setEngineers(data);
      console.log(data);
    };
    fetchEngineers();
  }, []);
  return (
    <main className="p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Engenheiros</h1>
      </div>
      <div className="border rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="text-center w-12">
                <input type="checkbox" />
              </TableHead>
              <TableHead className="text-center">CREA</TableHead>
              <TableHead className="text-center">name</TableHead>
              <TableHead className="text-center">email</TableHead>
              <TableHead className="text-center">valuePerKwh</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {engineers.map((e) => (
              <TableRow
                key={e.id}
                onClick={() => goTo(`/pages/engineers/${e.id}`)}
                className="hover:bg-gray-100 transition cursor-pointer"
              >
                <TableCell className="text-center">
                  <input type="checkbox" />
                </TableCell>
                <TableCell className="text-center font-medium text-gray-800">
                  {e.crea}
                </TableCell>
                <TableCell className="text-center font-medium text-gray-800">
                  {e.name}
                </TableCell>
                <TableCell className="text-center text-gray-700">
                  {e.email}
                </TableCell>
                <TableCell className="text-center text-gray-700">
                  {e.valuePerKwh}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <section>
        <div className="mt-8 flex justify-end">
          <Button
            className="bg-[#4F8A6E] hover:bg-[#2B5337] text-white"
            onClick={() => onCreate()}
          >
            Adicionar Engenheiro
          </Button>
        </div>
      </section>

      <section>
        {/* Modal actions */}
        <Modal
          title="Criar novo engenheiro"
          description="Vamos adicionar um novo engenheiro a GT-solar"
          isOpen={createModal}
          onClose={() => setCreateModal(false)}
          onConfirm={() => handleCreate()}
          confirmLabel="Salvar"
          confirmColor="bg-[#4F8A6E] hover:bg-[#2B5337] text-white"
        >
          <form action="POST" className="flex flex-col gap-5 w-[100%] p-3">
            <div>
              <label htmlFor="Nome">Nome do Engenheiro</label>
              <Input
                className="p-3 focus:border-none"
                type="text"
                placeholder="Nome"
                value={engineer.name}
                onChange={(e) =>
                  setEngineer({ ...engineer, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label htmlFor="Nome">Crea do Engenheiro</label>
              <Input
                className="p-3 focus:border-none"
                type="text"
                placeholder="crea"
                value={engineer.crea}
                onChange={(e) =>
                  setEngineer({ ...engineer, crea: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label htmlFor="Nome">email do Engenheiro</label>
              <Input
                className="p-3 focus:border-none"
                type="email"
                placeholder="email"
                value={engineer.email}
                onChange={(e) =>
                  setEngineer({ ...engineer, email: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label htmlFor="Nome">valor por KWH do Engenheiro</label>
              <Input
                className="p-3 focus:border-none"
                type="number"
                placeholder="Digite apenas o valor utilizando números"
                value={engineer.valuePerKwh == 0 ? "" : engineer.valuePerKwh}
                onChange={(e) =>
                  setEngineer({
                    ...engineer,
                    valuePerKwh: Number(e.target.value),
                  })
                }
                required
              />
            </div>
          </form>
        </Modal>
      </section>
    </main>
  );
};

export default Engineers;

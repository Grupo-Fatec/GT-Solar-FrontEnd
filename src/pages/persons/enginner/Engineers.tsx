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
import { Pencil, Trash2 } from "lucide-react";

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
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const goTo = (route: string) => {
    navigate(route);
  };

  const onCreate = () => {
    setEngineer(emptyEngineer);
    setIsEditing(false);
    setCreateModal(true);
  };

  const handleCreate = async () => {
    const res = await service.createEngineer(engineer);
    if (!res) {
      alert("Erro ao criar engenheiro");
      return;
    }
    setEngineers([...engineers, res]);
    setEngineer(emptyEngineer);
    setCreateModal(false);
  };

  const handleEdit = async () => {
    const res = await service.updateEngineer(engineer.id, engineer);
    if (!res) {
      alert("Erro ao editar engenheiro");
      return;
    }
    const updated = engineers.map((eng) => (eng.id === res.id ? res : eng));
    setEngineers(updated);
    setEngineer(emptyEngineer);
    setIsEditing(false);
    setCreateModal(false);
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    await service.deletePerson(id);
    setEngineers(engineers.filter((eng) => eng.id !== id));
  };

  useEffect(() => {
    const fetchEngineers = async () => {
      const data = await service.findAllEngineers();
      setEngineers(data);
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
              <TableHead className="text-center">Nome</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Valor por kWh</TableHead>
              <TableHead className="text-center"></TableHead>
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
                <TableCell
                  className="text-center space-x-2"
                  onClick={(ev) => ev.stopPropagation()}
                >
                  <button
                    onClick={() => {
                      setEngineer(e);
                      setIsEditing(true);
                      setCreateModal(true);
                    }}
                    className="text-gray-400 hover:text-blue-500"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(e.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
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
            onClick={onCreate}
          >
            Adicionar Engenheiro
          </Button>
        </div>
      </section>

      <section>
        <Modal
          title={isEditing ? "Editar engenheiro" : "Criar novo engenheiro"}
          description={
            isEditing
              ? "Atualize os dados do engenheiro"
              : "Vamos adicionar um novo engenheiro à GT-solar"
          }
          isOpen={createModal}
          onClose={() => {
            setCreateModal(false);
            setEngineer(emptyEngineer);
            setIsEditing(false);
          }}
          onConfirm={() => (isEditing ? handleEdit() : handleCreate())}
          confirmLabel={isEditing ? "Atualizar" : "Salvar"}
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
              <label htmlFor="Crea">Crea do Engenheiro</label>
              <Input
                className="p-3 focus:border-none"
                type="text"
                placeholder="CREA"
                value={engineer.crea}
                onChange={(e) =>
                  setEngineer({ ...engineer, crea: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label htmlFor="Email">Email do Engenheiro</label>
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
              <label htmlFor="Valor">Valor por KWH</label>
              <Input
                className="p-3 focus:border-none"
                type="number"
                placeholder="Digite apenas números"
                value={engineer.valuePerKwh === 0 ? "" : engineer.valuePerKwh}
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

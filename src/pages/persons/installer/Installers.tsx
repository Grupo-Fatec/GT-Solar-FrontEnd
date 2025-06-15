import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IInstaller } from "@/interfaces/person/IInstaller";
import { PersonService } from "@/services/PersonService";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/patterns/Modal";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Installers = () => {
  const navigate = useNavigate();
  const service = new PersonService();
  const emptyInstaller: IInstaller = {
    id: null,
    name: "",
    email: "",
    type: "INSTALLER",
    pricePerKwp: 0,
    availableDays: "",
    isAvailable: true,
    projects: [],
  };

  const [installers, setInstallers] = useState<IInstaller[]>([]);
  const [installer, setInstaller] = useState<IInstaller>(emptyInstaller);
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const onCreate = () => {
    setInstaller(emptyInstaller);
    setIsEditing(false);
    setCreateModal(true);
  };

  const handleCreate = async () => {
    const res = await service.createInstaller(installer);
    if (!res) return alert("Erro ao criar instalador.");
    setInstallers([...installers, res]);
    setInstaller(emptyInstaller);
    setCreateModal(false);
  };

  const handleEdit = async () => {
    const res = await service.updateInstaller(installer.id, installer);
    if (!res) return alert("Erro ao editar instalador.");
    setInstallers(
      installers.map((i) => (i.id === res.id ? res : i))
    );
    setInstaller(emptyInstaller);
    setIsEditing(false);
    setCreateModal(false);
  };

  const handleDelete = async (id: string | null) => {
    if (!id) return;
    await service.deletePerson(id);
    setInstallers(installers.filter((i) => i.id !== id));
  };

  useEffect(() => {
    const fetchInstallers = async () => {
      const data = await service.findAllInstallers();
      setInstallers(data);
    };
    fetchInstallers();
  }, []);

  return (
    <main className="p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Instaladores</h1>
      </div>

      <div className="border rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="text-center">Nome</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Preço por kWp</TableHead>
              <TableHead className="text-center">Dias disponíveis</TableHead>
              <TableHead className="text-center">Disponível</TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {installers.map((i) => (
              <TableRow
                key={i.id}
                className="hover:bg-gray-100 transition cursor-pointer"
              >
                <TableCell className="text-center" onClick={() => navigate(`/pages/installer/${i.id}`)}>{i.name}</TableCell>
                <TableCell className="text-center">{i.email}</TableCell>
                <TableCell className="text-center">{i.pricePerKwp}</TableCell>
                <TableCell className="text-center">{i.availableDays}</TableCell>
                <TableCell className="text-center">
                  {i.isAvailable ? "Sim" : "Não"}
                </TableCell>
                <TableCell className="text-center space-x-2">
                  <button
                    onClick={() => {
                      setInstaller(i);
                      setIsEditing(true);
                      setCreateModal(true);
                    }}
                    className="text-gray-400 hover:text-blue-500"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(i.id)}
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

      <div className="mt-8 flex justify-end">
        <Button
          className="bg-[#4F8A6E] hover:bg-[#2B5337] text-white"
          onClick={onCreate}
        >
          Adicionar Instalador
        </Button>
      </div>

      <Modal
        title={isEditing ? "Editar Instalador" : "Criar novo Instalador"}
        description={
          isEditing
            ? "Atualize os dados do instalador"
            : "Vamos adicionar um novo instalador"
        }
        isOpen={createModal}
        onClose={() => {
          setCreateModal(false);
          setInstaller(emptyInstaller);
          setIsEditing(false);
        }}
        onConfirm={() => (isEditing ? handleEdit() : handleCreate())}
        confirmLabel={isEditing ? "Atualizar" : "Salvar"}
        confirmColor="bg-[#4F8A6E] hover:bg-[#2B5337] text-white"
      >
        <form className="flex flex-col gap-5 w-full p-3">
          <div>
            <label htmlFor="name">Nome</label>
            <Input
              type="text"
              placeholder="Nome"
              value={installer.name}
              onChange={(e) =>
                setInstaller({ ...installer, name: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              placeholder="Email"
              value={installer.email}
              onChange={(e) =>
                setInstaller({ ...installer, email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label htmlFor="price">Preço por kWp</label>
            <Input
              type="number"
              placeholder="Ex: 450"
              value={installer.pricePerKwp || ""}
              onChange={(e) =>
                setInstaller({
                  ...installer,
                  pricePerKwp: Number(e.target.value),
                })
              }
              required
            />
          </div>

          <div>
            <label htmlFor="days">Dias disponíveis</label>
            <Input
              type="text"
              placeholder="Ex: Segunda a Sexta"
              value={installer.availableDays}
              onChange={(e) =>
                setInstaller({ ...installer, availableDays: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label htmlFor="disponibilidade">Está disponível?</label>
            <select
              className="w-full p-2 border rounded-md"
              value={installer.isAvailable ? "yes" : "no"}
              onChange={(e) =>
                setInstaller({
                  ...installer,
                  isAvailable: e.target.value === "yes",
                })
              }
            >
              <option value="yes">Sim</option>
              <option value="no">Não</option>
            </select>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default Installers;

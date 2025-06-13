import Modal from "@/components/patterns/Modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ISupplier } from "@/interfaces/supplier/ISupplier";
import { SupplierService } from "@/services/SupplierService";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

const Suppliers = () => {
  const navigate = useNavigate();
  const emptySupplier: ISupplier = {
    id: null,
    name: "",
    email: "",
    deliveryDate: "",
    equipments: [],
  };
  const service = new SupplierService();
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const [supplier, setSupplier] = useState<ISupplier>(emptySupplier);

  // modals controllers
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [createModal, setCreateModal] = useState<boolean>(false);

  const goTo = (route: string) => {
    navigate(route);
  };

  const onCreate = () => {
    setSupplier(emptySupplier);
    setCreateModal(true);
  };

  const onEdit = (id: string) => {
    const element = suppliers.find((e) => e.id == id);
    setEditModal(true);
    setSupplier(element);
  };

  const onDelete = (id: string) => {
    const element = suppliers.find((e) => e.id == id);
    setSupplier(element);
    setDeleteModal(true);
  };

  // actions
  const handleCreate = async () => {
    await service.create(supplier);
    suppliers.push(supplier);
    setCreateModal(false);
    setSupplier(emptySupplier);
  };

  const handleEditSupplier = async () => {
    await service.update(supplier.id, supplier);
    setEditModal(false);
    setSupplier(emptySupplier);
  };

  const handleDeleteModal = async () => {
    const res = await service.delete(supplier.id);
    if(res.status !== 204){
      setDeleteModal(false);
      setSupplier(emptySupplier);
      alert("Erro ao deletar fornecedor. Tente novamente.");
      return;
    }
    const index = suppliers.findIndex((e) => e.id == supplier.id);
    suppliers.splice(index, 1);
    setDeleteModal(false);
    setSupplier(emptySupplier);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await service.getAll();
      setSuppliers(res);
    };
    fetchData();
  }, []);
  return (
    <main className="p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Fornecedores</h1>
      </div>
      <div className="border rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="text-center w-12">
                <input type="checkbox" />
              </TableHead>
              <TableHead className="text-center">Nome</TableHead>
              <TableHead className="text-center">Data de Entrega</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((s) => (
              <TableRow
                key={s.id}
                className="hover:bg-gray-100 transition cursor-pointer"
              >
                <TableCell className="text-center">
                  <input type="checkbox" />
                </TableCell>
                <TableCell
                  className="text-center font-medium text-gray-800"
                  onClick={() => goTo(`/pages/suppliers/${s.id}`)}
                >
                  {s.name}
                </TableCell>
                <TableCell className="text-center text-gray-700">
                  {s.deliveryDate}
                </TableCell>
                <TableCell className="text-center space-x-2">
                  <button
                    onClick={() => onEdit(s.id)}
                    className="text-gray-400 hover:text-blue-500"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(s.id)}
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
            onClick={() => onCreate()}
          >
            Adicionar Fornecedor
          </Button>
        </div>
      </section>

      <section>
        <Modal
          title="Cadastro de fornecedores"
          description="Vamos cadastrar um novo fornecedor para a GT-solar"
          isOpen={createModal}
          onClose={() => setCreateModal(false)}
          onConfirm={() => handleCreate()}
          confirmLabel="Salvar"
          confirmColor="bg-[#4F8A6E] hover:bg-[#2B5337] text-white"
        >
          <form className="flex flex-col gap-5 w-[100%] p-3">
            <div>
              <label htmlFor="Nome">Nome do fornecedor</label>
              <Input
                className="p-3 focus:border-none"
                type="text"
                placeholder="Nome"
                value={supplier.name}
                onChange={(e) =>
                  setSupplier({ ...supplier, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label htmlFor="Email">Email do fornecedor</label>
              <Input
                className="p-3 focus:border-none"
                type="email"
                placeholder="Email"
                value={supplier.email}
                onChange={(e) =>
                  setSupplier({ ...supplier, email: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label htmlFor="Dias">Quantos dias estimados para entrega</label>
              <Input
                className="p-3 focus:border-none"
                type="text"
                placeholder="Dias"
                value={supplier.deliveryDate}
                onChange={(e) =>
                  setSupplier({ ...supplier, deliveryDate: e.target.value })
                }
                required
              />
            </div>
          </form> 
        </Modal>

        {/* atualizar Fornecedor */}
        <Modal
          title="Editar Fornecedor"
          description={`Edite os campos disponíveis de ${JSON.stringify(
            supplier?.name
          )}`}
          isOpen={editModal}
          onClose={() => setEditModal(false)}
          onConfirm={() => handleEditSupplier()}
          confirmLabel="Editar"
          confirmColor="bg-blue-600 text-white hover:bg-blue-700"
        >
          <form className="flex flex-col gap-5 w-[100%] p-3">
            <div>
              <label htmlFor="Nome">Nome do fornecedor</label>
              <Input
                className="p-3 focus:border-none"
                type="text"
                placeholder="Nome"
                value={supplier.name}
                onChange={(e) =>
                  setSupplier({ ...supplier, name: e.target.value })
                }
              />
            </div>

            <div>
              <label htmlFor="Email">Email do fornecedor</label>
              <Input
                className="p-3 focus:border-none"
                type="text"
                placeholder="Email"
                value={supplier.email}
                onChange={(e) =>
                  setSupplier({ ...supplier, email: e.target.value })
                }
              />
            </div>

            <div>
              <label htmlFor="Dias">Quantos dias estimados para entrega</label>
              <Input
                className="p-3 focus:border-none"
                type="text"
                placeholder="Dias"
                value={supplier.deliveryDate}
                onChange={(e) =>
                  setSupplier({ ...supplier, deliveryDate: e.target.value })
                }
              />
            </div>
          </form>
        </Modal>

        <Modal
          title="Deletar fornecedor"
          description={`Tem certeza que deseja deletar o fornecedor ${JSON.stringify(
            supplier?.name
          )}? Essa ação não poderá ser desfeita.`}
          isOpen={deleteModal}
          onClose={() => setDeleteModal(false)}
          onConfirm={() => handleDeleteModal()}
          confirmLabel="Deletar"
          confirmColor="bg-red-600 text-white hover:bg-red-700"
        ></Modal>
      </section>
    </main>
  );
};

export default Suppliers;

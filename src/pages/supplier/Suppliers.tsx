import Modal from "@/components/patterns/Modal";
import { DialogHeader } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
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
import { Pencil, Trash2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [supplier, setSupplier] = useState<ISupplier>();

  // modals controllers
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const goTo = (route: string) => {
    navigate(route);
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
  const handleEditSupplier = () => {
    setEditModal(false);
    setSupplier(emptySupplier);
    alert(JSON.stringify(supplier));
  };

  const handleDeleteModal = () => {
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
      {JSON.stringify(supplier)}
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
                  {new Date(s.deliveryDate).toLocaleDateString() +
                    " - " +
                    new Date(s.deliveryDate).toLocaleTimeString()}
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
          <form action="PUT"></form>
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
        >
          <form action="PUT"></form>
        </Modal>
      </section>
    </main>
  );
};

export default Suppliers;

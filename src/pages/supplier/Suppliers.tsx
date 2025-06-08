import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ISupplier } from "@/interfaces/supplier/ISupplier";
import { SupplierService } from "@/services/SupplierService";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Suppliers = () => {
  const navigate = useNavigate(); // Corrigido de natigate para navigate
  const service = new SupplierService();
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);

  const goTo = (route: string) => {
    navigate(route);
  };

  const onEdit = (id: string) => {
    alert(id);
  };

  const onDelete = (id: string) => {
    alert(id);
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
                  {new Date(s.deliveryDate).toLocaleDateString() + " - " + new Date(s.deliveryDate).toLocaleTimeString()}
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
    </main>
  );
};

export default Suppliers;

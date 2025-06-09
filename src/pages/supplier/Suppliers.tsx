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
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";

const Suppliers = () => {
  const navigate = useNavigate();
  const service = useMemo(() => new SupplierService(), []);
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteManyDialogOpen, setDeleteManyDialogOpen] = useState(false);
  const [supplierIdToDelete, setSupplierIdToDelete] = useState<string | null>(null);


  const fetchSuppliers = useCallback(async () => {
    const res = await service.getAll();
    setSuppliers(res);
  }, [service]);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  const filteredSuppliers = suppliers.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //Função do Supplier.tsx

 // const handleSelect = (id: string) => {
   // setSelectedIds((prev) =>
    //  prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    //);
  //};
  

  const handleSelectAll = () => {
    if (selectedIds.length === filteredSuppliers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredSuppliers.map((s) => s.id));
    }
  };

  const handleDeleteClick = (id: string) => {
    setSupplierIdToDelete(id);
    setDeleteDialogOpen(true);
  };

  const onDelete = async () => {
    if (supplierIdToDelete) {
      await service.delete(supplierIdToDelete);
      setSupplierIdToDelete(null);
      setDeleteDialogOpen(false);
      fetchSuppliers();
    }
  };


  const handleDeleteManyClick = () => {
    setDeleteManyDialogOpen(true);
  };

  const onDeleteMany = async () => {
    if (selectedIds.length === 0) return;
    await service.deleteMany(selectedIds);
    setSelectedIds([]);
    setDeleteManyDialogOpen(false);
    fetchSuppliers();
  };
  const onEdit = (id: string) => {
    navigate(`/pages/suppliers/${id}`);
  };

  const goTo = (route: string) => {
    navigate(route);
  };

  return (
    <main className="p-10">
      <div className="mb-4 flex gap-2 items-center">
        <input
          type="text"
          placeholder="Pesquisar fornecedor"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => goTo("/pages/suppliers/create")}
        >
          Novo Fornecedor
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={onDeleteMany}
          disabled={selectedIds.length === 0}
        >
          Excluir Selecionados
        </button>
      </div>
      <div className="border rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="text-center w-12">
                <input
                  type="checkbox"
                  checked={selectedIds.length === filteredSuppliers.length && filteredSuppliers.length > 0}
                  onChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="text-center">Nome</TableHead>
              <TableHead className="text-center">Data de Entrega</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.map((s) => (
              <TableRow
                key={s.id}
                className="hover:bg-gray-100 transition cursor-pointer"
              >
                <TableCell className="text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(s.id)}
                    // onChange={() => handleSelect(s.id)}
                  />
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
                    onClick={() => handleDeleteClick(s.id)}
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
      
      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSupplierIdToDelete(null);
        }}
        onConfirm={onDelete}
      />

      <DeleteConfirmationDialog
        isOpen={deleteManyDialogOpen}
        onClose={() => setDeleteManyDialogOpen(false)}
        onConfirm={onDeleteMany}
      />
    </main>
  );
};

export default Suppliers;
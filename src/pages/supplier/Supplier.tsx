import { ISupplier } from "@/interfaces/supplier/ISupplier";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SupplierService } from "@/services/SupplierService";


const Supplier = () => {
  const supplierService = new SupplierService();
  const { id } = useParams();
  const [supplier, setSupplier] = useState<ISupplier | null>(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
        const data = await supplierService.getById(id);
        setSupplier(data);
        console.log(data)
    }
    fetchSuppliers();
  }, []);

  if (!supplier) return <div className="text-gray-600">Carregando fornecedor...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Fornecedor: {supplier.name}</h1>

      <div className="bg-green-100 p-4 rounded shadow mb-6">
        <p><span className="font-semibold">Email:</span> {supplier.email}</p>
        <p><span className="font-semibold">Entrega prevista:</span> {supplier.deliveryDate}</p>
      </div>

      <h2 className="text-2xl font-semibold text-green-600 mb-3">Equipamentos Fornecidos</h2>
      <div className="space-y-4">
      
      </div>
    </div>
  );
};

export default Supplier;

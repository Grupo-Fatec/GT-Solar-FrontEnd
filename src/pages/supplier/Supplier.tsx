import { ISupplier } from "@/interfaces/supplier/ISupplier";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SupplierService } from "@/services/SupplierService";

const Supplier = () => {
  const navigate = useNavigate();
  const supplierService = new SupplierService();
  const { id } = useParams();
  const [supplier, setSupplier] = useState<ISupplier | null>(null);

  const goTo = (route: string) => {
    navigate(route);
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      const data = await supplierService.getById(id);
      setSupplier(data);
      console.log(data);
    };
    fetchSuppliers();
  }, []);

  if (!supplier)
    return <div className="text-gray-600">Carregando fornecedor...</div>;

  return (
    <div className="p-10">
      <h1 className="text-4xl font-extrabold text-green-800 mb-6 text-center">
        Detalhes do Fornecedor
      </h1>

      <div className="bg-green-50 p-6 rounded-lg shadow-md mb-8 border border-green-200">
        <h2 className="text-2xl font-bold text-green-700 mb-3">
          {supplier.name}
        </h2>
        <p className="text-lg text-gray-700 mb-2">
          <span className="font-semibold text-green-600">Email:</span>{" "}
          {supplier.email}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold text-green-600">
            Entrega Prevista:
          </span>{" "}
          {supplier.deliveryDate}
        </p>
      </div>

      <h2 className="text-3xl font-bold text-green-800 mb-5 text-center">
        Equipamentos Fornecidos
      </h2>
      {supplier.equipments.length === 0 ? (
        <div className="text-center text-gray-600 text-xl p-8 bg-gray-50 rounded-lg shadow-inner">
          <p>Este fornecedor ainda não tem equipamentos cadastrados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supplier.equipments.map((equipment) => (
            <div
              onClick={() => goTo(`/pages/equipment/${equipment.id}`)}
              key={equipment.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:scale-105 transition-shadow duration-300 cursor-pointer"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {equipment.name}
              </h3>
              <p className="text-md text-gray-600 mb-1">
                <span className="font-semibold text-gray-700">Tipo:</span>{" "}
                {equipment.type}
              </p>
              <p className="text-md text-gray-600 mb-1">
                <span className="font-semibold text-gray-700">Potência:</span>{" "}
                {equipment.power}
              </p>
              <p className="text-md text-gray-600 mb-1">
                <span className="font-semibold text-gray-700">Preço:</span> R${" "}
                {equipment.price.toFixed(2)}
              </p>
              <p className="text-md text-gray-600">
                <span className="font-semibold text-gray-700">Garantia:</span>{" "}
                {equipment.guarantee}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Supplier;

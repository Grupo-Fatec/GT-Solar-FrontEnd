import { IEquipments } from "@/interfaces/supplier/IEquipments";
import { EquipmentService } from "@/services/EquipmentService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// página para mostrar os detalhes de um equipamento específico
const Equipment = () => {
  const service = new EquipmentService();
  const { id } = useParams();
  const [equipment, setEquipment] = useState<IEquipments| null>(null);

  useEffect(() => {
    const fetchEquipment = async () => {
      const data = await service.findOne(id);
      setEquipment(data);
    };

    fetchEquipment();
  }, []);
  return (
    <main className="p-10">
      <div>Págia para ver detalhes do produto</div>
      {JSON.stringify(equipment)}
    </main>
  );
};

export default Equipment;

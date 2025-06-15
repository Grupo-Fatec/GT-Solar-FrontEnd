// pages/admin/equipment/[id].tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IEquipments } from "@/interfaces/supplier/IEquipments";
import { EquipmentService } from "@/services/EquipmentService";
import { PersonService } from "@/services/PersonService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ISupplier } from "@/interfaces/supplier/ISupplier";
import { SupplierService } from "@/services/SupplierService";
import Modal from "@/components/patterns/Modal";

const Equipment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const equipmentService = new EquipmentService();
  const supplierService = new SupplierService();

  const [equipment, setEquipment] = useState<IEquipments | null>(null);
  const [supplier, setSupplier] = useState<ISupplier | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchEquipment = async () => {
      if (!id) return;
      const data = await equipmentService.findOne(id);
      setEquipment(data);
      console.log(data);

      if (data?.supplierId) {
        const supplierData = await supplierService.getById(data.supplierId);
        setSupplier(supplierData);
      }
      console.log("Buscando dados do fornecedor");
      console.log(supplier);
    };
    fetchEquipment();
  }, []);

  const handleSendEmail = () => {
    // Aqui você pode integrar com seu serviço de envio de email
    console.log("Enviar para:", supplier?.email);
    console.log("Assunto:", subject);
    console.log("Conteúdo:", content);
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen p-10 bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
      <div className="mb-4">
        <Button variant="outline" onClick={() => navigate("/pages/projects")}>
          Voltar
        </Button>
      </div>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-[#4F8A6E]">
          Detalhes do Equipamento
        </h1>

        {equipment && (
          <div className="bg-white dark:bg-gray-900 shadow p-6 rounded-xl space-y-3">
            <p>
              <strong>Nome:</strong> {equipment.name}
            </p>
            <p>
              <strong>Tipo:</strong> {equipment.type}
            </p>
            <p>
              <strong>Potência:</strong> {equipment.power}
            </p>
            <p>
              <strong>Preço:</strong> R$ {equipment.price.toFixed(2)}
            </p>
            <p>
              <strong>Garantia:</strong> {equipment.guarantee}
            </p>

            {supplier && (
              <div className="pt-6 border-t border-gray-300 dark:border-gray-700">
                <h2 className="text-xl font-semibold">Fornecedor</h2>
                <p>
                  <strong>Nome:</strong> {supplier.name}
                </p>
                <p>
                  <strong>Email:</strong> {supplier.email}
                </p>
              </div>
            )}

            <div className="pt-6">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#4F8A6E] text-white"
              >
                Entrar em contato
              </Button>
            </div>
          </div>
        )}

        <Modal
          title="Contato com Fornecedor"
          description={`Você deseja enviar uma mensagem para ${supplier?.name} ?`}
          isOpen={isModalOpen}
          confirmColor="bg-[#4F8A6E] hover:bg-[#2B5337] text-white"
          confirmLabel="Enviar email"
          onConfirm={() => handleSendEmail()}
          onClose={() => setIsModalOpen(false)}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendEmail();
            }}
            className="space-y-4"
          >
            <Input
              placeholder="Email do Fornecedor"
              value={supplier?.email || ""}
              readOnly
            />
            <Input
              placeholder="Assunto"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <Textarea
              placeholder="Mensagem"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <Button type="submit" className="bg-[#4F8A6E] text-white w-full">
              Enviar
            </Button>
          </form>
        </Modal>
      </div>
    </main>
  );
};

export default Equipment;

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';

interface SolarQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SolarQuoteModal: React.FC<SolarQuoteModalProps> = ({ isOpen, onClose }) => {
  const [monthlyConsumption, setMonthlyConsumption] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [engineerCost, setEngineerCost] = useState('');
  const [installerCost, setInstallerCost] = useState('');
  const [sellerCommission, setSellerCommission] = useState(''); // Percentage
  const [equipmentCost, setEquipmentCost] = useState('');
  const [profitMargin, setProfitMargin] = useState(''); // Percentage
  const { toast } = useToast();

  const handleCalculate = () => {
    // Lógica de cálculo do orçamento (placeholder)
    console.log("Calculando orçamento solar com:", {
      monthlyConsumption,
      zipCode,
      engineerCost,
      installerCost,
      sellerCommission,
      equipmentCost,
      profitMargin,
    });
    toast({
      title: "Cálculo em Andamento",
      description: `Seu orçamento para consumo de ${monthlyConsumption} kWh no CEP ${zipCode} está sendo processado.`,
    });
    // Aqui você integraria a lógica de cálculo real.
    // Por enquanto, apenas fechamos o modal após "calcular".
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
        <DialogTitle className="text-2xl font-bold">
            Gerar Orçamento de Energia Solar
        </DialogTitle>
        <DialogDescription className="text-base text-muted-foreground">
            Preencha as informações abaixo para simular seu sistema de energia solar.
        </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="monthlyConsumption" className="text-right col-span-1 ">
        Consumo (kWh)
        </Label>

            <Input
              id="monthlyConsumption"
              type="number"
              value={monthlyConsumption}
              onChange={(e) => setMonthlyConsumption(e.target.value)}
              className="col-span-3"
              placeholder="Ex: 350"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="zipCode" className="text-right col-span-1">
              CEP
            </Label>
            <Input
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="col-span-3"
              placeholder="Ex: 00000-000"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="engineerCost" className="text-right col-span-1">
              Custo Engenheiro (R$)
            </Label>
            <Input
              id="engineerCost"
              type="number"
              value={engineerCost}
              onChange={(e) => setEngineerCost(e.target.value)}
              className="col-span-3"
              placeholder="Ex: 1500"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="installerCost" className="text-right col-span-1">
              Custo Instalador (R$)
            </Label>
            <Input
              id="installerCost"
              type="number"
              value={installerCost}
              onChange={(e) => setInstallerCost(e.target.value)}
              className="col-span-3"
              placeholder="Ex: 2000"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="equipmentCost" className="text-right col-span-1">
              Custo Equipamento (R$)
            </Label>
            <Input
              id="equipmentCost"
              type="number"
              value={equipmentCost}
              onChange={(e) => setEquipmentCost(e.target.value)}
              className="col-span-3"
              placeholder="Ex: 15000"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sellerCommission" className="text-right col-span-1">
              Comissão Vendedor (%)
            </Label>
            <Input
              id="sellerCommission"
              type="number"
              value={sellerCommission}
              onChange={(e) => setSellerCommission(e.target.value)}
              className="col-span-3"
              placeholder="Ex: 5"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profitMargin" className="text-right col-span-1">
              Margem Lucro (%)
            </Label>
            <Input
              id="profitMargin"
              type="number"
              value={profitMargin}
              onChange={(e) => setProfitMargin(e.target.value)}
              className="col-span-3"
              placeholder="Ex: 20"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleCalculate} className="bg-[#4F8A6E] hover:bg-[#2B5337]">Calcular Orçamento</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SolarQuoteModal;

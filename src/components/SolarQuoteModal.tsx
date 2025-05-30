import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface SolarQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SolarQuoteModal: React.FC<SolarQuoteModalProps> = ({ isOpen, onClose }) => {
  const [monthlyConsumption, setMonthlyConsumption] = useState('');
  const [roofType, setRoofType] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [kwp, setKwp] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { toast } = useToast();

  const handleCalculate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!monthlyConsumption) newErrors.monthlyConsumption = "Consumo é obrigatório.";
    if (!roofType) newErrors.roofType = "Tipo de telhado é obrigatório.";
    if (!zipCode) {
      newErrors.zipCode = "CEP é obrigatório.";
    } else {
      const cepRegex = /^\d{5}-\d{3}$/;
      if (!cepRegex.test(zipCode)) {
        newErrors.zipCode = "Formato do CEP inválido. Use 00000-000.";
      }
    }
    if (!kwp) newErrors.kwp = "Potência é obrigatória.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    toast({
      title: "Cálculo em Andamento",
      description: `Seu orçamento está sendo processado para consumo de ${monthlyConsumption} kWh/mês no telhado ${roofType}.`,
      duration: 5000, // duração em milissegundos (5s)
    });


    // Limpa os campos após cálculo
    setMonthlyConsumption('');
    setRoofType('');
    setZipCode('');
    setKwp('');
    setErrors({});

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[90vw] sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Gerar Orçamento de Energia Solar</DialogTitle>
          <DialogDescription>
            Informe os dados para calcular o sistema ideal.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
          {/* Consumo */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-2">
            <Label htmlFor="monthlyConsumption" className="sm:text-right col-span-1 mt-2">
              Consumo (kWh)
            </Label>
            <div className="sm:col-span-3 col-span-1 w-full">
              <Input
                id="monthlyConsumption"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={monthlyConsumption}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) setMonthlyConsumption(value);
                }}
                placeholder="Ex: 350"
              />

              {errors.monthlyConsumption && (
                <p className="text-red-500 text-sm mt-1">{errors.monthlyConsumption}</p>
              )}
            </div>
          </div>

          {/* Telhado */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-2">
            <Label className="sm:text-right col-span-1 mt-2">Tipo de Telhado</Label>
            <div className="sm:col-span-3 col-span-1 w-full">
              <Select value={roofType} onValueChange={setRoofType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ceramico">Cerâmico</SelectItem>
                  <SelectItem value="fibrocimento">Fibrocimento</SelectItem>
                  <SelectItem value="laje">Laje</SelectItem>
                  <SelectItem value="metalico">Metálico</SelectItem>
                </SelectContent>
              </Select>
              {errors.roofType && (
                <p className="text-red-500 text-sm mt-1">{errors.roofType}</p>
              )}
            </div>
          </div>

          {/* CEP */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-2">
            <Label htmlFor="zipCode" className="sm:text-right col-span-1 mt-2">
              CEP
            </Label>
            <div className="sm:col-span-3 col-span-1 w-full">
              <Input
                id="zipCode"
                value={zipCode}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, ''); // remove tudo que não for número
                  if (value.length > 8) value = value.slice(0, 8); // limita a 8 dígitos
                  if (value.length > 5) value = value.slice(0, 5) + '-' + value.slice(5); // insere o hífen
                  setZipCode(value);
                }}
                placeholder="Ex: 00000-000"
              />

              {errors.zipCode && (
                <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
              )}
            </div>
          </div>

          {/* Potência */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-2">
            <Label htmlFor="kwp" className="sm:text-right col-span-1 mt-2">
              Potência (kWp)
            </Label>
            <div className="sm:col-span-3 col-span-1 w-full">
              <Input
                id="kwp"
                type="text"
                inputMode="decimal"
                value={kwp}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*\.?\d*$/.test(value)) setKwp(value);
                }}
                placeholder="Ex: 3.5"
              />

              {errors.kwp && (
                <p className="text-red-500 text-sm mt-1">{errors.kwp}</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleCalculate} className="bg-[#4F8A6E] hover:bg-[#7E69AB]">
            Calcular Orçamento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SolarQuoteModal;

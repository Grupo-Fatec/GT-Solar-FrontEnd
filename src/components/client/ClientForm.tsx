import { IClient } from "@/interfaces/IClient";
//import { PropertyType, RoofType } from "@/enums";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ClientFormProps {
  clientData: IClient;
  onChange: (data: IClient) => void;
  onSubmit: (data: IClient) => void;
}

export function ClientForm({ clientData, onChange, onSubmit }: ClientFormProps) {
  const handleChange = (field: keyof IClient, value: any) => {
    onChange({ ...clientData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(clientData);
  };

  return (
    <Card className="w-full bg-white shadow-md rounded-lg p-6">
      <CardHeader>
        <CardTitle>{clientData?.id ? "Editar Cliente" : "Cadastro de Cliente"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" value={clientData.name} onChange={(e) => handleChange("name", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="document">CPF/CNPJ</Label>
              <Input id="document" value={clientData.document} onChange={(e) => handleChange("document", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={clientData.email} onChange={(e) => handleChange("email", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Celular</Label>
              <Input id="phone" value={clientData.phone} onChange={(e) => handleChange("phone", e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="street">Endereço</Label>
              <Input id="street" value={clientData.street} onChange={(e) => handleChange("street", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="houseNumber">Número</Label>
              <Input id="houseNumber" value={clientData.houseNumber} onChange={(e) => handleChange("houseNumber", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="complement">Complemento</Label>
              <Input id="complement" value={clientData.complement} onChange={(e) => handleChange("complement", e.target.value)} />
            </div>
          </div>

          <div className="flex gap-3 w-full">
            <div className="flex-1 min-w-[180px] space-y-1">
              <Label htmlFor="neighbor">Bairro</Label>
              <Input id="neighbor" value={clientData.neighbor} onChange={(e) => handleChange("neighbor", e.target.value)} />
            </div>
            <div className="flex-1 min-w-[180px] space-y-1">
              <Label htmlFor="city">Cidade</Label>
              <Input id="city" value={clientData.city} onChange={(e) => handleChange("city", e.target.value)} />
            </div>
            <div className="w-[80px] space-y-1">
              <Label htmlFor="uf">UF</Label>
              <Input id="uf" maxLength={2} className="uppercase text-center" value={clientData.uf} onChange={(e) => handleChange("uf", e.target.value.toUpperCase())} />
            </div>
            <div className="w-[120px] space-y-1">
              <Label htmlFor="cep">CEP</Label>
              <Input id="cep" value={clientData.cep} onChange={(e) => handleChange("cep", e.target.value)} />
            </div>
          </div>

          <div className="flex gap-3 w-full">
            <div className="flex-1 space-y-1">
              <Label>Tipo de Imóvel</Label>
              <Select value={clientData.property} onValueChange={(value) => handleChange("property", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
              </Select>
            </div>
            <div className="flex-1 space-y-1">
              <Label>Tipo de Telhado</Label>
              <Select value={clientData.roofType} onValueChange={(value) => handleChange("roofType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observations">Observações</Label>
            <Textarea id="observations" value={clientData.observations} onChange={(e) => handleChange("observations", e.target.value)} />
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            {clientData?.id ? "Atualizar Cliente" : "Salvar Cliente"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

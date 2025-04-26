import { useState, useEffect } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ClientData {
  name: string;
  document: string;
  email: string;
  phone: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
  propertyType: string;
  roofType: string;
  notes: string;
}

interface ClientFormProps {
  clientData?: ClientData;
  onSubmit: (data: ClientData) => void;
}

export function ClientForm({ clientData, onSubmit }: ClientFormProps) {
  // Se clientData for fornecido, inicializa com esses dados, caso contrário, começa com dados vazios.
  const [formData, setFormData] = useState<ClientData>({
    name: clientData?.name || "",
    document: clientData?.document || "",
    email: clientData?.email || "",
    phone: clientData?.phone || "",
    address: clientData?.address || "",
    number: clientData?.number || "",
    complement: clientData?.complement || "",
    neighborhood: clientData?.neighborhood || "",
    city: clientData?.city || "",
    state: clientData?.state || "",
    zip: clientData?.zip || "",
    propertyType: clientData?.propertyType || "",
    roofType: clientData?.roofType || "",
    notes: clientData?.notes || "",
  });

  const handleChange = (field: keyof ClientData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // Envia os dados para o componente pai (ou para uma API)
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>
          {clientData ? "Editar Cliente" : "Cadastro de Cliente"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="document">CPF/CNPJ</Label>
              <Input
                id="document"
                value={formData.document}
                onChange={(e) => handleChange("document", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Celular</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="number">Número</Label>
              <Input
                id="number"
                value={formData.number}
                onChange={(e) => handleChange("number", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="complement">Complemento</Label>
              <Input
                id="complement"
                value={formData.complement}
                onChange={(e) => handleChange("complement", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                value={formData.neighborhood}
                onChange={(e) => handleChange("neighborhood", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">UF</Label>
              <Input
                id="state"
                maxLength={2}
                value={formData.state}
                onChange={(e) =>
                  handleChange("state", e.target.value.toUpperCase())
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">CEP</Label>
              <Input
                id="zip"
                value={formData.zip}
                onChange={(e) => handleChange("zip", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyType">Tipo de Imóvel</Label>
              <Select
                onValueChange={(value) => handleChange("propertyType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residencial</SelectItem>
                  <SelectItem value="commercial">Comercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="roofType">Tipo de Telhado</Label>
              <Select
                onValueChange={(value) => handleChange("roofType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ceramic">Cerâmica</SelectItem>
                  <SelectItem value="concrete">Concreto</SelectItem>
                  <SelectItem value="metal">Metálico</SelectItem>
                  <SelectItem value="fiber">Fibrocimento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {clientData ? "Atualizar Cliente" : "Salvar Cliente"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

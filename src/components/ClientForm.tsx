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
import { IClient } from "@/interfaces/IClient";

interface ClientFormProps {
  clientData: IClient;
  onSubmit: (data: IClient) => void;
}

export function ClientForm({ clientData, onSubmit }: ClientFormProps) {
  // Se clientData for fornecido, inicializa com esses dados, caso contrário, começa com dados vazios.
  const [formData, setFormData] = useState<IClient>({
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

  const handleChange = (field: keyof IClient, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // Envia os dados para o componente pai (ou para uma API)
  };

  return (
    <Card className="w-full bg-white shadow-md rounded-lg p-6">
      <CardHeader>
        <CardTitle>
          {clientData ? "Editar Cliente" : "Cadastro de Cliente"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
            </div>

            {/*endereço até cep*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
            </div>

            {/*bairro, cidade, uf, cep*/}
            <div className="flex gap-3 w-full">
              <div className="flex-1 min-w-[180px] space-y-1">
                <Label htmlFor="neighborhood" className="text-sm">
                  Bairro
                </Label>
                <Input
                  id="neighborhood"
                  className="h-9 px-3 text-sm"
                  value={formData.neighborhood}
                  onChange={(e) => handleChange("neighborhood", e.target.value)}
                />
              </div>
              <div className="flex-1 min-w-[180px] space-y-1">
                <Label htmlFor="city" className="text-sm">
                  Cidade
                </Label>
                <Input
                  id="city"
                  className="h-9 px-3 text-sm"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
              </div>
              <div className="w-[80px] space-y-1">
                <Label htmlFor="state" className="text-sm">
                  UF
                </Label>
                <Input
                  id="state"
                  maxLength={2}
                  className="h-9 px-2 text-sm text-center uppercase"
                  value={formData.state}
                  onChange={(e) =>
                    handleChange("state", e.target.value.toUpperCase())
                  }
                />
              </div>
              <div className="w-[120px] space-y-1">
                <Label htmlFor="zip" className="text-sm">
                  CEP
                </Label>
                <Input
                  id="zip"
                  className="h-9 px-3 text-sm"
                  value={formData.zip}
                  onChange={(e) => handleChange("zip", e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-3 w-full mt-5">
              <div className="flex-1 min-w-[180px] space-y-1">
                <Label htmlFor="propertyType" className="text-sm">
                  Tipo imóvel
                </Label>
                <Input
                  id="propertyType"
                  className="h-9 px-3 text-sm"
                  value={formData.propertyType}
                  onChange={(e) => handleChange("propertyType", e.target.value)}
                />
              </div>
              <div className="flex-1 min-w-[180px] space-y-1">
                <Label htmlFor="roofType" className="text-sm">
                  Tipo do telhado
                </Label>
                <Input
                  id="roofType"
                  className="h-9 px-3 text-sm"
                  value={formData.roofType}
                  onChange={(e) => handleChange("roofType", e.target.value)}
                />
              </div>
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

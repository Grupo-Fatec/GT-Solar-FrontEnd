import { IClient, IInsertClient } from "@/interfaces/person/client/IClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoofType } from "@/enums/RoofType.enum";
import { PropertyType } from "@/enums/PropertieType.enum";
import axios from "axios";

interface ClientFormProps {
  clientData: IInsertClient;
  onChange: (data: IInsertClient) => void;
  onSubmit: (data: IInsertClient) => void;
}

export function ClientForm({ clientData, onChange, onSubmit }: ClientFormProps) {
  const handleChange = (field: keyof IClient, value: any) => {
    onChange({ ...clientData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(clientData);
  };

  const handleCep = async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.status !== 200 || response.data.erro) {
        alert("CEP inválido ou não encontrado.");
        return;
      }

      const data = response.data;
      onChange({
        ...clientData,
        cep,
        street: data.logradouro || "",
        neighbor: data.bairro || "",
        uf: data.uf || "",
      });
    } catch (e) {
      alert("Erro ao buscar o CEP.");
      console.error(e);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <CardHeader>
          <CardTitle>
            {clientData?.id ? "Editar Cliente" : "Cadastro de Cliente"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={clientData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="document">CPF/CNPJ</Label>
                <Input
                  id="document"
                  value={clientData.document}
                  onChange={(e) => handleChange("document", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={clientData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Celular</Label>
                <Input
                  id="phone"
                  value={clientData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 md:col-span-3">
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  value={clientData.cep}
                  maxLength={8}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    handleChange("cep", value);
                    if (value.length === 8) {
                      handleCep(value);
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="houseNumber">Número</Label>
                <Input
                  id="houseNumber"
                  value={clientData.houseNumber}
                  onChange={(e) => handleChange("houseNumber", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  id="complement"
                  value={clientData.complement}
                  onChange={(e) => handleChange("complement", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="neighbor">Bairro</Label>
                <Input
                  id="neighbor"
                  value={clientData.neighbor}
                  onChange={(e) => handleChange("neighbor", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="uf">UF</Label>
                <Input
                  id="uf"
                  maxLength={2}
                  className="uppercase text-center"
                  value={clientData.uf}
                  onChange={(e) =>
                    handleChange("uf", e.target.value.toUpperCase())
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">Endereço</Label>
                <Input
                  id="street"
                  value={clientData.street}
                  onChange={(e) => handleChange("street", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo de Imóvel</Label>
                <Select
                  value={clientData.propertyType || ""}
                  onValueChange={(value) => handleChange("propertyType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(PropertyType).map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tipo de Telhado</Label>
                <Select
                  value={clientData.roofType || ""}
                  onValueChange={(value) => handleChange("roofType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(RoofType).map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {clientData?.id ? "Atualizar Cliente" : "Salvar Cliente"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

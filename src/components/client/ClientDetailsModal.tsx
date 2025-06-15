import { IClient } from "@/interfaces/person/client/IClient";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ClientDetailsModalProps {
  client: IClient;
  onClose: () => void;
}

const ClientDetailsModal = ({ client, onClose }: ClientDetailsModalProps) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-8 rounded-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Cliente</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Nome</p>
              <p className="font-medium">{client.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CPF/CNPJ</p>
              <p className="font-medium">{client.document}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{client.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Celular</p>
              <p className="font-medium">{client.phone}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-semibold mb-2">Endereço</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Rua</p>
                <p className="font-medium">{client.street}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Número</p>
                <p className="font-medium">{client.houseNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Complemento</p>
                <p className="font-medium">{client.complement}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bairro</p>
                <p className="font-medium">{client.neighbor}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cidade</p>
                <p className="font-medium">{client.city}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">UF</p>
                <p className="font-medium">{client.uf}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CEP</p>
                <p className="font-medium">{client.cep}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-semibold mb-2">Informações do Imóvel</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Tipo de Imóvel</p>
                <p className="font-medium">{client.property}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tipo de Telhado</p>
                <p className="font-medium">{client.roofType}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground">Observações</p>
            <p className="font-medium">{client.observations || "Nenhuma observação registrada."}</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClientDetailsModal;


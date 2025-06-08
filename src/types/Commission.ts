// types/Commission.ts
export type StatusType = "Pago" | "Não pago";

export interface Commission {
  id: number;
  vendedor: string;
  cliente: string; // <-- Novo campo
  orcamento: number;
  valor: number;
  dataInicio: string;
  status:StatusType;

  
}


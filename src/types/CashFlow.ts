export interface CashFlow {
  id: number;
  tipo: string;         // Ex: "Entrada" ou "Saída"
  descricao: string;    // Descrição do fluxo de caixa
  valor: number;        // Valor em reais
  dataInicio: string;   // Data no formato ISO ou pt-BR (ex: "2025-06-02")
}

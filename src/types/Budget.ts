
// types/Budget.ts

export type BudgetStatus = 'Pendente' | 'Aprovado' | 'Recusado';

export type Budget = {
  id: number;
  cliente: string;
  dataInicio: string; // formato dd/mm/yyyy
  valor: number;
  status: BudgetStatus;
};

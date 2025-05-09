
export interface Project {
    id: number;
    cliente: string;  // Alterado de 'nome' para 'cliente'
    dataInicio: string;
    valor: number;
    status: 'Execução' | 'Finalização' | 'Planejamento';
  }
  
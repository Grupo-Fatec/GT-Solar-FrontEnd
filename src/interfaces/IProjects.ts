export interface IProjects {
  id: number;
  cliente: string;
  descricao?: string;   // campo opcional
  dataInicio?: string;  // data como string, pode ser Date dependendo da sua API
  dataFim?: string;
  status?: string;      // Ex: "ativo", "finalizado", etc.
  // adicione outros campos que seu projeto usa
}

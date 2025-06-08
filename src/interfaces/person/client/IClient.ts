export interface IClient {
  id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  street: string;
  houseNumber: string;
  complement: string;
  neighbor: string;
  city: string;
  uf: string;
  cep: string;
  roofType: string;
  property: string;
  observations: string;
  created_at: string;
  updated_at: string;
}

export interface IInsertClient {
  name: string;
  street: string;
  cep: string;
  uf: string;
  neighbor: string;
  email: string;
  phone: string;
  document: string;
}

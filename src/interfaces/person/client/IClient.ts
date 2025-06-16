import { PropertyType } from "@/enums/PropertieType.enum";
import { RoofType } from "@/enums/RoofType.enum";

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
  propertyType: string;
  observations: string;
  created_at: string;
  updated_at: string;
}

export interface IInsertClient {
  id: string;
  name: string;
  street: string;
  cep: string;
  uf: string;
  houseNumber: string;
  complement: string;
  neighbor: string;
  email: string;
  phone: string;
  document: string;
  roofType: RoofType | string;
  propertyType: PropertyType | string;
}

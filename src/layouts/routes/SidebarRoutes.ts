import { IMenuItems } from "@/interfaces/router";
import {
  Home,
  Users,
  FileSpreadsheet,
  Calculator,
  PiggyBank,
  DollarSign,
  Truck,
  Wrench,
  HardHat
} from "lucide-react";

export const menuItems: IMenuItems[] = [
  { icon: Home, label: "Home", path: "/pages" },
  { icon: Users, label: "Cliente", path: "/pages/clients" },
  { icon: HardHat, label: "Engenheiros", path: "/pages/engineers" },
  { icon: Wrench, label: "Instaladores", path: "/pages/installers" },
  { icon: Truck, label: "Fornecedores", path: "/pages/suppliers" },
  { icon: FileSpreadsheet, label: "Projetos", path: "/pages/projects" },
  { icon: Calculator, label: "Orçamentos", path: "/pages/orcamentos" },
  //{ icon: DollarSign, label: "Comissões", path: "/pages/comissoes" },
  //{ icon: PiggyBank, label: "Fluxo de caixa", path: "/pages/fluxo-de-caixa" },
];

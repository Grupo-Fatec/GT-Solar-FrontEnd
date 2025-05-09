import { IMenuItems } from "@/interfaces/router";
import {
  Home,
  Users,
  FileSpreadsheet,
  Calculator,
  PiggyBank,
  DollarSign,
} from "lucide-react";

export const menuItems: IMenuItems[] = [
  { icon: Home, label: "Home", path: "/pages" },
  { icon: Users, label: "Cliente", path: "/pages/clientes" },
  { icon: FileSpreadsheet, label: "Projetos", path: "/pages/projects" },
  { icon: Calculator, label: "Orçamentos", path: "/pages/orcamentos" },
  { icon: DollarSign, label: "Comissões", path: "/pages/comissoes" },
  { icon: PiggyBank, label: "Fluxo de caixa", path: "/pages/fluxo-de-caixa" },
];

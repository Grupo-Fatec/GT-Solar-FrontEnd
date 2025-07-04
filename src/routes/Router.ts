import BlankLayout from "@/layouts/BlankLayout";
import SidebarLayout from "@/layouts/SidebarLayout";
import { RouterRaw } from "@/types/RouterRaw";

/**
 *   { icon: Home, label: "Home", path: "/" },
  { icon: Users, label: "Cliente", path: "/clientes" },
  { icon: FileSpreadsheet, label: "Projetos", path: "/projetos" },
  { icon: Calculator, label: "Orçamentos", path: "/orcamentos" },
  { icon: DollarSign, label: "Comissões", path: "/comissoes" },
  { icon: PiggyBank, label: "Fluxo de caixa", path: "/fluxo-de-caixa" },
 */

export const routes: RouterRaw[] = [
  {
    title: "",
    path: "/",
    layout: BlankLayout,
    children: [
      {
        title: "login",
        path: "",
        component: () => import("@/pages/auth/Login"),
      },
      {
      title: "recuperar senha",
      path: "recoverypassword", // essa será a URL /recuperar-senha
      component: () => import("@/pages/auth/RecuperarSenha"),
    },
      {
      title: "criar conta",
      path: "Cadastro",      // essa será a URL /criar-conta
      component: () => import("@/pages/auth/Cadastro"),
    },
            
    ],
  },
  {
    title: "pages",
    path: "/pages",
    layout: SidebarLayout,
    children: [
      {
        title: "home",
        path: "",
        component: () => import("@/pages/Index"),
      },
      {
        title: "clientes",
        path: "clientes",
        component: () => import("@/pages/client/Clientes"),
      },
      {
        title: "projetos",
        path: "projects",
        component: () => import("@/pages/projects/Projects")
      },
      {
        title: "fornecedores",
        path: "fornecedores",
        component: () => import("@/pages/supplier/Suppliers"), 
      },
      {
        title: "Orçamentos",
        path: "orcamentos",
        component: () => import("@/pages/budgets/Orcamentos"), 
      },
      {
      title: "sair",
      path: "logout",
      component: () => import("@/pages/auth/Logout"),
    }
    ],
  },
];

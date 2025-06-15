import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import BlankLayout from "@/layouts/BlankLayout";
import SidebarLayout from "@/layouts/SidebarLayout";

import Login from "@/pages/auth/Login";
import Cadastro from "@/pages/auth/Cadastro";
import RecuperarSenha from "@/pages/auth/RecuperarSenha";

import Home from "@/pages/Index";
import Clientes from "@/pages/client/Clientes";
import Projects from "@/pages/projects/Projects";
import Orcamentos from "@/pages/budgets/Orcamentos";
import Logout from "@/pages/auth/Logout";
import NotFound from "@/pages/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";
import Suppliers from "./pages/supplier/Suppliers";
import Supplier from "./pages/supplier/Supplier";
import Equipment from "./pages/supplier/equipment/Equipment";
import Equipments from "./pages/supplier/equipment/Equipments";
import Engineers from "./pages/persons/enginner/Engineers";
import Engineer from "./pages/persons/enginner/Engineer";
import Installers from "./pages/persons/installer/Installers";
import Installer from "./pages/persons/installer/Installer";
import Project from "./pages/projects/Project";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rotas públicas (sem layout Sidebar) */}
          <Route element={<BlankLayout />}>
            <Route index element={<Login />} />
            <Route path="/recoverypassword" element={<RecuperarSenha />} />
            <Route path="/cadastro" element={<Cadastro />} />
          </Route>

          {/* Rotas protegidas (com SidebarLayout) */}
          <Route element={<SidebarLayout />}>
            <Route
              path="/pages"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pages/clients"
              element={
                <ProtectedRoute>
                  <Clientes />
                </ProtectedRoute>
              }
            />
            {/* Projetos */}
            <Route
              path="/pages/projects"
              element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pages/projects/:id"
              element={
                <ProtectedRoute>
                  <Project />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pages/orcamentos"
              element={
                <ProtectedRoute>
                  <Orcamentos />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/pages/logout"
              element={
                <ProtectedRoute>
                  <Logout />
                </ProtectedRoute>
              }
            />

            {/* Suppliers routes */}
            <Route path="/pages/suppliers" element={<Suppliers />} />
            <Route path="/pages/suppliers/:id" element={<Supplier />} />

            {/* Equipments routes */}

            <Route path="/pages/equipment/:id" element={<Equipment />} />
            <Route path="/pages/equipments" element={<Equipments />} />

            {/* Rotas para persons(engineer) */}
            <Route path="/pages/engineers" element={<Engineers />} />
            <Route path="/pages/engineers/:id" element={<Engineer />} />

            {/* Rotas para person(installer) */}
            <Route path="/pages/installers" element={<Installers />} />
            <Route path="/pages/installer/:id" element={<Installer />} />
          </Route>

          {/* Página 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

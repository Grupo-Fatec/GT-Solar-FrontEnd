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
import Equipment from "./pages/supplier/Equipment";

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
              path="/pages/clientes"
              element={
                <ProtectedRoute>
                  <Clientes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pages/projects"
              element={
                <ProtectedRoute>
                  <Projects />
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

            <Route path="/pages/equipment/:id" element={<Equipment/>} />
          </Route>

          {/* Página 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

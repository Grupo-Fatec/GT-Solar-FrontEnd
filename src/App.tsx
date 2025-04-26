import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { routes } from "./routes/Router";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div>Carregando...</div>}>
          <Routes>
            {routes.map((route, index) => {
              const Layout = route.layout;
              return (
                <Route key={index} path={route.path} element={<Layout />}>
                  {route.children.map((child, childIndex) => {
                    const Component = lazy(child.component);
                    return (
                      <Route
                        key={childIndex}
                        path={child.path}
                        element={<Component />}
                      />
                    );
                  })}
                </Route>
              );
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

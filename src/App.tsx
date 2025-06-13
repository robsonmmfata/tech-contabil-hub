
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Servicos from "./pages/Servicos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/obrigacoes" element={<div className="p-6"><h1 className="text-2xl font-bold">Obrigações - Em desenvolvimento</h1></div>} />
            <Route path="/financeiro" element={<div className="p-6"><h1 className="text-2xl font-bold">Financeiro - Em desenvolvimento</h1></div>} />
            <Route path="/relatorios" element={<div className="p-6"><h1 className="text-2xl font-bold">Relatórios - Em desenvolvimento</h1></div>} />
            <Route path="/documentos" element={<div className="p-6"><h1 className="text-2xl font-bold">Documentos - Em desenvolvimento</h1></div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

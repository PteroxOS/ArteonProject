import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import OpenCommis from "./pages/OpenCommis";
import ServiceCategory from "./pages/ServiceCategory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/id-id" replace />} />

        {/* Main route with all sections */}
        <Route path="/id-id" element={<Index />} />
        <Route path="/id-id/:section" element={<Index />} />

        {/* Specific routes */}
        <Route path="/id-id/open-commis" element={<Index />} />
        <Route path="/id-id/about" element={<Index />} />
        <Route path="/id-id/contact" element={<Index />} />

        {/* Service category */}
        <Route
          path="/id-id/services/:categorySlug"
          element={<ServiceCategory />}
        />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

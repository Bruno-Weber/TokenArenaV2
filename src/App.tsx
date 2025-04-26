
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Market from "./pages/Market";
import Activity from "./pages/Activity";
import Teams from "./pages/Teams";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Club from "./pages/Club";
import CreateToken from "./pages/CreateToken";
import Stake from "./pages/Stake";
import Voting from "./pages/Voting";
import Confetti from "./components/voting/Confetti";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Confetti />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/market" element={<Market />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/club/:id" element={<Club />} />
          <Route path="/create-token" element={<CreateToken />} />
          <Route path="/stake" element={<Stake />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

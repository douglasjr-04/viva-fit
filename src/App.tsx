import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Sessions from "./pages/Sessions";
import SessionsModule from "./pages/SessionsModule";
import Treinos from "./pages/Treinos";
import Receitas from "./pages/Receitas";
import ReceitasCategory from "./pages/ReceitasCategory";
import ReceitaDetail from "./pages/ReceitaDetail";
import TreinoDetail from "./pages/TreinoDetail";
import TreinosModule from "./pages/TreinosModule";
import TreinosTopic from "./pages/TreinosTopic";
import SessionDetail from "./pages/SessionDetail";
import Pilates from "./pages/Pilates";
import PilatesDetail from "./pages/PilatesDetail";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Componente para redirecionar para Welcome no refresh
function SessionRedirect({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Marca o próximo carregamento como "refresh" (funciona também no botão Refresh do preview)
  useEffect(() => {
    const onBeforeUnload = () => {
      sessionStorage.setItem("bend_force_welcome", "true");
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);

  // Verifica redirecionamento apenas no carregamento inicial da aplicação
  useEffect(() => {
    const navigationEntry = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;

    const isReloadByPerformance = navigationEntry?.type === "reload";
    const forceWelcome = sessionStorage.getItem("bend_force_welcome") === "true";
    const hasVisitedWelcome = sessionStorage.getItem("bend_visited_welcome") === "true";

    // Limpa o flag (pra não ficar preso em loop)
    sessionStorage.removeItem("bend_force_welcome");

    // Se for refresh (de verdade) OU primeira visita da aba, volta pra Welcome
    if ((isReloadByPerformance || forceWelcome || !hasVisitedWelcome) && location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, []); // Executa apenas uma vez na montagem

  // Monitora a rota para marcar que visitou a welcome
  useEffect(() => {
    if (location.pathname === "/") {
      sessionStorage.setItem("bend_visited_welcome", "true");
    }
  }, [location.pathname]);

  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SessionRedirect>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/sessions" element={<Sessions />} />
              <Route path="/sessions/modulo/:moduleId" element={<SessionsModule />} />
              <Route path="/pilates" element={<Pilates />} />
              <Route path="/treinos" element={<Treinos />} />
              <Route path="/treinos/modulo/:moduleId/topico/:topicId" element={<TreinosTopic />} />
              <Route path="/treinos/modulo/:moduleId" element={<TreinosModule />} />
              <Route path="/receitas" element={<Receitas />} />
              <Route path="/receitas/:categoryKey" element={<ReceitasCategory />} />
              <Route path="/receitas/:categoryKey/:recipeSlug" element={<ReceitaDetail />} />
              <Route path="/treino/:workoutId" element={<TreinoDetail />} />
              <Route path="/pilates/:sessionId" element={<PilatesDetail />} />
              <Route path="/session/:sessionId" element={<SessionDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SessionRedirect>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;

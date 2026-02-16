import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NotFound from "./pages/NotFound";

const LandingPage = lazy(() => import("../pages/LandingPage"));
const RulesPage = lazy(() => import("../pages/RulesPage"));
const LeaderboardPage = lazy(() => import("../pages/LeaderboardPage"));
const TemplatesPage = lazy(() => import("../pages/TemplatesPage"));

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="w-12 h-12 border-4 border-[#e10600] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/rules" element={<RulesPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;

import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

const ArtPage = lazy(() => import("./pages/ArtPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <TooltipProvider>
    <Router>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/art" element={<ArtPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  </TooltipProvider>
);

export default App;

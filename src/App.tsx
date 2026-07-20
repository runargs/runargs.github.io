import { TooltipProvider } from "@/components/ui/tooltip";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ArtPage from "./pages/ArtPage";

const App = () => (
  <TooltipProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/art" element={<ArtPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </TooltipProvider>
);

export default App;

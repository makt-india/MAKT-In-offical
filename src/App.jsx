import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, lazy, Suspense, useEffect } from "react";

import ScrollToTopButton from "./Components/ScrollToTopButton";
import Navbar from "./Components/Navbar";
import IntroOverlay from "./Components/IntroOverlay";
import Footer from "./Components/Footer";

// Lazy loaded pages
const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const Services = lazy(() => import("./Pages/Services"));
const Projects = lazy(() => import("./Pages/Project"));
const Contact = lazy(() => import("./Pages/Contact"));

/* ---------------- Scroll Reset on Route Change ---------------- */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 }); // clean + valid
  }, [pathname]);

  return null;
}

/* ---------------- Page Loader ---------------- */
function PageLoader() {
  return (
    <div className="min-h-screen bg-[#020B18] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-ping" />
          <div className="absolute inset-1 rounded-full bg-emerald-500/20 backdrop-blur-sm" />
          <div className="absolute inset-[5px] rounded-full bg-emerald-400/40" />
        </div>

        <span className="text-[10px] font-mono text-emerald-500/60 uppercase tracking-[0.3em] animate-pulse">
          Loading
        </span>
      </div>
    </div>
  );
}

/* ---------------- App ---------------- */
function App() {
  const [introFinished, setIntroFinished] = useState(false);

  // Cleaner logic: do NOT render router until intro is finished
  if (!introFinished) {
    return <IntroOverlay onComplete={() => setIntroFinished(true)} />;
  }

  return (
    <Router>
      <ScrollToTop />

      <Navbar />

      <div className="pt-16">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </div>

      <ScrollToTopButton />
      <Footer />
    </Router>
  );
}

export default App;
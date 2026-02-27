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

/* ───────────── Lazy Pages ───────────── */

const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const Services = lazy(() => import("./Pages/Services"));
const Projects = lazy(() => import("./Pages/Project"));
const Contact = lazy(() => import("./Pages/Contact"));

/* ───────────── Scroll Reset ───────────── */

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // force instant jump (no smooth)
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/* ───────────── Page Loader (lightweight) ───────────── */

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#020B18] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
        <span className="text-[10px] font-mono text-emerald-500/60 uppercase tracking-[0.3em]">
          Loading
        </span>
      </div>
    </div>
  );
}

/* ───────────── App ───────────── */

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <Router>
      <ScrollToTop />

      {/* Intro overlays router instead of replacing it */}
      {!introFinished && (
        <IntroOverlay onComplete={() => setIntroFinished(true)} />
      )}

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
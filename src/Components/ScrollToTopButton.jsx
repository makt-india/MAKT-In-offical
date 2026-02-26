// ─────────────────────────────────────────────────────────────
// FILE: src/components/ScrollToTopButton.jsx
// A floating "back to top" button that appears after scrolling
// ─────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full
        bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600
        text-black shadow-lg shadow-emerald-500/30
        flex items-center justify-center
        transition-all duration-300
        hover:-translate-y-1 active:translate-y-0
        focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2
        ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <ArrowUp className="w-4 h-4" aria-hidden="true" />
    </button>
  );
}
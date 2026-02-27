import { useEffect, useRef, useState, memo } from "react";
import { Link } from "react-router-dom";
import HeroSection from "../Components/HeroSection";
import SectionNavigator from "../Components/SectionNavigator";

/* ───────────────────────────────────────────────────────────── */

const SCALE_STATS = [
  { value: "1,200+", label: "Leads/mo" },
  { value: "18%", label: "CVR" },
  { value: "24/7", label: "Automation" },
];

const DOT_GRID_STYLE = {
  backgroundImage: "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
  backgroundSize: "32px 32px",
};

/* ───────────────────────────────────────────────────────────── */

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/* ───────────────────────────────────────────────────────────── */

const ScaleSection = memo(function ScaleSection() {
  const [sectionRef, inView] = useInView(0.15);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-[#050B18]"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-900/80 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-b from-[#050B18] via-[#07101F] to-[#0A1628] pointer-events-none" />

      {/* Decorative number */}
      <div
        className={`absolute -top-6 right-0 text-[#0d1e3d] text-[10rem] md:text-[14rem] leading-none font-black select-none
        transition-[opacity,transform] duration-1000 ease-out will-change-[opacity,transform]
        ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"}`}
      >
        01
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={DOT_GRID_STYLE}
      />

      {/* Glow blob — reduced blur for smoother GPU rendering */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[60px] rounded-full pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 md:gap-16">

          {/* Left Content */}
          <div className="flex-1 min-w-0">

            <div
              className={`transition-[opacity,transform] duration-700 delay-100 will-change-[opacity,transform]
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <span className="inline-flex items-center gap-2 text-blue-400 font-mono font-bold tracking-[0.2em] text-[11px] uppercase mb-6">
                <span className="text-blue-600">&gt;</span>
                Market_Reality: Competitive
              </span>
            </div>

            <div
              className={`transition-[opacity,transform] duration-700 delay-200 will-change-[opacity,transform]
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-[0.95] font-mono">
                If You're Not
                <br />
                Scaling,
                <br />
                <span className="text-blue-400 relative inline-block">
                  You're Stagnating.
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-[width] duration-1000 delay-700
                    ${inView ? "w-full" : "w-0"}`}
                  />
                </span>
              </h2>
            </div>

            <div
              className={`transition-[opacity,transform] duration-700 delay-300 will-change-[opacity,transform]
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <p className="mt-8 text-blue-100/60 text-sm sm:text-base leading-relaxed max-w-lg border-l-2 border-blue-500/50 pl-5 font-mono">
                Growth isn't optional in a competitive market. Without systems,
                automation, and positioning, your business gets outrun.
              </p>
            </div>

            <div
              className={`mt-8 flex flex-wrap gap-3 transition-[opacity,transform] duration-700 delay-400 will-change-[opacity,transform]
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              {SCALE_STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-950/60 border border-blue-800/50 rounded-sm font-mono text-xs"
                >
                  <span className="text-blue-300 font-black">{value}</span>
                  <span className="text-blue-600 uppercase tracking-widest">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Block */}
          <div
            className={`shrink-0 flex flex-col gap-5 transition-[opacity,transform] duration-700 delay-500 will-change-[opacity,transform]
            ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5
              bg-blue-500 text-white font-black uppercase tracking-[0.15em] text-sm
              border border-blue-400/50
              transition-[background-color,box-shadow,transform] duration-200
              shadow-[0_0_18px_rgba(59,130,246,0.35)]
              hover:bg-blue-400
              hover:shadow-[0_0_28px_rgba(59,130,246,0.5)]
              hover:-translate-y-1"
            >
              <span className="relative">Book Strategy Call</span>
              <span className="relative ml-3 transition-transform duration-200 group-hover:translate-x-1.5">
                →
              </span>
            </Link>

            <p className="text-[10px] sm:text-xs text-blue-400/40 uppercase tracking-[0.25em] font-mono">
              Structured. Measured. Relentless.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
});

/* ───────────────────────────────────────────────────────────── */

function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <SectionNavigator />
      <ScaleSection />
    </div>
  );
}

export default Home;
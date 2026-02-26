import HeroSection from "../Components/HeroSection";
import SectionNavigator from "../Components/SectionNavigator";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Lightweight hook for scroll-triggered reveal
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

function ScaleSection() {
  const [sectionRef, inView] = useInView(0.15);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-[#050B18]"
    >
      {/* Top border accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-900/80 to-transparent" />

      {/* Layered background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050B18] via-[#07101F] to-[#0A1628] pointer-events-none" />

      {/* Large decorative number — right-anchored */}
      <div
        className={`absolute -top-6 right-0 text-[#0d1e3d] text-[10rem] md:text-[14rem] leading-none font-black pointer-events-none select-none transition-all duration-1000 ease-out ${
          inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
        }`}
        aria-hidden="true"
      >
        01
      </div>

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Glow blob */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 md:gap-16">

          {/* Text block */}
          <div className="flex-1 min-w-0">
            {/* Label */}
            <div
              className={`transition-all duration-700 delay-100 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="inline-flex items-center gap-2 text-blue-400 font-mono font-bold tracking-[0.2em] text-[11px] uppercase mb-6">
                <span className="text-blue-600 select-none">&gt;</span>
                Market_Reality: Competitive
              </span>
            </div>

            {/* Headline */}
            <div
              className={`transition-all duration-700 delay-200 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-[0.95] font-mono">
                If You're Not
                <br />
                Scaling,
                <br />
                <span className="text-blue-400 relative inline-block">
                  You're Stagnating.
                  {/* Underline shimmer */}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-1000 delay-700 ${
                      inView ? "w-full" : "w-0"
                    }`}
                    aria-hidden="true"
                  />
                </span>
              </h2>
            </div>

            {/* Body */}
            <div
              className={`transition-all duration-700 delay-300 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <p className="mt-8 text-blue-100/60 text-sm sm:text-base leading-relaxed max-w-lg border-l-2 border-blue-500/50 pl-5 font-mono">
                Growth isn't optional in a competitive market. Without systems,
                automation, and positioning, your business gets outrun. We engineer
                scalable infrastructure that compounds.
              </p>
            </div>

            {/* Stat pills */}
            <div
              className={`mt-8 flex flex-wrap gap-3 transition-all duration-700 delay-400 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {[
                { value: "1,200+", label: "Leads/mo" },
                { value: "18%",    label: "CVR" },
                { value: "24/7",   label: "Automation" },
              ].map(({ value, label }) => (
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

          {/* CTA block */}
          <div
            className={`shrink-0 flex flex-col items-start sm:items-center md:items-start gap-5 transition-all duration-700 delay-500 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5
                bg-blue-500 text-white font-black uppercase tracking-[0.15em] text-sm
                border border-blue-400/50
                transition-all duration-200
                shadow-[0_0_20px_rgba(59,130,246,0.35)]
                hover:bg-blue-400
                hover:shadow-[0_0_35px_rgba(59,130,246,0.6)]
                hover:-translate-y-1
                active:translate-y-0 active:shadow-none
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050B18]"
            >
              {/* Button shimmer on hover */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]"
                aria-hidden="true"
              />
              <span className="relative">Book Strategy Call</span>
              <span className="relative ml-3 transition-transform duration-200 group-hover:translate-x-1.5">
                →
              </span>
            </Link>

            <p className="text-[10px] sm:text-xs text-blue-400/40 uppercase tracking-[0.25em] font-mono pl-1">
              Structured. Measured. Relentless.
            </p>

            {/* Trust line */}
            <div className="flex items-center gap-2 text-[10px] text-blue-600/50 font-mono uppercase tracking-widest pl-1">
              <span className="w-4 h-px bg-blue-800" />
              No fluff. Only results.
              <span className="w-4 h-px bg-blue-800" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <SectionNavigator />
      <ScaleSection />
    </div>
  );
}
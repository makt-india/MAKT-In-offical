import React, { useEffect, useRef, useState } from "react";
import { Target, Layers, Cpu, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/* ───────────────── useInView ───────────────── */

function useInView(threshold = 0.15) {
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

/* ───────────────── Data ───────────────── */

const VALUES = [
  {
    icon: Target,
    title: "Data-Driven Precision",
    body: "Every strategy and architecture we deploy is backed by rigorous data analysis and machine learning insights.",
    color: "emerald",
    delay: "delay-300",
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    body: "We build foundational systems designed to scale seamlessly.",
    color: "blue",
    delay: "delay-[400ms]",
  },
  {
    icon: Cpu,
    title: "Intelligent Innovation",
    body: "AI integrations and enterprise pipelines to keep you ahead.",
    color: "emerald",
    delay: "delay-500",
  },
];

const iconColors = {
  emerald: "text-emerald-400 bg-emerald-950/50 border-emerald-800/40",
  blue: "text-blue-400 bg-blue-950/50 border-blue-800/40",
};

/* ───────────────── Component ───────────────── */

export default function About() {
  const [sectionRef, inView] = useInView(0.1);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#020B18] text-white overflow-hidden border-t border-blue-900/30"
    >
      {/* Reduced blur for smoother GPU */}
      <div className="absolute top-[15%] right-[-5%] w-[480px] h-[480px] bg-emerald-600/8 rounded-full blur-[70px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-8%] w-[560px] h-[560px] bg-blue-600/8 rounded-full blur-[70px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* LEFT */}
          <div className="w-full lg:w-1/2 space-y-8">

            <div
              className={`transition-[opacity,transform] duration-700 will-change-[opacity,transform]
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-800/50 bg-blue-950/50 text-blue-300 text-[11px] font-bold tracking-[0.2em] uppercase shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                About MAKT
              </span>
            </div>

            <div
              className={`transition-[opacity,transform] duration-700 delay-100 will-change-[opacity,transform]
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-blue-50 leading-[1.1] tracking-tight">
                Pioneering the Future of
                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                  Scalable Technology
                </span>
              </h2>
            </div>

            <div
              className={`transition-[opacity,transform] duration-700 delay-200 will-change-[opacity,transform]
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <p className="text-blue-200/70 text-base md:text-lg leading-relaxed max-w-lg">
                We engineer strategic advantages through data science and scalable systems.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-5 pt-2">
              {VALUES.map(({ icon: Icon, title, body, color, delay }) => (
                <div
                  key={title}
                  className={`flex gap-4 items-start group transition-[opacity,transform] duration-700 ${delay}
                  ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
                >
                  <div
                    className={`flex-shrink-0 w-11 h-11 rounded-xl border flex items-center justify-center mt-0.5
                    transition-transform duration-300 group-hover:scale-105 ${iconColors[color]}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">
                      {title}
                    </h4>
                    <p className="text-blue-200/60 text-sm">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`pt-4 transition-[opacity,transform] duration-700 delay-[600ms] will-change-[opacity,transform]
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <Link
                to="/about"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-900/30 border border-blue-700/40
                transition-[background-color,border-color,transform] duration-250
                hover:bg-blue-800/40 hover:border-blue-500/60 active:scale-95 text-white text-sm font-medium"
              >
                Discover Our Story
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div
            className={`w-full lg:w-1/2 relative transition-[opacity,transform] duration-1000 delay-200 will-change-[opacity,transform]
            ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div className="relative rounded-2xl overflow-hidden border border-blue-800/40 shadow-xl group">
              <div className="absolute inset-0 bg-blue-950/35 transition-opacity duration-500 group-hover:opacity-10 z-10" />
              <img
                src="/img/about.webp"
                alt="MAKT Team Strategy Session"
                className="w-full h-[420px] sm:h-[480px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>

            {/* Floating badge optimized */}
            <div
              className="absolute -top-6 -right-4 z-30 will-change-transform"
              style={{ animation: "floatBadge 4s ease-in-out infinite" }}
            >
              <div className="p-[1.5px] rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-700 shadow-lg">
                <div className="bg-[#020B18] px-5 py-4 rounded-[14px] flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-emerald-300 to-white">
                    5+
                  </span>
                  <span className="text-[10px] text-blue-300/80 font-bold uppercase mt-1.5">
                    Years Exp.
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatBadge {
          0%, 100% { transform: translate3d(0,0,0); }
          50% { transform: translate3d(0,-8px,0); }
        }
      `}</style>
    </section>
  );
}
import React, { useEffect, useRef, useState } from "react";
import { Target, Layers, Cpu, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

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
    body: "We build foundational systems designed to handle tomorrow's traffic, growing seamlessly with your business.",
    color: "blue",
    delay: "delay-[400ms]",
  },
  {
    icon: Cpu,
    title: "Intelligent Innovation",
    body: "From AI integrations to enterprise pipelines, we leverage the bleeding edge to keep you ahead of the curve.",
    color: "emerald",
    delay: "delay-500",
  },
];

const iconColors = {
  emerald: "text-emerald-400 bg-emerald-950/50 border-emerald-800/40",
  blue:    "text-blue-400 bg-blue-950/50 border-blue-800/40",
};

export default function About() {
  const [sectionRef, inView] = useInView(0.1);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#020B18] text-white overflow-hidden border-t border-blue-900/30"
    >
      {/* Ambient glows */}
      <div className="absolute top-[15%] right-[-5%] w-[480px] h-[480px] bg-emerald-600/8 rounded-full blur-[130px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[-10%] left-[-8%] w-[560px] h-[560px] bg-blue-600/8 rounded-full blur-[130px] pointer-events-none" aria-hidden="true" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #60a5fa 1px, transparent 1px)", backgroundSize: "36px 36px" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* ── LEFT: Text & Values ── */}
          <div className="w-full lg:w-1/2 space-y-8">

            {/* Eyebrow */}
            <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-800/50 bg-blue-950/50 text-blue-300 text-[11px] font-bold tracking-[0.2em] uppercase shadow-lg shadow-blue-900/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                About MAKT
              </span>
            </div>

            {/* Headline */}
            <div className={`transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <h2 className="text-4xl sm:text-5xl font-bold text-blue-50 leading-[1.1] tracking-tight">
                Pioneering the Future of{" "}
                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                  Scalable Technology
                </span>
              </h2>
            </div>

            {/* Body */}
            <div className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <p className="text-blue-200/70 text-base md:text-lg leading-relaxed max-w-lg">
                At MAKT Solutions, we don't just write code — we engineer strategic advantages.
                By bridging complex data science with actionable business growth, we empower
                organizations to navigate the digital landscape with confidence.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-5 pt-2">
              {VALUES.map(({ icon: Icon, title, body, color, delay }) => (
                <div
                  key={title}
                  className={`flex gap-4 items-start group transition-all duration-700 ${delay} ${
                    inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                  }`}
                >
                  <div className={`flex-shrink-0 w-11 h-11 rounded-xl border flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${iconColors[color]}`}>
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors duration-200">
                      {title}
                    </h4>
                    <p className="text-blue-200/60 text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className={`pt-4 transition-all duration-700 delay-[600ms] ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <Link
                to="/about"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-900/30 border border-blue-700/40 hover:bg-blue-800/40 hover:border-blue-500/60 active:scale-95 transition-all duration-250 text-white text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020B18]"
              >
                Discover Our Story
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* ── RIGHT: Image Composition ── */}
          <div className={`w-full lg:w-1/2 relative mt-6 lg:mt-0 transition-all duration-1000 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>

            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden border border-blue-800/40 shadow-2xl shadow-blue-950/50 group">
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-blue-950/35 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-10 z-10 pointer-events-none" aria-hidden="true" />
              {/* Gradient bottom fade */}
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#020B18]/60 to-transparent z-10 pointer-events-none" aria-hidden="true" />
              <img
                src="/img/about.webp"
                alt="MAKT Team Strategy Session"
                className="w-full h-[420px] sm:h-[480px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>

            {/* Overlapping accent image */}
            <div className="hidden md:block absolute -bottom-10 -left-10 w-56 rounded-2xl overflow-hidden border-[3px] border-[#020B18] shadow-2xl shadow-emerald-950/40 group z-20">
              <div className="absolute inset-0 bg-emerald-900/25 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-0 z-10 pointer-events-none" aria-hidden="true" />
              <img
                src="/img/about-mini.webp"
                alt="Data Analysis"
                className="w-full h-40 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />
            </div>

            {/* Experience badge */}
            <div
              className="absolute -top-6 -right-4 sm:-top-8 sm:-right-8 z-30"
              style={{ animation: "floatBadge 4s ease-in-out infinite" }}
            >
              <div className="p-[1.5px] rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-700 shadow-xl shadow-emerald-900/40">
                <div className="bg-[#020B18] px-5 py-4 rounded-[14px] flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-emerald-300 to-white leading-none">
                    5+
                  </span>
                  <span className="text-[10px] text-blue-300/80 font-bold uppercase tracking-[0.15em] mt-1.5">
                    Years Exp.
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative corner dots */}
            <div className="hidden lg:block absolute -bottom-4 -right-4 grid grid-cols-3 gap-1.5" aria-hidden="true">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-800/60" />
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Float keyframe */}
      <style>{`
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}
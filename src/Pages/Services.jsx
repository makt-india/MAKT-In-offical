import React, { useEffect, useRef, useState } from "react";
import { Code2, Briefcase, Rocket, CheckCircle2 } from "lucide-react";
import SpecializedServicesSlider from "../Components/SpecializedServicesSlider";

// ─── Scroll-reveal hook ───────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── Data ─────────────────────────────────────────────────────────────
const SERVICES_DATA = [
  {
    id: 1,
    icon: Code2,
    title: "IT & Software Solutions",
    description:
      "Custom software development, system integration, and enterprise-grade technology services designed to scale with your business.",
    bullets: ["Custom SaaS Platforms", "API & System Integrations", "Cloud Infrastructure"],
    delay: "delay-100",
  },
  {
    id: 2,
    icon: Briefcase,
    title: "Business Consulting",
    description:
      "Process optimization, strategy consulting, and scalable business planning to keep you ahead of the curve in competitive markets.",
    bullets: ["Growth Strategy", "Process Automation", "Investor Acquisition"],
    delay: "delay-200",
  },
  {
    id: 3,
    icon: Rocket,
    title: "Digital & Growth",
    description:
      "Branding, digital marketing, and performance-driven growth strategies engineered to maximize your market reach and conversion.",
    bullets: ["Meta & Google Ads", "Funnel Optimization", "CRM Automation"],
    delay: "delay-300",
  },
];

const STATS_DATA = [
  { id: 1, value: "30+",  label: "Projects Delivered", suffix: "" },
  { id: 2, value: "25+",  label: "Satisfied Clients",  suffix: "" },
  { id: 3, value: "5+",   label: "Industry Domains",   suffix: "" },
  { id: 4, value: "24/7", label: "Expert Support",     suffix: "" },
];

const WHY_POINTS = [
  "Proven systems with measurable ROI",
  "End-to-end delivery — strategy to execution",
  "Dedicated support, zero hand-holding required",
  "Built for scale from day one",
];

// ─── Services Section ─────────────────────────────────────────────────
function ServicesSection() {
  const [headerRef, headerInView] = useInView(0.2);
  const [gridRef, gridInView]     = useInView(0.1);

  return (
    <section className="relative py-24 md:py-32 bg-[#020B18] text-white overflow-hidden">

      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-900/15 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #60a5fa 1px, transparent 1px)", backgroundSize: "36px 36px" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">

        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-14 md:mb-16 transition-all duration-700 ${
            headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-800/50 bg-blue-950/50 text-emerald-400 text-[11px] font-bold tracking-[0.2em] uppercase shadow-lg shadow-blue-900/20 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-50 tracking-tight mt-1">
            Our Core Services
          </h2>
          <p className="mt-5 text-blue-200/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Strategic, technical, and operational solutions tailored to modern business challenges —
            built to compound results over time.
          </p>
        </div>

        {/* Cards */}
        <div ref={gridRef} className="grid md:grid-cols-3 gap-5 lg:gap-7 text-left">
          {SERVICES_DATA.map(({ id, icon: Icon, title, description, bullets, delay }) => (
            <div
              key={id}
              className={`group relative p-7 md:p-8 rounded-2xl bg-blue-950/20 border border-blue-800/35
                hover:bg-blue-900/30 hover:border-emerald-500/40
                transition-all duration-400 overflow-hidden backdrop-blur-sm
                ${gridInView ? `opacity-100 translate-y-0 ${delay}` : "opacity-0 translate-y-8"}
                transition-all duration-700`}
            >
              {/* Corner glow */}
              <div
                className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/8 rounded-full blur-2xl group-hover:bg-emerald-500/15 transition-colors duration-500 pointer-events-none"
                aria-hidden="true"
              />
              {/* Top accent line */}
              <div
                className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                aria-hidden="true"
              />

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-blue-900/50 border border-blue-700/40 flex items-center justify-center mb-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-emerald-500/40 group-hover:shadow-lg group-hover:shadow-emerald-500/10">
                <Icon className="w-6 h-6 text-emerald-400" aria-hidden="true" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-50 transition-colors duration-200">
                {title}
              </h3>
              <p className="text-blue-200/60 leading-relaxed text-sm mb-5">
                {description}
              </p>

              {/* Bullet points */}
              <ul className="space-y-2">
                {bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-xs text-blue-300/60 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/70 shrink-0" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stats Section ────────────────────────────────────────────────────
function StatsSection() {
  const [ref, inView] = useInView(0.15);

  return (
    <section className="relative py-20 md:py-24 bg-slate-50 border-t border-slate-200 overflow-hidden">

      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #64748b 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">

        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">MAKT Solutions?</span>
          </h2>
          <p className="mt-4 text-slate-500 text-base max-w-xl mx-auto">
            Numbers that speak to the results we consistently deliver across every engagement.
          </p>
        </div>

        {/* Two-column layout: stats + why-points */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {STATS_DATA.map(({ id, value, label }, i) => (
              <div
                key={id}
                className={`relative p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-250 text-center overflow-hidden
                  ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${100 + i * 80}ms`, transitionDuration: "700ms" }}
              >
                {/* Gradient accent corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-indigo-100/60 to-transparent rounded-bl-3xl pointer-events-none" aria-hidden="true" />
                <h3 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 leading-none">
                  {value}
                </h3>
                <p className="mt-2 text-slate-500 font-semibold tracking-wide uppercase text-[10px] md:text-xs">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Why-points */}
          <div className={`space-y-4 transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">
              Built differently. <span className="text-indigo-600">Delivered precisely.</span>
            </h3>
            {WHY_POINTS.map((point, i) => (
              <div
                key={point}
                className="flex items-start gap-3"
                style={{ transitionDelay: `${400 + i * 80}ms` }}
              >
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" aria-hidden="true" />
                </span>
                <p className="text-slate-600 text-sm leading-relaxed">{point}</p>
              </div>
            ))}

            {/* Divider + CTA */}
            <div className="pt-4 border-t border-slate-200 mt-6">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200 group"
              >
                Start a project with us
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────
export default function ServicesAndStats() {
  return (
    <>
      <ServicesSection />
      <StatsSection />
      <SpecializedServicesSlider />
    </>
  );
}
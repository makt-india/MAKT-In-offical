import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Globe, Zap, BarChart2, Bot, Video, Share2 } from "lucide-react";
import Galaxy3D from "../Components/Galaxy3d";

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
const STATS = [
  { value: "1,200+", label: "Investor Leads / Month" },
  { value: "18%",    label: "Qualified Conversion Rate" },
  { value: "3",      label: "Live Domains" },
  { value: "24/7",   label: "Automated Follow-up" },
];

const PROJECTS = [
  {
    id: "01",
    title: "ATM Franchise Acquisition Network",
    description:
      "Multi-domain lead generation ecosystem for high-intent ATM franchise investors. Segmented funnels, CRM automation, WhatsApp routing, and Meta Ads campaigns driving scalable investor acquisition.",
    tags: ["React", "Meta Ads", "CRM Automation", "Funnel Optimization"],
    accent: "emerald",
    icon: Globe,
    links: [
      { label: "findiatmfranchise.com", href: "https://findiatmfranchise.com" },
      { label: "atmfranchise.in",       href: "https://atmfranchise.in" },
      { label: "ownatm.in",             href: "https://ownatm.in" },
    ],
    metric: { value: "1,200+", label: "leads/mo" },
  },
  {
    id: "02",
    title: "Franchise Lead Management SaaS",
    description:
      "Internal SaaS platform managing investor pipelines, automating follow-ups, tracking ad performance, and handling multi-agent lead distribution at high volume.",
    tags: ["MERN Stack", "Cloud Infra", "Role-Based Dashboards", "Analytics"],
    accent: "blue",
    icon: BarChart2,
    links: [],
    metric: { value: "∞", label: "scalable" },
  },
  {
    id: "03",
    title: "Investor Conversion Media System",
    description:
      "High-impact promotional video creatives and short-form content engineered for ATM franchise marketing. Optimized for Meta Ads, Instagram, and WhatsApp campaigns.",
    tags: ["Video Editing", "Ad Creatives", "Funnel Content", "Meta Ads"],
    accent: "purple",
    icon: Video,
    links: [],
    metric: { value: "3x", label: "CTR lift" },
  },
  {
    id: "04",
    title: "ATM Franchise Brand & Social Growth",
    description:
      "Niche-focused social media growth strategy for ATM investment audiences. Organic positioning, authority content, and paid amplification for investor reach.",
    tags: ["Instagram", "Facebook", "YouTube", "Paid Campaigns"],
    accent: "pink",
    icon: Share2,
    links: [],
    metric: { value: "50k+", label: "reach/mo" },
  },
  {
    id: "05",
    title: "AI Automation Systems",
    description:
      "Intelligent workflow automation eliminating manual processes, reducing operational friction, and accelerating scalability. CRM sync, WhatsApp bots, lead scoring — operating 24/7.",
    tags: ["CRM Automation", "WhatsApp Bots", "Lead Scoring", "API Integrations"],
    accent: "emerald",
    icon: Bot,
    links: [],
    metric: { value: "24/7", label: "zero downtime" },
  },
  {
    id: "06",
    title: "Performance Website Development",
    description:
      "Strategic web platforms engineered for speed, authority positioning, and investor-grade conversion. Not brochures — revenue infrastructure.",
    tags: ["React", "Next.js", "Conversion Architecture", "Performance"],
    accent: "blue",
    icon: Zap,
    links: [],
    metric: { value: "<1s", label: "load time" },
  },
];

const accentMap = {
  emerald: {
    border:   "border-emerald-500/30",
    hoverBorder: "hover:border-emerald-500/60",
    badge:    "bg-emerald-950/60 border-emerald-800/40 text-emerald-300",
    icon:     "bg-emerald-950/60 border-emerald-800/40 text-emerald-400",
    metric:   "text-emerald-400",
    glow:     "group-hover:shadow-emerald-500/10",
    line:     "bg-emerald-500",
    link:     "text-emerald-400 hover:text-emerald-300",
    num:      "text-emerald-500/20",
  },
  blue: {
    border:   "border-blue-500/30",
    hoverBorder: "hover:border-blue-500/60",
    badge:    "bg-blue-950/60 border-blue-800/40 text-blue-300",
    icon:     "bg-blue-950/60 border-blue-800/40 text-blue-400",
    metric:   "text-blue-400",
    glow:     "group-hover:shadow-blue-500/10",
    line:     "bg-blue-500",
    link:     "text-blue-400 hover:text-blue-300",
    num:      "text-blue-500/20",
  },
  purple: {
    border:   "border-purple-500/30",
    hoverBorder: "hover:border-purple-500/60",
    badge:    "bg-purple-950/60 border-purple-800/40 text-purple-300",
    icon:     "bg-purple-950/60 border-purple-800/40 text-purple-400",
    metric:   "text-purple-400",
    glow:     "group-hover:shadow-purple-500/10",
    line:     "bg-purple-500",
    link:     "text-purple-400 hover:text-purple-300",
    num:      "text-purple-500/20",
  },
  pink: {
    border:   "border-pink-500/30",
    hoverBorder: "hover:border-pink-500/60",
    badge:    "bg-pink-950/60 border-pink-800/40 text-pink-300",
    icon:     "bg-pink-950/60 border-pink-800/40 text-pink-400",
    metric:   "text-pink-400",
    glow:     "group-hover:shadow-pink-500/10",
    line:     "bg-pink-500",
    link:     "text-pink-400 hover:text-pink-300",
    num:      "text-pink-500/20",
  },
};

// ─── Sub-components ────────────────────────────────────────────────────
function StatBar() {
  const [ref, inView] = useInView(0.2);
  return (
    <div
      ref={ref}
      className={`grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {STATS.map(({ value, label }, i) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center py-6 px-4 bg-black/40 backdrop-blur-sm text-center"
          style={{ transitionDelay: `${i * 80}ms` }}
        >
          <span className="text-2xl md:text-3xl font-black text-white tracking-tight">{value}</span>
          <span className="text-[10px] md:text-xs text-white/40 uppercase tracking-widest mt-1 font-mono">{label}</span>
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView(0.1);
  const a = accentMap[project.accent];
  const Icon = project.icon;
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`group relative transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${(index % 3) * 120}ms` }}
    >
      <div
        className={`relative h-full p-6 md:p-8 rounded-2xl border ${a.border} ${a.hoverBorder} bg-black/50 backdrop-blur-md
          shadow-xl ${a.glow} hover:shadow-2xl transition-all duration-300 overflow-hidden`}
      >
        {/* Large background number */}
        <span
          className={`absolute top-4 right-5 text-[6rem] font-black leading-none pointer-events-none select-none ${a.num}`}
          aria-hidden="true"
        >
          {project.id}
        </span>

        {/* Subtle top accent line */}
        <div className={`absolute top-0 left-8 right-8 h-px ${a.line} opacity-60`} aria-hidden="true" />

        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div className={`flex-shrink-0 w-11 h-11 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${a.icon}`}>
            <Icon className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">
              Project {project.id}
            </p>
            <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/55 text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono uppercase tracking-wide ${a.badge}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Live links */}
        {project.links.length > 0 && (
          <div className="flex flex-col gap-1.5 mb-5">
            <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Live Projects</span>
            {project.links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 text-sm font-mono transition-colors duration-200 group/link ${a.link}`}
              >
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                {label}
              </a>
            ))}
          </div>
        )}

        {/* Metric footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-baseline gap-1.5">
            <span className={`text-2xl font-black ${a.metric}`}>{project.metric.value}</span>
            <span className="text-xs text-white/30 font-mono uppercase tracking-wider">{project.metric.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────
export default function Project() {
  const [heroRef, heroInView] = useInView(0.1);

  return (
    <main className="relative w-full min-h-screen text-white overflow-hidden">

      {/* Galaxy background */}
      <Galaxy3D />

      {/* All content sits above the galaxy */}
      <div className="relative z-10">

        {/* ── HERO ── */}
        <section
          ref={heroRef}
          className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-24"
        >
          {/* Eyebrow */}
          <div className={`transition-all duration-700 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-emerald-400 text-[11px] font-mono tracking-[0.2em] uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              Case Studies & Live Systems
            </span>
          </div>

          {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] max-w-4xl mx-auto">
  Raise Capital
  <br />
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400">
    With Precision
  </span>
</h1>
          {/* Subline */}
          <div className={`transition-all duration-700 delay-200 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p className="mt-6 text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-mono">
              Multi-domain lead engines, SaaS platforms, and AI automation systems
              built for capital flow at scale.
            </p>
          </div>

          {/* CTAs */}
          <div className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <a
              href="#projects"
              className="group px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-black font-bold text-sm uppercase tracking-widest transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/30 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              Explore Projects
              <span className="inline-block ml-2 transition-transform duration-200 group-hover:translate-x-1">↓</span>
            </a>
            <Link
              to="/contact"
              className="px-8 py-3.5 border border-white/20 hover:border-white/50 hover:bg-white/5 text-white font-semibold text-sm uppercase tracking-widest transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Schedule Strategy Call
            </Link>
          </div>

          {/* Stats bar */}
          <div className="w-full max-w-3xl mx-auto mt-16">
            <StatBar />
          </div>

          {/* Scroll hint */}
          <div className="mt-16 flex flex-col items-center gap-2 text-white/20">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" aria-hidden="true" />
          </div>
        </section>

        {/* ── PROJECTS GRID ── */}
        <section id="projects" className="px-4 sm:px-6 lg:px-12 pb-32">
          <div className="max-w-7xl mx-auto">

            {/* Section header */}
            <div className="text-center mb-14">
              <p className="text-emerald-400 font-mono text-xs uppercase tracking-[0.3em] mb-3">
                — What We've Built —
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Live Systems & Case Studies
              </h2>
            </div>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {PROJECTS.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA STRIP ── */}
        <section className="relative px-4 sm:px-6 pb-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="p-px rounded-2xl bg-gradient-to-r from-emerald-500/30 via-blue-500/30 to-purple-500/30">
              <div className="rounded-2xl bg-black/70 backdrop-blur-md px-8 py-12">
                <p className="text-emerald-400 font-mono text-xs uppercase tracking-[0.3em] mb-4">
                  Ready to Scale?
                </p>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                  Let's Build Your
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                    Acquisition Infrastructure
                  </span>
                </h2>
                <p className="text-white/40 text-sm mb-8 max-w-md mx-auto leading-relaxed">
                  From lead generation to full CRM automation — we engineer systems
                  that compound growth without adding headcount.
                </p>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-black font-bold text-sm uppercase tracking-widest transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/30"
                >
                  Book Strategy Call
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
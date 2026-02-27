import { useEffect, useRef, useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Globe, Zap, BarChart2, Bot, Video, Share2 } from "lucide-react";
import Galaxy3D from "../Components/Galaxy3d";

/* ───────────────── Shared Observer ───────────────── */

const observerMap = new Map();
const observerInstances = new Map();

function getSharedObserver(threshold) {
  if (!observerInstances.has(threshold)) {
    const callbacks = new Map();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cb = callbacks.get(entry.target);
            if (cb) {
              cb();
              obs.unobserve(entry.target);
              callbacks.delete(entry.target);
            }
          }
        });
      },
      { threshold }
    );
    observerMap.set(threshold, callbacks);
    observerInstances.set(threshold, obs);
  }
  return {
    observer: observerInstances.get(threshold),
    callbacks: observerMap.get(threshold),
  };
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const { observer, callbacks } = getSharedObserver(threshold);
    callbacks.set(el, () => setInView(true));
    observer.observe(el);

    return () => {
      observer.unobserve(el);
      callbacks.delete(el);
    };
  }, [threshold, inView]);

  return [ref, inView];
}
const PROJECTS = [
  {
    id: 1,
    icon: Globe,
    title: "ATM Franchise Acquisition Network",
    description:
      "Multi-domain lead generation ecosystem built for high-intent ATM franchise investors. Includes segmented funnels, CRM automation, WhatsApp routing, and performance ad campaigns.",
    metric: { value: "1,200+", label: "Leads / Month" },
  },
  {
    id: 2,
    icon: BarChart2,
    title: "Franchise Lead Management SaaS",
    description:
      "Internal SaaS system managing investor pipelines, automating follow-ups, tracking ad performance, and distributing leads across agents.",
    metric: { value: "18%", label: "Conversion Rate" },
  },
  {
    id: 3,
    icon: Video,
    title: "Investor Conversion Media System",
    description:
      "High-impact video creatives engineered for ATM franchise marketing and optimized for Meta Ads and WhatsApp funnels.",
    metric: { value: "3x", label: "CTR Boost" },
  },
  {
    id: 4,
    icon: Bot,
    title: "AI Automation Systems",
    description:
      "Automated lead scoring, CRM sync, and WhatsApp workflows operating 24/7 without manual intervention.",
    metric: { value: "24/7", label: "Automation" },
  },
  {
    id: 5,
    icon: Share2,
    title: "Brand & Social Growth",
    description:
      "Authority-driven content strategy and paid amplification targeting ATM investor audiences across platforms.",
    metric: { value: "Multi-City", label: "Reach" },
  },
  {
    id: 6,
    icon: Zap,
    title: "Performance Website Infrastructure",
    description:
      "High-performance investor-grade web systems engineered for speed, authority positioning, and conversion architecture.",
    metric: { value: "<1s", label: "Load Speed" },
  },
];

/* ───────────────── Static Data ───────────────── */

const STATS = [
  { value: "1,200+", label: "Investor Leads / Month" },
  { value: "18%", label: "Qualified Conversion Rate" },
  { value: "3", label: "Live Domains" },
  { value: "24/7", label: "Automated Follow-up" },
];

const STAT_DELAY_STYLES = STATS.map((_, i) => ({
  transitionDelay: `${i * 80}ms`,
}));

/* ───────────────── StatBar ───────────────── */

const StatBar = memo(function StatBar() {
  const [ref, inView] = useInView(0.2);

  return (
    <div
      ref={ref}
      className={`grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/10 rounded-2xl overflow-hidden
      transition-[opacity,transform] duration-700 will-change-[opacity,transform]
      ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {STATS.map(({ value, label }, i) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center py-6 px-4 bg-black/40 backdrop-blur-sm text-center"
          style={STAT_DELAY_STYLES[i]}
        >
          <span className="text-2xl md:text-3xl font-black text-white">{value}</span>
          <span className="text-[10px] md:text-xs text-white/40 uppercase mt-1 font-mono">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
});

/* ───────────────── Project Card ───────────────── */

const ProjectCard = memo(function ProjectCard({ project, index }) {
  const [ref, inView] = useInView(0.1);
  const Icon = project.icon;

  return (
    <div
      ref={ref}
      className={`group relative transition-[opacity,transform] duration-700 will-change-[opacity,transform]
      ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${(index % 3) * 120}ms` }}
    >
      <div
        className="relative h-full p-6 md:p-8 rounded-2xl border border-white/10
        bg-black/60 backdrop-blur-sm
        shadow-lg hover:shadow-xl
        transition-[box-shadow,border-color] duration-300 overflow-hidden"
      >
        <div className="flex items-start gap-4 mb-5">
          <div className="flex-shrink-0 w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <Icon className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
              {project.title}
            </h3>
          </div>
        </div>

        <p className="text-white/55 text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-2xl font-black text-emerald-400">
            {project.metric.value}
          </span>
          <span className="text-xs text-white/30 uppercase font-mono">
            {project.metric.label}
          </span>
        </div>
      </div>
    </div>
  );
});

/* ───────────────── Page ───────────────── */

export default function Project() {
  const [heroRef, heroInView] = useInView(0.1);

  const scrollToProjects = useCallback((e) => {
    e.preventDefault();
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <main className="relative w-full min-h-screen text-white overflow-hidden">
      <Galaxy3D />

      <div className="relative z-10">

        <section
          ref={heroRef}
          className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24"
        >
          <div
            className={`transition-[opacity,transform] duration-700 will-change-[opacity,transform]
            ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
              Raise Capital
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400">
                With Precision
              </span>
            </h1>
          </div>

          <div className="mt-10 flex gap-4">
            <a
              href="#projects"
              onClick={scrollToProjects}
              className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400
              transition-[background-color,transform,box-shadow] duration-200
              hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/30"
            >
              Explore Projects
            </a>

            <Link
              to="/contact"
              className="px-8 py-3.5 border border-white/20
              transition-[background-color,border-color,transform] duration-200
              hover:border-white/50 hover:bg-white/5"
            >
              Schedule Strategy Call
            </Link>
          </div>

          <div className="w-full max-w-3xl mx-auto mt-16">
            <StatBar />
          </div>
        </section>

        <section id="projects" className="px-6 pb-32">
          <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
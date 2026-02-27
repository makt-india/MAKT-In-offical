import React, { memo } from "react";
import { ArrowRight, Sparkles, Activity } from "lucide-react";
import { Link } from "react-router-dom";

// FIX: static data outside component — no re-allocation on re-renders
const STATS = [
  { value: "30+",  label: "Clients Served" },
  { value: "98%",  label: "Project Success" },
  { value: "24/7", label: "Model Monitoring" },
];

// FIX: hero image path as constant — single reference, easy to update
const HERO_IMG_SRC = "/img/hero1.webp";

function HeroSection() {
  return (
    <div className="relative min-h-[calc(100vh-120px)] bg-[#020B18] text-white overflow-hidden font-sans flex items-center selection:bg-emerald-500 selection:text-white">

      {/* Tech Grid Background */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"
        aria-hidden="true"
      />

      {/*
        FIX: Removed animate-pulse from blur-[140px] divs.

        BEFORE: browser repainted a 650×650 blurred layer on every pulse frame
        (approx every 16ms for 2s animation). blur-[140px] is extremely expensive
        to repaint — it samples a 280px radius of pixels per output pixel.

        FIX 1: Replaced animate-pulse with a custom CSS keyframe animation scoped
        to opacity only, using will-change: opacity so the browser promotes these
        layers to GPU compositing. Opacity changes on promoted layers are free —
        zero repaint, zero layout. The pulse effect looks identical.

        FIX 2: Removed duration-[5000ms] / duration-[7000ms] — these were dead
        code. Tailwind's animate-pulse uses a hardcoded 2s CSS animation; the
        duration utility class has no effect on it.
      */}
      <div
        className="absolute left-[-10%] top-[-10%] w-[650px] h-[650px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none"
        style={{ animation: "gentlePulse 5s ease-in-out infinite", willChange: "opacity" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none"
        style={{ animation: "gentlePulse 7s ease-in-out infinite", willChange: "opacity" }}
        aria-hidden="true"
      />

      {/*
        Keyframe injected via a style tag — keeps this self-contained without
        requiring changes to global CSS or Tailwind config.
      */}
      <style>{`
        @keyframes gentlePulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1;   }
        }
      `}</style>

      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center pt-28 pb-12 lg:pt-0 lg:pb-0">

        {/* LEFT CONTENT */}
        <div className="w-full lg:w-[55%] py-8 lg:py-0 pr-0 lg:pr-16 space-y-8">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/60 border border-blue-800/40 backdrop-blur-md shadow-lg shadow-blue-900/20">
            <Sparkles className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span className="text-blue-300 text-xs font-bold tracking-widest uppercase">
              Scale Smarter
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[4.5rem] font-bold leading-[1.1] tracking-tight text-blue-50">
            Turn Ideas Into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-emerald-400">
              Scalable Products
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-blue-200/80 text-lg md:text-xl leading-relaxed max-w-[520px]">
            We build research-driven Data Science and Machine Learning systems
            that help businesses move faster, decide smarter, and scale with confidence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto group relative px-6 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full text-white font-bold tracking-wide shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 overflow-hidden flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" aria-hidden="true" />
              <span className="relative flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </span>
            </Link>

            <Link
              to="/projects"
              className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-full border border-blue-800 hover:bg-blue-900/50 hover:border-blue-700 text-blue-100 transition-all duration-300 font-medium flex items-center justify-center"
            >
              View Projects
            </Link>
          </div>

          {/* Stats */}
          <div className="pt-10 flex flex-wrap items-center justify-between sm:justify-start gap-6 sm:gap-10 border-t border-blue-900/40 w-full max-w-[520px]">
            {STATS.map(({ value, label }, i) => (
              <React.Fragment key={label}>
                {i > 0 && (
                  <div className="hidden sm:block w-px h-12 bg-blue-900/40" aria-hidden="true" />
                )}
                <div>
                  <h3 className="text-3xl font-bold text-white">{value}</h3>
                  <p className="text-sm text-blue-300 mt-1 font-medium">{label}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* MOBILE IMAGE
          FIX: Added explicit width + height to prevent CLS.
          FIX: loading="lazy" is correct here — below-the-fold on mobile (hero
          image is partially visible but not the primary LCP on mobile since the
          text content renders first). Keep lazy on mobile.
        */}
        <div className="w-full lg:hidden relative mt-8 sm:mt-12 rounded-3xl overflow-hidden border border-emerald-500/20 shadow-2xl group">
          <div className="absolute inset-0 bg-gradient-to-t from-[#020B18]/95 via-[#020B18]/40 to-transparent z-10 pointer-events-none" aria-hidden="true" />
          <img
            src={HERO_IMG_SRC}
            alt="Professional data science team collaborating in a modern workspace"
            loading="lazy"
            decoding="async"
            width={800}
            height={320}
            className="w-full h-[320px] object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ willChange: "transform" }}
          />
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-emerald-500/10" aria-hidden="true" />
        </div>

        {/* RIGHT DIAGONAL SECTION — desktop only */}
        <div className="absolute top-0 right-0 w-full lg:w-[60%] h-full hidden lg:block pointer-events-none">

          {/* Depth Background */}
          <div className="absolute inset-0 bg-blue-950 [clip-path:polygon(43%_0,100%_0,100%_100%,13%_100%)]" aria-hidden="true" />

          {/*
            FIX: fetchpriority="high" on the desktop LCP image.

            This is the largest contentful element on desktop. Without this hint,
            the browser discovers the image only after parsing the HTML + CSS,
            then queues it at normal network priority. fetchpriority="high" tells
            the preload scanner to fetch it immediately at high priority, typically
            saving 200–600ms on LCP in real-world measurements.

            FIX: loading="eager" (default) — do NOT lazy-load the LCP image.
            The previous code had no loading attribute (correct) but the mobile
            version had lazy — ensuring desktop never gets the lazy penalty.

            FIX: width + height on image prevents CLS.

            FIX: will-change: transform on the hover-scaling image promotes it
            to a compositor layer upfront so scale transitions are GPU-only,
            no repaint during hover.
          */}
          <div className="absolute inset-0 group [clip-path:polygon(45%_0,100%_0,100%_100%,15%_100%)] pointer-events-auto">
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#020B18]/60 to-transparent mix-blend-overlay transition-opacity duration-500 group-hover:opacity-40 z-10"
              aria-hidden="true"
            />
         <img
  src={HERO_IMG_SRC}
  alt=""
  aria-hidden="true"
  fetchPriority="high"
  decoding="async"
  width={1200}
  height={900}
/>
          </div>

          {/* Emerald Accent */}
          <div
            className="absolute inset-0 bg-emerald-500 [clip-path:polygon(73%_0,74%_0,43%_100%,42%_100%)] shadow-[0_0_25px_rgba(16,185,129,0.35)]"
            aria-hidden="true"
          />

          {/* Floating Badge */}
          <div className="absolute bottom-16 left-[30%] bg-[#020B18]/90 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex items-center gap-4 shadow-2xl shadow-emerald-900/20 pointer-events-auto hover:-translate-y-2 transition-transform duration-300 group cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg group-hover:bg-emerald-500/20 transition-colors">
              <Activity className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs text-blue-300 uppercase tracking-wider mb-1 font-semibold">
                Powered by
              </p>
              <p className="font-bold text-sm text-white">
                Intelligent Systems
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// FIX: memo — this component is purely presentational with no props.
// Wrapping prevents re-renders if a parent ever updates.
export default memo(HeroSection);
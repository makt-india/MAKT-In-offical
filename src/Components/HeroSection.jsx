import React from "react";
import { ArrowRight, Sparkles, Activity } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="  relative min-h-[calc(100vh-120px)] bg-[#020B18] text-white overflow-hidden font-sans flex items-center selection:bg-emerald-500 selection:text-white">

      {/* 1. UPGRADE: Subtle Tech Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      {/* 2. UPGRADE: Animated Background Glows */}
      <div className="absolute left-[-10%] top-[-10%] w-[650px] h-[650px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[5000ms]"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[7000ms]"></div>

      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center pt-28 pb-12 lg:pt-0 lg:pb-0">

        {/* LEFT CONTENT */}
        <div className="w-full lg:w-[55%] py-8 lg:py-0 pr-0 lg:pr-16 space-y-8">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/60 border border-blue-800/40 backdrop-blur-md shadow-lg shadow-blue-900/20">
            <Sparkles className="w-4 h-4 text-emerald-400" />
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

          {/* 3. UPGRADE: Responsive CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">

            <Link
              to="/contact"
              className="w-full sm:w-auto group relative px-6 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full text-white font-bold tracking-wide shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 overflow-hidden flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              to="/projects"
              className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-full border border-blue-800 hover:bg-blue-900/50 hover:border-blue-700 text-blue-100 transition-all duration-300 font-medium flex items-center justify-center"
            >
              View Projects
            </Link>

          </div>

          {/* 4. UPGRADE: Balanced 3-Column Stats */}
          <div className="pt-10 flex flex-wrap items-center justify-between sm:justify-start gap-6 sm:gap-10 border-t border-blue-900/40 w-full max-w-[520px]">
            <div>
              <h3 className="text-3xl font-bold text-white">30+</h3>
              <p className="text-sm text-blue-300 mt-1 font-medium">Clients Served</p>
            </div>

            <div className="hidden sm:block w-px h-12 bg-blue-900/40"></div>

            <div>
              <h3 className="text-3xl font-bold text-white">98%</h3>
              <p className="text-sm text-blue-300 mt-1 font-medium">Project Success</p>
            </div>

            <div className="hidden sm:block w-px h-12 bg-blue-900/40"></div>

            <div>
              <h3 className="text-3xl font-bold text-white">24/7</h3>
              <p className="text-sm text-blue-300 mt-1 font-medium">Model Monitoring</p>
            </div>
          </div>
        </div>

        {/* MOBILE IMAGE */}
        <div className="w-full lg:hidden relative mt-8 sm:mt-12 rounded-3xl overflow-hidden border border-emerald-500/20 shadow-2xl group">

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020B18]/95 via-[#020B18]/40 to-transparent z-10 pointer-events-none" />

          {/* Image */}
          <img
            src="/img/hero1.webp"
            alt="Professional data science team collaborating in a modern workspace"
            loading="lazy"
            decoding="async"
            className="w-full h-[320px] object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Optional bottom glow effect */}
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-emerald-500/10" />
        </div>

        {/* RIGHT DIAGONAL SECTION */}
        <div className="absolute top-0 right-0 w-full lg:w-[60%] h-full hidden lg:block pointer-events-none">

          {/* Depth Background */}
          <div className="absolute inset-0 bg-blue-950 [clip-path:polygon(43%_0,100%_0,100%_100%,13%_100%)]"></div>

          {/* 5. UPGRADE: Image Accessibility & Overlay adjustments */}
          <div className="absolute inset-0 group [clip-path:polygon(45%_0,100%_0,100%_100%,15%_100%)] pointer-events-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-[#020B18]/60 to-transparent mix-blend-overlay transition-opacity duration-500 group-hover:opacity-40 z-10"></div>
            <img
              src="/img/hero1.webp"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>

          {/* Emerald Accent */}
          <div className="absolute inset-0 bg-emerald-500 [clip-path:polygon(73%_0,74%_0,43%_100%,42%_100%)] shadow-[0_0_25px_rgba(16,185,129,0.35)]"></div>

          {/* Floating Badge */}
          <div className="absolute bottom-16 left-[30%] bg-[#020B18]/90 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex items-center gap-4 shadow-2xl shadow-emerald-900/20 pointer-events-auto hover:-translate-y-2 transition-transform duration-300 group cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg group-hover:bg-emerald-500/20 transition-colors">
              <Activity className="w-6 h-6" />
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
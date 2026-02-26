import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail, Phone, MapPin, Linkedin, Instagram, Github, ArrowRight, MessageCircle,
} from "lucide-react";

// ─── Scroll-reveal hook ───────────────────────────────────────────────
function useInView(threshold = 0.1) {
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
const NAV_LINKS = [
  { label: "Home",     to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Contact",  to: "/contact" },
];

const SERVICE_LINKS = [
  "Web Development",
  "Digital Marketing",
  "Video Editing",
  "AI Automation",
  "Lead Generation",
];

const SOCIALS = [
  { label: "WhatsApp", href: "https://wa.me/918883335553",  icon: MessageCircle },
  { label: "LinkedIn",  href: "#",                          icon: Linkedin },
  { label: "Instagram", href: "#",                          icon: Instagram },
  { label: "GitHub",    href: "#",                          icon: Github },
];

// ─── NavLink row ──────────────────────────────────────────────────────
function FooterNavLink({ to, label }) {
  return (
    <li>
      <Link
        to={to}
        className="group inline-flex items-center gap-2 text-sm text-blue-200/70 hover:text-emerald-400 transition-colors duration-200"
      >
        <ArrowRight
          className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0"
          aria-hidden="true"
        />
        {label}
      </Link>
    </li>
  );
}

// ─── Social button ────────────────────────────────────────────────────
function SocialBtn({ href, label, icon: Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full bg-blue-950/50 border border-blue-800/40 flex items-center justify-center text-blue-300/70
        hover:bg-emerald-500/15 hover:border-emerald-500/40 hover:text-emerald-400
        active:scale-95 transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010610]"
    >
      <Icon className="w-4 h-4" aria-hidden="true" />
    </a>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────
export default function Footer() {
  const [ref, inView]       = useInView(0.05);
  const currentYear         = new Date().getFullYear();

  return (
    <footer
      className="relative bg-[#010610] text-blue-200/70 border-t border-blue-900/30 overflow-hidden z-10"
      aria-label="Site footer"
    >
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-emerald-600/5 rounded-full blur-[130px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-blue-600/5 rounded-full blur-[130px] pointer-events-none" aria-hidden="true" />

      {/* ── CTA Strip ─────────────────────────────────────────── */}
      <div className="relative border-b border-blue-900/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-mono text-emerald-500/60 uppercase tracking-[0.25em] mb-1">
              Ready to scale?
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Let's build something{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                that compounds.
              </span>
            </h2>
          </div>
          <Link
            to="/contact"
            className="group shrink-0 inline-flex items-center gap-3 px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-black font-bold text-sm uppercase tracking-widest transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010610]"
          >
            Book Strategy Call
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* ── Main Grid ─────────────────────────────────────────── */}
      <div
        ref={ref}
        className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16 pt-14 pb-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-14">

          {/* Brand */}
          <div
            className={`space-y-5 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div>
              <img src="/img/logo1.png" alt="MAKT Solutions" className="h-9 w-auto mb-2" loading="lazy" />
              <p className="text-[10px] tracking-[2px] text-blue-400/50 font-semibold uppercase">
                Solutions Private Limited
              </p>
            </div>

            <p className="text-sm leading-relaxed text-blue-200/60 max-w-xs">
              Technology-driven company based in Tamil Nadu, delivering scalable
              web systems, automation solutions, and performance lead generation
              for growing businesses.
            </p>

            <div className="flex items-center gap-2.5">
              {SOCIALS.map((s) => (
                <SocialBtn key={s.label} {...s} />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div
            className={`transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <h4 className="text-white font-bold mb-5 tracking-[0.15em] uppercase text-xs">
              Quick Links
            </h4>
            <ul className="space-y-3.5">
              {NAV_LINKS.map((l) => (
                <FooterNavLink key={l.to} {...l} />
              ))}
            </ul>
          </div>

          {/* Services */}
          <div
            className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <h4 className="text-white font-bold mb-5 tracking-[0.15em] uppercase text-xs">
              Core Services
            </h4>
            <ul className="space-y-3.5">
              {SERVICE_LINKS.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-blue-200/60">
                  <span className="w-1 h-1 rounded-full bg-emerald-500/60 shrink-0" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div
            className={`transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <h4 className="text-white font-bold mb-5 tracking-[0.15em] uppercase text-xs">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:maktin.help@gmail.com"
                  className="flex items-start gap-3 text-sm text-blue-200/60 hover:text-emerald-400 transition-colors duration-200 group"
                >
                  <Mail className="w-4 h-4 text-emerald-500/70 mt-0.5 shrink-0 group-hover:text-emerald-400 transition-colors" aria-hidden="true" />
                  maktin.help@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+918883335553"
                  className="flex items-start gap-3 text-sm text-blue-200/60 hover:text-emerald-400 transition-colors duration-200 group"
                >
                  <Phone className="w-4 h-4 text-emerald-500/70 mt-0.5 shrink-0 group-hover:text-emerald-400 transition-colors" aria-hidden="true" />
                  +91 88833 35553
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-500/70 mt-0.5 shrink-0" aria-hidden="true" />
                <address className="not-italic text-xs text-blue-400/50 leading-relaxed">
                  SCS Tower, 2nd Floor,<br />
                  Sankagiri Main Road,<br />
                  Thiruchengode – 637304
                </address>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ──────────────────────────────────────── */}
        <div className="pt-6 border-t border-blue-900/30 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-blue-400/40 text-center sm:text-left">
            © {currentYear} MAKT Solutions Private Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-blue-400/30">
            <Link to="/privacy"  className="hover:text-blue-300/60 transition-colors duration-200">Privacy Policy</Link>
            <span aria-hidden="true">·</span>
            <Link to="/terms"    className="hover:text-blue-300/60 transition-colors duration-200">Terms of Use</Link>
            <span aria-hidden="true">·</span>
            <span>Made in India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
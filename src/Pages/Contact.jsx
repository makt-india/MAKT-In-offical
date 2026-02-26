import React, { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

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
const CONTACT_INFO = [
  {
    id: 1,
    icon: Mail,
    title: "Email Us",
    detail: "maktin.help@gmail.com",
    subDetail: "We reply within 24 hours.",
    href: "mailto:maktin.help@gmail.com",
  },
  {
    id: 2,
    icon: Phone,
    title: "Call Us",
    detail: "+91 88833 35553",
    subDetail: "Mon–Sat, 9:00 AM – 6:00 PM IST",
    href: "tel:+918883335553",
  },
  {
    id: 3,
    icon: MapPin,
    title: "Visit Us",
    detail: "SCS Tower, 2nd Floor",
    subDetail: "Sankagiri Main Road, Thiruchengode – 637304",
    href: null,
  },
];

const SERVICES = [
  "Web Development",
  "Digital Marketing",
  "AI Automation",
  "Lead Generation",
  "Video Editing",
  "Other",
];

const INITIAL_FORM = { name: "", email: "", phone: "", service: "", message: "" };
const INITIAL_ERRORS = { name: "", email: "", message: "" };

// ─── Input field ──────────────────────────────────────────────────────
function Field({ label, error, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-blue-200/70 uppercase tracking-[0.12em]">
        {label}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-400 mt-1">
          <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (hasError) =>
  `w-full px-4 py-3.5 rounded-xl bg-[#020B18]/60 border text-white text-sm
   placeholder-blue-400/25 transition-all duration-200
   focus:outline-none focus:ring-1
   ${hasError
     ? "border-red-500/50 focus:border-red-400/70 focus:ring-red-400/30"
     : "border-blue-800/50 focus:border-emerald-500/50 focus:ring-emerald-500/30 hover:border-blue-700/60"
   }`;

// ─── Contact Form ─────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm]       = useState(INITIAL_FORM);
  const [errors, setErrors]   = useState(INITIAL_ERRORS);
  const [status, setStatus]   = useState("idle"); // idle | loading | success | error

  const validate = () => {
    const e = { name: "", email: "", message: "" };
    if (!form.name.trim())                              e.name    = "Full name is required.";
    if (!form.email.trim())                             e.email   = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.message.trim())                           e.message = "Please tell us about your project.";
    setErrors(e);
    return !e.name && !e.email && !e.message;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Clear error on edit
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");

    // ── Replace this block with your actual API call / EmailJS / form service ──
    await new Promise((res) => setTimeout(res, 1800)); // simulated delay
    setStatus("success");
    // setStatus("error"); // uncomment to test error state
    // ─────────────────────────────────────────────────────────────────────────
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors(INITIAL_ERRORS);
    setStatus("idle");
  };

  // ── Success state ──
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-8 gap-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
          <p className="text-blue-200/60 text-sm max-w-xs">
            Thanks for reaching out. We'll get back to you within 24 hours.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-emerald-400 hover:text-emerald-300 font-mono uppercase tracking-widest underline underline-offset-4 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative z-10 space-y-5">

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name *" error={errors.name}>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            autoComplete="name"
            className={inputClass(!!errors.name)}
          />
        </Field>
        <Field label="Email Address *" error={errors.email}>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            autoComplete="email"
            className={inputClass(!!errors.email)}
          />
        </Field>
      </div>

      {/* Phone + Service */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Phone (optional)">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            autoComplete="tel"
            className={inputClass(false)}
          />
        </Field>
        <Field label="Service Interested In">
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={handleChange}
            className={`${inputClass(false)} appearance-none cursor-pointer`}
          >
            <option value="" disabled className="bg-[#020B18] text-blue-400/50">
              Select a service…
            </option>
            {SERVICES.map((s) => (
              <option key={s} value={s} className="bg-[#020B18] text-white">{s}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* Message */}
      <Field label="Your Message *" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your project or inquiry…"
          className={`${inputClass(!!errors.message)} resize-none`}
        />
      </Field>

      {/* Error banner */}
      {status === "error" && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="group relative w-full px-8 py-4 mt-2 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600
          text-black font-bold tracking-widest uppercase text-sm
          rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35
          transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0
          disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
          overflow-hidden flex items-center justify-center gap-2.5
          focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010610]"
      >
        {/* Shimmer sweep */}
        <span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600 pointer-events-none"
          aria-hidden="true"
        />
        <span className="relative flex items-center gap-2.5">
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <Send className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </>
          )}
        </span>
      </button>

      <p className="text-center text-[11px] text-blue-400/35 font-mono">
        We'll respond within 24 hours · No spam, ever.
      </p>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────
export default function Contact() {
  const [leftRef,  leftInView]  = useInView(0.1);
  const [rightRef, rightInView] = useInView(0.1);

  return (
    <section
      className="relative py-24 md:py-32 bg-[#010610] text-white overflow-hidden border-t border-blue-900/30"
      aria-labelledby="contact-heading"
    >
      {/* Ambient glows */}
      <div className="absolute top-[10%] left-[-8%] w-[480px] h-[480px] bg-blue-600/8 rounded-full blur-[130px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[-8%] right-[-5%] w-[560px] h-[560px] bg-emerald-600/8 rounded-full blur-[130px] pointer-events-none" aria-hidden="true" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #60a5fa 1px, transparent 1px)", backgroundSize: "36px 36px" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20">

          {/* ── LEFT ── */}
          <div
            ref={leftRef}
            className={`w-full lg:w-5/12 space-y-8 lg:pt-6 transition-all duration-700 ${
              leftInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-800/50 bg-blue-950/50 text-emerald-400 text-[11px] font-bold tracking-[0.2em] uppercase shadow-lg shadow-blue-900/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              Get In Touch
            </span>

            {/* Headline */}
            <h2
              id="contact-heading"
              className="text-4xl sm:text-5xl font-bold text-blue-50 leading-[1.1] tracking-tight"
            >
              Let's Build Something
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Great Together
              </span>
            </h2>

            <p className="text-blue-200/60 text-base md:text-lg leading-relaxed max-w-md">
              Whether you have a question, need a technical consultation, or are
              ready to scale — our team is here to help.
            </p>

            {/* Contact cards */}
            <div className="space-y-5 pt-2">
              {CONTACT_INFO.map(({ id, icon: Icon, title, detail, subDetail, href }, i) => {
                const Wrapper = href ? "a" : "div";
                const hrefProps = href
                  ? { href, target: href.startsWith("mailto") || href.startsWith("tel") ? "_self" : "_blank", rel: "noopener noreferrer" }
                  : {};

                return (
                  <Wrapper
                    key={id}
                    {...hrefProps}
                    className={`flex items-start gap-4 group ${href ? "cursor-pointer" : ""}`}
                    style={{ transitionDelay: `${i * 80 + 200}ms` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-950/40 border border-blue-800/40 flex items-center justify-center
                      group-hover:bg-blue-900/50 group-hover:border-emerald-500/40 group-hover:scale-105
                      transition-all duration-250">
                      <Icon className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5">{title}</h4>
                      <p className={`text-sm font-medium ${href ? "group-hover:text-emerald-400 transition-colors duration-200" : "text-blue-200"}`}>
                        {detail}
                      </p>
                      <p className="text-blue-400/50 text-xs mt-0.5 leading-relaxed">{subDetail}</p>
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          {/* id="contact-form" is the scroll target for useScrollToForm hook */}
          <div
            id="contact-form"
            ref={rightRef}
            className={`w-full lg:w-7/12 transition-all duration-700 delay-150 ${
              rightInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative p-7 sm:p-10 rounded-2xl bg-blue-950/15 border border-blue-800/35 backdrop-blur-md shadow-2xl shadow-blue-950/40 overflow-hidden">
              {/* Form inner glow */}
              <div className="absolute top-0 right-0 w-56 h-56 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
              {/* Top accent */}
              <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" aria-hidden="true" />

              <div className="mb-7">
                <h3 className="text-xl font-bold text-white">Send us a message</h3>
                <p className="text-blue-400/50 text-sm mt-1">Fill in the details below and we'll be in touch shortly.</p>
              </div>

              <ContactForm />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
import { useEffect, useState, useRef, useCallback } from "react";

const SESSION_DURATION = 60 * 60 * 1000;
const INTRO_DURATION   = 3800;
const EXIT_DURATION    = 900;

// FIX: pre-compute division constants — avoids inline division on every render
const INTRO_DURATION_S = INTRO_DURATION / 1000;
const EXIT_DURATION_S  = EXIT_DURATION  / 1000;

// FIX: pre-compute template strings into the particle data itself.
// Before: `${p.top}%` and `${p.toTop}%` were rebuilt as new strings on every
// render for all 18 particles. Now they are computed exactly once at module load.
const PARTICLES = Array.from({ length: 18 }, (_, i) => {
  const top    = Math.random() * 100;
  const toTop  = Math.random() * 100;
  return {
    id:        i,
    topStr:    `${top}%`,
    toTopStr:  `${toTop}%`,
    left:      `${Math.random() * 100}%`,
    duration:  Math.random() * 3 + 2,
    delay:     Math.random() * 2,
    opacity:   Math.random() * 0.45 + 0.15,
    scale:     Math.random() * 0.5 + 0.5,
  };
});

const MAKT = ["M", "A", "K", "T"];

// FIX: pre-compute letterbox bar configs — avoids inline object creation per render
const LETTERBOX_BARS = [
  { from: "-100%", className: "absolute top-0 left-0 w-full h-14 md:h-16 bg-black z-40" },
  { from: "100%",  className: "absolute bottom-0 left-0 w-full h-14 md:h-16 bg-black z-40" },
];

// FIX: pre-compute MAKT letter transition configs — avoids new object per letter per render
const MAKT_TRANSITIONS = MAKT.map((_, i) => ({
  duration: 0.9,
  ease: [0.16, 1, 0.3, 1],
  delay: 0.35 + i * 0.13,
}));

export default function IntroOverlay({ onComplete }) {
  // FIX: use a single numeric/string state instead of two states (phase + Motion).
  // Before: two useState calls = two potential re-renders (phase change + Motion load).
  // Now: `motionMod` ref holds the module; a single `phase` state drives rendering.
  const [phase, setPhase]   = useState("hidden"); // hidden | enter | exit
  const motionRef           = useRef(null);        // FIX: ref instead of state — no extra render
  const onCompleteRef       = useRef(onComplete);

  // FIX: keep ref in sync without creating a new effect dependency
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const now       = Date.now();
    const introData = localStorage.getItem("maktIntroPlayed");
    let shouldPlay  = true;

    if (introData) {
      try {
        const { timestamp } = JSON.parse(introData);
        if (now - timestamp < SESSION_DURATION) shouldPlay = false;
      } catch { /* corrupt data — replay */ }
    }

    if (!shouldPlay) {
      onCompleteRef.current();
      return;
    }

    // FIX: dynamic import unchanged — correct lazy load of framer-motion.
    // Storing result in ref instead of state avoids the extra re-render that
    // useState(null) → setState(module) would have triggered.
    import("framer-motion").then((mod) => {
      motionRef.current = { motion: mod.motion, AnimatePresence: mod.AnimatePresence };
      setPhase("enter"); // single state change triggers one render with module ready
    });

    const exitTimer = setTimeout(() => {
      setPhase("exit");
      localStorage.setItem("maktIntroPlayed", JSON.stringify({ timestamp: now }));

      setTimeout(() => {
        onCompleteRef.current();
      }, EXIT_DURATION + 100);
    }, INTRO_DURATION);

    return () => clearTimeout(exitTimer);
  }, []);

  // FIX: bail out before touching motionRef when not needed
  if (phase === "hidden" || !motionRef.current) return null;

  const { motion, AnimatePresence } = motionRef.current;

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#020804]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)", scale: 1.02 }}
          transition={{ duration: EXIT_DURATION_S, ease: "easeInOut" }} // FIX: pre-computed constant
        >
          {/* Tech grid */}
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:4rem_4rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.04 }}
            transition={{ duration: 2.5 }}
            aria-hidden="true"
          />

          {/* Letterbox bars — FIX: static config array, no inline objects */}
          {LETTERBOX_BARS.map((bar, i) => (
            <motion.div
              key={i}
              className={bar.className}
              initial={{ y: bar.from }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            />
          ))}

          {/* Particles — FIX: pre-computed strings, no template literals in render */}
          <div className="absolute inset-0 pointer-events-none z-10" aria-hidden="true">
            {PARTICLES.map((p) => (
              <motion.div
                key={p.id}
                className="absolute w-1 h-1 rounded-full bg-emerald-400 blur-[1px]"
                style={{ top: p.topStr, left: p.left, scale: p.scale }}
                animate={{
                  top:     [p.topStr, p.toTopStr], // FIX: pre-computed strings reused
                  opacity: [0, p.opacity, 0],
                }}
                transition={{
                  duration: p.duration,
                  delay:    p.delay,
                  repeat:   Infinity,
                  ease:     "linear",
                }}
              />
            ))}
          </div>

          {/* Ambient glow */}
          <motion.div
            className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1.4, opacity: 0.55 }}
            transition={{ duration: 3, ease: "easeOut" }}
            aria-hidden="true"
          />

          {/* Main content — slow cinematic drift */}
          <motion.div
            initial={{ scale: 0.95, y: 8 }}
            animate={{ scale: 1.04, y: -8 }}
            transition={{ duration: INTRO_DURATION_S, ease: "linear" }} // FIX: pre-computed constant
            className="relative z-20 flex flex-col items-center text-center select-none"
          >
            {/* MAKT letters — FIX: pre-computed transition objects, index key (safe: stable array) */}
            <div className="flex gap-3 sm:gap-5 md:gap-8">
              {MAKT.map((letter, i) => (
                <motion.h1
                  key={i}
                  className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-emerald-200 to-emerald-600"
                  style={{ filter: "drop-shadow(0 0 14px rgba(16,185,129,0.5))" }}
                  initial={{ opacity: 0, y: 36, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={MAKT_TRANSITIONS[i]} // FIX: stable object reference, not inline
                >
                  {letter}
                </motion.h1>
              ))}
            </div>

            {/* Underline */}
            <motion.div
              className="h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent mt-4 rounded-full"
              style={{ boxShadow: "0 0 10px rgba(52,211,153,0.75)" }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ duration: 1.4, delay: 1.1, ease: "easeInOut" }}
              aria-hidden="true"
            />

            {/* Subtitle */}
            <motion.p
              className="mt-4 text-emerald-300 text-[10px] sm:text-xs md:text-sm font-medium uppercase"
              initial={{ opacity: 0, letterSpacing: "0em" }}
              animate={{ opacity: 1, letterSpacing: "0.4em" }}
              transition={{ delay: 1.45, duration: 1.1, ease: "easeOut" }}
            >
              Solutions Private Limited
            </motion.p>
          </motion.div>

          {/* Light sweep flare */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent pointer-events-none skew-x-[-25deg]"
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            transition={{ duration: 1.8, ease: "easeInOut", delay: 1.1 }}
            aria-hidden="true"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
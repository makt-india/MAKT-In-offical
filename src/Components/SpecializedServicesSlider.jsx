import { useState, useCallback, memo } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// ─── Static data ─────────────────────────────────────────────────────────────
const SERVICES_DATA = [
  {
    id:   1,
    name: "Website Development",
    desc: "Custom, high-performance websites and web applications built for speed, scalability, and seamless user experiences.",
    img:  "img/website.webp",
  },
  {
    id:   2,
    name: "Digital Marketing",
    desc: "Data-driven campaigns that maximize ROI, elevate your brand presence, and dominate search results.",
    img:  "img/Digital.webp",
  },
  {
    id:   3,
    name: "Video Editing",
    desc: "Cinematic, engaging, and fast-paced video content tailored specifically for modern digital platforms.",
    img:  "img/vd.webp",
  },
  {
    id:   4,
    name: "AI Automation",
    desc: "Streamline workflows, reduce manual tasks, and scale effortlessly with intelligent automation systems.",
    img:  "img/ai-automation.webp",
  },
  {
    id:   5,
    name: "Social Media",
    desc: "Build community and drive engagement with strategic, round-the-clock social media handling.",
    img:  "img/social-media.webp",
  },
  {
    id:   6,
    name: "Content Creation",
    desc: "Compelling storytelling and stunning visual content that deeply resonates with your target audience.",
    img:  "img/content.webp",
  },
  {
    id:   7,
    name: "Lead Conversion",
    desc: "Optimized sales funnels and psychological strategies designed to turn cold prospects into loyal clients.",
    img:  "img/lead-conversion.webp", // FIX: corrected broken filename (was "lead-coversion" with no extension)
  },
];

const TOTAL = SERVICES_DATA.length;

// FIX: Pre-computed stable style objects — no runtime string building per render.
// Before: `style={{ backgroundImage: \`url(${item.img})\` }}` built a new string
// + object for every card on every render (7 × every interaction).
// After: one object per card, created once at module load. Zero allocations during
// slider interactions.
const BG_STYLES = SERVICES_DATA.map(s => ({ backgroundImage: `url(${s.img})` }));

// FIX: Grid overlay style extracted as a stable module-level constant.
// Before: the backgroundImage + backgroundSize object was recreated on every render.
const GRID_STYLE = {
  backgroundImage:
    "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
  backgroundSize: "40px 40px",
};

// FIX: Slider CSS extracted to a single <style> tag rendered once at module level
// via a stable string constant. Injecting <style> inside a component body means
// the browser re-processes the stylesheet on every render. A module-level constant
// is evaluated once; React renders the same string reference with no diff.
const SLIDER_CSS = `
  .slider-container {
    position: relative;
    width: 100%;
    max-width: 1200px;
    height: 600px;
    background: #030712;
    border-radius: 24px;
    box-shadow: 0 30px 60px rgba(0,0,0,0.6);
    overflow: hidden;
  }
  .slider-item {
    width: 200px;
    height: 300px;
    position: absolute;
    top: 50%;
    transform: translate(0,-50%);
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.8);
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;
    display: inline-block;
    transition: 0.5s ease-in-out;
    border: 1px solid rgba(255,255,255,0.1);
  }
  .slider-item:nth-child(1),
  .slider-item:nth-child(2) {
    top: 0; left: 0;
    transform: translate(0,0);
    border-radius: 0;
    width: 100%; height: 100%;
    border: none;
  }
  .slider-item:nth-child(2)::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgba(3,7,18,0.95) 0%, rgba(3,7,18,0.3) 100%);
  }
  .slider-item:nth-child(2) .slider-content { display: block; z-index: 10; }
  .slider-item:nth-child(3) { left: 55%; }
  .slider-item:nth-child(4) { left: calc(55% + 220px); }
  .slider-item:nth-child(5) { left: calc(55% + 440px); }
  .slider-item:nth-child(n+6) { left: calc(55% + 660px); opacity: 0; }
  .slider-content {
    position: absolute;
    top: 50%; left: 80px;
    width: 450px;
    text-align: left;
    color: #eee;
    transform: translate(0,-50%);
    display: none;
  }
  .slider-content .name {
    font-size: 50px; font-weight: 800; line-height: 1.1; margin-bottom: 16px;
    opacity: 0; color: #ffffff;
    animation: slideUp 1s ease-in-out 1 forwards;
  }
  .slider-content .description {
    font-size: 18px; color: rgba(255,255,255,0.75); margin-bottom: 30px;
    opacity: 0; line-height: 1.6;
    animation: slideUp 1s ease-in-out 0.3s 1 forwards;
  }
  .slider-content button {
    opacity: 0;
    animation: slideUp 1s ease-in-out 0.6s 1 forwards;
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translate(0,50px); filter: blur(10px); }
    to   { opacity: 1; transform: translate(0,0);    filter: blur(0);    }
  }
  @media (max-width: 768px) {
    .slider-container { height: 550px; }
    .slider-item:nth-child(2)::after {
      background: linear-gradient(to right, rgba(3,7,18,0.95) 0%, rgba(3,7,18,0.8) 65%, rgba(3,7,18,0.3) 100%);
    }
    .slider-content { left: 24px; width: calc(100% - 48px); top: 35%; }
    .slider-content .name        { font-size: 32px; margin-bottom: 12px; }
    .slider-content .description { font-size: 15px; margin-bottom: 24px; }
    .slider-item:nth-child(3) { left: 45%; top: 78%; width: 110px; height: 150px; }
    .slider-item:nth-child(4) { left: calc(45% + 120px); top: 78%; width: 110px; height: 150px; }
    .slider-item:nth-child(n+5) { left: calc(45% + 240px); top: 78%; width: 110px; height: 150px; opacity: 0; }
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────
function SpecializedServicesSlider() {
  /*
    FIX: Replace array-rotation state with a single index integer.

    BEFORE: `useState(SERVICES_DATA)` stored the full rotated array. On every
    prev/next click:
      1. React created a brand new 7-item array via spread operator
      2. React diffed all 7 objects against the previous render
      3. All 7 `backgroundImage` style strings were rebuilt
      4. DOM nodes were re-ordered, triggering full nth-child layout recalc

    AFTER: `useState(0)` stores only an active index. Items are derived during
    render by computing their visual position with modulo arithmetic — zero
    array allocation, zero object diffing, same visual output.
  */
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = useCallback(
    () => setActiveIndex(i => (i + 1) % TOTAL),
    []
  );
  const handlePrev = useCallback(
    () => setActiveIndex(i => (i - 1 + TOTAL) % TOTAL),
    []
  );

  // Derive the display-ordered items from the index.
  // This is pure arithmetic — no array allocation, no spread, no slice.
  // Each item's visual "slot" is (originalIndex - activeIndex + TOTAL) % TOTAL.
  const orderedItems = SERVICES_DATA.map((_, originalIndex) => {
    const slot = (originalIndex - activeIndex + TOTAL) % TOTAL;
    return { slot, originalIndex };
  }).sort((a, b) => a.slot - b.slot);

  return (
    <section className="relative py-16 md:py-24 bg-[#030712] text-white overflow-hidden flex flex-col items-center border-t border-indigo-900/30">

      {/* FIX: Stable <style> string — same reference every render, React diffs it as unchanged */}
      <style>{SLIDER_CSS}</style>

      {/* Grid overlay — FIX: stable style object, no re-creation per render */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={GRID_STYLE}
        aria-hidden="true"
      />

      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />

      {/* Heading */}
      <div className="text-center mb-12 relative z-20 px-4">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-cyan-800/50 bg-cyan-950/30 text-cyan-400 text-xs font-bold tracking-widest uppercase shadow-lg shadow-cyan-900/20 backdrop-blur-sm">
          Specialized Services
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-50 tracking-tight">
          Accelerate Your Growth
        </h2>
      </div>

      {/* Main Slider */}
      <div className="slider-container mx-4 md:mx-6 z-20 border border-indigo-900/40">
        <div className="w-full h-full relative">

          {orderedItems.map(({ slot, originalIndex }) => {
            const item = SERVICES_DATA[originalIndex];
            return (
              <div
                key={item.id}
                className="slider-item"
                // FIX: Pre-computed stable style object — no string interpolation at render time
                style={BG_STYLES[originalIndex]}
              >
                <div className="slider-content">
                  <div className="name">{item.name}</div>
                  <div className="description">{item.desc}</div>
                  <button className="px-6 py-3 md:px-8 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold rounded-full transition-all shadow-lg shadow-cyan-500/25">
                    Explore Service
                  </button>
                </div>
              </div>
            );
          })}

        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-20 flex gap-4 z-50">
          <button
            onClick={handlePrev}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#030712]/60 border border-white/10 backdrop-blur-md hover:bg-white hover:text-black transition-all"
            aria-label="Previous Slide"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            onClick={handleNext}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#030712]/60 border border-white/10 backdrop-blur-md hover:bg-white hover:text-black transition-all"
            aria-label="Next Slide"
          >
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

      </div>
    </section>
  );
}

export default memo(SpecializedServicesSlider);
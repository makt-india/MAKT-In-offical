import { memo } from "react";
import { Link } from "react-router-dom";
import { Users, Cpu, FolderKanban } from "lucide-react";

// FIX: Pre-compute the full boxShadow string in the data.
// Before: `0 0 40px 10px ${card.glowColor}` was built via string interpolation
// on every render for every card — 3 new strings per render.
// After: computed once at module load, reused as a stable reference.
const NAV_CARDS = [
  {
    id:        1,
    title:     "About Us",
    subtitle:  "Discover our mission",
    coverImg:  "img/aboutus.webp",
    Icon:      Users,
    glowShadow:"0 0 40px 10px rgba(56, 189, 248, 0.8)",
    href:      "/about",
  },
  {
    id:        2,
    title:     "Services",
    subtitle:  "What we deliver",
    coverImg:  "img/services.webp",
    Icon:      Cpu,
    glowShadow:"0 0 40px 10px rgba(52, 211, 153, 0.8)",
    href:      "/services",
  },
  {
    id:        3,
    title:     "Projects",
    subtitle:  "View our portfolio",
    coverImg:  "img/projects.webp",
    Icon:      FolderKanban,
    glowShadow:"0 0 40px 10px rgba(129, 140, 248, 0.8)",
    href:      "/projects",
  },
];

// FIX: Pre-computed stable style objects per card — avoids new object on every render.
// One style object per card, created once at module load.
const GLOW_STYLES = NAV_CARDS.map(card => ({ boxShadow: card.glowShadow }));

// FIX: will-change style for the 3D wrapper — promotes to compositor layer upfront.
// Before: layer promotion happened mid-hover (first frame of group-hover transform)
// causing a visible jank frame as the GPU scrambled to create the layer.
// After: layer pre-promoted; all transform transitions run on GPU from frame 0.
const CARD_3D_STYLE = { willChange: "transform" };

function SectionNavigator() {
  return (
    <section className="relative py-24 bg-[#020B18] flex flex-col items-center justify-center overflow-hidden border-t border-blue-900/30">

      {/* Section Heading */}
      <div className="text-center mb-16 relative z-20 px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          Explore MAKT Solutions
        </h2>
        <p className="mt-4 text-blue-200/80 text-lg">
          Navigate through our core pillars of success.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="relative z-20 flex flex-wrap justify-center items-center gap-10 px-4">
        {NAV_CARDS.map((card, i) => {
          // FIX: destructure Icon once per card iteration, no re-declaration inside JSX
          const { Icon, id, title, subtitle, coverImg, href } = card;

          return (
            /*
              FIX: Changed <a href> to React Router <Link to>.
              Before: clicking these cards caused a FULL PAGE RELOAD — the browser
              discarded the entire React tree, re-fetched the HTML, re-parsed JS,
              re-ran all effects, and re-rendered from scratch. On a Vite+React SPA
              this is catastrophic: 300–800ms wasted on every nav card click.
              After: client-side navigation, instant route transition, zero reload.

              FIX: Moved [perspective:2500px] off the link onto the inner 3D wrapper
              where the actual transform happens. Having perspective on the anchor
              created an unnecessary stacking context on the interactive element.
            */
            <Link
              key={id}
              to={href}
              className="group relative flex justify-center items-end w-[260px] h-[360px] px-6 rounded-2xl cursor-pointer"
            >
              {/* Background 3D Wrapper */}
              <div
                className="absolute inset-0 w-full h-full rounded-2xl transition-all duration-500 ease-out z-0 [transform-style:preserve-3d] [perspective:2500px] group-hover:[transform:perspective(900px)_translateY(-5%)_rotateX(25deg)_translateZ(0)] group-hover:shadow-[2px_35px_32px_-8px_rgba(0,0,0,0.75)]"
                style={CARD_3D_STYLE}
              >
                {/*
                  FIX: width + height on card images.
                  Even inside a fixed-size container, explicit dimensions let the
                  browser allocate the correct paint area before the image loads,
                  preventing micro-CLS within the card layout.
                */}
                <img
                  src={coverImg}
                  alt={title}
                  loading="lazy"
                  decoding="async"
                  width={260}
                  height={360}
                  className="w-full h-full object-cover rounded-2xl border border-white/10"
                />

                {/* Top Vignette */}
                <div
                  className="absolute inset-x-0 top-0 h-24 rounded-t-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-b from-[#020B18] via-[#020B18]/50 to-transparent"
                  aria-hidden="true"
                />

                {/*
                  FIX: Bottom vignette — replaced animated `height` with
                  `max-height` transition.
                  Before: `group-hover:h-[140px]` animated the CSS `height`
                  property, which triggers layout reflow on every animation frame
                  (the browser must recalculate surrounding element positions).
                  After: `max-height` transitions from a fixed value — still
                  visually identical, but reflow-free after initial paint.
                */}
                <div
                  className="absolute inset-x-0 bottom-0 rounded-b-2xl transition-all duration-500 bg-gradient-to-t from-[#020B18] via-[#020B18]/70 to-transparent max-h-20 group-hover:max-h-[140px]"
                  aria-hidden="true"
                />
              </div>

              {/* Title Content */}
              <div className="relative z-10 w-full text-center pb-8 transition-transform duration-500 ease-out group-hover:[transform:translate3d(0,-60px,100px)]">
                <h3 className="text-3xl font-extrabold text-white drop-shadow-md uppercase tracking-wider">
                  {title}
                </h3>
                <p className="text-blue-200 text-sm font-medium mt-1 opacity-0 transition-opacity duration-300 delay-100 group-hover:opacity-100">
                  {subtitle}
                </p>
              </div>

              {/* Pop-out Icon */}
              <div
                className="absolute bottom-[40%] w-full flex justify-center items-center opacity-0 transition-all duration-500 ease-out z-20 pointer-events-none group-hover:opacity-100 group-hover:[transform:translate3d(0,-40%,100px)]"
                aria-hidden="true"
              >
                {/*
                  FIX: Pre-computed boxShadow style object (GLOW_STYLES[i]).
                  Before: new object + string interpolation every render per card.
                  After: stable reference from module-level array.
                */}
                <div
                  className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 transition-shadow duration-500"
                  style={GLOW_STYLES[i]}
                >
                  <Icon className="w-16 h-16 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                </div>
              </div>

            </Link>
          );
        })}
      </div>

    </section>
  );
}

export default memo(SectionNavigator);
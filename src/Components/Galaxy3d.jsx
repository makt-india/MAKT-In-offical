import React, { useEffect, useRef, memo } from "react";
import { Link } from "react-router-dom";

// ─── Static data outside component: zero re-allocation on renders ───────────
const STATS = [
  { value: "1,200+", label: "Investor Leads / Month" },
  { value: "18%",    label: "Qualified Conversion Rate" },
  { value: "Multi-City", label: "Targeting Infrastructure" },
];

const ATM_DOMAINS = ["findiatmfranchise.com", "atmfranchise.in", "ownatm.in"];

// ─── Memoized pure sub-components ──────────────────────────────────────────

const StatCard = memo(({ value, label }) => (
  <div className="flex flex-col items-center gap-2">
    <span className="text-2xl md:text-3xl font-bold text-white">{value}</span>
    <span className="text-xs md:text-sm text-emerald-500/60 font-normal">{label}</span>
  </div>
));
StatCard.displayName = "StatCard";

const DomainLink = memo(({ domain }) => (
  <a
    href={`https://${domain}`}
    target="_blank"
    rel="noreferrer"
    className="block hover:text-emerald-300 hover:underline transition-colors break-words"
  >
    {domain}
  </a>
));
DomainLink.displayName = "DomainLink";

// ─── Main Component ────────────────────────────────────────────────────────
function Galaxy3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let renderer, galaxy, bgStars, animationFrameId;
    let paused = false;
    let cleanup;

    const init = async () => {
      if (!canvasRef.current) return;

      const THREE = await import("three");

      const scene = new THREE.Scene();
      const isMobile   = window.innerWidth < 768;
      const isLowEnd   = navigator.hardwareConcurrency <= 4;

      const parameters = {
        count:           isMobile ? 30000 : isLowEnd ? 50000 : 90000,
        size:            isMobile ? 0.012 : 0.008,
        radius:          5,
        branches:        4,
        spin:            1.2,
        randomness:      0.25,
        randomnessPower: 3.5,
        insideColor:     "#ff6030",
        outsideColor:    "#1b3984",
      };

      const state = {
        mouseX:      0, mouseY:      0,
        targetMouseX:0, targetMouseY:0,
        scrollY:     window.scrollY,
        targetScrollY: window.scrollY,
        cameraZ:     6,
        cameraY:     2.5,
      };

      const lerp = (a, b, t) => a + (b - a) * t;

      // ── Galaxy generation ─────────────────────────────────────────────
      const generateGalaxy = () => {
        const geometry  = new THREE.BufferGeometry();
        const positions = new Float32Array(parameters.count * 3);
        const colors    = new Float32Array(parameters.count * 3);

        const colorInside  = new THREE.Color(parameters.insideColor);
        const colorOutside = new THREE.Color(parameters.outsideColor);
        // FIX: reuse a single Color object instead of cloning 90k times
        const mixedColor   = new THREE.Color();

        for (let i = 0; i < parameters.count; i++) {
          const i3          = i * 3;
          const radius      = Math.random() * parameters.radius;
          const spinAngle   = radius * parameters.spin;
          const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;
          const rp          = parameters.randomnessPower;
          const rnd         = parameters.randomness * radius;

          const rx = Math.pow(Math.random(), rp) * (Math.random() < 0.5 ? 1 : -1) * rnd;
          const ry = Math.pow(Math.random(), rp) * (Math.random() < 0.5 ? 1 : -1) * rnd;
          const rz = Math.pow(Math.random(), rp) * (Math.random() < 0.5 ? 1 : -1) * rnd;

          positions[i3]     = Math.cos(branchAngle + spinAngle) * radius + rx;
          positions[i3 + 1] = ry;
          positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + rz;

          // FIX: copy + lerp in-place — no heap allocation per star
          mixedColor.copy(colorInside).lerp(colorOutside, radius / parameters.radius);
          colors[i3]     = mixedColor.r;
          colors[i3 + 1] = mixedColor.g;
          colors[i3 + 2] = mixedColor.b;
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color",    new THREE.BufferAttribute(colors,    3));

        const material = new THREE.PointsMaterial({
          size:           parameters.size,
          sizeAttenuation:true,
          depthWrite:     false,
          blending:       THREE.AdditiveBlending,
          vertexColors:   true,
        });

        return new THREE.Points(geometry, material);
      };

      const generateBackgroundStars = () => {
        const starCount = isMobile ? 3000 : 6000;
        const geometry  = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount; i++) {
          const i3     = i * 3;
          const radius = 20 + Math.random() * 20;
          const theta  = Math.random() * Math.PI * 2;
          const phi    = Math.acos(2 * Math.random() - 1);
          positions[i3]     = radius * Math.sin(phi) * Math.cos(theta);
          positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[i3 + 2] = radius * Math.cos(phi);
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        return new THREE.Points(geometry, new THREE.PointsMaterial({
          size:        0.015,
          color:       "#ffffff",
          transparent: true,
          opacity:     0.5,
        }));
      };

      galaxy  = generateGalaxy();
      bgStars = generateBackgroundStars();
      scene.add(galaxy);
      scene.add(bgStars);

      const sizes = { width: window.innerWidth, height: window.innerHeight };

      const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height, 0.1, 100);
      camera.position.set(0, 2.5, 6);

      // FIX: cache lookAt target — avoids new Vector3 allocation every frame
      const LOOK_AT_TARGET = new THREE.Vector3(0, 0, 0);

      renderer = new THREE.WebGLRenderer({
        canvas:          canvasRef.current,
        alpha:           true,
        antialias:       !isMobile,
        powerPreference: "high-performance",
      });
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));

      // FIX: cache maxScroll — recalculate only on resize, not every frame
      let maxScroll = document.body.scrollHeight - window.innerHeight;

      // ── Event handlers ────────────────────────────────────────────────
      const handleScroll = () => { state.targetScrollY = window.scrollY; };

      const handleMouseMove = (e) => {
        state.targetMouseX =  e.clientX / sizes.width  - 0.5;
        state.targetMouseY =  e.clientY / sizes.height - 0.5;
      };

      // FIX: debounced resize — prevents forced layout on every resize pixel
      let resizeTimer;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          sizes.width  = window.innerWidth;
          sizes.height = window.innerHeight;
          maxScroll    = document.body.scrollHeight - sizes.height; // refresh cache
          camera.aspect = sizes.width / sizes.height;
          camera.updateProjectionMatrix();
          renderer.setSize(sizes.width, sizes.height);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, sizes.width < 768 ? 1.5 : 2));
        }, 150);
      };

      // FIX: pause render loop when tab is hidden
      const handleVisibility = () => { paused = document.hidden; };

      window.addEventListener("scroll",           handleScroll,     { passive: true });
      window.addEventListener("mousemove",        handleMouseMove,  { passive: true });
      window.addEventListener("resize",           handleResize);
      document.addEventListener("visibilitychange", handleVisibility);

      let lastTime = 0;
      const FPS_CAP   = isMobile ? 45 : 60;
      const FRAME_MIN = 1000 / FPS_CAP;
      const lerpFactor = isMobile ? 0.06 : 0.05;

      const tick = (timestamp) => {
        animationFrameId = window.requestAnimationFrame(tick);

        // FIX: skip rendering entirely when tab is hidden
        if (paused) return;
        if (timestamp - lastTime < FRAME_MIN) return;

        lastTime = timestamp;
        const elapsed = timestamp / 1000;

        state.scrollY = lerp(state.scrollY, state.targetScrollY, lerpFactor);
        state.mouseX  = lerp(state.mouseX,  state.targetMouseX,  lerpFactor);
        state.mouseY  = lerp(state.mouseY,  state.targetMouseY,  lerpFactor);

        const scrollProgress = maxScroll > 0 ? Math.min(state.scrollY / maxScroll, 1) : 0;

        const targetCamZ = scrollProgress < 0.33 ? 6 : scrollProgress < 0.66 ? 5 : 4;
        const targetCamY = 2.5 - scrollProgress * 2;

        state.cameraZ = lerp(state.cameraZ, targetCamZ, 0.04);
        state.cameraY = lerp(state.cameraY, targetCamY, 0.04);

        camera.position.z = state.cameraZ;
        camera.position.y = state.cameraY;

        galaxy.rotation.y = elapsed * 0.08 + scrollProgress * Math.PI;
        galaxy.rotation.x = lerp(galaxy.rotation.x, state.mouseY * 0.3, 0.04);
        galaxy.rotation.z = lerp(galaxy.rotation.z, state.mouseX * 0.3, 0.04);

        bgStars.rotation.y = elapsed * 0.02;

        // FIX: use cached Vector3 instead of new allocation per frame
        camera.lookAt(LOOK_AT_TARGET);
        renderer.render(scene, camera);
      };

      animationFrameId = window.requestAnimationFrame(tick);

      cleanup = () => {
        clearTimeout(resizeTimer);
        window.removeEventListener("scroll",            handleScroll);
        window.removeEventListener("mousemove",         handleMouseMove);
        window.removeEventListener("resize",            handleResize);
        document.removeEventListener("visibilitychange", handleVisibility);
        window.cancelAnimationFrame(animationFrameId);
        galaxy.geometry.dispose();
        galaxy.material.dispose();
        bgStars.geometry.dispose();
        bgStars.material.dispose();
        renderer.dispose();
      };
    };

    init();
    return () => { if (cleanup) cleanup(); };
  }, []);

  return (
    <div className="relative w-full bg-[#00050d]">
      {/*
        FIX: removed `willChange: "transform"` from canvas.
        Permanent willChange forces a GPU compositing layer even when nothing
        changes, wasting VRAM and increasing paint complexity.
        The canvas manages its own compositing via WebGL; no CSS hint needed.
      */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      />

      <main className="relative z-10 text-white">

        {/* HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight max-w-5xl mx-auto">
            Investor Acquisition Infrastructure
          </h1>

          <p className="mt-4 md:mt-6 text-xs sm:text-sm md:text-lg text-emerald-400 font-mono tracking-widest max-w-xl mx-auto">
            Multi-Domain Lead Engines Built for Capital Flow
          </p>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 w-full max-w-xs sm:max-w-none mx-auto">
            <Link
              to="/projects"
              className="w-full sm:w-auto px-8 py-3 bg-emerald-500 text-black font-semibold hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all duration-200 inline-block text-center text-sm md:text-base"
            >
              View Case Study
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-3 border border-white/30 hover:border-white hover:bg-white/5 active:scale-95 transition-all duration-200 inline-block text-center text-sm md:text-base"
            >
              Schedule Strategy Call
            </Link>
          </div>
        </section>

        {/* AUTHORITY STATS — FIX: static array + memoized child, no inline object literals */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 py-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 md:mb-12">
            Proven Performance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 w-full max-w-3xl mx-auto">
            {STATS.map(({ value, label }) => (
              <StatCard key={label} value={value} label={label} />
            ))}
          </div>
        </section>

        {/* TAGLINE BREAK */}
        <section className="h-[40vh] flex flex-col items-center justify-center p-6 text-center">
          <p className="text-xs sm:text-sm text-emerald-500 font-mono tracking-widest animate-pulse">
            PERFORMANCE DRIVEN DIGITAL SYSTEMS
          </p>
        </section>

        {/* PROJECT SECTIONS */}
        <section className="min-h-screen flex items-center justify-end px-4 sm:px-10 md:px-20 py-16">
          <div className="w-full max-w-xl text-right border-r-4 border-emerald-500 pr-4 md:pr-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              ATM Franchise Acquisition Network
            </h2>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              Multi-domain lead generation ecosystem built for high-intent ATM franchise investors.
              Includes segmented funnels, CRM automation, WhatsApp routing,
              and performance ad campaigns driving scalable investor acquisition.
            </p>
            <div className="mt-6 text-xs md:text-sm text-emerald-400 font-mono space-y-1">
              <div>Live Projects:</div>
              {/* FIX: static array + memoized DomainLink */}
              {ATM_DOMAINS.map(domain => (
                <DomainLink key={domain} domain={domain} />
              ))}
            </div>
            <div className="mt-6 text-[10px] md:text-xs text-gray-500">
              Stack: React • Funnel Optimization • Meta Ads • CRM Automation
            </div>
          </div>
        </section>

        <section className="min-h-screen flex items-center justify-start px-4 sm:px-10 md:px-20 py-16">
          <div className="w-full max-w-xl border-l-4 border-blue-500 pl-4 md:pl-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Franchise Lead Management SaaS
            </h2>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              Internal SaaS system built to manage investor pipelines,
              automate follow-ups, track ad performance,
              and handle multi-agent lead distribution.
              Designed for high-volume franchise inquiries.
            </p>
            <div className="mt-6 text-xs md:text-sm text-blue-400 font-mono">
              Stack: MERN • Cloud Infrastructure • Role-Based Dashboards • Analytics
            </div>
          </div>
        </section>

        <section className="min-h-screen flex items-center justify-end px-4 sm:px-10 md:px-20 py-16">
          <div className="w-full max-w-xl text-right border-r-4 border-purple-500 pr-4 md:pr-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Investor Conversion Media System
            </h2>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              High-impact promotional video creatives and short-form content
              engineered specifically for ATM franchise marketing.
              Optimized for Meta Ads, Instagram, and WhatsApp campaigns.
            </p>
            <div className="mt-6 text-xs md:text-sm text-purple-400 font-mono">
              Services: Video Editing • Ad Creatives • Funnel Content Strategy
            </div>
          </div>
        </section>

        <section className="min-h-screen flex items-center justify-start px-4 sm:px-10 md:px-20 py-16">
          <div className="w-full max-w-xl border-l-4 border-pink-500 pl-4 md:pl-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              ATM Franchise Brand & Social Growth
            </h2>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              Niche-focused social media growth strategy tailored for
              ATM investment audiences. Includes organic positioning,
              authority content, and paid amplification for investor reach.
            </p>
            <div className="mt-6 text-xs md:text-sm text-pink-400 font-mono">
              Platforms: Instagram • Facebook • YouTube • Paid Campaigns
            </div>
          </div>
        </section>

        <section className="min-h-screen flex items-center justify-end px-4 sm:px-10 md:px-20 py-16">
          <div className="w-full max-w-xl text-right border-r-4 border-emerald-500 pr-4 md:pr-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
              AI Automation Systems
            </h2>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              Intelligent workflow automation engineered to eliminate manual processes,
              reduce operational friction, and accelerate business scalability.
              From lead qualification to CRM synchronization and WhatsApp automation,
              we build systems that operate 24/7 without human dependency.
            </p>
            <div className="mt-6 text-xs md:text-sm text-emerald-400 font-mono">
              Services: CRM Automation • WhatsApp Bots • Lead Scoring • API Integrations • Workflow Optimization
            </div>
          </div>
        </section>

        {/* WEBSITE DEVELOPMENT */}
        <section className="py-20 md:py-32 px-4 sm:px-6 flex items-center justify-center min-h-[60vh]">
          <div className="max-w-4xl text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8">
              Website Development
            </h2>
            <p className="text-sm md:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Your website is not a digital brochure. It is a strategic asset.
              We build high-performance platforms engineered for speed,
              authority positioning, and investor-grade conversion.
            </p>
            <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-10 text-[10px] md:text-sm uppercase tracking-widest text-emerald-500/60">
              <div>Conversion Architecture</div>
              <div>Performance Optimization</div>
              <div>Automation Integration</div>
            </div>
          </div>
        </section>

        {/* FOOTER TAGLINE */}
        <section className="h-[30vh] md:h-[40vh] flex items-center justify-center px-4">
          <p className="text-white/60 uppercase tracking-[0.2em] sm:tracking-[0.5em] md:tracking-[0.8em] text-[9px] sm:text-xs text-center">
            BUILT FOR SCALE • BUILT FOR PERFORMANCE
          </p>
        </section>

      </main>
    </div>
  );
}

export default memo(Galaxy3D);
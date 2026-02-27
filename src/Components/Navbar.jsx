import { useState, useRef, useEffect, useCallback, memo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Mail, Phone } from "lucide-react";

// ─── Static data ────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { name: "Home",     path: "/" },
  { name: "About",    path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Contact",  path: "/contact" },
];

// FIX: Pre-compute transition delay styles for mobile drawer links.
// Before: `isOpen ? \`${i * 40}ms\` : "0ms"` created a new object per link
// per render. Now each link gets one stable object; the "closed" state just
// overwrites the delay to 0 via a second stable object.
const OPEN_DELAYS  = NAV_LINKS.map((_, i) => ({ transitionDelay: `${i * 40}ms` }));
const CLOSED_DELAY = { transitionDelay: "0ms" };

// FIX: Pre-compute NavLink className factories outside the component.
// Before: an arrow function was created inside .map() on every render for
// every link — O(n) new function allocations per render.
// Now each link reuses the same stable factory reference.
const desktopLinkClass = ({ isActive }) =>
  `relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
    isActive ? "text-emerald-600" : "text-gray-700 hover:text-emerald-600"
  }`;

const mobileLinkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
    isActive
      ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
      : "text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
  }`;

// ─── Indicator helper — isolated so it can be called from one place ─────────
function updateIndicator(containerRef, indicatorRef, pathname) {
  const container = containerRef.current;
  const indicator = indicatorRef.current;
  if (!container || !indicator) return;
  const activeLink = container.querySelector(`[data-path="${pathname}"]`);
  if (activeLink) {
    indicator.style.width   = `${activeLink.offsetWidth}px`;
    indicator.style.left    = `${activeLink.offsetLeft}px`;
    indicator.style.opacity = "1";
  } else {
    indicator.style.opacity = "0";
  }
}

// ─── Component ──────────────────────────────────────────────────────────────
function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const indicatorRef  = useRef(null);
  const containerRef  = useRef(null);
  const location      = useLocation();

  // Close menu on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    // FIX: cleanup resets overflow when component unmounts while menu is open,
    // preventing a permanently locked scroll if the component is removed mid-open.
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // FIX: Merged indicator update + resize into a single effect.
  // Before: two separate effects with duplicated querySelector logic, and the
  // resize listener was re-registered on every route change (location.pathname
  // was a dependency). Now one effect handles both, with a debounced resize.
  useEffect(() => {
    updateIndicator(containerRef, indicatorRef, location.pathname);

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateIndicator(containerRef, indicatorRef, location.pathname);
      }, 100); // FIX: debounced — was firing querySelector on every resize pixel
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [location.pathname]); // single dependency, single registration

  // FIX: Stable close + toggle callbacks — prevents new function refs on render
  const closeMenu  = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen(o => !o), []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "shadow-lg backdrop-blur-md bg-white/95" : "bg-white"
        }`}
      >
        {/* Top Bar */}
        <div className="bg-[#0B1220] hidden md:block">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-2 flex justify-end items-center gap-8 text-xs text-slate-400">
            <a
              href="mailto:maktin.help@gmail.com"
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors duration-200"
            >
              <Mail size={13} className="text-emerald-500 shrink-0" aria-hidden="true" />
              maktin.help@gmail.com
            </a>
            <a
              href="tel:+918883335553"
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors duration-200"
            >
              <Phone size={13} className="text-emerald-500 shrink-0" aria-hidden="true" />
              +91 88833 35553
            </a>
          </div>
        </div>

        {/* Main Nav */}
        <nav className="border-b border-gray-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 md:h-20">

              {/* Logo — eager load, it's above the fold */}
              <NavLink
                to="/"
                className="flex flex-col shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
              >
                <img
                  src="/img/logo1.png"
                  alt="MAKT Solutions"
                  className="h-8 md:h-10 w-auto"
                  loading="eager"
                  decoding="async"
                  width={120}
                  height={40}
                />
                <span className="text-[9px] md:text-[10px] tracking-[2px] text-gray-500 font-semibold leading-tight">
                  SOLUTIONS PRIVATE LIMITED
                </span>
              </NavLink>

              {/* Desktop Links */}
              <div ref={containerRef} className="hidden md:flex items-center gap-1 relative">
                {/* Sliding indicator */}
                <span
                  ref={indicatorRef}
                  className="absolute top-1/2 -translate-y-1/2 h-9 bg-emerald-500/10 border border-emerald-500/20 rounded-full pointer-events-none transition-all duration-300 ease-out opacity-0"
                  aria-hidden="true"
                />

                {/* FIX: className is a stable module-level function reference, not inline arrow */}
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    data-path={link.path}
                    className={desktopLinkClass}
                  >
                    {link.name}
                  </NavLink>
                ))}

                <NavLink
                  to="/contact"
                  className="ml-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-emerald-500/20 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                >
                  Get Proposal
                </NavLink>
              </div>

              {/* Mobile Toggle */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 -mr-1 text-gray-700 hover:text-emerald-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <span className="block transition-transform duration-200">
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </span>
              </button>

            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu} // FIX: stable callback ref, not inline arrow
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] z-50 bg-white shadow-2xl md:hidden flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex flex-col">
            {/*
              FIX: loading="lazy" on the drawer logo — it's off-screen until the
              menu opens. Eager-loading it wastes bandwidth on page load.
              width/height added to prevent layout shift inside the drawer.
            */}
            <img
              src="/img/logo1.png"
              alt="MAKT Solutions"
              className="h-7 w-auto"
              loading="lazy"
              decoding="async"
              width={100}
              height={28}
            />
            <span className="text-[9px] tracking-[2px] text-gray-500 font-semibold">
              SOLUTIONS PRIVATE LIMITED
            </span>
          </div>
          <button
            onClick={closeMenu} // FIX: stable callback
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
          {NAV_LINKS.map((link, i) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMenu} // FIX: stable callback
              style={isOpen ? OPEN_DELAYS[i] : CLOSED_DELAY} // FIX: pre-computed stable objects
              className={mobileLinkClass} // FIX: stable module-level function
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {/* FIX: use isActive from NavLink render prop instead of
                      re-computing location.pathname === link.path inline */}
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Drawer Footer */}
        <div className="px-4 py-5 border-t border-gray-100 space-y-3">
          <NavLink
            to="/contact"
            onClick={closeMenu} // FIX: stable callback
            className="block w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-center px-4 py-3 rounded-xl transition-colors duration-200 text-sm"
          >
            Get Proposal
          </NavLink>
          <div className="space-y-2 pt-1">
            <a
              href="mailto:maktin.help@gmail.com"
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-emerald-600 transition-colors px-1"
            >
              <Mail size={13} className="text-emerald-500 shrink-0" aria-hidden="true" />
              maktin.help@gmail.com
            </a>
            <a
              href="tel:+918883335553"
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-emerald-600 transition-colors px-1"
            >
              <Phone size={13} className="text-emerald-500 shrink-0" aria-hidden="true" />
              +91 88833 35553
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Navbar);
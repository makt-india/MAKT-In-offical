import React from "react";
import { Users, Cpu, FolderKanban } from "lucide-react";

const NAV_CARDS = [
  {
    id: 1,
    title: "About Us",
    subtitle: "Discover our mission",
    coverImg: "img/aboutus.webp",
    Icon: Users,
    glowColor: "rgba(56, 189, 248, 0.8)", // Sky blue
    href: "/about",
  },
  {
    id: 2,
    title: "Services",
    subtitle: "What we deliver",
    coverImg: "img/services.webp",
    Icon: Cpu,
    glowColor: "rgba(52, 211, 153, 0.8)", // Emerald
    href: "/services",
  },
  {
    id: 3,
    title: "Projects",
    subtitle: "View our portfolio",
    coverImg: "img/projects.webp",
    Icon: FolderKanban,
    glowColor: "rgba(129, 140, 248, 0.8)", // Indigo
    href: "/projects",
  },
];

export default function SectionNavigator() {
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
        {NAV_CARDS.map((card) => {
          const Icon = card.Icon;
          
          return (
            <a 
              key={card.id}
              href={card.href}
              // Set up the perspective on the parent anchor tag
              className="group relative flex justify-center items-end w-[260px] h-[360px] px-6 rounded-2xl cursor-pointer [perspective:2500px]"
            >
              
              {/* Background 3D Wrapper */}
              <div className="absolute inset-0 w-full h-full rounded-2xl transition-all duration-500 ease-out z-0 [transform-style:preserve-3d] group-hover:[transform:perspective(900px)_translateY(-5%)_rotateX(25deg)_translateZ(0)] group-hover:shadow-[2px_35px_32px_-8px_rgba(0,0,0,0.75)]">
                <img 
                  src={card.coverImg} 
                  alt={card.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover rounded-2xl border border-white/10" 
                />
                
                {/* Top Vignette (Replaces ::before) */}
                <div className="absolute inset-x-0 top-0 h-24 rounded-t-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-b from-[#020B18] via-[#020B18]/50 to-transparent" />
                
                {/* Bottom Vignette (Replaces ::after) */}
                <div className="absolute inset-x-0 bottom-0 h-20 rounded-b-2xl transition-all duration-500 bg-gradient-to-t from-[#020B18] via-[#020B18]/70 to-transparent group-hover:h-[140px]" />
              </div>

              {/* Title Content */}
              <div className="relative z-10 w-full text-center pb-8 transition-transform duration-500 ease-out group-hover:[transform:translate3d(0,-60px,100px)]">
                <h3 className="text-3xl font-extrabold text-white drop-shadow-md uppercase tracking-wider">
                  {card.title}
                </h3>
                <p className="text-blue-200 text-sm font-medium mt-1 opacity-0 transition-opacity duration-300 delay-100 group-hover:opacity-100">
                  {card.subtitle}
                </p>
              </div>

              {/* Pop-out Character/Icon */}
              <div className="absolute bottom-[40%] w-full flex justify-center items-center opacity-0 transition-all duration-500 ease-out z-20 pointer-events-none group-hover:opacity-100 group-hover:[transform:translate3d(0,-40%,100px)]">
                <div 
                  className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 transition-shadow duration-500"
                  style={{ boxShadow: `0 0 40px 10px ${card.glowColor}` }}
                >
                  <Icon className="w-16 h-16 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                </div>
              </div>

            </a>
          );
        })}
      </div>

    </section>
  );
}
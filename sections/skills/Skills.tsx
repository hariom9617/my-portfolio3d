"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Database, Monitor, Server, Cloud, Wrench, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface SkillItem {
  name: string;
  icon: string;
}

interface SkillCategory {
  label: string;
  icon: React.ReactNode;
  items: SkillItem[];
}

const categories: SkillCategory[] = [
  {
    label: "Programming Languages",
    icon: <Code size={18} />,
    items: [
      { name: "JavaScript", icon: "/skills-image/icons8-javascript-48.png" },
      { name: "TypeScript", icon: "/skills-image/icons8-typescript-24.png" },
      { name: "Python",     icon: "/skills-image/icons8-python-48.png" },
      { name: "Java",       icon: "/skills-image/icons8-java-50.png" },
    ],
  },
  {
    label: "Database",
    icon: <Database size={18} />,
    items: [
      { name: "MongoDB",    icon: "/skills-image/icons8-mongo-db-96.png" },
      { name: "PostgreSQL", icon: "/skills-image/icons8-postgresql-100.png" },
      { name: "Redis",      icon: "/skills-image/icons8-redis-96.png" },
      { name: "Supabase",   icon: "/skills-image/icons8-supabase-48.png" },
    ],
  },
  {
    label: "Frontend",
    icon: <Monitor size={18} />,
    items: [
      { name: "React",         icon: "/skills-image/icons8-react-js-80.png" },
      { name: "Next.js",       icon: "/skills-image/icons8-nextjs-96.png" },
      { name: "Angular",       icon: "/skills-image/icons8-angularjs-48.png" },
      { name: "TailwindCSS",   icon: "/skills-image/icons8-tailwind-css-48.png" },
      { name: "Material UI",   icon: "/skills-image/icons8-material-ui-48.png" },
      { name: "Framer Motion", icon: "/skills-image/framer-motion.svg" },
      { name: "Three.js",      icon: "/skills-image/icons8-three.js-64.png" },
      { name: "Redux",         icon: "/skills-image/icons8-redux-48.png" },
    ],
  },
  {
    label: "Backend",
    icon: <Server size={18} />,
    items: [
      { name: "Node.js",    icon: "/skills-image/icons8-node-js-48.png" },
      { name: "Express.js", icon: "/skills-image/icons8-express-js-50.png" },
      { name: "Flask",      icon: "/skills-image/icons8-flask-50.png" },
      { name: "JWT Auth",   icon: "https://cdn.worldvectorlogo.com/logos/jwt-3.svg" },
      { name: "REST API",   icon: "/skills-image/icons8-rest-api-64.png" },
    ],
  },
  {
    label: "Cloud / DevOps",
    icon: <Cloud size={18} />,
    items: [
      { name: "AWS",    icon: "/skills-image/icons8-aws-48.png" },
      { name: "Docker", icon: "/skills-image/icons8-docker-50.png" },
      { name: "CI/CD",  icon: "/skills-image/icons8-cd-48.png" },
    ],
  },
  {
    label: "Tools",
    icon: <Wrench size={18} />,
    items: [
      { name: "Git",      icon: "/skills-image/icons8-git-50.png" },
      { name: "GitHub",   icon: "/skills-image/icons8-github-50.png" },
      { name: "Postman",  icon: "/skills-image/icons8-postman-inc-96.png" },
      { name: "Figma",    icon: "/skills-image/icons8-figma-100.png" },
      { name: "Razorpay", icon: "https://cdn.worldvectorlogo.com/logos/razorpay.svg" },
      { name: "Stripe",   icon: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg" },
      { name: "Leaflet",  icon: "https://cdn.worldvectorlogo.com/logos/leaflet-1.svg" },
    ],
  },
];

export default function Skills() {
  const headerRef    = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs     = useRef<(HTMLDivElement | null)[][]>([]);

  useEffect(() => {
    // Set initial hidden state via GSAP — NOT via CSS class.
    // If GSAP fails for any reason the elements stay visible (safe fallback).
    const allTargets: (Element | null)[] = [
      headerRef.current,
      ...categoryRefs.current,
      ...cardRefs.current.flat(),
    ];
    allTargets.forEach((el) => el && gsap.set(el, { opacity: 0 }));

    // Collect every ScrollTrigger this component creates so cleanup is scoped.
    const tweens: gsap.core.Tween[] = [];

    if (headerRef.current) {
      tweens.push(
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
              invalidateOnRefresh: true,
            },
          }
        )
      );
    }

    categoryRefs.current.forEach((el, i) => {
      if (!el) return;
      const fromLeft = i % 2 === 0;
      tweens.push(
        gsap.fromTo(
          el,
          { opacity: 0, x: fromLeft ? -40 : 40 },
          {
            opacity: 1, x: 0, duration: 0.6, ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
              invalidateOnRefresh: true,
            },
          }
        )
      );
    });

    cardRefs.current.forEach((group) => {
      if (!group?.length) return;
      const validCards = group.filter(Boolean) as Element[];
      tweens.push(
        gsap.fromTo(
          validCards,
          { opacity: 0, y: 30, scale: 0.92 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.5,
            ease: "power3.out", stagger: 0.07,
            scrollTrigger: {
              trigger: validCards[0],
              start: "top 90%",
              toggleActions: "play none none none",
              invalidateOnRefresh: true,
            },
          }
        )
      );
    });

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  return (
    <>
      <style>{`
        .glass-card {
          background: rgba(13, 204, 242, 0.03);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(13, 204, 242, 0.1);
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .glass-card:hover {
          border-color: var(--accentColor);
          box-shadow: 0 0 15px rgba(13, 204, 242, 0.3);
          transform: translateY(-2px);
        }
      `}</style>

      <section
        id="skills"
        className="
          min-h-screen
          w-(--cWidth) max-w-480 mx-auto
          px-6 py-20 relative z-9
        "
      >
        {/* ── Header ── */}
        <div
          ref={headerRef}
          className="flex flex-col items-center mb-16 text-center"
        >
          <div className="
            inline-flex items-center gap-2 px-3 py-1 rounded-full
            bg-(--accentColor)/10 border border-(--accentColor)/20
            text-(--accentColor) text-xs font-bold uppercase tracking-wider mb-4
          ">
            <Zap size={14} />
            My Capabilities
          </div>
          <h2 className="
            text-[calc(2.5vw+15px)] leading-[calc(2.5vw+12px)]
            font-semibold tracking-tight mb-4
            max-[900px]:text-[38px] max-[900px]:leading-9
            min-[1950px]:text-[5rem]
          ">
            Tech{" "}
            <span className="text-(--accentColor)">Stack</span>
          </h2>
          <p className="max-w-2xl text-white/40 text-[15px] leading-relaxed font-extralight tracking-[0.5px]">
            A curated selection of modern technologies and frameworks I use to
            bring complex digital visions to life.
          </p>
        </div>

        {/* ── Categories grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, catIdx) => {
            if (!cardRefs.current[catIdx]) cardRefs.current[catIdx] = [];
            return (
              <div key={cat.label} className="space-y-4">

                {/* Category heading */}
                <div
                  ref={(el) => { categoryRefs.current[catIdx] = el; }}
                  className="flex items-center gap-3 px-2"
                >
                  <span className="text-(--accentColor)">{cat.icon}</span>
                  <h3 className="text-[18px] font-semibold tracking-[1px]">{cat.label}</h3>
                </div>

                {/* Skill cards */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                  {cat.items.map((skill, skillIdx) => (
                    <div
                      key={skill.name}
                      ref={(el) => { cardRefs.current[catIdx][skillIdx] = el; }}
                      className="glass-card rounded-xl p-4 flex flex-col items-center justify-center gap-3 text-center"
                    >
                      <div className="w-12 h-12 mb-2 flex items-center justify-center rounded-lg bg-black/50 p-2">
                        <img
                          alt={skill.name}
                          src={skill.icon}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-[13px] font-semibold tracking-[0.5px]">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
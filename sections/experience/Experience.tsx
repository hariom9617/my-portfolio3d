"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rocket, Layers, Database } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface CareerEntry {
  period: string;
  periodNote: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  align: "left" | "right";
}

const entries: CareerEntry[] = [
  {
    period: "Nov 2025 – Feb 2026",
    periodNote: "Worked on production React applications and cloud deployments.",
    role: "React Developer",
    company: "@Arbutus Infotech",
    description:
      "Developed scalable and responsive web interfaces using React.js and built reusable UI components for modular applications. Integrated REST APIs with frontend systems and optimized component architecture to improve performance. Assisted in CI/CD deployments using AWS services including EC2 and S3 while collaborating with backend teams to enhance system reliability.",
    tags: ["REACT", "REST APIs", "AWS", "CI/CD"],
    icon: <Rocket size={64} />,
    align: "right",
  },
  {
    period: "Nov 2025 – Dec 2025",
    periodNote: "Remote internship focused on frontend engineering.",
    role: "SDE Intern – Frontend",
    company: "@Bluestock",
    description:
      "Developed production-ready frontend modules using React.js and modern JavaScript practices. Integrated REST APIs and implemented dynamic data rendering across application components while collaborating with distributed teams using Git-based workflows.",
    tags: ["REACT", "JAVASCRIPT", "REST APIs", "GIT"],
    icon: <Layers size={64} />,
    align: "left",
  },
  {
    period: "Nov 2024 – Dec 2024",
    periodNote: "Early full-stack development experience.",
    role: "Web Developer",
    company: "@UnizzTech",
    description:
      "Built full-stack web applications with React.js frontend and REST API-based backend systems. Implemented responsive UI components and optimized application workflows to improve performance and usability across multiple devices.",
    tags: ["REACT", "FULLSTACK", "REST APIs"],
    icon: <Database size={64} />,
    align: "right",
  },
];

export default function Career() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const periodRefs  = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!timelineRef.current || !lineRef.current) return;

    gsap.fromTo(
      lineRef.current,
      { scaleY: 0, transformOrigin: "top center" },
      {
        scaleY: 1, ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 70%",
          end: "bottom 80%",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      }
    );

    const isMobile = window.innerWidth <= 1024;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const isLeft = entries[i].align === "left";
      gsap.fromTo(
        card,
        { opacity: 0, x: isMobile ? 0 : (isLeft ? -60 : 60) },
        {
          opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    dotRefs.current.forEach((dot) => {
      if (!dot) return;
      gsap.fromTo(
        dot,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)",
          scrollTrigger: {
            trigger: dot,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Period date labels are hidden on mobile — skip animation to avoid
    // GSAP touching display:none elements unnecessarily.
    if (!isMobile) {
      periodRefs.current.forEach((el, i) => {
        if (!el) return;
        const isLeft = entries[i].align === "left";
        gsap.fromTo(
          el,
          { opacity: 0, x: isLeft ? 40 : -40 },
          {
            opacity: 1, x: 0, duration: 0.6, ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }

    // Only kill the triggers we own — not the GsapScroll timelines.
    return () => {
      ScrollTrigger.getAll()
        .filter((t) => !t.vars.id?.toString().startsWith("__"))
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <style>{`
        .grid-pattern {
          background-image: radial-gradient(circle, rgba(13, 204, 242, 0.15) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .scanline {
          background: linear-gradient(to bottom, transparent 50%, rgba(13, 204, 242, 0.05) 50%);
          background-size: 100% 4px;
        }
        .career-timeline-line {
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 1px; height: 100%;
          background: repeating-linear-gradient(
            to bottom,
            transparent, transparent 4px,
            var(--accentColor) 4px, var(--accentColor) 8px
          );
          opacity: 0.35;
          transform-origin: top center;
        }
        .career-dot-glow {
          width: 20px; height: 20px;
          border-radius: 50%;
          background-color: var(--accentColor);
          box-shadow: 0 0 15px var(--accentColor);
          border: 4px solid #0a1628;
          flex-shrink: 0;
        }
        .career-card {
          background: rgba(13, 204, 242, 0.03);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(13, 204, 242, 0.2);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .career-card:hover {
          border-color: rgba(13, 204, 242, 0.6);
          box-shadow: 0 0 20px rgba(13, 204, 242, 0.15);
        }
        .career-h2-gradient {
          background: linear-gradient(0deg, #0d9488, #ffffff);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .career-dot-pulse {
          position: absolute;
          bottom: 0; left: 50%;
          transform: translate(-50%, 50%);
          background-color: #14b8a6;
          width: 10px; height: 10px;
          border-radius: 50%;
          box-shadow: 0px 0px 5px 2px #67e8f9, 0px 0px 15px 8px #5eead4, 0px 0px 110px 20px #a5f3fc;
          animation: dotPulse 0.8s linear infinite forwards;
        }
        @keyframes dotPulse {
          10%, 20%, 50%, 70%, 90% { box-shadow: 0px 0px 5px 2px #67e8f9; }
          0%, 30%, 64%, 80%, 100% {
            box-shadow: 0px 0px 5px 2px #67e8f9, 0px 0px 15px 5px #5eead4, 0px 0px 110px 20px #a5f3fc;
          }
        }
        @media only screen and (max-width: 900px) {
          .career-timeline-line { left: 20px; }
          .career-dot-pulse { left: 20px; }
          /* Stack all entries left-anchored: dot on the left, card to the right */
          .career-info-box { padding-left: 52px; }
          .career-dot-wrapper {
            position: absolute;
            left: 0;
            top: 24px;
          }
        }
        @media only screen and (max-width: 1025px) {
          .career-section { padding-top: 220px; margin-top: -200px; margin-bottom: 0; }
        }
      `}</style>

      <div className="career-section relative mx-auto mb-62.5 py-30 max-[600px]:py-22.5">
        <div className="absolute inset-0 grid-pattern pointer-events-none opacity-40" />
        <div className="absolute inset-0 scanline pointer-events-none opacity-20" />

        <div className="relative z-10 max-w-480 w-(--cWidth) mx-auto px-6">

          {/* ── Header ── */}
          <div className="max-w-7xl mx-auto px-6 pb-16 text-center relative z-10">

            {/* Badge */}
            <span className="
              inline-block px-4 py-1.5 mb-6
              text-xs font-bold tracking-[0.2em] uppercase
              rounded-full bg-(--accentColor)/10
              text-(--accentColor) border border-(--accentColor)/20
            ">
              Professional Timeline
            </span>

            {/* Title */}
            <h2 className="
              text-[70px] leading-17.5 font-black tracking-tighter mb-6
              bg-linear-to-b from-white to-slate-500
              bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]
              max-[1400px]:text-[50px] max-[1400px]:leading-12.5
              max-[600px]:text-[45px] max-[600px]:leading-11.25
            ">
              The Journey.
            </h2>

            {/* Subtitle */}
            <p className="
              text-white/40 text-lg max-w-2xl mx-auto
              font-light leading-relaxed tracking-[0.3px]
            ">
              A chronicle of building scalable architectures and high-fidelity
              user experiences across the stack.
            </p>

          </div>

          {/* ── Timeline ── */}
          <div ref={timelineRef} className="career-timeline relative space-y-16">

            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
              <span className="text-[12rem] font-black text-white/4 absolute -left-10 top-0">2026</span>
              <span className="text-[12rem] font-black text-white/4 absolute -right-10 top-1/3">2025</span>
              <span className="text-[12rem] font-black text-white/4 absolute -left-10 top-2/3">2024</span>
            </div>

            <div ref={lineRef} className="career-timeline-line" />
            <div className="career-dot-pulse" />

            {entries.map((entry, i) => (
              <div
                key={i}
                className="career-info-box relative flex flex-col md:flex-row items-stretch md:items-center gap-0"
              >
                {/* ── LEFT ── (order-2 on mobile so dot always renders first) */}
                <div className="flex-1 flex md:justify-end pr-0 md:pr-8 order-2 md:order-0">
                  {entry.align === "left" ? (
                    <div
                      ref={(el) => { cardRefs.current[i] = el; }}
                      className="career-card w-full md:max-w-110 p-6 rounded-xl relative overflow-hidden opacity-0"
                    >
                      {/* Lucide icon as watermark */}
                      <div className="absolute top-0 left-0 p-2 opacity-10 text-white">
                        {entry.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1 md:text-right">{entry.role}</h3>
                      <p className="text-(--accentColor) font-mono text-sm mb-4 md:text-right">{entry.company}</p>
                      <div className="space-y-3">
                        <div className="flex gap-2 flex-wrap md:justify-end">
                          {entry.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded bg-(--accentColor)/10 text-(--accentColor) text-[10px] font-mono border border-(--accentColor)/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed font-extralight md:text-right">
                          {entry.description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      ref={(el) => { periodRefs.current[i] = el; }}
                      className="hidden md:flex flex-col items-end text-right space-y-2 justify-center opacity-0"
                    >
                      <span className="text-(--accentColor) font-mono font-bold text-xl uppercase">{entry.period}</span>
                      <p className="text-white/40 text-sm max-w-65 font-extralight">{entry.periodNote}</p>
                    </div>
                  )}
                </div>

                {/* ── DOT — centered on desktop, absolutely-left on mobile ── */}
                <div className="career-dot-wrapper flex flex-col items-center justify-center relative z-20 shrink-0 px-4">
                  <div
                    ref={(el) => { dotRefs.current[i] = el; }}
                    className="career-dot career-dot-glow opacity-0"
                  />
                </div>

                {/* ── RIGHT ── */}
                <div className="flex-1 flex md:justify-start pl-0 md:pl-8">
                  {entry.align === "right" ? (
                    <div
                      ref={(el) => { cardRefs.current[i] = el; }}
                      className="career-card w-full md:max-w-110 p-6 rounded-xl relative overflow-hidden opacity-0"
                    >
                      <div className="absolute top-0 right-0 p-2 opacity-10 text-white">
                        {entry.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{entry.role}</h3>
                      <p className="text-(--accentColor) font-mono text-sm mb-4">{entry.company}</p>
                      <div className="space-y-3">
                        <div className="flex gap-2 flex-wrap">
                          {entry.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded bg-(--accentColor)/10 text-(--accentColor) text-[10px] font-mono border border-(--accentColor)/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed font-extralight">
                          {entry.description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      ref={(el) => { periodRefs.current[i] = el; }}
                      className="hidden md:flex flex-col items-start space-y-2 justify-center opacity-0"
                    >
                      <span className="text-(--accentColor) font-mono font-bold text-xl uppercase">{entry.period}</span>
                      <p className="text-white/40 text-sm max-w-65 font-extralight">{entry.periodNote}</p>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
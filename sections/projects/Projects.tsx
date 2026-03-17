"use client";

import { useState, useCallback } from "react";
import { ArrowRight, ArrowUpRight, Code, ExternalLink } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "ReplyZen",
    category: "Instagram Automation SaaS",
    tools: "React, Node.js, Express, MongoDB, Razorpay",
    image: "/images/replyzen.png",
    link: "",
    video: "",
  },
  {
    title: "Creator Insights",
    category: "AI Analytics Dashboard",
    tools: "React, Node.js, MongoDB, AI APIs",
    image: "/images/creator-insights.png",
    link: "",
    video: "",
  },
  {
    title: "Prism",
    category: "Social Media Platform",
    tools: "React, TypeScript, Node.js, MongoDB, Tailwind",
    image: "/images/prism.png",
    link: "",
    video: "",
  },
  {
    title: "TechBay",
    category: "E-Commerce Platform",
    tools: "React, Redux, Material UI, MongoDB, Razorpay",
    image: "/images/techbay.png",
    link: "",
    video: "",
  },
  {
    title: "Hotel Management",
    category: "Management System",
    tools: "React, Node.js, MongoDB",
    image: "/images/hotel.png",
    link: "",
    video: "",
  },
  {
    title: "3D Developer Portfolio",
    category: "Interactive Portfolio",
    tools: "Next.js, Three.js, GSAP, Framer Motion",
    image: "/images/portfolio3d.png",
    link: "",
    video: "",
  },
];

const featuredProject = projects[0]; // ReplyZen (your strongest project)

const gridProjects = [
  {
    title: "Creator Insights",
    description:
      "AI-powered analytics dashboard for YouTube and Instagram creators, providing deep insights into engagement and audience behavior.",
    tags: ["React", "Node.js", "AI"],
    image: "/images/creator-insights.png",
    link: "",
    github: "",
  },
  {
    title: "Prism",
    description:
      "Full-stack social media platform with location-based features and interactive map visualization.",
    tags: ["React", "TypeScript", "MongoDB"],
    image: "/images/prism.png",
    link: "",
    github: "",
  },
  {
    title: "TechBay",
    description:
      "E-commerce platform with product management, cart system, and secure Razorpay payment integration.",
    tags: ["React", "Redux", "MongoDB"],
    image: "/images/techbay.png",
    link: "",
    github: "",
  },
  {
    title: "Hotel Management",
    description:
      "System for managing hotel bookings, room availability, and customer data with an admin dashboard.",
    tags: ["React", "Node.js", "MongoDB"],
    image: "/images/hotel.png",
    link: "",
    github: "",
  },
  {
    title: "3D Portfolio",
    description:
      "Interactive developer portfolio featuring 3D elements, smooth animations, and immersive UI.",
    tags: ["Next.js", "Three.js", "GSAP"],
    image: "/images/portfolio3d.png",
    link: "",
    github: "",
  },
];

export default function Projects() {
  const [videoSrc, setVideoSrc] = useState("");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const handleMouseEnter = useCallback(async (key: string, video?: string) => {
    if (!video) return;
    const response = await fetch(`/videos/${video}`);
    const blob = await response.blob();
    setVideoSrc(URL.createObjectURL(blob));
    setActiveVideo(key);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveVideo(null);
    setVideoSrc("");
  }, []);

  return (
    <>
      <style>{`
        .glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .glow-border {
          border: 1px solid rgba(255,255,255,0.1);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .glow-border:hover {
          border-color: rgba(13, 204, 242, 0.5);
          box-shadow: 0 0 20px rgba(13, 204, 242, 0.15);
        }
      `}</style>

      <div
        id="work"
        className="
          work-section
          relative z-[1]
          w-[var(--cWidth)] max-w-[1920px] mx-auto
          py-[80px] max-[900px]:py-[50px]
        "
      >
        {/* ── Section Header ── */}
        <div className="mb-16">
          <h2 className="
            text-[70px] leading-none font-black tracking-tighter mb-4
            bg-gradient-to-r from-white to-slate-500
            bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]
            max-[1400px]:text-[50px]
            max-[900px]:text-[40px]
          ">
            My{" "}
            <span className="text-[var(--accentColor)] [-webkit-text-fill-color:var(--accentColor)]">
              Work
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl leading-relaxed font-light">
            A collection of high-performance digital experiences focusing on
            scalable architecture, CMS platforms, and seamless user interaction.
          </p>
        </div>

        {/* ── Featured Project ── */}
        <section className="mb-24">
          <div className="
            glass rounded-2xl overflow-hidden group
            border border-white/5
            hover:border-[var(--accentColor)]/30
            transition-all duration-500 shadow-2xl
          ">
            <div className="flex flex-col lg:flex-row">

              {/* Image */}
              <div
                className="lg:w-3/5 relative overflow-hidden h-[300px] lg:h-auto cursor-pointer"
                onMouseEnter={() => handleMouseEnter("featured", featuredProject.video)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {activeVideo === "featured" && (
                  <video
                    src={videoSrc}
                    autoPlay muted playsInline loop
                    className="absolute inset-0 w-full h-full object-cover z-[5]"
                  />
                )}
              </div>

              {/* Content */}
              <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-6">
                  <span className="
                    px-3 py-1 rounded-full
                    bg-[var(--accentColor)]/20 text-[var(--accentColor)]
                    text-[10px] font-bold uppercase tracking-widest
                    border border-[var(--accentColor)]/30
                  ">
                    Primary Project
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-4 group-hover:text-[var(--accentColor)] transition-colors">
                  {featuredProject.title}
                </h3>
                <p className="text-white/40 mb-8 leading-relaxed font-light">
                  A proprietary low-code platform built for rapid application
                  development. Enables teams to build production-ready CMS-based
                  projects including e-commerce, CRM, and automation systems.
                </p>
                <div className="flex flex-wrap gap-2 mb-10">
                  {["Angular", "Next.js", "NestJS", "MongoDB"].map((tool) => (
                    <span key={tool} className="
                      px-3 py-1 rounded-md
                      bg-white/5 border border-white/10
                      text-xs font-medium text-white/70
                    ">
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Featured buttons */}
                <div className="flex gap-4">
                  <a
                    href={featuredProject.link || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      flex-1 h-12 flex items-center justify-center gap-2
                      rounded-xl bg-[var(--accentColor)] text-black
                      font-bold hover:brightness-110 transition-all
                    "
                  >
                    <ArrowUpRight size={18} />
                    Live Demo
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className="
                      flex-1 h-12 flex items-center justify-center gap-2
                      rounded-xl bg-white/5 border border-white/10
                      font-bold hover:bg-white/10 transition-all
                    "
                  >
                    <Code size={18} />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Grid Header ── */}
        <div className="mb-10 flex items-center justify-between">
          <h3 className="text-2xl font-bold tracking-tight">Other Projects</h3>
          <div className="h-px flex-1 mx-8 bg-gradient-to-r from-[var(--accentColor)]/30 to-transparent" />
        </div>

        {/* ── Projects Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridProjects.map((project, i) => (
            <div
              key={i}
              className="glass rounded-xl p-6 glow-border flex flex-col h-full group"
            >
              {/* Image */}
              {project.image ? (
                <div
                  className="w-full aspect-video rounded-lg mb-6 overflow-hidden border border-white/5 cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(`grid-${i}`)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {activeVideo === `grid-${i}` && (
                      <video
                        src={videoSrc}
                        autoPlay muted playsInline loop
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-full aspect-video rounded-lg mb-6 bg-white/5 border border-white/5 flex items-center justify-center">
                  <span className="text-white/20 text-sm font-mono tracking-widest uppercase">Soon</span>
                </div>
              )}

              <h4 className="text-xl font-bold mb-2 group-hover:text-[var(--accentColor)] transition-colors">
                {project.title}
              </h4>
              <p className="text-sm text-white/40 mb-6 flex-grow leading-relaxed font-light">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold text-white/40 uppercase tracking-tighter"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* ── GitHub + Live Demo buttons ── */}
              <div className="mt-auto flex gap-3">
                <a
                  href={project.github || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex-1 flex items-center justify-center gap-2
                    py-2 px-4 rounded-lg
                    bg-white/5 hover:bg-white/10
                    text-white text-xs font-bold
                    transition-colors
                  "
                >
                  <Code size={14} />
                  GitHub
                </a>
                <a
                  href={project.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex-1 flex items-center justify-center gap-2
                    py-2 px-4 rounded-lg
                    bg-[var(--accentColor)]/20 hover:bg-[var(--accentColor)]/30
                    text-[var(--accentColor)] text-xs font-bold
                    transition-colors
                  "
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              </div>
            </div>
          ))}

          {/* CTA card */}
          <div className="
            rounded-xl border border-dashed border-[var(--accentColor)]/30
            p-6 flex flex-col items-center justify-center text-center
            group cursor-pointer hover:bg-[var(--accentColor)]/5 transition-all
          ">
            <div className="
              w-16 h-16 rounded-full bg-[var(--accentColor)]/10
              flex items-center justify-center mb-4
              group-hover:scale-110 transition-transform
              text-[var(--accentColor)] text-3xl font-bold
            ">
              +
            </div>
            <h4 className="text-xl font-bold mb-2">Build Together</h4>
            <p className="text-sm text-white/40">
              Have a vision for a complex project? Let's bring it to life.
            </p>
            <a
              href="#contact"
              className="
                mt-6 text-[var(--accentColor)] font-bold text-sm
                tracking-widest uppercase flex items-center gap-1
                hover:gap-2 transition-all
              "
            >
              Initialize Contact
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* ── View All button ── */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/projects"
            className="
              glass group flex items-center gap-3
              px-8 py-4 rounded-full
              border border-[var(--accentColor)]/20
              hover:border-[var(--accentColor)]/50
              hover:bg-[var(--accentColor)]/5
              transition-all duration-300
              shadow-lg hover:shadow-[var(--accentColor)]/10
            "
          >
            <span className="
              text-sm font-bold tracking-widest uppercase
              text-white/70 group-hover:text-[var(--accentColor)] transition-colors
            ">
              View All Projects
            </span>
            <ArrowRight
              size={18}
              className="text-[var(--accentColor)] group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

      </div>
    </>
  );
}
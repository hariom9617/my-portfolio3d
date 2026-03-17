"use client";

import { useState } from "react";
import { Code, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  category: string;
  link?: string;
  github?: string;
}

const allProjects: Project[] = [
  {
    title: "ReplyZen",
    description:
      "Instagram automation SaaS platform that automates replies, captures leads, and manages campaigns with subscription-based billing.",
    tags: ["React", "Node.js", "MongoDB", "Razorpay"],
    image: "/images/replyzen.png",
    category: "SaaS",
    link: "",
    github: "",
  },
  {
    title: "Creator Insights",
    description:
      "AI-powered analytics dashboard for YouTube and Instagram creators, providing deep insights into engagement and audience behavior.",
    tags: ["React", "Node.js", "AI", "MongoDB"],
    image: "/images/creator-insights.png",
    category: "AI",
    link: "",
    github: "",
  },
  {
    title: "Prism",
    description:
      "Full-stack social media platform with location-based features and interactive map visualization.",
    tags: ["React", "TypeScript", "MongoDB", "Leaflet"],
    image: "/images/prism.png",
    category: "Full Stack",
    link: "",
    github: "",
  },
  {
    title: "TechBay",
    description:
      "E-commerce platform with product catalog, cart system, and secure Razorpay payment integration.",
    tags: ["React", "Redux", "MongoDB", "Razorpay"],
    image: "/images/techbay.png",
    category: "Full Stack",
    link: "",
    github: "",
  },
  {
    title: "Hotel Management System",
    description:
      "System for managing hotel bookings, room availability, and customer data with an admin dashboard.",
    tags: ["React", "Node.js", "MongoDB"],
    image: "/images/hotel.png",
    category: "Full Stack",
    link: "",
    github: "",
  },
  {
    title: "3D Developer Portfolio",
    description:
      "Interactive portfolio with immersive 3D experiences using Three.js, GSAP animations, and modern UI.",
    tags: ["Next.js", "Three.js", "GSAP"],
    image: "/images/portfolio3d.png",
    category: "Frontend",
    link: "",
    github: "",
  },
  {
    title: "Eco-Learn",
    description:
      "Gamified environmental learning platform that encourages sustainable practices through challenges and rewards.",
    tags: ["React", "Node.js", "MongoDB"],
    image: "/images/ecolearn.png",
    category: "Full Stack",
    link: "",
    github: "",
  },
  {
    title: "Jupiter",
    description:
      "HR management system for handling employee records, attendance tracking, and internal workflows.",
    tags: ["React", "Node.js", "MongoDB"],
    image: "/images/jupiter.png",
    category: "Full Stack",
    link: "",
    github: "",
  },
  {
    title: "College CRM / ERP",
    description:
      "College management system for handling student data, administration workflows, and institutional processes.",
    tags: ["React", "Node.js", "MongoDB"],
    image: "/images/college-crm.png",
    category: "Full Stack",
    link: "",
    github: "",
  },
  {
    title: "Ride Booking App",
    description:
      "Ride booking platform allowing users to schedule rides, manage trips, and track ride details in real time.",
    tags: ["React", "Node.js", "MongoDB"],
    image: "/images/ride.png",
    category: "Full Stack",
    link: "",
    github: "",
  },
  {
    title: "Portfolio v1",
    description:
      "Developer portfolio with modern UI and animations built using React and Framer Motion.",
    tags: ["React", "Framer Motion"],
    image: "/images/portfolio1.png",
    category: "Frontend",
    link: "",
    github: "",
  },
  {
    title: "Portfolio v2",
    description:
      "Improved portfolio with TypeScript, Tailwind CSS, and optimized performance with modular architecture.",
    tags: ["React", "TypeScript", "Tailwind"],
    image: "/images/portfolio2.png",
    category: "Frontend",
    link: "",
    github: "",
  },
];

const categories = ["All", "Full Stack", "Frontend", "Backend"];

export default function AllProjects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeFilter);

  return (
    <>
      <style>{`
        .glass-card {
          background: rgba(16, 31, 34, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(13, 204, 242, 0.1);
          transition: all 0.3s ease;
        }
        .glass-card:hover {
          border-color: rgba(13, 204, 242, 0.4);
          box-shadow: 0 0 20px rgba(13, 204, 242, 0.15);
          transform: translateY(-4px);
        }
      `}</style>

      <div className="relative min-h-screen w-full overflow-x-hidden">

        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--accentColor)]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-[1920px] w-[var(--cWidth)] mx-auto px-6 py-12 md:py-20">

          {/* ── Back button ── */}
          <Link
            href="/"
            className="
              inline-flex items-center gap-2 mb-10
              text-white/40 hover:text-[var(--accentColor)]
              text-sm font-medium tracking-wide
              transition-colors duration-200
            "
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>

          {/* ── Page Title ── */}
          <div className="mb-12">
            <h1 className="
              text-[60px] md:text-[80px] font-black leading-tight tracking-tighter mb-4
              max-[900px]:text-[42px]
            ">
              All{" "}
              <span className="
                bg-gradient-to-r from-[var(--accentColor)] to-cyan-300
                bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]
              ">
                Projects
              </span>
            </h1>
            <p className="text-white/40 text-lg max-w-2xl leading-relaxed font-light">
              A curated collection of technical works, from high-performance
              backends to polished frontend experiences. Exploring the
              boundaries of modern engineering.
            </p>
          </div>

          {/* ── Filters ── */}
          <div className="flex flex-wrap gap-3 mb-10 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`
                  px-6 py-2 rounded-full text-sm font-semibold
                  transition-all duration-200
                  ${activeFilter === cat
                    ? "bg-[var(--accentColor)] text-black"
                    : "bg-[var(--accentColor)]/5 text-white/70 border border-[var(--accentColor)]/20 hover:bg-[var(--accentColor)]/10"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── Project Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((project, i) => (
              <div
                key={i}
                className="glass-card flex flex-col rounded-xl overflow-hidden h-full group"
              >
                {/* Image */}
                <div className="aspect-video w-full overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center">
                      <span className="text-white/20 text-xs font-mono uppercase tracking-widest">
                        No Preview
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-white text-xl font-bold mb-2 group-hover:text-[var(--accentColor)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/40 text-sm line-clamp-2 mb-4 leading-relaxed font-light">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="
                          px-2 py-0.5 rounded
                          text-[10px] font-bold tracking-wider uppercase
                          bg-[var(--accentColor)]/10 text-[var(--accentColor)]
                          border border-[var(--accentColor)]/20
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* ── Buttons — always shown, disabled state when no URL ── */}
                  <div className="mt-auto flex gap-3">
                    <a
                      href={project.github || "#"}
                      target={project.github ? "_blank" : undefined}
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
                      target={project.link ? "_blank" : undefined}
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
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
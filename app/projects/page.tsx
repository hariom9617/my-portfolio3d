import type { Metadata } from "next";
import AllProjects from "@/sections/projects/AllProjects";

export const metadata: Metadata = {
  title: "Projects – Hariom Patil | MERN Stack Developer",
  description:
    "Explore projects by Hariom Patil — a MERN Stack Developer from Indore. Includes ReplyZen (Instagram SaaS), Prism (social platform), TechBay (e-commerce), and more built with React, Node.js, and MongoDB.",
  alternates: {
    canonical: "https://hariom-patil.in/projects",
  },
  openGraph: {
    title: "Projects – Hariom Patil | MERN Stack Developer",
    description:
      "Full-stack projects by Hariom Patil — SaaS automation, social platforms, e-commerce, and 3D portfolios built with React, Next.js, Node.js, and MongoDB.",
    url: "https://hariom-patil.in/projects",
    type: "website",
  },
};

export default function ProjectsPage() {
  return <AllProjects />;
}
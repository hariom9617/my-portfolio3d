"use client";

// Loading progress is owned entirely by engine/Character/Scene.tsx.
// Scene.tsx calls setProgress() and progress.loaded(), then exposes the
// result to the LoadingProvider via the setLoading context value.
// No second interval must be created here.

import Hero from "@/sections/hero/Hero";
import About from "@/sections/about/About";
import WhatIDo from "@/sections/whatido/WhatIDo";
import Skills from "@/sections/skills/Skills";
import Experience from "@/sections/experience/Experience";
import Projects from "@/sections/projects/Projects";
// import AllProjects from "@/sections/projects/AllProjects";
import Contact from "@/sections/contact/Contact";

export default function Home() {
  return (
    <>
      {/* ── SEO-only content block — visually hidden, fully crawlable ── */}
      <section aria-label="About Hariom Patil" className="sr-only">
        <h2>Hariom Patil – MERN Stack Developer</h2>
        <p>
          Hariom Patil is a MERN Stack Developer from Indore, India, specializing
          in building full-stack web applications with React.js, Node.js, Express,
          and MongoDB. With hands-on experience in both frontend and backend
          engineering, Hariom Patil delivers scalable, production-ready products
          ranging from SaaS automation tools to interactive 3D portfolio experiences.
        </p>
        <p>
          As a React Developer, Hariom Patil has worked with modern frameworks
          including Next.js, Angular, and TypeScript, alongside cloud services,
          REST APIs, and payment integrations. Whether you are looking for a
          Full Stack Developer or a dedicated Node.js Developer, Hariom Patil
          brings end-to-end engineering expertise to every project.
        </p>
        <p>
          Explore featured work by Hariom Patil:{" "}
          <a href="/projects">full project portfolio</a>,{" "}
          <a href="https://replyzen.hariom-patil.in" target="_blank" rel="noopener noreferrer">
            ReplyZen — Instagram automation SaaS
          </a>
          , and{" "}
          <a href="https://techbay.hariom-patil.in" target="_blank" rel="noopener noreferrer">
            TechBay — e-commerce platform
          </a>
          .
        </p>
      </section>

      <Hero />
      <About />
      <WhatIDo />
      <Skills />
      <Experience />
      <Projects />
      {/* <AllProjects /> */}
      <Contact />
    </>
  );
}

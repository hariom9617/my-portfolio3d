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

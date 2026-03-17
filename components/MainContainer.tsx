"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import About from "@/sections/about/About";
import Career from "@/sections/experience/Experience";
import Contact from "@/sections/contact/Contact";
import Hero from "@/sections/hero/Hero";
import WhatIDo from "@/sections/skills/Skills";
import Work from "@/sections/projects/Projects";

const TechStack = lazy(() => import("@/engine/physics/TechStack"));

const MainContainer = () => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = async () => {
      const { default: setSplitText } = await import(
        "@/engine/animations/splitText"
      );
      await setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container-main">
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Hero />
            <About />
            <WhatIDo />
            <Career />
            <Work />

            {isDesktopView && (
              <Suspense
                fallback={
                  <div className="flex items-center justify-center py-20 text-teal-400 text-sm tracking-widest uppercase">
                    Loading...
                  </div>
                }
              >
                <TechStack />
              </Suspense>
            )}

            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
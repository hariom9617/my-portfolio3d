"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/all";
import HoverLinks from "../HoverLinks";
import { setSmoother } from "@/utils/smootherRef";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const Navbar = () => {
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    setSmoother(smoother);
    smoother.scrollTop(0);
    smoother.paused(true);

    const links = document.querySelectorAll<HTMLAnchorElement>(".header ul a");
    links.forEach((element) => {
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const target = e.currentTarget as HTMLAnchorElement;
          const section = target.getAttribute("data-href");
          smoother.scrollTo(section!, true, "top top");
        }
      });
    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="
        relative flex w-[var(--cWidth)] max-w-[var(--cMaxWidth)] justify-between items-center
        py-5 -mb-[100px] box-border
        fixed left-1/2 -translate-x-1/2 top-0 z-[9999]
        min-[1200px]:py-[35px]
      ">
        <a
          href="/#"
          data-cursor="disable"
          className="font-bold text-sm tracking-[0.2px] min-[500px]:text-base min-[1200px]:text-lg"
        >
          HP
        </a>

        <a
          href="mailto:hariompatil9617@gmail.com"
          data-cursor="disable"
          className="
            hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            text-[15px] tracking-[1px] font-medium whitespace-nowrap
            min-[900px]:block
            min-[1200px]:text-base
          "
        >
          hariompatil9617@gmail.com
        </a>

        <ul className="
          text-xs flex flex-col m-0 p-0 list-none gap-y-2 items-end
          [&>li]:tracking-[1px] [&>li]:text-[#ccc] [&>li]:font-semibold [&>li]:cursor-pointer
          min-[500px]:flex-row min-[500px]:items-center min-[500px]:text-sm min-[500px]:gap-x-10 min-[500px]:[&>li]:text-[#eae5ec]
          min-[1200px]:gap-x-20 min-[1200px]:text-base
        ">
          <li><a data-href="#about" href="#about"><HoverLinks text="ABOUT" /></a></li>
          <li><a data-href="#work" href="#work"><HoverLinks text="WORK" /></a></li>
          <li><a data-href="#contact" href="#contact"><HoverLinks text="CONTACT" /></a></li>
        </ul>
      </div>

      <div className="landing-circle1" />
      <div className="landing-circle2" />
      <div className="nav-fade" />
    </>
  );
};

export default Navbar;
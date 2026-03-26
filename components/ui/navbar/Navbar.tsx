"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/all";
import HoverLinks from "../HoverLinks";
import { setSmoother } from "@/utils/smootherRef";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const NAV_LINKS = [
  { label: "ABOUT",   href: "#about" },
  { label: "WORK",    href: "#work" },
  { label: "CONTACT", href: "#contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<InstanceType<typeof ScrollSmoother> | null>(null);

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Animate overlay open / close
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    if (menuOpen) {
      gsap.fromTo(el, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(el, { opacity: 0, y: -20, duration: 0.2, ease: "power2.in" });
    }
  }, [menuOpen]);

  // ScrollSmoother setup
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
    smootherRef.current = smoother;

    setSmoother(smoother);
    smoother.scrollTop(0);
    smoother.paused(true);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Scroll to a section — works for both desktop (ScrollSmoother) and mobile
  const handleNavLinkClick = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMenuOpen(false);

    const section = document.querySelector<HTMLElement>(href);
    if (!section) return;

    if (window.innerWidth > 1024) {
      try {
        smootherRef.current?.scrollTo(href, true, "top top");
      } catch {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Slight delay so the overlay close animation doesn't fight the scroll
      setTimeout(() => {
        const top = section.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: "smooth" });
      }, 220);
    }
  }, []);

  return (
    <>
      {/* ── Top bar ── */}
      <div className="
        relative flex w-(--cWidth) max-w-(--cMaxWidth) justify-between items-center
        py-5 -mb-25 box-border
        fixed left-1/2 -translate-x-1/2 top-0 z-[9999]
        min-[1200px]:py-[35px]
      ">
        {/* HP logo — hidden on mobile */}
        <a
          href="/#"
          data-cursor="disable"
          className="hidden min-[1024px]:block font-bold text-sm tracking-[0.2px] min-[1200px]:text-lg"
        >
          HP
        </a>

        {/* Email — desktop only */}
        <a
          href="mailto:hariompatil9617@gmail.com"
          data-cursor="disable"
          className="
            hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            text-[15px] tracking-[1px] font-medium whitespace-nowrap
            min-[900px]:block min-[1200px]:text-base
          "
        >
          hariompatil9617@gmail.com
        </a>

        {/* Desktop nav links */}
        <ul className="
          hidden min-[1024px]:flex flex-row m-0 p-0 list-none items-center
          gap-x-10 text-sm
          [&>li]:tracking-[1px] [&>li]:text-[#eae5ec] [&>li]:font-semibold [&>li]:cursor-pointer
          min-[1200px]:gap-x-20 min-[1200px]:text-base
        ">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href} onClick={(e) => handleNavLinkClick(e, href)}>
                <HoverLinks text={label} />
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger button — mobile only */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="min-[1024px]:hidden ml-auto flex flex-col justify-center items-center gap-[5px] w-10 h-10 z-[10001] relative"
        >
          <span className={`block h-[2px] bg-white rounded transition-all duration-300 ${menuOpen ? "w-6 translate-y-[7px] rotate-45" : "w-6"}`} />
          <span className={`block h-[2px] bg-white rounded transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-4"}`} />
          <span className={`block h-[2px] bg-white rounded transition-all duration-300 ${menuOpen ? "w-6 -translate-y-[7px] -rotate-45" : "w-6"}`} />
        </button>
      </div>

      {/* ── Mobile menu overlay ── */}
      {menuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[9998] min-[1024px]:hidden flex flex-col items-center justify-center"
          style={{ background: "rgba(5, 8, 16, 0.97)", backdropFilter: "blur(12px)" }}
        >
          <nav className="flex flex-col items-center gap-10">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => handleNavLinkClick(e, href)}
                className="text-3xl font-bold tracking-[3px] text-white/80 hover:text-[var(--accentColor)] transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}

      <div className="landing-circle1" />
      <div className="landing-circle2" />
      <div className="nav-fade" />
    </>
  );
};

export default Navbar;

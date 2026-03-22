import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera,
) {
  if (typeof window === "undefined") return;

  let intensity: number = 0;
  // Store the interval id so the screen-flicker effect can be stopped
  // when the ScrollTrigger that owns it is killed (e.g. on resize).
  const intensityInterval = setInterval(() => {
    intensity = Math.random();
  }, 200);

  // Attach the cleanup to the GSAP context so it fires when ScrollTriggers
  // created in this call are killed (resize handler calls ScrollTrigger.kill).
  ScrollTrigger.create({
    id: "__intensityCleanup",
    onKill: () => clearInterval(intensityInterval),
  });

  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".whatIDO",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  let screenLight: any, monitor: any;

  character?.children.forEach((object: any) => {
    if (object.name === "Plane004") {
      object.children.forEach((child: any) => {
        child.material.transparent = true;
        child.material.opacity = 0;
        if (child.material.name === "Material.018") {
          monitor = child;
          child.material.color.set("#FFFFFF");
        }
      });
    }
    if (object.name === "screenlight") {
      object.material.transparent = true;
      object.material.opacity = 0;
      object.material.emissive.set("#B0F5EA");
      gsap.timeline({ repeat: -1, repeatRefresh: true }).to(object.material, {
        emissiveIntensity: () => intensity * 8,
        duration: () => Math.random() * 0.6,
        delay: () => Math.random() * 0.1,
      });
      screenLight = object;
    }
  });

  const neckBone = character?.getObjectByName("spine005");

  if (window.innerWidth > 1024) {
    if (character) {
      tl1
        .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
        .to(camera.position, { z: 26 }, 0)
        .fromTo(".character-model", { x: 0 }, { x: "-22%", duration: 1 }, 0)
        .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
        .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
        .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0);

      tl2
        .to(
          camera.position,
          { z: 75, y: 8.4, duration: 6, delay: 2, ease: "power3.inOut" },
          0,
        )
        .to(".about-section", { y: "30%", duration: 6 }, 0)
        .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
        .fromTo(
          ".character-model",
          { pointerEvents: "inherit" },
          { pointerEvents: "none", x: "-18%", delay: 2, duration: 5 },
          0,
        )
        .to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0)
        .to(neckBone!.rotation, { x: 0.6, delay: 2, duration: 3 }, 0)
        .to(monitor.material, { opacity: 1, duration: 0.8, delay: 3.2 }, 0)
        .to(screenLight.material, { opacity: 1, duration: 0.8, delay: 4.5 }, 0)
        .fromTo(
          ".what-box-in",
          { display: "none" },
          { display: "flex", duration: 0.1, delay: 6 },
          0,
        )
        .fromTo(
          monitor.position,
          { y: -10, z: 2 },
          { y: 0, z: 0, delay: 1.5, duration: 3 },
          0,
        )
        .fromTo(
          ".character-rim",
          { opacity: 1, scaleX: 1.4 },
          { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
          0.3,
        );

      tl3
        .fromTo(
          ".character-model",
          { y: "0%" },
          { y: "-100%", duration: 4, ease: "none", delay: 1 },
          0,
        )
        .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0)
        .to(character.rotation, { x: -0.04, duration: 2, delay: 1 }, 0);
    }
  } else {
    if (character) {
      // ── Mobile scroll animations ──────────────────────────────────────────
      // Mirrors the desktop experience with two mobile-specific omissions:
      //   • camera.position is NOT animated — character is already zoomed-out
      //     on mobile; pulling the camera back further would make it too small.
      //   • .character-model x-translate is omitted — character stays centered
      //     on portrait screens instead of sliding to the left.
      // Everything else (rotation, landing fade, about slide, neck bone,
      // monitor, screen light, what-box-in reveal, character exit) is identical.

      // tl1 — hero section scrolls out, about section enters
      tl1
        .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
        .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
        .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
        // Slide about-me up from below as hero scrolls away (mobile-appropriate
        // entrance — desktop uses translateY(-50%) correction instead)
        .fromTo(
          ".about-me",
          { opacity: 0, y: "40px" },
          { opacity: 1, y: "0px", duration: 0.6 },
          0.4,
        );

      // tl2 — about section scrolls out, WhatIDo section enters
      tl2
        .to(".about-section", { y: "30%", duration: 6 }, 0)
        .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
        .to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0)
        .to(neckBone!.rotation, { x: 0.6, delay: 2, duration: 3 }, 0)
        .to(monitor.material, { opacity: 1, duration: 0.8, delay: 3.2 }, 0)
        .to(screenLight.material, { opacity: 1, duration: 0.8, delay: 4.5 }, 0)
        .fromTo(
          ".what-box-in",
          { display: "none" },
          { display: "flex", duration: 0.1, delay: 6 },
          0,
        )
        .fromTo(
          monitor.position,
          { y: -10, z: 2 },
          { y: 0, z: 0, delay: 1.5, duration: 3 },
          0,
        )
        .fromTo(
          ".character-rim",
          { opacity: 1, scaleX: 1.4 },
          { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
          0.3,
        );

      // tl3 — WhatIDo section scrolls out, character exits upward
      tl3
        .fromTo(
          ".character-model",
          { y: "0%" },
          { y: "-100%", duration: 4, ease: "none", delay: 1 },
          0,
        )
        .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0)
        .to(character.rotation, { x: -0.04, duration: 2, delay: 1 }, 0);
    }
  }
}

export function setAllTimeline() {
  if (typeof window === "undefined") return;

  // Career section layout/parallax scroll animation.
  // IMPORTANT: .career-info-box opacity is intentionally NOT animated here.
  // Experience.tsx owns each card's opacity via its own per-element ScrollTriggers.
  // Animating opacity here from a scrub/section-level trigger creates two competing
  // tweens on the same elements — the section-level one wins and leaves cards
  // invisible when scroll position doesn't fully traverse the trigger range
  // (common on mobile and on Vercel where the character may not load).
  if (window.innerWidth > 1024) {
    // ── Desktop: scrubbed layout reveal ──
    const careerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".career-section",
        start: "top 30%",
        end: "100% center",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    careerTimeline
      // Reveal the timeline line container (layout, not card content)
      .fromTo(".career-timeline", { maxHeight: "10%" }, { maxHeight: "100%", duration: 0.5 }, 0)
      .fromTo(".career-timeline", { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0)
      // Section parallax drift
      .fromTo(".career-section", { y: 0 }, { y: "20%", duration: 0.5, delay: 0.2 }, 0);
  }
  // No section-level career animation on mobile — Experience.tsx handles all of it.

  // ── Hide character canvas on /projects page ──
  if (
    typeof window !== "undefined" &&
    window.location.pathname === "/projects"
  ) {
    gsap.set(".character-model", { opacity: 0, pointerEvents: "none" });
  }

  // ── Hide character canvas when Skills section enters, restore on scroll back ──
  // Uses onEnter/onLeaveBack so it's instant with no scrub lag.
  // .character-model is the fixed wrapper div in Scene.tsx — safe to opacity:0
  // since the Three.js renderer keeps running underneath (no unmount/remount).
  ScrollTrigger.create({
    trigger: "#skills", // Skills section id
    start: "top 80%", // hide slightly before it fully enters
    onEnter: () => {
      gsap.to(".character-model", {
        opacity: 0,
        duration: 0.4,
        pointerEvents: "none",
      });
    },
    onLeaveBack: () => {
      gsap.to(".character-model", {
        opacity: 1,
        duration: 0.4,
        pointerEvents: "none", // keep pointer-events off — tl2 already sets this
      });
    },
  });
}

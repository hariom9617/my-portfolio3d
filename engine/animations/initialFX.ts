// engine/animations/initialFX.ts
// NOTE: This file must only be imported dynamically (via import()) from client components.
// Never import it at the top level of any server component.

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getSmoother } from "@/utils/smootherRef";
import setSplitText from "@/engine/animations/splitText";

// ScrollSmoother & SplitText are gsap-trial / gsap premium plugins.
// They are imported lazily to avoid SSR errors.
let ScrollSmoother: any;
let SplitText: any;

async function loadGsapPlugins() {
  if (typeof window === "undefined") return;

  if (!ScrollSmoother) {
    try {
      const mod = await import("gsap-trial/ScrollSmoother");
      ScrollSmoother = mod.ScrollSmoother;
    } catch {
      // ScrollSmoother not available — graceful degradation
      ScrollSmoother = null;
    }
  }

  if (!SplitText) {
    try {
      const mod = await import("gsap-trial/SplitText");
      SplitText = mod.SplitText;
    } catch {
      SplitText = null;
    }
  }
}

export async function initialFX() {
  if (typeof window === "undefined") return;

  await loadGsapPlugins();

  gsap.registerPlugin(ScrollTrigger);
  if (ScrollSmoother) gsap.registerPlugin(ScrollSmoother);
  if (SplitText) gsap.registerPlugin(SplitText);

  document.body.style.overflowY = "auto";

  // Unpause ScrollSmoother using the singleton stored by Navbar.tsx.
  // This is the single authoritative reference — Navbar calls setSmoother()
  // immediately after ScrollSmoother.create(), so getSmoother() is always
  // non-null by the time initialFX runs.
  const smoother = getSmoother();
  if (smoother) smoother.paused(false);

  const mainEl = document.getElementsByTagName("main")[0];
  if (mainEl) mainEl.classList.add("main-active");

  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  // Kick off scroll-triggered paragraph and title reveals.
  // setSplitText registers its own ScrollTrigger.refresh listener internally.
  void setSplitText();

  if (!SplitText) {
    // Graceful fallback: simple fade/slide for landing elements
    gsap.fromTo(
      [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.inOut", stagger: 0.025, delay: 0.3 }
    );
    gsap.fromTo(
      [".header", ".icons-section", ".nav-fade"],
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power1.inOut", delay: 0.1 }
    );
    return;
  }

  const landingText = new SplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    {
      type: "chars,lines",
      linesClass: "split-line",
    }
  );

  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  const TextProps = { type: "chars,lines", linesClass: "split-h2" };

  const landingText2 = new SplitText(".landing-h2-info", TextProps);

  gsap.fromTo(
    landingText2.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  const landingText3 = new SplitText(".landing-h2-info-1", TextProps);
  const landingText4 = new SplitText(".landing-h2-1", TextProps);
  const landingText5 = new SplitText(".landing-h2-2", TextProps);

  LoopText(landingText2, landingText3);
  LoopText(landingText4, landingText5);
}

function LoopText(Text1: any, Text2: any) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    Text2.chars,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delay,
    },
    0
  )
    .fromTo(
      Text1.chars,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      Text1.chars,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .to(
      Text2.chars,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}

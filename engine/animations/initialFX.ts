// engine/animations/initialFX.ts
// NOTE: This file must only be imported dynamically (via import()) from client components.
// Never import it at the top level of any server component.

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/all";
import { SplitText } from "gsap/all";
import { getSmoother } from "@/utils/smootherRef";
import setSplitText from "@/engine/animations/splitText";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

export async function initialFX() {
  if (typeof window === "undefined") return;

  document.body.style.overflowY = "auto";

  const smoother = getSmoother();
  if (smoother) smoother.paused(false);

  // Recalculate all ScrollTrigger positions now that the loading screen is gone
  // and the final layout is in place. Without this, triggers created while the
  // loading overlay was visible have stale offsets and never fire on mobile.
  setTimeout(() => ScrollTrigger.refresh(), 150);

  const mainEl = document.getElementsByTagName("main")[0];
  if (mainEl) mainEl.classList.add("main-active");

  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  void setSplitText();

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

function LoopText(
  Text1: InstanceType<typeof SplitText>,
  Text2: InstanceType<typeof SplitText>
) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    Text2.chars,
    { opacity: 0, y: 80 },
    { opacity: 1, duration: 1.2, ease: "power3.inOut", y: 0, stagger: 0.1, delay },
    0
  )
    .fromTo(
      Text1.chars,
      { y: 80 },
      { duration: 1.2, ease: "power3.inOut", y: 0, stagger: 0.1, delay: delay2 },
      1
    )
    .fromTo(
      Text1.chars,
      { y: 0 },
      { y: -80, duration: 1.2, ease: "power3.inOut", stagger: 0.1, delay },
      0
    )
    .to(
      Text2.chars,
      { y: -80, duration: 1.2, ease: "power3.inOut", stagger: 0.1, delay: delay2 },
      1
    );
}
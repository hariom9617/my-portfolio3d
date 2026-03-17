import { ScrollSmoother } from "gsap-trial/ScrollSmoother";

let smoother: ScrollSmoother | null = null;

export function getSmoother(): ScrollSmoother | null {
  return smoother;
}

export function setSmoother(instance: ScrollSmoother): void {
  smoother = instance;
}

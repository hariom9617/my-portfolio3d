declare module "gsap-trial/SplitText" {
  export class SplitText {
    chars: Element[];
    words: Element[];
    lines: Element[];
    constructor(
      target: string | string[] | Element | Element[],
      options?: {
        type?: string;
        linesClass?: string;
        wordsClass?: string;
        charsClass?: string;
      }
    );
    revert(): void;
  }
}

declare module "gsap-trial/ScrollSmoother" {
  import { Plugin } from "gsap";
  export interface ScrollSmootherInstance {
    scrollTop(value?: number): number;
    scrollTo(target: string | Element | number, smooth?: boolean, position?: string): void;
    paused(value?: boolean): boolean | ScrollSmootherInstance;
    refresh(soft?: boolean): void;
  }
  export const ScrollSmoother: Plugin & {
    create(options?: {
      wrapper?: string | Element;
      content?: string | Element;
      smooth?: number;
      speed?: number;
      effects?: boolean;
      autoResize?: boolean;
      ignoreMobileResize?: boolean;
    }): ScrollSmootherInstance;
    refresh(soft?: boolean): void;
  };
}

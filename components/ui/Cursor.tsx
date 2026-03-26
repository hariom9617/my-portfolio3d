"use client";

import { useEffect, useRef } from "react";
import "@/styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Touch-only devices have no cursor — skip the RAF loop entirely
    if (window.matchMedia("(hover: none)").matches) return;

    let hover = false;
    const cursor = cursorRef.current!;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    // Named handler so we can remove it on cleanup
    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    document.addEventListener("mousemove", onMouseMove);

    // Track RAF id so we can cancel the loop on unmount
    let rafId: number;
    const loop = () => {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.to(cursor, { x: cursorPos.x, y: cursorPos.y, duration: 0.1 });
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const elements = Array.from(document.querySelectorAll("[data-cursor]")) as HTMLElement[];

    const overHandlers: Array<(e: MouseEvent) => void> = [];
    const outHandlers: Array<() => void> = [];

    elements.forEach((element) => {
      const onOver = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");
          gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.1 });
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      };
      const onOut = () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      };
      overHandlers.push(onOver);
      outHandlers.push(onOut);
      element.addEventListener("mouseover", onOver);
      element.addEventListener("mouseout", onOut);
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      elements.forEach((element, i) => {
        element.removeEventListener("mouseover", overHandlers[i]);
        element.removeEventListener("mouseout", outHandlers[i]);
      });
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;

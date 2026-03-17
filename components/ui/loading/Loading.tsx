"use client";

import { useEffect, useState } from "react";
import { useLoading } from "./LoadingProvider";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (percent < 100) return;
    const t1 = setTimeout(() => {
      setLoaded(true);
      const t2 = setTimeout(() => setIsLoaded(true), 1000);
      return () => clearTimeout(t2);
    }, 600);
    return () => clearTimeout(t1);
  }, [percent]);

  useEffect(() => {
    if (!isLoaded) return;
    import("../../../engine/animations/initialFX").then((module) => {
      setClicked(true);
      setTimeout(() => {
        module.initialFX?.();
        setIsLoading(false);
      }, 900);
    });
  }, [isLoaded, setIsLoading]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return (
    <>
      {/* Header */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[var(--cMaxWidth,1400px)] z-[9999999999] flex justify-between box-border px-0 py-5 text-[#e0f2f1] md:py-[35px]"
      >
        <a
          href="/#"
          className="font-bold text-sm tracking-[0.2px] md:text-base lg:text-lg"
          data-cursor="disable"
        >
          HP
        </a>

        {/* Loader Game */}
        <div
          className={`transition-opacity duration-300 ${clicked ? "opacity-0" : "opacity-100"}`}
        >
          <div className="w-[200px] h-[100px] overflow-hidden relative scale-[0.4] origin-top-right">
            {/* Scrolling lines */}
            <div className="absolute left-0 w-[1200px] overflow-hidden animate-[loaderGame_7s_linear_infinite]">
              {[...Array(27)].map((_, index) => (
                <div
                  key={index}
                  className={`float-left mx-5 relative w-[10px] h-[60px] bg-black block ${
                    index % 2 === 1 ? "mt-10 mb-0" : "mb-10"
                  }`}
                />
              ))}
            </div>
            {/* Ball */}
            <div className="absolute left-[20%] top-0 w-[15px] h-[15px] rounded-full bg-teal-400 animate-[ball25_7s_infinite] translate-y-[10px] [animation-timing-function:cubic-bezier(0.3,1.18,0.63,1.28)]" />
          </div>
        </div>
      </div>

      {/* Loading Screen */}
      <div className="fixed inset-0 w-screen h-screen bg-[#e0f2f1] z-[999999999] flex items-center justify-center">
        {/* Marquee */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 text-[#0a0e17] text-[60px] xl:text-[100px] font-semibold uppercase overflow-hidden whitespace-nowrap pointer-events-none select-none">
          <div className="inline-flex gap-8 animate-[marquee_10s_linear_infinite]">
            {["Full Stack Developer", "·", "Software Engineer", "·", "Full Stack Developer", "·", "Software Engineer", "·"].map(
              (text, i) => (
                <span
                  key={i}
                  className="px-[50px] relative before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-5 before:h-5 before:bg-[#0a0e17] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2"
                >
                  {text}
                </span>
              )
            )}
          </div>
        </div>

        {/* Loading Button Wrap */}
        <div
          className={`relative p-[6px] rounded-[100px] bg-black overflow-hidden flex justify-center items-center shadow-[0px_15px_15px_0px_rgba(0,0,0,0.2)] transition-all duration-[800ms] ease-in-out delay-[200ms] ${
            clicked
              ? "!min-w-[calc(100vw+5000px)] !min-h-[calc(100vh+500px)] !rounded-[5000px] shadow-none !delay-0 [transition-timing-function:cubic-bezier(0.33,0.11,1,0.72)]"
              : "min-w-0 min-h-0"
          }`}
          onMouseMove={handleMouseMove}
          style={
            {
              "--mouse-x": `${mousePos.x}px`,
              "--mouse-y": `${mousePos.y}px`,
            } as React.CSSProperties
          }
        >
          {/* Hover glow blob */}
          <div
            className={`absolute w-[250px] h-[120px] bg-teal-400 rounded-full blur-[30px] pointer-events-none transition-opacity duration-500 ${clicked ? "opacity-0" : "opacity-100"}`}
            style={{
              top: mousePos.y,
              left: mousePos.x,
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Button */}
          <div
            className={`relative z-[9] rounded-[100px] bg-black overflow-hidden text-lg font-medium text-white px-[50px] py-5 xl:px-[70px] xl:py-[30px] xl:text-2xl`}
            style={
              {
                "--mouse-x": `${mousePos.x}px`,
                "--mouse-y": `${mousePos.y}px`,
              } as React.CSSProperties
            }
          >
            {/* Mouse spotlight */}
            <span
              className={`absolute rounded-full w-[60px] h-[60px] bg-white blur-[60px] pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 transition-opacity ${
                clicked ? "opacity-0" : "opacity-0 group-hover:opacity-100"
              }`}
              style={{ top: mousePos.y, left: mousePos.x }}
            />

            {/* Loading text container */}
            <div
              className={`absolute w-full max-w-[145px] xl:max-w-[210px] top-1/2 -translate-y-1/2 left-[50px] xl:left-[70px] z-[9] overflow-hidden transition-all duration-[1000ms] ${
                loaded ? "!max-w-0" : ""
              }`}
            >
              <div className="relative bg-black w-full overflow-hidden transition-[0.6s]">
                <div className="relative w-[145px] xl:w-[210px] overflow-hidden">
                  <span className="uppercase text-white">
                    Loading{" "}
                    <span className="font-light absolute top-1/2 right-0 -translate-y-1/2 opacity-70">
                      {percent}%
                    </span>
                  </span>
                </div>
              </div>
              {/* Blinking cursor */}
              <div
                className={`absolute right-0 top-1/2 translate-x-full -translate-y-1/2 w-[15px] h-[25px] bg-white ${
                  loaded
                    ? "animate-[blinkDone_0.3s_forwards] [animation-delay:1s]"
                    : "animate-[blink_1s_linear_infinite]"
                }`}
              />
            </div>

            {/* Welcome text */}
            <div
              className={`relative tracking-[2px] uppercase w-[145px] xl:w-[210px] overflow-hidden flex justify-center items-center gap-[10px] text-center transition-all duration-[1000ms] ${
                clicked ? "opacity-0 [&>span]:translate-y-[100px] [&>span]:opacity-0" : ""
              }`}
            >
              <span className="transition-all duration-[1000ms] text-white">
                Welcome
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes loaderGame {
          0% { transform: translateX(0px); }
          100% { transform: translateX(-300px); }
        }
        @keyframes ball25 {
          0% { transform: translateY(70px); }
          15% { transform: translateY(10px); }
          30% { transform: translateY(70px); }
          45% { transform: translateY(10px); }
          67% { transform: translateY(70px); }
          80% { transform: translateY(10px); }
          90% { transform: translateY(70px); }
          100% { transform: translateY(70px); }
        }
        @keyframes blink {
          0% { opacity: 0; }
          25% { opacity: 1; }
          75% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes blinkDone {
          to { opacity: 0; }
        }
      `}</style>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;
  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) clearInterval(interval);
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }

  return { loaded, percent, clear };
};
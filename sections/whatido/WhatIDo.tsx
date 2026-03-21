"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes whatFlicker {
          0%, 25%, 35%, 60% { opacity: 0; }
          30%, 50%, 40%, 100% { opacity: 1; }
        }
        @keyframes whatCorners {
          100% { opacity: 1; }
        }
        @keyframes whatBorders {
          80%  { opacity: 0.8; }
          100% { max-height: 100%; max-width: 100%; opacity: 0.2; }
        }
        .what-content::before,
        .what-corner::before,
        .what-content::after,
        .what-corner::after {
          content: "";
          width: 10px; height: 10px;
          position: absolute;
          border: 4px solid #fff;
          opacity: 0;
          animation: whatCorners 0.2s 1 forwards;
          animation-delay: 0.5s;
        }
        .what-content::before { top: -2px;    left: -2px;  border-right: none;  border-bottom: none; }
        .what-corner::before  { top: -2px;    right: -2px; border-left: none;   border-bottom: none; }
        .what-content::after  { bottom: -2px; left: -2px;  border-top: none;    border-right: none;  }
        .what-corner::after   { bottom: -2px; right: -2px; border-left: none;   border-top: none;    }

        .what-arrow::before {
          content: "";
          position: absolute;
          top: 40%; left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          border-left: 1px solid #fff;
          border-bottom: 1px solid #fff;
          transition: 0.5s;
          width: 10px; height: 10px;
        }
        .what-noTouch:hover .what-arrow::before,
        .what-content-active  .what-arrow::before {
          transform: translate(-50%, -20%) rotate(-225deg);
        }

        .what-noTouch:hover,
        .what-content-active {
          min-height: 67%;
          padding: 40px 50px;
        }
        .what-noTouch:hover ~ .what-content,
        .what-box-in:hover .what-noTouch:not(:hover),
        .what-content.what-sibling {
          min-height: 33%;
          padding: 10px 50px;
        }

        .what-border1 {
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 100%; height: 100%;
          transition: 0.5s;
          max-width: 0%;
          overflow: hidden;
          opacity: 0.8;
          animation: whatBorders 1.2s 1 forwards;
        }
        .what-border1 svg {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 450px;
        }
        .what-border2 {
          position: absolute;
          top: 50%; left: 0;
          transform: translateY(-50%);
          width: 100%; height: 100%;
          max-height: 0%;
          overflow: hidden;
          transition: 0.5s;
          opacity: 0.8;
          animation: whatBorders 1.2s 1 forwards;
        }
        .what-border2 svg {
          height: 500px;
          top: 50%;
          transform: translateY(-50%);
          position: absolute;
        }

        .what-content-in {
          opacity: 0;
          height: 100%;
          overflow: hidden;
          animation: whatFlicker 0.5s 1 forwards;
          animation-delay: 1s;
        }

        @media only screen and (max-width: 1400px) {
          .what-noTouch:hover,
          .what-content-active                          { padding: 20px 30px; }
          .what-noTouch:hover ~ .what-content,
          .what-box-in:hover .what-noTouch:not(:hover),
          .what-content.what-sibling                    { padding: 10px 30px; }
        }
        @media only screen and (max-width: 1024px) {
          .what-noTouch:hover,
          .what-content-active                          { min-height: 67%; padding: 50px; }
          .what-noTouch:hover ~ .what-content,
          .what-box-in:hover .what-noTouch:not(:hover),
          .what-content.what-sibling                    { min-height: 33%; padding: 10px 50px; }
        }
        @media only screen and (max-width: 900px) {
          .what-content h5,
          .what-content-flex                            { opacity: 0; transition: 0.3s; }
          .what-noTouch:hover h5,
          .what-content-active h5,
          .what-noTouch:hover .what-content-flex,
          .what-content-active .what-content-flex       { opacity: 1; }
          .what-noTouch:hover,
          .what-content-active                          { padding: 10px 30px; }
          .what-noTouch:hover ~ .what-content,
          .what-box-in:hover .what-noTouch:not(:hover),
          .what-content.what-sibling                    { padding: 5px 30px; }
        }
      `}</style>

      <div
        className="
        whatIDO
        flex items-center justify-center place-items-center
        relative opacity-100 z-[9]
        h-screen w-[var(--cWidth)] max-w-[1920px] mx-auto
        max-[1024px]:h-auto max-[1024px]:pt-20 max-[1024px]:pb-12.5
        max-[900px]:flex-col
      "
      >
        {/* LEFT — WHAT I DO title */}
        <div
          className="
          what-box
          w-1/2 flex justify-center relative z-[9]
          max-[900px]:w-[500px] max-[900px]:max-w-[calc(100%-50px)] max-[900px]:mx-auto
          max-[550px]:max-w-[calc(100%-25px)]
        "
        >
          <h2
            className="
            title
            font-semibold ml-[-5%] mb-[100px]
            text-[calc(2.5vw+15px)] leading-[calc(2.5vw+12px)]
            max-[1600px]:mr-[18%]
            max-[1400px]:mr-[20%]
            max-[900px]:mx-0 max-[900px]:my-[50px]
            max-[900px]:text-[38px] max-[900px]:leading-[36px]
            min-[1950px]:text-[5rem] min-[1950px]:leading-[4.8rem]
          "
          >
            W<span className="hat-h2 italic">HAT</span>
            <div>
              I<span className="do-h2 text-[var(--accentColor)]"> DO</span>
            </div>
          </h2>
        </div>

        {/* RIGHT — cards */}
        <div
          className="
          what-box
          w-1/2 flex justify-center relative z-[9]
          max-[900px]:w-[500px] max-[900px]:max-w-[calc(100%-50px)] max-[900px]:mx-auto max-[900px]:h-[500px]
          max-[550px]:max-w-[calc(100%-25px)]
        "
        >
          {/*
            what-box-in: GSAP tl2 sets display → "flex" (was incorrectly "grid").
            Starts hidden. flex-col stacks FRONTEND and BACKEND cards vertically.
            No margin-left — cards are positioned by the parent justify-center.
          */}
          <div
            className="
            what-box-in
            hidden flex-col relative
            h-[500px]
            max-[1400px]:h-[400px]
            max-[1024px]:h-[500px]
            max-[900px]:h-[450px] max-[900px]:w-full
          "
          >
            <div className="what-border2">
              <svg width="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="7,7"
                />
                <line
                  x1="100%"
                  y1="0"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="7,7"
                />
              </svg>
            </div>

            {/* FRONTEND */}
            <div
              className="
                what-content what-noTouch
                relative box-border
                w-[450px] h-[33%] min-h-[50%]
                p-[50px]
                transition-all duration-500
                max-[1400px]:w-[380px] max-[1400px]:p-[30px]
                max-[1024px]:w-[500px] max-[1024px]:p-[50px]
                max-[900px]:w-full max-[900px]:p-[30px]
                max-[1024px]:bg-black/40 max-[1024px]:backdrop-blur-sm
              "
              ref={(el) => setRef(el, 0)}
            >
              <div className="what-border1">
                <svg height="100%">
                  <line
                    x1="0"
                    y1="0"
                    x2="100%"
                    y2="0"
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray="6,6"
                  />
                  <line
                    x1="0"
                    y1="100%"
                    x2="100%"
                    y2="100%"
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray="6,6"
                  />
                </svg>
              </div>
              <div className="what-corner absolute" />
              <div className="what-content-in">
                <h3 className="text-[35px] tracking-[1px] m-0 max-[1400px]:text-[28px] max-[900px]:text-[25px]">
                  FRONTEND
                </h3>

                <h4 className="font-light tracking-[1px] m-0 text-[14px] opacity-30">
                  Modern Web Interfaces
                </h4>

                <p className="text-[14px] leading-[18px] font-extralight tracking-[0.7px] max-[1400px]:text-[13px] max-[900px]:text-[11px]">
                  Building responsive and interactive user interfaces using
                  modern frameworks. I focus on performance, smooth animations,
                  and scalable frontend architecture for real-world
                  applications.
                </p>

                <h5 className="font-light opacity-50 text-[12px] tracking-[1px] mb-[5px]">
                  Skillset & tools
                </h5>

                <div className="what-content-flex flex gap-[5px] flex-wrap">
                  {[
                    "React",
                    "Next.js",
                    "Angular",
                    "TypeScript",
                    "JavaScript",
                    "Three.js",
                    "GSAP",
                    "HTML5",
                    "CSS3",
                  ].map((tag) => (
                    <div
                      key={tag}
                      className="what-tags text-[13px] font-normal px-[7px] py-[2px] bg-white/15 border border-white/30 rounded-[30px] max-[900px]:text-[11px]"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="what-arrow absolute bottom-[20px] right-[20px] w-[25px] h-[25px] border border-white" />
              </div>
            </div>

            {/* BACKEND */}
            <div
              className="
                what-content what-noTouch
                relative box-border
                w-[450px] h-[33%] min-h-[50%]
                p-[50px]
                transition-all duration-500
                max-[1400px]:w-[380px] max-[1400px]:p-[30px]
                max-[1024px]:w-[500px] max-[1024px]:p-[50px]
                max-[900px]:w-full max-[900px]:p-[30px]
                max-[1024px]:bg-black/40 max-[1024px]:backdrop-blur-sm
              "
              ref={(el) => setRef(el, 1)}
            >
              <div className="what-border1">
                <svg height="100%">
                  <line
                    x1="0"
                    y1="100%"
                    x2="100%"
                    y2="100%"
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray="6,6"
                  />
                </svg>
              </div>
              <div className="what-corner absolute" />
              <div className="what-content-in">
                <h3 className="text-[35px] tracking-[1px] m-0 max-[1400px]:text-[28px] max-[900px]:text-[25px]">
                  BACKEND
                </h3>

                <h4 className="font-light tracking-[1px] m-0 text-[14px] opacity-30">
                  Scalable APIs & Systems
                </h4>

                <p className="text-[14px] leading-[18px] font-extralight tracking-[0.7px] max-[1400px]:text-[13px] max-[900px]:text-[11px]">
                  Developing secure and scalable backend systems that power
                  modern web applications. I design REST APIs, handle complex
                  business logic, and build reliable server-side architectures.
                </p>

                <h5 className="font-light opacity-50 text-[12px] tracking-[1px] mb-[5px]">
                  Skillset & tools
                </h5>

                <div className="what-content-flex flex gap-[5px] flex-wrap">
                  {[
                    "Node.js",
                    "Express.js",
                    "Java",
                    "Python",
                    "MongoDB",
                    "REST APIs",
                    "Authentication",
                    "API Design",
                  ].map((tag) => (
                    <div
                      key={tag}
                      className="what-tags text-[13px] font-normal px-[7px] py-[2px] bg-white/15 border border-white/30 rounded-[30px] max-[900px]:text-[11px]"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="what-arrow absolute bottom-[20px] right-[20px] w-[25px] h-[25px] border border-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);
    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}

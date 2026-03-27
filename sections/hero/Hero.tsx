"use client";

import { useEffect, useState } from "react";

const WORDS = ["Developer", "Engineer"];

const Hero = () => {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      // typing
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 90);
    } else if (!isDeleting && displayed.length === current.length) {
      // pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayed.length > 0) {
      // deleting
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1));
      }, 50);
    } else if (isDeleting && displayed.length === 0) {
      // move to next word
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex]);

  return (
    <>
      <style>{`
        .landing-section {
          height: var(--vh);
          max-width: var(--cMaxWidth);
        }
        .landing-container {
          width: var(--cWidth);
          max-width: var(--cMaxWidth);
        }
        .landing-intro .intro-greeting,
        .landing-info .info-role-prefix {
          color: var(--accentColor);
        }
        .typewriter-cursor {
          display: inline-block;
          width: 3px;
          height: 0.85em;
          background: var(--accentColor);
          margin-left: 4px;
          vertical-align: middle;
          border-radius: 2px;
          animation: blink 0.75s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @media screen and (min-width: 500px) {
          .landing-intro .intro-greeting { font-size: 18px; }
          .landing-intro h1              { font-size: 30px; line-height: 30px; }
          .landing-info .info-role-prefix { font-size: 18px; }
          .landing-info-title            { font-size: 28px; }
        }
        @media screen and (min-width: 768px) {
          .landing-intro .intro-greeting { font-size: 25px; }
          .landing-intro h1              { font-size: 40px; line-height: 35px; }
          .landing-info .info-role-prefix { font-size: 25px; }
          .landing-info-title            { font-size: 38px; }
        }
        @media screen and (min-width: 1600px) {
          .landing-intro .intro-greeting { font-size: 35px; }
          .landing-intro h1              { font-size: 60px; line-height: 55px; }
          .landing-info .info-role-prefix { font-size: 35px; }
          .landing-info-title            { font-size: 55px; }
        }

        /* ── Mobile only: move role text to top-right beside the name ── */
        @media screen and (max-width: 1024px) {
          .landing-info {
            right: 0        !important;
            left: auto      !important;
            bottom: auto    !important;
            top: 12%        !important;
            transform: none !important;
            text-align: right;
          }
          /* Compact font sizes so both blocks fit side-by-side */
          .landing-info .info-role-prefix { font-size: 15px !important; }
          .landing-info-title             { font-size: 19px !important; width: auto !important; margin-left: 0 !important; margin-top: 2px !important; }
          /* Hide the gradient fade overlay — it obscures text at small sizes */
          .landing-info-title::after { display: none !important; }
        }
      `}</style>

      <div className="landing-section w-full mx-auto relative" id="landingDiv">
        <div className="landing-container mx-auto h-full relative">

          {/* Rim light */}
          <div className="
            character-rim pointer-events-none
            absolute w-[400px] h-[400px] z-[1]
            bg-[#22d3ee] rounded-full blur-[50px] opacity-0
            top-1/2 left-1/2 -translate-x-1/2 translate-y-full scale-[1.4]
            [box-shadow:inset_66px_35px_85px_0px_rgba(0,180,180,0.65)]
          " />

          {/* LEFT — Name block */}
          <div className="
            landing-intro
            absolute z-[9] top-[12%] left-0
            lg:top-1/2 lg:left-auto lg:right-[66%] lg:-translate-y-1/2
            xl:right-[70%]
          ">
            <p className="intro-greeting m-0 text-[22px] font-light tracking-[2px]">
              Hello! I&apos;m
            </p>
            <h1 className="m-0 tracking-[2px] text-[28px] leading-[28px] font-medium font-[Geist,sans-serif]">
              HARIOM
              <br />
              <span>PATIL</span>
            </h1>
          </div>

          {/* RIGHT — Role block
              Mobile:  top-right beside the name (overridden by inline <style>)
              Desktop: right of centre via lg: Tailwind classes            */}
          <div className="
            landing-info
            absolute z-9
            lg:bottom-auto lg:top-[51%] lg:-translate-y-1/2 lg:translate-x-0 lg:right-auto lg:left-[66%] lg:text-left
            xl:left-[70%]
          ">
            <p className="info-role-prefix m-0 text-[22px] tracking-[2px] font-light">
              A Full Stack
            </p>

            <p className="
              landing-info-title
              m-0 -ml-[5px] text-[30px] font-semibold font-[Geist,sans-serif]
              text-[var(--accentColor)] whitespace-nowrap
            ">
              {displayed}
              <span className="typewriter-cursor" />
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Hero;
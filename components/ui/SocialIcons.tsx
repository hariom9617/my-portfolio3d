"use client";

import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  return (
    <>
      <style>{`
        .si-span {
          width: 50px;
          height: 50px;
          position: relative;
          display: flex;
        }
        .si-link {
          --siLeft: 50%;
          --siTop: 50%;
          position: absolute;
          left: var(--siLeft, 50%);
          top: var(--siTop, 50%);
          transform: translate(-50%, -50%);
          display: flex;
          font-size: 23px;
          will-change: left, top;
          transition: transform 0.3s ease-out;
        }
        @media only screen and (min-width: 900px) {
          .si-link {
            font-size: 28px;
          }
        }
      `}</style>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[var(--cWidth)] max-w-[var(--cMaxWidth)] z-[99]">
        {/* Social Icons */}
        <div
          className="
            absolute left-[-20px] bottom-5
            hidden flex-col gap-2 z-[999] p-[10px]
            hover:transition-[0.3s] hover:text-[var(--backgroundColor)]
            [&_a:hover]:text-[var(--backgroundColor)]
            [@media(min-width:900px)]:flex [@media(min-width:900px)]:gap-5
          "
          data-cursor="icons"
          id="social"
        >
          <span className="si-span">
            <a href="https://github.com/hariom9617" target="_blank" className="si-link">
              <FaGithub />
            </a>
          </span>
          <span className="si-span">
            <a href="https://www.linkedin.com/in/hariom-patil" target="_blank" className="si-link">
              <FaLinkedinIn />
            </a>
          </span>
          <span className="si-span">
            <a href="https://x.com/r1xhariomog" target="_blank" className="si-link">
              <FaXTwitter />
            </a>
          </span>
          <span className="si-span">
            <a href="https://www.instagram.com/hariom_gurjar96" target="_blank" className="si-link">
              <FaInstagram />
            </a>
          </span>
        </div>

        {/* Resume Button */}
        <a
          className="
            absolute z-[99] flex gap-[5px]
            bottom-10 right-0
            w-auto whitespace-nowrap
            tracking-[4px] text-[15px] leading-[15px] font-semibold
            text-[#5e5e5e] cursor-pointer transition-[0.5s]
            origin-bottom-left translate-x-full -rotate-90
            hover:text-white
            md:translate-x-0 md:rotate-0 md:text-[20px] md:leading-[20px]
          "
          href="#"
        >
          <HoverLinks text="RESUME" />
          <span className="text-white text-[17px] mt-[-1px] flex items-center md:text-[23px] md:mt-[-1.5px]">
            <TbNotes />
          </span>
        </a>
      </div>
    </>
  );
};

export default SocialIcons;
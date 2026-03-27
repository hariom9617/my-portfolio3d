import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className="
        relative z-[1]
        w-[var(--cWidth)] max-w-[1920px] mx-auto
        py-10 mt-8
        border-t border-white/10
      "
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Brand */}
        <div className="text-center md:text-left">
          <p className="text-white font-bold text-sm tracking-widest">HARIOM PATIL</p>
          <p className="text-white/40 text-xs mt-1">
            MERN Stack Developer &middot; React &middot; Node.js &middot; MongoDB
          </p>
        </div>

        {/* Project links for internal linking + SEO */}
        <nav aria-label="Featured projects" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <a
            href="https://replyzen.hariom-patil.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-[var(--accentColor)] text-xs transition-colors"
          >
            ReplyZen – Instagram Automation SaaS
          </a>
          <a
            href="https://prism.hariom-patil.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-[var(--accentColor)] text-xs transition-colors"
          >
            Prism – Social Media Platform
          </a>
          <a
            href="https://techbay.hariom-patil.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-[var(--accentColor)] text-xs transition-colors"
          >
            TechBay – E-Commerce Platform
          </a>
          <a
            href="https://dharamshala-management.hariom-patil.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-[var(--accentColor)] text-xs transition-colors"
          >
            Dharamshala – Hotel Management System
          </a>
        </nav>

        {/* Social links + copyright */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex gap-4">
            <a
              href="https://github.com/hariom9617"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hariom Patil on GitHub"
              className="text-white/40 hover:text-[var(--accentColor)] transition-colors text-xs"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/hariom-patil"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hariom Patil on LinkedIn"
              className="text-white/40 hover:text-[var(--accentColor)] transition-colors text-xs"
            >
              LinkedIn
            </a>
            <Link
              href="/"
              className="text-white/40 hover:text-[var(--accentColor)] transition-colors text-xs"
            >
              hariom-patil.in
            </Link>
          </div>
          <p className="text-white/20 text-[10px]">
            &copy; {currentYear} Hariom Patil. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

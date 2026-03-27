"use client";

import { useState } from "react";
import { ArrowRight, Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // Enforce max-length constraints to prevent oversized payloads
    const maxLengths: Record<string, number> = { name: 100, email: 254, message: 2000 };
    if (value.length > maxLengths[name]) return;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Name is required.";
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!emailRe.test(form.email)) next.email = "Please enter a valid email.";
    if (!form.message.trim()) next.message = "Message is required.";
    else if (form.message.trim().length < 10) next.message = "Message must be at least 10 characters.";
    return next;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setStatus("sending");
    try {
      // Replace with your actual API call, e.g.:
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });
      await new Promise((r) => setTimeout(r, 1200));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <style>{`
        .contact-glass-input {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(13, 204, 242, 0.2);
          transition: all 0.3s ease;
        }
        .contact-glass-input:focus {
          background: rgba(13, 204, 242, 0.07);
          border-color: #0dccf2;
          box-shadow: 0 0 15px rgba(13, 204, 242, 0.15);
          outline: none;
        }
        .contact-glow-btn {
          box-shadow: 0 0 20px rgba(13, 204, 242, 0.3);
          transition: all 0.3s ease;
        }
        .contact-glow-btn:hover {
          box-shadow: 0 0 30px rgba(13, 204, 242, 0.6);
          transform: translateY(-1px);
        }
        .contact-glass-card {
          background: rgba(13, 204, 242, 0.03);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(13, 204, 242, 0.1);
        }
        .contact-grid-overlay {
          background-image: linear-gradient(#0dccf2 1px, transparent 1px),
            linear-gradient(90deg, #0dccf2 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>

      <div
        id="contact"
        className="
          contact-section
          relative z-[1]
          w-[var(--cWidth)] max-w-[1920px] mx-auto
          py-[40px] max-[900px]:py-[30px]
        "
      >
        {/* ── Radial background glow ── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--accentColor)]/10 rounded-full blur-[100px]" />
        </div>

        {/* ── Section Header ── */}
        <div className="mb-8 max-w-[900px] mx-auto">
          <span className="text-[var(--accentColor)] font-bold tracking-[0.2em] text-[10px] uppercase">
            Connect with me
          </span>
          <h2
            className="
              mt-2 text-[42px] leading-none font-black tracking-tighter mb-3
              bg-gradient-to-r from-white to-slate-500
              bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]
              max-[1400px]:text-[36px]
              max-[900px]:text-[28px]
            "
          >
            Get In{" "}
            <span className="text-[var(--accentColor)] [-webkit-text-fill-color:var(--accentColor)]">
              Touch
            </span>
          </h2>
          <p className="text-white/40 text-sm max-w-xl leading-relaxed font-light">
            Have a project in mind or just want to say hi? I'm always open to
            discussing new opportunities and creative ideas.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center mx-auto w-full max-w-[900px]">

          {/* ── Left: Info ── */}
          <div className="flex flex-col space-y-6 lg:w-[340px] shrink-0">

            {/* Contact info items */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <div className="
                  flex items-center justify-center rounded-xl contact-glass-card size-11
                  text-[var(--accentColor)] transition-colors group-hover:bg-[var(--accentColor)]/20
                ">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    Email Me
                  </p>
                  <p className="text-white text-sm font-medium">
                    hello@developer.design
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="
                  flex items-center justify-center rounded-xl contact-glass-card size-11
                  text-[var(--accentColor)] transition-colors group-hover:bg-[var(--accentColor)]/20
                ">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    Location
                  </p>
                  <p className="text-white text-sm font-medium">
                    Indore, India
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-3">
                Follow Me
              </p>
              <div className="flex gap-3">
                {[
                  {
                    href: "https://github.com/hariom9617",
                    label: "Hariom Patil on GitHub",
                    icon: (
                      <svg className="size-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                    ),
                  },
                  {
                    href: "https://www.linkedin.com/in/hariom-patil",
                    label: "Hariom Patil on LinkedIn",
                    icon: (
                      <svg className="size-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    ),
                  },
                  {
                    href: "https://twitter.com/hariompatil",
                    label: "Hariom Patil on Twitter / X",
                    icon: (
                      <svg className="size-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    ),
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="
                      size-10 rounded-xl contact-glass-card flex items-center justify-center
                      text-white/40 hover:text-[var(--accentColor)]
                      hover:border-[var(--accentColor)]/40 transition-all
                    "
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Available badge */}
            <div className="flex items-center gap-2 w-fit contact-glass-card border border-[var(--accentColor)]/30 px-5 py-2.5 rounded-full">
              <span className="flex h-2 w-2 rounded-full bg-[var(--accentColor)] animate-pulse" />
              <span className="text-xs font-bold text-white/80 tracking-widest uppercase">
                Available for Projects
              </span>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="relative w-full lg:w-[480px] shrink-0">
            <div
              style={{
                background: "rgba(13, 204, 242, 0.04)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(13, 204, 242, 0.2)",
                borderRadius: "1rem",
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 0 40px rgba(13,204,242,0.06), 0 20px 60px rgba(0,0,0,0.4)",
              }}
            >
              {/* Grid overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  backgroundImage:
                    "linear-gradient(rgba(13,204,242,1) 1px, transparent 1px), linear-gradient(90deg, rgba(13,204,242,1) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                  opacity: 0.025,
                }}
              />

              <form
                onSubmit={handleSubmit}
                noValidate
                style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", gap: "1.1rem" }}
              >

                {/* Name */}
                <div>
                  <label htmlFor="name" style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "11px", fontWeight: 600, marginBottom: "6px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Full Name
                  </label>
                  <input
                    id="name" name="name" type="text" placeholder="John Doe"
                    value={form.name} onChange={handleChange}
                    autoComplete="name"
                    style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${errors.name ? "rgba(255,80,80,0.6)" : "rgba(13,204,242,0.2)"}`, borderRadius: "0.6rem", padding: "10px 14px", color: "white", fontSize: "13px", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                    onFocus={(e) => { e.target.style.borderColor = "#0dccf2"; e.target.style.background = "rgba(13,204,242,0.07)"; e.target.style.boxShadow = "0 0 12px rgba(13,204,242,0.15)"; }}
                    onBlur={(e) => { e.target.style.borderColor = errors.name ? "rgba(255,80,80,0.6)" : "rgba(13,204,242,0.2)"; e.target.style.background = "rgba(255,255,255,0.04)"; e.target.style.boxShadow = "none"; }}
                  />
                  {errors.name && <p style={{ color: "rgba(255,100,100,0.9)", fontSize: "11px", marginTop: "4px" }}>{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "11px", fontWeight: 600, marginBottom: "6px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Email Address
                  </label>
                  <input
                    id="email" name="email" type="email" placeholder="john@example.com"
                    value={form.email} onChange={handleChange}
                    autoComplete="email"
                    style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${errors.email ? "rgba(255,80,80,0.6)" : "rgba(13,204,242,0.2)"}`, borderRadius: "0.6rem", padding: "10px 14px", color: "white", fontSize: "13px", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                    onFocus={(e) => { e.target.style.borderColor = "#0dccf2"; e.target.style.background = "rgba(13,204,242,0.07)"; e.target.style.boxShadow = "0 0 12px rgba(13,204,242,0.15)"; }}
                    onBlur={(e) => { e.target.style.borderColor = errors.email ? "rgba(255,80,80,0.6)" : "rgba(13,204,242,0.2)"; e.target.style.background = "rgba(255,255,255,0.04)"; e.target.style.boxShadow = "none"; }}
                  />
                  {errors.email && <p style={{ color: "rgba(255,100,100,0.9)", fontSize: "11px", marginTop: "4px" }}>{errors.email}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "11px", fontWeight: 600, marginBottom: "6px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Your Message
                  </label>
                  <textarea
                    id="message" name="message" rows={4} placeholder="Let's build something amazing..."
                    value={form.message} onChange={handleChange}
                    style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${errors.message ? "rgba(255,80,80,0.6)" : "rgba(13,204,242,0.2)"}`, borderRadius: "0.6rem", padding: "10px 14px", color: "white", fontSize: "13px", outline: "none", resize: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                    onFocus={(e) => { e.target.style.borderColor = "#0dccf2"; e.target.style.background = "rgba(13,204,242,0.07)"; e.target.style.boxShadow = "0 0 12px rgba(13,204,242,0.15)"; }}
                    onBlur={(e) => { e.target.style.borderColor = errors.message ? "rgba(255,80,80,0.6)" : "rgba(13,204,242,0.2)"; e.target.style.background = "rgba(255,255,255,0.04)"; e.target.style.boxShadow = "none"; }}
                  />
                  {errors.message && <p style={{ color: "rgba(255,100,100,0.9)", fontSize: "11px", marginTop: "4px" }}>{errors.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending" || status === "sent"}
                  style={{
                    width: "100%", background: "#0dccf2", border: "none",
                    borderRadius: "0.6rem", padding: "11px", color: "#000",
                    fontWeight: 700, fontSize: "13px", cursor: status === "idle" ? "pointer" : "not-allowed",
                    opacity: status === "idle" ? 1 : 0.6,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    fontFamily: "inherit",
                    boxShadow: "0 0 20px rgba(13,204,242,0.3)",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => { if (status === "idle") { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 30px rgba(13,204,242,0.6)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(13,204,242,0.3)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
                >
                  {status === "sent" ? "Message Sent ✓" : status === "error" ? "Failed — Try Again" : status === "sending" ? "Sending..." : (
                    <><span>Send Message</span><ArrowRight size={15} /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
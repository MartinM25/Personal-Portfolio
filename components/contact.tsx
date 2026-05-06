"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Replace these with Sanity-fetched values later
const WHATSAPP_NUMBER = "263771969177";
const CONTACT_EMAIL   = "hello@martinmanjoro.dev";

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi Martin, I'd like to work with you."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef   = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef    = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: "", email: "", phone: "", message: "",
  });
  const [status, setStatus] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  // Scroll entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
        opacity: 0, y: 20, duration: 0.6, ease: "expo.out",
        scrollTrigger: { trigger: labelRef.current, start: "top 88%" },
      });
      gsap.from(headingRef.current, {
        opacity: 0, y: 40, skewY: 1.5, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
      });
      gsap.from(formRef.current, {
        opacity: 0, y: 30, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: formRef.current, start: "top 88%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Validation
  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  // Submit
  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, to: CONTACT_EMAIL }),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof typeof form]) {
      setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="border-t border-pg-border bg-pg-bg"
    >
      <div
        className="max-w-300 mx-auto
                   py-[clamp(60px,10vw,120px)]
                   px-[clamp(24px,7vw,100px)]"
      >
        {/* Label */}
        <p
          ref={labelRef}
          className="font-mono text-[0.68rem] tracking-[0.22em] uppercase
                     text-pg-accent mb-3.5"
        >
          Contact
        </p>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-sans font-black
                     text-[clamp(2rem,5vw,3.6rem)]
                     tracking-[-0.04em] leading-none
                     mb-[clamp(36px,5vw,64px)]"
        >
          Let&apos;s build<br />
          something <em className="not-italic text-pg-accent">great.</em>
        </h2>

        {/* Two-col layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-[clamp(40px,6vw,80px)]">

          {/* ── Form ── */}
          <div ref={formRef} className="flex flex-col gap-5">

            {/* Row: name + email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                label="Name"
                name="name"
                type="text"
                placeholder="Martin Manjoro"
                value={form.name}
                error={errors.name}
                onChange={handleChange}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="hello@example.com"
                value={form.email}
                error={errors.email}
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <Field
              label="Phone (optional)"
              name="phone"
              type="tel"
              placeholder="+263 77 000 0000"
              value={form.phone}
              onChange={handleChange}
            />

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[0.58rem] tracking-[0.12em]
                                uppercase text-pg-muted">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={handleChange}
                className={`w-full border rounded-[3px]
                            px-4 py-3 resize-none
                            font-sans text-[0.9rem] text-pg-text
                            placeholder:text-pg-muted/50
                            outline-none transition-colors duration-200
                            focus:border-pg-accent
                            ${errors.message ? "border-red-400" : "border-pg-border"}`}
              />
              {errors.message && (
                <p className="font-mono text-[0.55rem] tracking-[0.08em]
                              uppercase text-red-400">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-1">
              <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="btn-fill font-mono text-[0.65rem] tracking-[0.12em]
                           uppercase bg-pg-text text-pg-bg
                           px-8 py-4 rounded-[2px]
                           disabled:opacity-60 disabled:cursor-not-allowed
                           transition-transform duration-200 hover:scale-[1.02]"
              >
                <span>
                  {status === "loading" ? "Sending..." : "Send message"}
                </span>
              </button>

              {/* WhatsApp button */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5
                           font-mono text-[0.65rem] tracking-[0.12em] uppercase
                           border border-pg-border text-pg-muted
                           px-8 py-4 rounded-[2px]
                           transition-all duration-200
                           hover:border-[#25D366] hover:text-[#25D366]"
              >
                <WhatsAppIcon />
                Chat on WhatsApp
              </a>
            </div>

            {/* Status messages */}
            {status === "success" && (
              <p className="font-mono text-[0.6rem] tracking-widest uppercase
                            text-pg-green">
                ✓ Message sent — I'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="font-mono text-[0.6rem] tracking-widest uppercase
                            text-red-400">
                Something went wrong. Try emailing me directly.
              </p>
            )}
          </div>

          {/* ── Right col: info ── */}
          <div className="flex flex-col gap-8 lg:pt-2">
            <InfoBlock label="Email">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-pg-text font-sans text-[0.95rem]
                           hover:text-pg-accent transition-colors duration-200"
              >
                {CONTACT_EMAIL}
              </a>
            </InfoBlock>

            <InfoBlock label="Based in">
              <p className="text-pg-text font-sans text-[0.95rem]">
                Harare, Zimbabwe
              </p>
              <p className="font-mono text-[0.58rem] tracking-[0.08em]
                            uppercase text-pg-muted mt-1">
                Available for remote work worldwide
              </p>
            </InfoBlock>

            <InfoBlock label="WhatsApp">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-pg-text font-sans text-[0.95rem]
                           hover:text-[#25D366] transition-colors duration-200"
              >
                <WhatsAppIcon />
                +263 77 196 9177
              </a>
            </InfoBlock>

            <div className="border-t border-pg-border pt-8">
              <p className="font-mono text-[0.58rem] tracking-widest
                            uppercase text-pg-muted mb-4">
                Find me on
              </p>
              <div className="flex gap-5">
                {[
                  { label: "GitHub",   href: "https://github.com/MartinM25" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/martin-t-manjoro/" },
                  { label: "Twitter",  href: "https://twitter.com/martin_manjoro" },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[0.6rem] tracking-[0.08em]
                               uppercase text-pg-muted
                               hover:text-pg-accent transition-colors duration-200"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-pg-surface border-pg-border
                      px-[clamp(24px,7vw,100px)] py-7
                      flex items-center justify-between flex-wrap gap-3">
        <p className="font-mono text-[0.58rem] tracking-[0.08em]
                      uppercase text-pg-muted">
          © {new Date().getFullYear()} Martin Manjoro. All rights reserved.
        </p>
        <p className="font-mono text-[0.58rem] tracking-[0.08em]
                      uppercase text-pg-muted">
          Built with Next.js · Deployed on Vercel
        </p>
      </div>
    </section>
  );
}

// ── Field component ──
function Field({
  label, name, type, placeholder, value, error, onChange,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[0.58rem] tracking-[0.12em]
                        uppercase text-pg-muted">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-pg-bg border rounded-[3px]
                    px-4 py-3
                    font-sans text-[0.9rem] text-pg-text
                    placeholder:text-pg-muted/50
                    outline-none transition-colors duration-200
                    focus:border-pg-accent
                    ${error ? "border-red-400" : "border-pg-border"}`}
      />
      {error && (
        <p className="font-mono text-[0.55rem] tracking-[0.08em]
                      uppercase text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

// ── Info block ──
function InfoBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[0.58rem] tracking-[0.12em]
                    uppercase text-pg-muted mb-2">
        {label}
      </p>
      {children}
    </div>
  );
}

// ── WhatsApp icon ──
function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

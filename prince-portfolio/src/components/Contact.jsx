import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiCopy,
  FiCheck,
  FiArrowUpRight,
  FiClock,
  FiSend,
} from 'react-icons/fi';
import { FaGithub, FaLinkedinIn, FaInstagram, FaReact } from 'react-icons/fa';
import { LuCode, LuPalette, LuBookOpen, LuGitFork } from 'react-icons/lu';

const EMAIL = 'princezstha6110@gmail.com';
const PHONE = '+977-9825046110';
const LOCATION = 'Itahari, Nepal · Remote worldwide';

const interests = [
  { label: 'React Development', icon: FaReact },
  { label: 'Full-Stack Projects', icon: LuCode },
  { label: 'UI/UX Design', icon: LuPalette },
  { label: 'Academic Collaboration', icon: LuBookOpen },
  { label: 'Open Source', icon: LuGitFork },
];

const socials = [
  { label: 'GitHub', handle: '@PRINCEZ110', href: 'https://github.com/PRINCEZ110', icon: FaGithub },
  { label: 'LinkedIn', handle: 'Prince Shrestha', href: 'https://www.linkedin.com/in/princez-shrestha-b12a0132b/', icon: FaLinkedinIn },
  { label: 'Instagram', handle: '@princezstha', href: 'https://www.instagram.com/princezstha/?hl=en', icon: FaInstagram },
];

const subjects = ['Project inquiry', 'Freelance work', 'Full-time role', 'Collaboration', 'Just saying hi'];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

function useNepalTime() {
  const [now, setNow] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kathmandu',
    });
    const tick = () => setNow(`${fmt.format(new Date())} NPT`);
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, []);
  return now;
}

const inputCls =
  'w-full bg-[#FBFAF4] border border-ink/15 rounded-xl px-4 py-3.5 font-body text-[15px] text-ink placeholder:text-muted/70 focus:outline-none focus:border-maroon focus:ring-4 focus:ring-maroon/10 transition-all duration-300';
const labelCls =
  'font-mono text-[10px] tracking-[0.22em] uppercase text-inksoft mb-2 block';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: subjects[0], message: '' });
  const [status, setStatus] = useState(null); // null | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const nepalTime = useNepalTime();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setStatus('sent');
      setForm({ name: '', email: '', subject: subjects[0], message: '' });
      setTimeout(() => setStatus(null), 8000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setErrorMsg('Something went wrong sending your message. Please email me directly instead.');
    }
  };

  const sending = status === 'sending';
  const sent = status === 'sent';

  return (
    <section id="contact" className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-sand overflow-hidden">
      {/* ambient decoration */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-gold/15 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-8%] h-[380px] w-[380px] rounded-full bg-wine/10 blur-[120px]" />
      </div>

      <div className="relative max-w-8xl mx-auto">
        {/* Section masthead */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="font-display font-bold text-ink leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)', fontFamily: "'Josefin Sans', sans-serif" }}
            >
              Let&apos;s work
              <br />
              <span className="text-wine italic font-light">together.</span>
            </h2>
            <p className="max-w-md font-body text-[15px] md:text-base leading-relaxed text-inksoft" style={{ fontFamily: "'Lato', sans-serif" }}>
              Have a project in mind, a role to fill, or just want to say hello?
              My inbox is always open — I reply to every serious message, usually within a day.
            </p>
          </div>
        </m.div>

        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-8 lg:gap-12 items-start">
          {/* ── Left: direct channels ─────────────────── */}
          <m.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            {/* Availability card */}
            <div className="bg-ink text-paper rounded-2xl p-6 md:p-7 relative overflow-hidden shadow-card">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-wine/40 blur-[70px]" />
              <div className="absolute -left-10 -bottom-16 h-40 w-40 rounded-full bg-gold/20 blur-[60px]" />
              <div className="relative">
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center gap-2.5 bg-white/10 border border-white/15 rounded-full pl-3 pr-4 py-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-paper/90">Available now</span>
                  </span>
                  {nepalTime && (
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-paper/50">{nepalTime}</span>
                  )}
                </div>
                <p className="font-display text-xl md:text-2xl leading-snug font-medium" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                  Currently seeking full-stack roles, freelance projects &amp; collaborations.
                </p>
                <div className="mt-5 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-5">
                  {[
                    ['< 24 hrs', 'Response'],
                    ['Remote / On-site', 'Flexibility'],
                    ['Nepal · NPT', 'Based in'],
                  ].map(([v, k]) => (
                    <div key={k} className="px-4 first:pl-0 last:pr-0">
                      <p className="font-display font-semibold text-sm md:text-[15px] text-paper">{v}</p>
                      <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-paper/50 mt-1">{k}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct channels */}
            <div className="bg-[#FFFEFB] border border-ink/10 rounded-2xl overflow-hidden shadow-card">
              <div className="px-6 pt-5 pb-1 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-inksoft">Direct channels</span>
                <span className="font-mono text-[10px] text-inksoft/60">No forms needed</span>
              </div>
              <div className="divide-y divide-ink/10">
                {/* Email */}
                <div className="group flex items-center gap-4 px-6 py-4 hover:bg-sand/60 transition-colors">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-maroon/10 text-maroon">
                    <FiMail size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted mb-0.5">Email — preferred</p>
                    <a href={`mailto:${EMAIL}`} className="font-body text-[15px] text-ink hover:text-maroon transition-colors truncate block" style={{ fontFamily: "'Lato', sans-serif" }}>
                      {EMAIL}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    title="Copy email"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-ink/15 text-inksoft hover:text-maroon hover:border-maroon/40 hover:bg-maroon/5 transition-all"
                  >
                    {copied ? <FiCheck size={15} className="text-emerald-600" /> : <FiCopy size={15} />}
                  </button>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink text-paper hover:bg-maroon transition-colors"
                    title="Write email"
                  >
                    <FiArrowUpRight size={16} />
                  </a>
                </div>
                {/* Phone */}
                <a href={`tel:${PHONE.replace(/-/g, '')}`} className="flex items-center gap-4 px-6 py-4 hover:bg-sand/60 transition-colors group">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-steel/10 text-steel">
                    <FiPhone size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted mb-0.5">Phone / WhatsApp</p>
                    <p className="font-body text-[15px] text-ink group-hover:text-maroon transition-colors" style={{ fontFamily: "'Lato', sans-serif" }}>{PHONE}</p>
                  </div>
                  <FiArrowUpRight size={16} className="text-muted group-hover:text-maroon group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
                {/* Location */}
                <div className="flex items-center gap-4 px-6 py-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-brass">
                    <FiMapPin size={18} />
                  </span>
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted mb-0.5">Location</p>
                    <p className="font-body text-[15px] text-ink" style={{ fontFamily: "'Lato', sans-serif" }}>{LOCATION}</p>
                  </div>
                  <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] text-inksoft bg-sand border border-ink/10 rounded-full px-3 py-1.5">
                    <FiClock size={12} /> UTC +5:45
                  </span>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div>
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-inksoft block mb-3 px-1">Find me elsewhere</span>
              <div className="grid grid-cols-3 gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group bg-[#FFFEFB] border border-ink/10 rounded-2xl px-3 py-5 flex flex-col items-center gap-2 hover:border-maroon/40 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                  >
                    <s.icon className="text-xl text-ink group-hover:text-maroon transition-colors" />
                    <span className="font-body text-xs font-semibold text-ink" style={{ fontFamily: "'Lato', sans-serif" }}>{s.label}</span>
                    <span className="font-mono text-[10px] text-muted truncate max-w-full">{s.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </m.div>

          {/* ── Right: letter form ────────────────────── */}
          <m.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <m.form
              onSubmit={handleSubmit}
              {...fadeUp}
              className="relative bg-[#FFFEFB] border border-ink/10 rounded-2xl shadow-card overflow-hidden"
            >
              {/* ticket header */}
              <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-dashed border-ink/15 bg-sand/50">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-paper">
                    <FiSend size={15} />
                  </span>
                  <div>
                    <p className="font-display font-semibold text-ink text-[15px] leading-tight" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>Write me a letter</p>
                    <p className="font-mono text-[10px] text-muted tracking-[0.12em] uppercase">Average reply — under 24 hours</p>
                  </div>
                </div>
                <span className="hidden sm:inline-block font-mono text-[9px] tracking-[0.14em] uppercase text-maroon border-[1.5px] border-maroon/60 rounded-md px-2.5 py-1.5 rotate-[-4deg]">
                  Postage<br />paid ✦
                </span>
              </div>

              <div className="p-6 md:p-8 space-y-5">
                {sent ? (
                  <div className="text-center py-8">
                    <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200">
                      <FiCheck size={24} className="text-emerald-600" />
                    </span>
                    <h3 className="font-display font-semibold text-xl text-ink mb-2" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>Message sent — thank you.</h3>
                    <p className="font-body text-sm text-inksoft max-w-sm mx-auto leading-relaxed" style={{ fontFamily: "'Lato', sans-serif" }}>
                      I&apos;ve received your letter and I&apos;ll get back to you within 24 hours.
                      For anything urgent, email me directly at {EMAIL}.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus(null)}
                      className="mt-6 font-mono text-[11px] tracking-[0.18em] uppercase text-maroon hover:text-ink transition-colors"
                    >
                      Write another →
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className={labelCls}>Your name *</label>
                        <input
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          autoComplete="name"
                          placeholder="Jane Cooper"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className={labelCls}>Email address *</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          autoComplete="email"
                          placeholder="jane@company.com"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className={labelCls}>What&apos;s this about?</label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {subjects.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setForm({ ...form, subject: s })}
                            className={`font-body text-xs px-3.5 py-2 rounded-full border transition-all duration-300 ${
                              form.subject === s
                                ? 'bg-ink text-paper border-ink'
                                : 'bg-transparent text-inksoft border-ink/15 hover:border-maroon/50 hover:text-maroon'
                            }`}
                            style={{ fontFamily: "'Lato', sans-serif" }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                      <input type="hidden" name="subject" value={form.subject} />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="message" className={`${labelCls} !mb-0`}>Your message *</label>
                        <span className="font-mono text-[10px] text-muted">{form.message.length}/1000</span>
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        maxLength={1000}
                        placeholder="Hi Prince — I'd love to talk about… timeline, budget, goals…"
                        className={`${inputCls} resize-none min-h-[132px] leading-relaxed`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="group w-full flex items-center justify-center gap-2.5 bg-ink text-paper font-display font-semibold py-4 rounded-xl hover:bg-maroon transition-all duration-300 disabled:opacity-60 disabled:cursor-wait text-[15px] tracking-wide shadow-button"
                      style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                    >
                      {sending ? (
                        <>
                          <span className="h-4 w-4 rounded-full border-2 border-paper/30 border-t-paper animate-spin" />
                          Sealing &amp; sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <FiArrowUpRight size={17} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </button>

                    {status === 'error' && (
                      <p className="font-body text-[13px] text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-center" style={{ fontFamily: "'Lato', sans-serif" }}>
                        {errorMsg}
                      </p>
                    )}

                    <p className="font-mono text-[10px] text-muted/80 text-center tracking-wide">
                      No spam, no newsletters — your details stay private.
                    </p>
                  </>
                )}
              </div>
            </m.form>

            {/* Interests */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-5 bg-transparent"
            >
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-inksoft block mb-3 px-1">
                Currently interested in
              </span>
              <div className="flex flex-wrap gap-2">
                {interests.map(({ label, icon: Icon }) => (
                  <a
                    key={label}
                    href={`mailto:${EMAIL}?subject=${encodeURIComponent(`RE: ${label}`)}`}
                    className="group inline-flex items-center gap-2 font-body text-[13px] text-ink/70 bg-[#FFFEFB] border border-ink/10 pl-3 pr-3.5 py-2.5 rounded-full hover:border-maroon/50 hover:text-maroon hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    <Icon size={14} className="text-muted group-hover:text-maroon transition-colors" />
                    {label}
                  </a>
                ))}
              </div>
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  );
}

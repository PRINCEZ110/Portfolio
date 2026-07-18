import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Phone, Copy, Check, ArrowUpRight } from 'lucide-react';

const socials = [
  { label: 'GitHub', href: 'https://github.com/PRINCEZ110', icon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/princez-shrestha-b12a0132b/', icon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg> },
  { label: 'Instagram', href: 'https://www.instagram.com/princezstha/?hl=en', icon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg> },
];

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'princezstha6110@gmail.com', href: 'mailto:princezstha6110@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+977-9825046110' },
  { icon: MapPin, label: 'Location', value: 'Nepal, Itahari' },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="flex-shrink-0 w-8 h-8 rounded-lg bg-clay border border-border/50 flex items-center justify-center hover:bg-gold/10 hover:border-gold/30 transition-all duration-300 group"
      aria-label={`Copy ${text}`}
    >
      {copied ? (
        <Check size={12} className="text-green-500" />
      ) : (
        <Copy size={12} className="text-muted group-hover:text-gold transition-colors" />
      )}
    </button>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
      setErrorMsg('Failed to send. Please try again.');
    }
  };

  return (
    <section id="contact" className="px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-clay relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-gold/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-8xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label"
        >
          <span /><span>Get in Touch</span>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-14 lg:gap-20">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2"
          >
            <h2
              className="font-display font-bold text-slate leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
            >
              Let's build something{' '}
              <span className="text-wine">great together.</span>
            </h2>

            <p className="font-body text-gray/70 text-[15px] leading-relaxed max-w-sm mb-10">
              Whether you have a project in mind, a collaboration idea, or just want to say hello — I'd love to hear from you.
            </p>

            {/* Response time badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-[#E8E5D8] rounded-full px-4 py-2 mb-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="font-mono text-[9px] tracking-wider text-muted">Response within 24h</span>
            </div>

            {/* Contact info cards */}
            <div className="space-y-3">
              {contactInfo.map((info) => {
                const Tag = info.href ? 'a' : 'div';
                return (
                  <Tag
                    key={info.label}
                    href={info.href}
                    className="flex items-center gap-4 bg-white border border-[#E8E5D8] rounded-xl px-5 py-4 hover:border-gold/30 hover:shadow-soft transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-clay border border-border/50 flex items-center justify-center flex-shrink-0">
                      <info.icon size={16} className="text-gold" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase block">{info.label}</span>
                      <span className="font-body text-sm text-slate block truncate">{info.value}</span>
                    </div>
                    <CopyButton text={info.value} />
                  </Tag>
                );
              })}
            </div>

            {/* Socials */}
            <div className="mt-10">
              <span className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase block mb-4">Find me online</span>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-lg bg-white border border-[#E8E5D8] flex items-center justify-center hover:border-gold/30 hover:bg-gold/5 hover:-translate-y-0.5 transition-all duration-300 group"
                    aria-label={s.label}
                  >
                    <s.icon className="text-muted group-hover:text-gold transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white border border-[#E8E5D8] rounded-2xl p-8 md:p-10 space-y-6 shadow-card"
            >
              <div>
                <span className="font-mono text-[10px] text-gold tracking-[0.15em] uppercase block mb-1">Send a message</span>
                <h3 className="font-display font-semibold text-slate text-lg">Let's start a conversation</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase block mb-1.5">Name</label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full bg-clay border border-[#E8E5D8] rounded-lg px-4 py-3 font-body text-sm text-slate focus:outline-none focus:border-gold/40 focus:bg-white transition-all duration-300 placeholder:text-border/60"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase block mb-1.5">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full bg-clay border border-[#E8E5D8] rounded-lg px-4 py-3 font-body text-sm text-slate focus:outline-none focus:border-gold/40 focus:bg-white transition-all duration-300 placeholder:text-border/60"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase block mb-1.5">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project, idea, or just say hi..."
                  className="w-full bg-clay border border-[#E8E5D8] rounded-lg px-4 py-3 font-body text-sm text-slate focus:outline-none focus:border-gold/40 focus:bg-white transition-all duration-300 placeholder:text-border/60 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group w-full bg-slate text-white font-display font-semibold py-4 rounded-xl hover:bg-gold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide flex items-center justify-center gap-2"
              >
                {status === 'sending' ? (
                  <>Sending<span className="animate-ping-slow inline-block">...</span></>
                ) : status === 'sent' ? (
                  <>✓ Message sent! Check your inbox.</>
                ) : (
                  <>Send Message <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></>
                )}
              </button>

              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-body text-xs text-red-400 text-center"
                >
                  {errorMsg}
                </motion.p>
              )}
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { m } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedinIn, FaInstagram, FaReact } from 'react-icons/fa';
import { LuCode, LuPalette, LuBookOpen, LuGitFork } from 'react-icons/lu';

const interests = [
  { label: 'React Development', icon: FaReact },
  { label: 'Full-Stack Projects', icon: LuCode },
  { label: 'UI/UX Design', icon: LuPalette },
  { label: 'Academic Collaboration', icon: LuBookOpen },
  { label: 'Open Source', icon: LuGitFork },
];

const socials = [
  { label: 'GitHub', href: 'https://github.com/PRINCEZ110', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/princez-shrestha-b12a0132b/', icon: FaLinkedinIn },
  { label: 'Instagram', href: 'https://www.instagram.com/princezstha/?hl=en', icon: FaInstagram },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

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
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setErrorMsg('Failed to send. Please try again.');
    }
  };

  return (
    <section id="contact" className="px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-[#F9F8F4]">
      <div className="max-w-8xl mx-auto">
        {/* Section label */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-14"
        >
          <span className="w-8 h-px bg-wine" />
          <span className="text-xs text-wine tracking-[0.15em] uppercase" style={{ fontFamily: "'Lato', sans-serif" }}>Contact</span>
        </m.div>

        <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-start">
          {/* Left: heading + info */}
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display font-bold text-slate leading-[1.05] mb-6" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontFamily: "'Josefin Sans', sans-serif" }}>
              Let's work<br />
              <span className="text-wine">together.</span>
            </h2>

            <p className="font-body text-gray text-[15px] md:text-[16px] leading-relaxed max-w-md mb-10" style={{ fontFamily: "'Lato', sans-serif" }}>
              I'm always open to new projects, collaborations, and interesting conversations.
            </p>

            {/* Direct contact cards */}
            <div className="space-y-3">
              <a
                href="mailto:princezstha6110@gmail.com"
                className="flex items-center justify-between bg-white border border-black rounded-xl px-5 py-4 hover:border-wine hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 group"
              >
                <div>
                  <span className="font-mono text-[10px] text-muted tracking-[0.15em] uppercase block mb-0.5">Email</span>
                  <span className="font-body text-sm text-slate">princezstha6110@gmail.com</span>
                </div>
                <span className="text-wine opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity text-sm">→</span>
              </a>
              <div className="flex items-center justify-between bg-white border border-black rounded-xl px-5 py-4">
                <div>
                  <span className="font-mono text-[10px] text-muted tracking-[0.15em] uppercase block mb-0.5">Phone</span>
                  <span className="font-body text-sm text-slate">+977-9825046110</span>
                </div>
              </div>
              <div className="flex items-center justify-between bg-white border border-black rounded-xl px-5 py-4">
                <div>
                  <span className="font-mono text-[10px] text-muted tracking-[0.15em] uppercase block mb-0.5">Location</span>
                  <span className="font-body text-sm text-slate">Nepal, Itahari</span>
                </div>
              </div>
            </div>

            {/* Interest tags */}
            <div className="mt-10">
              <span className="font-mono text-[10px] text-muted tracking-[0.15em] uppercase block mb-4">I'm interested in</span>
              <div className="flex flex-wrap gap-2.5">
                {interests.map(({ label, icon: Icon }) => (
                  <a
                    key={label}
                    href={`mailto:princezstha6110@gmail.com?subject=${encodeURIComponent('RE: ' + label)}`}
                    className="font-body text-xs text-slate/70 bg-white border border-black px-4 py-2 rounded-lg hover:border-wine hover:text-wine active:border-wine active:text-wine transition-all duration-300 flex items-center gap-1.5 group"
                  >
                    <Icon className="text-sm" />
                    {label}
                    <span className="opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity text-[10px]">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </m.div>

          {/* Right: form + socials */}
          <m.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <m.form
              onSubmit={handleSubmit}
              {...fadeUp}
              className="bg-white border border-black rounded-xl p-6 md:p-8 space-y-5 mb-6"
            >
              <span className="font-mono text-[10px] text-black tracking-[0.15em] uppercase block">Send a message</span>

              <div>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full bg-[#F9F8F4] border border-black rounded-lg px-4 py-3 font-body text-base text-slate focus:outline-none focus:border-gold/40 transition-all duration-300 placeholder:text-border"
                />
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full bg-[#F9F8F4] border border-black rounded-lg px-4 py-3 font-body text-base text-slate focus:outline-none focus:border-gold/40 transition-all duration-300 placeholder:text-border"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full bg-[#F9F8F4] border border-black rounded-lg px-4 py-3 font-body text-base text-slate focus:outline-none focus:border-gold/40 transition-all duration-300 placeholder:text-border resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-slate text-white font-display font-semibold py-3.5 rounded-lg hover:bg-wine transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide"
              >
                {status === 'sending'
                  ? 'Sending...'
                  : status === 'sent'
                  ? '✓ Message sent! Check your inbox.'
                  : 'Send Message →'}
              </button>

              {status === 'error' && (
                <p className="font-body text-xs text-red-400 text-center">{errorMsg}</p>
              )}
            </m.form>

            {/* Socials */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="font-mono text-[10px] text-muted tracking-[0.15em] uppercase block mb-4">Socials</span>
              <div className="grid grid-cols-3 gap-3">
                {socials.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center gap-2.5 bg-white border border-black rounded-xl px-3 py-5 hover:border-wine hover:bg-wine/5 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(128,0,32,0.08)] transition-all duration-300 group"
                  >
                    <s.icon className="text-2xl text-slate group-hover:text-wine transition-colors" />
                    <span className="font-body text-[11px] text-slate/70 group-hover:text-wine tracking-wide transition-colors">{s.label}</span>
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

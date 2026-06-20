import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const interests = [
  'React Development',
  'Full-Stack Projects',
  'UI/UX Design',
  'Academic Collaboration',
  'Open Source',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'sent' | 'error'
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
    } catch {
      setStatus('error');
      setErrorMsg('Failed to send. Please try again.');
    }
  };

  return (
    <section id="contact" className="px-6 md:px-12 lg:px-20 py-24 md:py-32">
      <div className="max-w-8xl mx-auto">
        <div className="mb-14">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">get in touch</span>
          <h2
            className="font-display font-bold text-snow mt-3 leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
          >
            Let's<br />
            <span className="text-accent">Connect.</span>
          </h2>
          <p className="font-body text-muted mt-4 max-w-md leading-relaxed">
            I'm always open to new projects, collaborations, and interesting conversations.
          </p>
        </div>

        {/* Interest tag buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          {interests.map(item => (
            <a
              key={item}
              href={`mailto:princezstha6110@gmail.com?subject=${encodeURIComponent('RE: ' + item)}`}
              className="group border border-border px-5 py-2.5 font-display text-sm text-muted hover:border-accent hover:text-accent transition-all duration-200 flex items-center gap-2"
            >
              {item}
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
            </a>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <div>
              <label className="font-mono text-xs text-muted tracking-widest uppercase block mb-2">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full bg-card border border-border px-4 py-3 font-body text-snow text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-border"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-muted tracking-widest uppercase block mb-2">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full bg-card border border-border px-4 py-3 font-body text-snow text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-border"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-muted tracking-widest uppercase block mb-2">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full bg-card border border-border px-4 py-3 font-body text-snow text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-border resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-accent text-ink font-display font-bold py-4 hover:bg-snow transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'sending'
                ? 'Sending...'
                : status === 'sent'
                ? '✓ Message sent! Check your inbox.'
                : 'Send Message →'}
            </button>

            {status === 'error' && (
              <p className="font-mono text-xs text-red-400 text-center">{errorMsg}</p>
            )}
          </motion.form>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-3">direct contact</span>
              <a href="mailto:princezstha6110@gmail.com" className="font-display text-snow text-lg hover:text-accent transition-colors">
                princezstha6110@gmail.com
              </a>
            </div>
            <div>
              <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-3">phone</span>
              <p className="font-body text-muted">+977-9825046110</p>
            </div>
            <div>
              <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-3">country / city</span>
              <p className="font-body text-muted">Nepal, Itahari</p>
            </div>
            <div>
              <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-3">socials</span>
              <div className="space-y-2">
                {[
                  { label: 'GitHub', href: 'https://github.com/PRINCEZ110' },
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/princez-shrestha-b12a0132b/' },
                  { label: 'Instagram', href: 'https://www.instagram.com/princezstha/?hl=en' },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between border border-border px-4 py-3 hover:border-accent group transition-colors"
                  >
                    <span className="font-display text-snow text-sm">{s.label}</span>
                    <span className="text-muted group-hover:text-accent transition-colors">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

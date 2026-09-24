/* Shared reveal language — three primitives, nothing else.
   MaskReveal: masked line/word rise (editorial display type)
   RiseIn:     quiet fade-rise (body copy, meta, small UI)
   DrawnRule:  hairline that draws itself (section dividers)
   All respect reduced motion; all are LazyMotion-safe (`m`). */
import { m, useReducedMotion } from 'framer-motion';
import { EASE } from './ease';

export function MaskReveal({ children, className, delay = 0, as: Tag = 'span' }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{children}</span>;
  const MotionTag = Tag === 'h2' ? m.h2 : Tag === 'p' ? m.p : m.span;
  return (
    <span className={`ed-mask ${className ?? ''}`}>
      <MotionTag
        initial={{ y: '110%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </MotionTag>
    </span>
  );
}

export function RiseIn({ children, className, delay = 0, y = 24 }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

export function DrawnRule({ className = '', heavy = false }) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={heavy ? `h-[3px] bg-current ${className}` : `h-px bg-current ${className}`}
      style={{ transformOrigin: 'left center', opacity: 0.25 }}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, ease: EASE }}
    />
  );
}

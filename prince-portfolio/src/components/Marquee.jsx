const FADE = 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)';

export default function Marquee({ items, speed = 30 }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden bg-black select-none">
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gold/50" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gold/50" />

      <div
        className="overflow-hidden py-4 md:py-5"
        style={{ maskImage: FADE, WebkitMaskImage: FADE }}
      >
        <div
          className="marquee-inner flex items-center gap-7 md:gap-10 whitespace-nowrap w-max"
          style={{ animationDuration: `${speed}s` }}
        >
          {doubled.map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-7 md:gap-10">
              <span
                className="font-bold uppercase text-wine leading-none tracking-[0.03em] transition-colors duration-300 hover:text-clay"
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontSize: 'clamp(1.3rem, 2.3vw, 1.85rem)',
                }}
              >
                {item}
              </span>
              <span
                aria-hidden="true"
                className="inline-flex h-8 w-8 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-md border border-wine/50 bg-black"
              >
                <span
                  className="font-bold leading-none text-wine"
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: 'clamp(0.72rem, 1.1vw, 0.88rem)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  PS
                </span>
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

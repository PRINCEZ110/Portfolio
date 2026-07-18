export default function Marquee({ items, speed = 24 }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border/60 py-3.5 bg-white/80">
      <div
        className="marquee-inner flex gap-12 whitespace-nowrap w-max"
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="font-mono text-[10px] text-wine tracking-[0.2em] uppercase font-medium">{item}</span>
            <span className="text-gold/40 text-base">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

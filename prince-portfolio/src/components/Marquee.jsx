export default function Marquee({ items, speed = 18 }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border py-3 bg-white">
      <div
        className="marquee-inner flex gap-10 whitespace-nowrap w-max"
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10">
            <span className="font-mono text-xs text-[#8B1A2B] tracking-widest uppercase" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
              {item}
            </span>
            <span className="text-[#D4AF37]/60 text-lg">
              <img src="https://pixelarticons.com/svg/skull.svg" alt="Skull Icon" className="w-6 h-6"  />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

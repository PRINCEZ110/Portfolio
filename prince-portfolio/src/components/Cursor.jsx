import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      const x = e.clientX, y = e.clientY;
      dot.current.style.left = x + 'px';
      dot.current.style.top = y + 'px';
      ring.current.style.left = x + 'px';
      ring.current.style.top = y + 'px';
    };

    const grow = () => {
      ring.current.style.width = '60px';
      ring.current.style.height = '60px';
      ring.current.style.borderColor = '#C8FF00';
    };
    const shrink = () => {
      ring.current.style.width = '36px';
      ring.current.style.height = '36px';
      ring.current.style.borderColor = 'rgba(200,255,0,0.5)';
    };

    window.addEventListener('mousemove', moveCursor);

    const attach = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', grow);
        el.addEventListener('mouseleave', shrink);
      });
    };

    const detach = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.removeEventListener('mouseenter', grow);
        el.removeEventListener('mouseleave', shrink);
      });
    };

    attach();

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      detach();
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dot} />
      <div className="cursor-ring" ref={ring} />
    </>
  );
}

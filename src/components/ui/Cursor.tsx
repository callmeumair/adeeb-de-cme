'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const frameRef = useRef<number>(0);
  const [isTouch, setIsTouch] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    if (!isVisible) setIsVisible(true);
  }, [isVisible]);

  const handleMouseEnterInteractive = useCallback(() => setIsHovering(true), []);
  const handleMouseLeaveInteractive = useCallback(() => setIsHovering(false), []);

  useEffect(() => {
    const touchQuery = window.matchMedia('(pointer: coarse)');
    if (touchQuery.matches) {
      setIsTouch(true);
      return;
    }

    const handleTouchChange = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    touchQuery.addEventListener('change', handleTouchChange);

    const interactiveSelector =
      'a, button, [role="button"], input, select, textarea, [data-cursor="pointer"], label';

    const addListeners = () => {
      const elements = document.querySelectorAll(interactiveSelector);
      elements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };

    const observer = new MutationObserver(() => {
      addListeners();
    });

    addListeners();
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', handleMouseMove);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const animate = () => {
      const lerp = 0.12;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      touchQuery.removeEventListener('change', handleTouchChange);
      observer.disconnect();
    };
  }, [handleMouseMove, handleMouseEnterInteractive, handleMouseLeaveInteractive]);

  if (isTouch) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: isHovering ? 14 : 8,
          height: isHovering ? 14 : 8,
          backgroundColor: '#c9a84c',
          borderRadius: '50%',
          mixBlendMode: 'difference',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
          willChange: 'transform',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          width: isHovering ? 54 : 36,
          height: isHovering ? 54 : 36,
          border: '1.5px solid #c9a84c',
          borderRadius: '50%',
          mixBlendMode: 'difference',
          opacity: isVisible ? 0.5 : 0,
          transition:
            'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}

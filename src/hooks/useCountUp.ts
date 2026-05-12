import { useEffect, useRef, useState } from 'react';

export function useCountUp(end: number, duration = 2000, trigger = true) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * (end - start));
      setValue(current);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setValue(end);
      }
    };

    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [end, duration, trigger]);

  return value;
}

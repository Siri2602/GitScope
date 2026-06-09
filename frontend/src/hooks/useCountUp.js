import { useState, useEffect, useRef } from 'react';

export const useCountUp = (target, duration = 1200, start = 0) => {
  const [value, setValue] = useState(start);
  const raf = useRef(null);

  useEffect(() => {
    if (target === 0 || target == null) {
      setValue(0);
      return;
    }
    const startTime = performance.now();
    const diff = target - start;

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start + diff * eased));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };

    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration, start]);

  return value;
};

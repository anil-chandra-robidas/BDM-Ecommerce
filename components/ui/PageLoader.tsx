'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const [count, setCount] = useState(1);

  // Smooth numerical count-up from 1 to 100 on initial load and route changes
  useEffect(() => {
    setIsLoading(true);
    setShouldRender(true);
    setCount(1);

    const startTime = performance.now();
    const duration = 600; // total duration in ms
    let animationFrameId: number;

    const animateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);

      // Easing curve (ease-out cubic)
      const easeOutValue = 1 - Math.pow(1 - progressRatio, 3);
      const currentCount = Math.max(1, Math.min(100, Math.floor(easeOutValue * 100)));

      setCount(currentCount);

      if (progressRatio < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setCount(100);

        // Once 100% is reached, trigger finish
        setTimeout(() => {
          setIsLoading(false);

          // Scroll to top when loading completes
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });

          // Wait for curtain slide animation (700ms) before unmounting
          setTimeout(() => {
            setShouldRender(false);
          }, 750);
        }, 100);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [pathname, searchParams]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        isLoading
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0'
      }`}
      aria-hidden={!isLoading}
    >
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Clean Counter 1 - 100 Display (Pure Solid Black Background) */}
        <div className="mb-4 flex items-baseline justify-center">
          <span className="font-mono text-5xl sm:text-6xl font-black text-white tabular-nums tracking-tight">
            {count}
          </span>
          <span className="font-sans text-2xl sm:text-3xl font-bold text-white/60 ml-1">
            %
          </span>
        </div>

        {/* Minimalist Progress Line */}
        <div className="w-52 sm:w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-white rounded-full transition-all duration-75 ease-out"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function PageLoader() {
  return (
    <Suspense fallback={null}>
      <LoaderContent />
    </Suspense>
  );
}

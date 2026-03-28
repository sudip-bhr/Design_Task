import { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const statsData = [
  {
    id: 'all',
    countNum: 23,
    title: 'All Courses',
    subtitle: 'courses you\'re powering through right now.',
  },
  {
    id: 'upcoming',
    countNum: 5,
    title: 'Upcoming Courses',
    subtitle: 'exciting new courses waiting to boost your skills.',
  },
  {
    id: 'ongoing',
    countNum: 10,
    title: 'Ongoing Courses',
    subtitle: 'currently happening—don\'t miss out on the action!',
  }
];

// --- Enhancement #4: Animated Counter Hook ---
function useAnimatedCounter(target: number, isActive: boolean, duration = 1200) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!isActive) {
      setCount(0);
      return;
    }

    let start: number | null = null;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isActive, target, duration]);

  return count;
}

// --- Enhancement #2: Staggered icon data ---
const iconConfigs = [
  { bg: 'bg-[#61DAFB]', rotate: '-rotate-12', rounded: 'rounded-[16px]', delay: 0 },
  { bg: 'bg-white', rotate: 'rotate-6', rounded: 'rounded-[16px]', delay: 100 },
  { bg: 'bg-emerald-500', rotate: 'rotate-12', rounded: 'rounded-[16px]', delay: 200 },
  { bg: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500', rotate: '-rotate-6', rounded: 'rounded-full', delay: 300 },
];

function FloatingIcons({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6 px-6 sm:px-[56px] mt-[28px] pointer-events-none">
      {iconConfigs.map((icon, i) => (
        <div
          key={i}
          className={`w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] ${icon.bg} ${icon.rounded} transform ${icon.rotate}
            shadow-lg flex items-center justify-center animate-float
            transition-all duration-500 ease-out
            ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{
            animationDelay: `${i * 0.3}s`,
            transitionDelay: isActive ? `${icon.delay + 200}ms` : '0ms',
          }}
        >
          {i === 0 && (
            <div className="w-9 h-9 rounded-full border-[3px] border-white/60 relative flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          )}
          {i === 1 && (
            <>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-400 to-orange-400 absolute bottom-2 right-2 flex items-center justify-center shadow-sm">
                <span className="text-white text-sm font-bold">♥</span>
              </div>
              <div className="w-7 h-7 rounded bg-blue-400 text-white flex items-center justify-center absolute top-2 left-2 text-[13px] font-bold">#</div>
            </>
          )}
          {i === 2 && (
            <span className="text-white text-[18px] sm:text-[22px] font-bold -rotate-12 tracking-tight">VueJS</span>
          )}
          {i === 3 && (
            <div className="w-10 h-[8px] bg-yellow-200 rotate-45 rounded overflow-hidden relative">
              <div className="absolute right-0 w-3 h-full bg-gray-700" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function Stats() {
  const [activeId, setActiveId] = useState<string>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Scroll Reveal
  const headerReveal = useIntersectionObserver({ threshold: 0.1 });
  const cardsReveal = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section className="relative w-full bg-white max-w-[1216px] mx-auto py-16 sm:py-24 px-4 font-outfit">
      
      {/* Injecting the Key-Turn Micro-Animation CSS */}
      <style>{`
        @keyframes key-turn-unlatch {
          0% { transform: scale(1) rotate(0deg); }
          30% { transform: scale(0.96) rotate(-2deg); }
          70% { transform: scale(0.96) rotate(2deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .animate-key-turn {
          animation: key-turn-unlatch 150ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      {/* --- Enhancement #7: Section Heading --- */}
      <div 
        ref={headerReveal.ref as React.RefObject<HTMLDivElement>}
        className={`text-center mb-12 sm:mb-16 reveal ${headerReveal.isVisible ? 'active' : ''}`}
      >
        <h2 className="font-nohemi font-bold text-3xl sm:text-4xl md:text-[48px] text-[#1A1A1A] leading-tight mb-3">
          Stats Overview
        </h2>
        <p className="font-outfit text-[#666] text-base sm:text-lg max-w-md mx-auto leading-relaxed">
          Track your learning journey with real-time course statistics and milestones.
        </p>
      </div>

      {/* --- Cards Container (Enhancement #9: Responsive) --- */}
      <div 
        ref={cardsReveal.ref as React.RefObject<HTMLDivElement>}
        className={`flex flex-col md:flex-row justify-center items-center md:items-stretch gap-5 sm:gap-8 reveal ${cardsReveal.isVisible ? 'active' : ''}`}
        style={{ transitionDelay: '200ms' }}
      >
        {statsData.map((stat) => {
          const isActive = activeId === stat.id;
          const isHovered = hoveredId === stat.id;
          const animatedCount = useAnimatedCounter(stat.countNum, isActive);
          const displayCount = String(animatedCount).padStart(2, '0');

          return (
            <div
              key={stat.id}
              className="relative flex-shrink-0"
              onMouseEnter={() => setHoveredId(stat.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* "Click me" tooltip — only on hover of inactive cards */}
              {!isActive && isHovered && (
                <div className="absolute -top-[52px] left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center z-50 animate-bounce">
                  <span className="font-outfit text-[#2B2B2B] text-base font-medium whitespace-nowrap transform -rotate-6">Click me!</span>
                  <svg width="28" height="28" viewBox="0 0 50 50" fill="none" className="mt-0.5">
                    <path d="M25 5 L25 35 M25 35 L15 25 M25 35 L35 25" stroke="#2B2B2B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              {/* Card — Enhancement #1: scale pop on active + Enhancement #9: responsive widths */}
              <div
                onClick={() => setActiveId(stat.id)}
                className={`relative h-[380px] sm:h-[420px] md:h-[461px] rounded-[24px] sm:rounded-[32px] overflow-hidden cursor-pointer
                  transition-all duration-[900ms]
                  ${isActive
                    ? 'w-[320px] sm:w-[440px] md:w-[592px] bg-[#C33241] shadow-2xl animate-key-turn'
                    : 'w-[320px] sm:w-[220px] md:w-[280px] bg-[#C33241] shadow-md hover:shadow-lg'
                  }`}
                style={{ 
                  // Heavy mechanical swing cubic-bezier (negative wind-up, aggressive overshoot)
                  transitionProperty: 'width, background-color, box-shadow, transform',
                  transitionDelay: isActive ? '150ms' : '0ms', // 150ms delay for the key-turn to finish
                  transitionTimingFunction: 'cubic-bezier(0.5, -0.35, 0.15, 1.25)',
                  transform: isActive ? 'scale(1.02) rotate(0.5deg)' : 'scale(1) rotate(0deg)',
                  perspective: '1400px', // Required for the 3D content flip
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Pink overlay for inactive state */}
                <div
                  className={`absolute rounded-full bg-[#F9EBEC] pointer-events-none
                    transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${isActive
                      ? 'w-[15px] h-[15px] left-[-8px] top-[453px] opacity-0'
                      : 'w-[700px] h-[700px] left-[-200px] top-[-120px] opacity-100'
                    }`}
                />

                {/* ===== ACTIVE STATE CONTENT ===== */}
                <div
                  className="absolute inset-0 flex flex-col"
                  style={{
                    opacity: isActive ? 1 : 0,
                    // The "Hinge Reveal": Starts folded 90deg flat into the ceiling, then drops and locks into place
                    transform: isActive ? 'rotateX(0deg) scale(1) translateY(0)' : 'rotateX(90deg) scale(0.9) translateY(-60px)',
                    transformOrigin: 'top center',
                    transition: 'all 0.85s cubic-bezier(0.3, 1.2, 0.4, 1)', // Bouncy follow-through drop
                    transitionDelay: isActive ? '0.35s' : '0s', // Waits 150ms (key-turn) + 200ms (card wind-up swing)
                    pointerEvents: isActive ? 'auto' : 'none',
                    zIndex: isActive ? 10 : 0
                  }}
                >
                  {/* Top row: View all Courses button */}
                  <div className="flex justify-end pt-[28px] sm:pt-[36px] pr-[28px] sm:pr-[36px]">
                    <button className="group flex items-center gap-2 text-[#F9EBEC] font-semibold text-[15px] sm:text-[17px] transition-all whitespace-nowrap overflow-hidden">
                      <span className="relative inline-block hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#F9EBEC] after:transition-all after:duration-300">
                        View all Courses
                      </span>
                      <span className="p-1.5 bg-white/10 rounded-full transition-transform group-hover:translate-x-1 group-active:scale-90">→</span>
                    </button>
                  </div>

                  {/* Middle: Staggered Floating tech icons (Enhancement #2) */}
                  <FloatingIcons isActive={isActive} />

                  {/* Bottom: Number + Title + Subtitle */}
                  <div className="mt-auto px-[28px] sm:px-[48px] pb-[32px] sm:pb-[48px] flex items-end gap-[16px] sm:gap-[20px]">
                    {/* Animated number (Enhancement #4) */}
                    <div className="relative flex-shrink-0 leading-none">
                      <span className="font-nohemi font-bold text-[96px] sm:text-[112px] md:text-[128px] text-[#F9EBEC] tracking-tighter leading-none">
                        {displayCount}
                      </span>
                      <span className="font-nohemi font-bold text-[36px] sm:text-[48px] text-[#F9EBEC] absolute -top-1 -right-6 sm:-right-8">
                        +
                      </span>
                    </div>
                    {/* Text block */}
                    <div className="flex flex-col gap-[6px] sm:gap-[8px] pb-[8px] sm:pb-[12px] max-w-[220px]">
                      <h3 className="font-outfit font-bold text-[22px] sm:text-[28px] text-[#F9EBEC] leading-[28px] sm:leading-[34px] m-0 whitespace-nowrap">
                        {stat.title}
                      </h3>
                      <p className="font-outfit text-[14px] sm:text-[16px] text-[#F9EBEC]/85 leading-[20px] sm:leading-[22px] m-0">
                        {stat.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ===== INACTIVE STATE CONTENT ===== */}
                <div
                  className="absolute inset-0 flex flex-col"
                  style={{
                    opacity: !isActive ? 1 : 0,
                    // Trapdoor fall: Immediately swings -90deg back into the floor
                    transform: !isActive ? 'rotateX(0deg) scale(1) translateY(0)' : 'rotateX(-90deg) scale(0.8) translateY(60px)',
                    transformOrigin: 'bottom center',
                    transition: 'all 0.6s cubic-bezier(0.5, -0.35, 0.15, 1)', // Fast aggressive fall mirroring the juggle
                    pointerEvents: !isActive ? 'auto' : 'none',
                    zIndex: !isActive ? 10 : 0
                  }}
                >
                  {/* On mobile inactive: horizontal layout. On md+: vertical rotated text */}
                  <div className="flex-1 flex items-center justify-center relative">
                    {/* Mobile: horizontal text (no rotation) */}
                    <div className="flex md:hidden flex-col items-center gap-2 px-6 text-center">
                      <h3 className="font-outfit font-extrabold text-[24px] text-[#C33241] leading-[30px] m-0">
                        {stat.title}
                      </h3>
                      <p className="font-outfit text-[14px] text-[#C33241]/80 leading-[20px] m-0 max-w-[240px]">
                        {stat.subtitle}
                      </p>
                    </div>
                    {/* Desktop: rotated text */}
                    <div className="hidden md:flex absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2
                      -rotate-90 origin-center flex-col items-start gap-[8px] w-[220px]">
                      <h3 className="font-outfit font-extrabold text-[28px] text-[#C33241] leading-[34px] m-0 whitespace-nowrap">
                        {stat.title}
                      </h3>
                      <p className="font-outfit text-[15px] text-[#C33241]/80 leading-[20px] m-0 max-w-[200px]">
                        {stat.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Bottom: Large number centered */}
                  <div className="flex items-center justify-center pb-[24px] sm:pb-[32px] relative leading-none">
                    <span className="font-nohemi font-bold text-[96px] sm:text-[112px] md:text-[128px] text-[#C33241] tracking-tighter leading-none">
                      {String(stat.countNum).padStart(2, '0')}
                    </span>
                    <span className="font-nohemi font-bold text-[36px] sm:text-[48px] text-[#C33241] absolute top-0 right-[16px] sm:right-[24px]">
                      +
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


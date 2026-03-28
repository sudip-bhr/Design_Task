import React, { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface FeatureCardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bgDefault: string;
  bgHover: string;
  alignment: 'left' | 'right';
  illustrationSrc: string;
  hoverText: string;
  hoverButtonText: string;
  hoverImageSrc?: string;
  hoverImages?: string[];
  uiType?: 'image' | 'avatars';
  index: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  id,
  title,
  subtitle,
  description,
  bgDefault,
  bgHover,
  alignment,
  illustrationSrc,
  hoverText,
  hoverButtonText,
  hoverImageSrc,
  hoverImages,
  uiType,
  index
}) => {
  const [hovered, setHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const isLeftAlign = alignment === 'left';

  // Slider controls
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hoverImages) {
      setActiveIndex((prev: number) => (prev + 1) % hoverImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hoverImages) {
      setActiveIndex((prev: number) => (prev - 1 + hoverImages.length) % hoverImages.length);
    }
  };

  // Button text color per card
  const btnTextColor =
    id === 'clarity' ? '#F45B5B' :
    id === 'learn' ? '#5492A0' :
    id === 'mentor' ? '#6C64A8' : '#A68A61';

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      // REMOVED overflow-hidden to allow illustration bleeding (Req 1)
      className={`relative w-full rounded-[30px] ${index <= 1 ? 'cursor-pointer hover:shadow-2xl' : ''} shadow-lg font-body transition-all duration-500 reveal ${isVisible ? 'active' : ''}`}
      style={{
        backgroundColor: hovered ? bgHover : bgDefault,
        transition: 'background-color 0.4s var(--ease-premium), box-shadow 0.4s var(--ease-premium), transform 0.6s var(--ease-premium)',
        transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
        transform: hovered ? 'scale(1.02) translateY(-4px)' : 'scale(1) translateY(0)',
        aspectRatio: '592 / 341',
      }}
      onMouseEnter={() => { if (index <= 1) setHovered(true) }}
      onMouseLeave={() => { if (index <= 1) setHovered(false) }}
    >

      {/* ===== DEFAULT STATE ===== */}
      <div
        // REMOVED overflow-hidden here as well
        className="absolute inset-0 flex items-center p-6 md:p-12"
        style={{
          opacity: hovered ? 0 : 1,
          transform: hovered ? 'translateY(-20px) scale(0.95)' : 'translateY(0) scale(1)',
          transition: 'opacity 0.4s var(--ease-premium), transform 0.5s var(--ease-premium)',
          pointerEvents: hovered ? 'none' : 'auto',
          zIndex: 10
        }}
      >
        {/* Illustration - Allowed to bleed outside the boundary */}
        <div 
          className="absolute flex items-end pointer-events-none"
          style={{
            bottom: '-10%', // Bleed below
            height: '120%', // Taller than container
            width: '55%',   // Wider than container
            [isLeftAlign ? 'right' : 'left']: '-5%', // Bleed to the side
            transform: hovered ? 'translateY(-20px) scale(0.95)' : 'translateY(0) scale(1)',
            transition: 'transform 0.6s var(--ease-premium)',
          }}
        >
          <img
            src={illustrationSrc}
            alt=""
            className={`w-full h-full object-contain object-bottom ${!hovered && index <= 1 ? 'animate-float' : ''} ${!hovered && index > 1 ? 'animate-float' : ''} ${index === 1 ? 'scale-[1.35] origin-bottom' : ''}`}
          />
        </div>

        {/* Text Content - Positioned to avoid illustration */}
        <div
          className={`relative z-10 flex flex-col gap-3 md:gap-5 max-w-[50%] ${
            isLeftAlign ? 'mr-auto text-left items-start' : 'ml-auto text-right items-end'
          }`}
        >
          <div className="flex flex-col gap-1 md:gap-2 w-full">
            <h3 className="font-heading font-bold text-2xl md:text-[36px] leading-[1.1] text-white">
              {title}
            </h3>
            <p className="font-body font-medium text-lg md:text-[21px] leading-tight text-white/95">
              {subtitle}
            </p>
          </div>
          <p className="font-body font-normal text-sm md:text-[16px] leading-relaxed text-white/80">
            {description}
          </p>
        </div>
      </div>

      {/* ===== HOVER STATE ===== */}
      <div
        className={`absolute inset-0 flex ${index === 0 ? 'flex-row items-center p-6 md:p-8 gap-4' : 'flex-col p-8 md:p-10'}`}
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0) scale(1)' : 'translateY(40px) scale(1.05)',
          transition: 'opacity 0.5s var(--ease-premium) 0.1s, transform 0.6s var(--ease-premium) 0.05s',
          pointerEvents: hovered ? 'auto' : 'none',
          zIndex: 20
        }}
      >
        {/* ---- Second Card Only: Internal hole-punch arrow buttons ---- */}
        {index === 1 && hoverImages && hoverImages.length > 1 && (
          <>
            {/* Left arrow – nested completely inside the card, styled as a hole-punch */}
            <button
              onClick={prevImage}
              className="absolute z-30 flex items-center justify-center rounded-full bg-white hover:scale-105 active:scale-95 transition-all focus:outline-none text-gray-800"
              style={{
                width: 56,
                height: 56,
                left: 16, // Safely tucked inside the card boundary
                top: '50%',
                transform: 'translateY(-50%)',
                boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.05)',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Right arrow */}
            <button
              onClick={nextImage}
              className="absolute z-30 flex items-center justify-center rounded-full bg-white hover:scale-105 active:scale-95 transition-all focus:outline-none text-gray-800"
              style={{
                width: 56,
                height: 56,
                right: 16, // Safely tucked inside the card boundary
                top: '50%',
                transform: 'translateY(-50%)',
                boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.05)',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        {index === 0 ? (
           // First card: Image bigger at left, text at right
           <>
              <div className="w-[55%] h-full relative flex items-center justify-center">
                 {hoverImages && (
                    <img 
                      src={hoverImages[0]} 
                      alt="" 
                      className="w-[125%] max-w-none h-auto object-contain drop-shadow-2xl rounded-xl -ml-6" 
                    />
                 )}
              </div>
              <div className="w-[45%] flex flex-col justify-center text-left pl-4">
                 <p className="font-heading font-bold text-xl md:text-[28px] leading-[1.2] text-white mb-6">
                   {hoverText}
                 </p>
                 <button
                   className="self-start flex items-center gap-2 bg-white px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl"
                 >
                   <span className="font-body font-bold text-sm" style={{ color: btnTextColor }}>
                       {hoverButtonText}
                   </span>
                 </button>
              </div>
           </>
        ) : (
           // Other cards: text on top, content below
           <>
              <div className="flex flex-col items-center text-center w-full mb-4">
                <p className="font-heading font-bold text-lg md:text-[22px] leading-tight text-white max-w-[80%]">
                  {hoverText}
                </p>
              </div>

              <div className="flex-1 relative flex items-center justify-center w-full">
                  {/* Slider Content */}
                  {uiType === 'image' && hoverImages && (
                    <div className="relative w-full md:w-[75%] h-full flex items-center justify-center">
                      {hoverImages.map((img, idx) => (
                        <div 
                          key={img} 
                          className="absolute inset-0 transition-opacity duration-500 ease-in-out flex items-center justify-center"
                          style={{
                              opacity: activeIndex === idx ? 1 : 0,
                              zIndex: activeIndex === idx ? 1 : 0
                          }}
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-contain drop-shadow-2xl rounded-xl"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Avatars Case */}
                  {uiType === 'avatars' && hoverImageSrc && (
                      <div className="flex flex-col items-center gap-4">
                        <div className="flex-shrink-0 animate-bounce">
                          <img src={hoverImageSrc} className="h-24 md:h-32 drop-shadow-2xl" alt="community members" />
                        </div>
                        <button
                          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl"
                          >
                          <span className="font-body font-bold text-sm" style={{ color: btnTextColor }}>
                              {hoverButtonText}
                          </span>
                        </button>
                      </div>
                  )}
              </div>
           </>
        )}
      </div>

    </div>
  );
};

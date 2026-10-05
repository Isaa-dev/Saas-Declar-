import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showSubtitle = false }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* 
        Exact SVG representation of the Declarô mark from image:
        - Orange "D" outer shape (flat left side with rounded corners, convex rounded right belly)
        - Dark green inner cutout showing two brain hemispheres with 3 lobes each
        - Central 6-point star / asterisk nucleus connecting the hemispheres
      */}
      <div className={`${iconSizes[size]} shrink-0 transition-transform group-hover:scale-105 duration-200`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base Orange "D" silhouette */}
          <path
            d="M 12 12 
               L 48 12 
               C 74 12, 88 28, 88 50 
               C 88 72, 74 88, 48 88 
               L 12 88 
               C 7 88, 4 85, 4 80 
               L 4 20 
               C 4 15, 7 12, 12 12 Z"
            fill="#D97D36"
          />

          {/* Brain Left Hemisphere (3 lobes) in dark green */}
          {/* Top-left lobe */}
          <circle cx="30" cy="33" r="11" fill="#172E22" />
          {/* Middle-left lobe */}
          <circle cx="25" cy="50" r="11.5" fill="#172E22" />
          {/* Bottom-left lobe */}
          <circle cx="30" cy="67" r="11" fill="#172E22" />

          {/* Brain Right Hemisphere (3 lobes) in dark green */}
          {/* Top-right lobe */}
          <circle cx="58" cy="33" r="11" fill="#172E22" />
          {/* Middle-right lobe */}
          <circle cx="63" cy="50" r="11.5" fill="#172E22" />
          {/* Bottom-right lobe */}
          <circle cx="58" cy="67" r="11" fill="#172E22" />

          {/* Vertical central fissure bridging */}
          <rect x="40" y="24" width="8" height="52" rx="4" fill="#172E22" />

          {/* Internal orange asterisk / 6-point star nucleus in center */}
          <g transform="translate(44, 50)">
            {/* 6-point star in orange */}
            <path
              d="M 0 -10 
                 L 2.5 -3.5 
                 L 9 -5 
                 L 4.5 1 
                 L 8 7 
                 L 1.5 5 
                 L 0 10 
                 L -1.5 5 
                 L -8 7 
                 L -4.5 1 
                 L -9 -5 
                 L -2.5 -3.5 Z"
              fill="#D97D36"
            />
          </g>
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1">
          <span className={`${textSizes[size]} font-sans font-bold text-white tracking-tight`}>
            Declarô
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] tracking-wider uppercase font-semibold text-[#A9BEB0] mt-0.5">
            Assistente Fiscal IRPF
          </span>
        )}
      </div>
    </div>
  );
};

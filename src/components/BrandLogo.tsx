import { Link } from 'react-router-dom';

interface BrandLogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  onClick?: () => void;
}

export function BrandLogo({ variant = 'dark', className = '', onClick }: BrandLogoProps) {
  const isLight = variant === 'light';
  const primaryFill = isLight ? '#FAFAF7' : '#102B3F';
  const subtextClass = isLight ? 'text-[#CBD5DC]' : 'text-[#52636C]';
  const wordmarkClass = isLight ? 'text-[#FAFAF7]' : 'text-[#102B3F]';

  return (
    <Link
      to="/"
      onClick={onClick}
      className={`inline-flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#36A89A] ${className}`}
      aria-label="AURELIA Medical Centre — Home"
    >
      <svg
        width="38"
        height="38"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="shrink-0 transition-transform duration-300 group-hover:scale-[1.03]"
      >
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="4"
          stroke={isLight ? 'rgba(250,250,247,0.22)' : 'rgba(16,43,63,0.18)'}
          strokeWidth="1"
        />
        <path
          d="M20 8.5L29.5 30H26.1L23.9 24.7H16.1L13.9 30H10.5L20 8.5ZM17.2 21.8H22.8L20 15.1L17.2 21.8Z"
          fill={primaryFill}
        />
        <circle cx="20" cy="6.4" r="1.4" fill="#C7A76C" />
        <path d="M13 33.2H27" stroke="#C7A76C" strokeWidth="1.2" strokeLinecap="round" />
      </svg>

      <div className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.2rem] sm:text-[1.32rem] font-semibold tracking-[0.18em] ${wordmarkClass}`}
        >
          AURELIA
        </span>
        <span
          className={`text-[0.62rem] font-medium tracking-[0.26em] uppercase mt-1 ${subtextClass}`}
        >
          Medical Centre
        </span>
      </div>
    </Link>
  );
}


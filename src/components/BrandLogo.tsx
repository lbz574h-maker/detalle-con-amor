import React from 'react';

interface BrandLogoProps {
  compact?: boolean;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ compact = false, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E95D85] rounded-xl px-1 py-0.5 cursor-pointer"
      aria-label="Ir al inicio de Detalle Con Amor"
    >
      <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-[#FCE7EE] border border-[#F5C6D6] shadow-xs shrink-0 transition-transform duration-200 group-hover:scale-105">
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none" aria-hidden="true">
          <path
            d="M11 16.5C11 14 14 11.5 16.5 13.5C18.2 14.8 19.5 16.5 20 17C20.5 16.5 21.8 14.8 23.5 13.5C26 11.5 29 14 29 16.5C29 18 26.5 18.5 20 18.5C13.5 18.5 11 18 11 16.5Z"
            fill="#F9A8C0"
            stroke="#5C3B45"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="9"
            y="18"
            width="22"
            height="4.5"
            rx="1.5"
            fill="#FCD5E1"
            stroke="#5C3B45"
            strokeWidth="1.6"
          />
          <rect
            x="10.5"
            y="22.5"
            width="19"
            height="11.5"
            rx="2"
            fill="#F9BCCF"
            stroke="#5C3B45"
            strokeWidth="1.6"
          />
          <line x1="20" y1="18" x2="20" y2="34" stroke="#5C3B45" strokeWidth="1.6" />
          <circle cx="14.5" cy="28" r="3" fill="#FFF7F9" stroke="#5C3B45" strokeWidth="1.3" />
          <path
            d="M14.5 29.2C14.5 29.2 13 28.2 13 27.3C13 26.8 13.4 26.5 13.8 26.5C14.1 26.5 14.4 26.7 14.5 26.9C14.6 26.7 14.9 26.5 15.2 26.5C15.6 26.5 16 26.8 16 27.3C16 28.2 14.5 29.2 14.5 29.2Z"
            fill="#E95D85"
          />
        </svg>
      </div>
      <div className="leading-none">
        <div className="flex items-center gap-1">
          <span
            className={`${
              compact ? 'text-2xl' : 'text-[26px]'
            } text-[#3D2B31] font-bold tracking-tight`}
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Detalle
          </span>
          <svg
            viewBox="0 0 16 16"
            className="w-3.5 h-3.5 text-[#E95D85] -mt-1 shrink-0"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 14s-5.5-3.5-5.5-7.4A3.2 3.2 0 0 1 8 4.4a3.2 3.2 0 0 1 5.5 2.2C13.5 10.5 8 14 8 14Z" />
          </svg>
        </div>
        <p className="text-[10px] font-semibold tracking-[0.22em] text-[#7B5D66] uppercase mt-0.5 whitespace-nowrap">
          CON AMOR
        </p>
      </div>
    </button>
  );
};

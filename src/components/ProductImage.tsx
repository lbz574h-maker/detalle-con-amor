import React, { useState } from 'react';
import { Gift } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ src, alt, className = '' }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#FCEEF2] via-[#F9E2E9] to-[#F4EFEA] text-[#A26778] p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Gift className="w-8 h-8 mb-1.5 opacity-80" strokeWidth={1.6} />
        <span className="text-xs font-medium line-clamp-2">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

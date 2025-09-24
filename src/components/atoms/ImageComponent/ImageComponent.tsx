import Image from 'next/image';
import { useState } from 'react';

const InlineImageWithFallback = ({ src, fallback, alt, ...props }: any) => {
  const [error, setError] = useState(false);
  const fallbackSrc = typeof fallback === 'string' ? fallback : fallback.src;

  const imageSrc = (!error && src && src.trim() !== '') ? src : fallbackSrc;
  return (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      onError={() => setError(true)}
    />
  );
};

export default InlineImageWithFallback;

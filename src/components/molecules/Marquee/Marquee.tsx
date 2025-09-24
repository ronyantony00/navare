'use client';
import type { ClientLogo } from '@/types/interfaces';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface MarqueeProps {
  logos: ClientLogo[];
  speed?: number;
  direction?: 'left' | 'right';
}

const Marquee = ({ logos, speed = 1, direction = 'left' }: MarqueeProps) => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) {
      return;
    }

    let animationFrame: number;
    let offset = direction === 'left' ? 0 : marquee.scrollWidth / 2;

    const animate = () => {
      if (direction === 'left') {
        // Moving left (default behavior)
        if (marquee.scrollLeft >= marquee.scrollWidth / 2) {
          marquee.scrollLeft = 0;
          offset = 0;
        } else {
          offset += speed;
          marquee.scrollLeft = offset;
        }
      } else {
        // Moving right
        if (marquee.scrollLeft <= 0) {
          marquee.scrollLeft = marquee.scrollWidth / 2;
          offset = marquee.scrollWidth / 2;
        } else {
          offset -= speed;
          marquee.scrollLeft = offset;
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [speed, direction]);

  return (
    <div className="overflow-hidden whitespace-nowrap w-full" ref={marqueeRef}>
      <div className="flex gap-4 md:gap-space-26 shrink-0">
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className="w-space-80 h-space-30 py-space-05 px-space-10 rounded-xs border border-border-color shrink-0 marquee-card-bg"
          >
            <Image
              src={typeof logo.logo === 'string' ? logo.logo : logo.logo.url}
              alt={logo.clientName}
              width={80}
              height={40}
              className="object-contain w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;

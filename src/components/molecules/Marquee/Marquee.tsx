'use client';
import type { ClientLogo } from '@/types/interfaces';
import Image from 'next/image';

interface MarqueeProps {
  logos: ClientLogo[];
  speed?: number;
  direction?: 'left' | 'right';
}

const Marquee = ({ logos, speed = 0.5, direction = 'left' }: MarqueeProps) => {
  const duration = Math.max(10, 100 / speed);

  return (
    <div className="overflow-hidden whitespace-nowrap w-full">
      <div
        className="flex gap-4 md:gap-space-26 shrink-0 w-fit"
        style={{
          animation: `marquee ${duration}s linear infinite${direction === 'right' ? ' reverse' : ''}`,
        }}
      >
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

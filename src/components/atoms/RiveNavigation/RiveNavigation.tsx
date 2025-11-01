'use client';

import { useRive } from '@rive-app/react-canvas';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface RiveNavigationProps {
  className?: string;
}

export default function RiveNavigation({ className }: RiveNavigationProps) {
  const router = useRouter();
  const STATE_MACHINE = 'State Machine 1';
  // const EVENT_NAME = 'NAVONE-EVENT'; // Your custom event
  const events = [{ name: 'NAVONE-EVENT', path: '/navone' }, { name: 'NAVSCAN-EVENT', path: '/navscan' }, { name: 'NAVAIR-EVENT', path: '/navairandocean' }, { name: 'NAVBRIDGE-EVENT', path: '/navbridge' }];

  const { rive, RiveComponent } = useRive({
    src: '/assets/animation/navare CLICK-HOVER.riv',
    stateMachines: STATE_MACHINE,
    autoplay: true, // Allowed in useRive options
  });

  useEffect(() => {
    if (!rive) {
      return;
    }

    const handler = (e: any) => {
      // console.warn('Rive Event:', e);
      const event = events.find(event => event.name === e.data?.name);
      if (event) {
        router.push(`/solutions/${event.path}`);
        // console.warn('Rive Event:', event);
      }
    };

    rive.on('riveevent' as any, handler); // Workaround for TS typing
    return () => rive.off('riveevent' as any, handler);
  }, [rive, router]);

  return (
    <div>
      <RiveComponent className={className} />
    </div>
  );
}

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
    src: '/assets/animation/navarefinevent.riv',
    stateMachines: STATE_MACHINE,
    autoplay: true, // Allowed in useRive options
  });

  useEffect(() => {
    if (!rive) {
      return;
    }

    const handler = (e: any) => {
      console.warn('Rive Event:', e);
      const event = events.find(event => event.name === e.data?.name);
      if (event) {
        router.push(`/solutions/${event.path}`);
      }
    };

    rive.on('riveevent' as any, handler); // Workaround for TS typing
    return () => rive.off('riveevent' as any, handler);
  }, [rive, router]);

  return (
    <RiveComponent className={className} />
  );
}

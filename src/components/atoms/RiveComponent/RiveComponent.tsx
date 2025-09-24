'use client';

import { useRive } from '@rive-app/react-canvas';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface CardData {
  title: string;
  description: string;
  link: string;
  titleField: string;
  descriptionField: string;
}

interface RiveTextControllerProps {
  className?: string;
  src?: string;
  cardData?: CardData[];
  text?: string;
  textInputName?: string;
}

const RiveTextController = ({ className, src, cardData, text = '', textInputName }: RiveTextControllerProps) => {
  const router = useRouter();
  const STATE_MACHINE_NAME = 'State Machine 1';
  const TEXT_INPUT_NAME = textInputName || 'api';

  // Events mapping for navigation - matches the RiveNavigation component
  const events = [
    { name: 'NAVONE-EVENT', path: '/navone' },
    { name: 'NAVSCAN-EVENT', path: '/navscan' },
    { name: 'NAVAIR-EVENT', path: '/navairandocean' },
    { name: 'NAVBRIDGE-EVENT', path: '/navbridge' },
  ];

  const { rive, RiveComponent } = useRive({
    src,
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
  });

  // Effect for updating text values
  useEffect(() => {
    if (!cardData || !rive) {
      return;
    }

    const update = () => {
      try {
        // Try to set the text value
        if (textInputName || text) {
          rive.setTextRunValue(TEXT_INPUT_NAME, text);
        } else if (cardData) {
          cardData?.forEach((card) => {
            rive.setTextRunValue(card.titleField, card.title);
            rive.setTextRunValue(card.descriptionField, card.description);
          });
        }
      } catch (error) {
        console.warn('not found or error occurred:', error);
      }
    };

    // Slight delay allows internal mounting to finish
    const timer = setTimeout(update, 100);
    return () => clearTimeout(timer);
  }, [rive, cardData, text, TEXT_INPUT_NAME]);

  // Effect for handling navigation events
  useEffect(() => {
    if (!rive) {
      return;
    }

    const handler = (e: any) => {
      // console.warn('Rive Event:', e);
      const event = events.find(event => event.name === e.data?.name);
      if (event) {
        router.push(`/solutions${event.path}`);
        // console.warn('Rive Event:', event);
      }
    };

    rive.on('riveevent' as any, handler);
    return () => rive.off('riveevent' as any, handler);
  }, [rive, router]);

  return <RiveComponent className={className} />;
};

export default RiveTextController;

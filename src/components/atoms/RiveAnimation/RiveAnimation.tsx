'use client';

import type { SolutionCard } from '@/components/molecules/LandingPageServiceSection/LandingPageServiceSection';
import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import MediaContainerSkeleton from '@/components/molecules/Skeleton/MediaContainerSkeleton';

interface RiveNavigationProps {
  className?: string;
  text?: string;
  textInputName?: string;
  title?: string;
  textInputTitle?: string;
  src?: string;
  solutionSectionCard?: SolutionCard[];
}

export default function RiveNavigation({ solutionSectionCard, className = 'relative', text, textInputName, title, textInputTitle, src }: RiveNavigationProps) {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);
  const STATE_MACHINE = 'State Machine 1';

  const textInputNameMap: Record<string, string> = {
    NAVONETMS: 'NAVSCAN TEXT', // Intentional: NAVONE TMS renders in the Rive file's NAVSCAN text run.
    NAVONECMS: 'NAVONE TRANSPORT TEXT', // Crossed on purpose - Rive file names the NAVONE runs opposite to the cards they render on.
    NAVBRIDGE: 'NAVBRIDGE TEXT',
    NAVSCAN: 'NAVONE CONTAINER TEXT', // Intentional: NAVSCAN renders in the Rive file's NAVONE TMS text run.
    CUSTOMISED: 'CUSTOMISED TEXT',
  };

  const textInputTitleMap: Record<string, string> = {
    NAVONETMS: 'NAVSCAN TITLE', // Intentional: NAVONE TMS renders in the Rive file's NAVSCAN title run.
    NAVONECMS: 'NAVONE TRANSPORT TITLE', // Crossed on purpose - Rive file names the NAVONE runs opposite to the cards they render on.
    NAVBRIDGE: 'NAVBRIDGE TITLE',
    NAVSCAN: 'NAVONE CONTAINER TITLE', // Intentional: NAVSCAN renders in the Rive file's NAVONE TMS title run.
    NAVLOGIC: 'NAVLOGIC TITLE',
    CUSTOMISED: 'CUSTOMISED TITLE',
  };

  const textOverrides = useMemo(() => {
    const overrideEntries = solutionSectionCard?.reduce<{ text: string; textInputName: string }[]>((acc, card) => {
      if (!card.link) {
        return acc;
      }

      // Add description text if available
      if (card.description) {
        const textInputName = textInputNameMap[card.link];
        if (textInputName) {
          acc.push({
            text: card.description,
            textInputName,
          });
        }
      }

      // Add solution name (title) if available
      if (card.solution_name) {
        const textInputTitle = textInputTitleMap[card.link];
        if (textInputTitle) {
          acc.push({
            text: card.solution_name,
            textInputName: textInputTitle,
          });
        }
      }

      return acc;
    }, []) ?? [];

    if (overrideEntries.length > 0) {
      return overrideEntries;
    }

    // Fallback to manual props if no cards provided
    const fallbackEntries = [];
    if (text && textInputName) {
      fallbackEntries.push({ text, textInputName });
    }
    if (title && textInputTitle) {
      fallbackEntries.push({ text: title, textInputName: textInputTitle });
    }
    return fallbackEntries;
  }, [solutionSectionCard, text, textInputName, title, textInputTitle]);
  const events = [
    { name: 'NAVONE-EVENT', path: '/navonecms' },
    { name: 'NAVSCAN-EVENT', path: '/navonetms' }, // Intentional: this event is emitted by the visible NAVONE TMS card.
    { name: 'NAVAIR&OCEAN-EVENT', path: '/navscan' }, // Intentional: this event is emitted by the visible NAVSCAN card.
    { name: 'NAVBRIDGE-EVENT', path: '/navbridge' },
  ];

  const { rive, RiveComponent } = useRive({
    src,
    stateMachines: STATE_MACHINE,
    autoplay: true,
    isTouchScrollEnabled: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.TopCenter,
    }),
  });

  useEffect(() => {
    if (!rive) {
      return;
    }

    const handler = (e: any) => {
      console.warn('Rive Event:', e);
      const eventName = e.data?.name;
      if (!eventName) {
        return;
      }

      if (eventName.includes('HOVER')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }

      const event = events.find(event => event.name === eventName);
      if (event) {
        router.push(`/solutions/${event.path}`);
      }
    };

    rive.on('riveevent' as any, handler);
    return () => rive.off('riveevent' as any, handler);
  }, [rive, router]);

  useEffect(() => {
    if (!rive || textOverrides.length === 0) {
      return;
    }

    const update = () => {
      textOverrides.forEach(({ text: overrideText, textInputName: overrideTextInputName }) => {
        try {
          rive.setTextRunValue(overrideTextInputName, overrideText);
          // console.warn(`Text "${overrideText}" set to text field "${overrideTextInputName}"`);
        } catch (error) {
          console.warn(`TextRun "${overrideTextInputName}" not found or error occurred:`, error);
        }
      });
    };

    const timer = setTimeout(update, 100);
    return () => clearTimeout(timer);
  }, [rive, textOverrides]);

  return (
    <div
      className={`relative ${className}`}
      style={{
        cursor: isHovering ? 'pointer' : 'default',
        touchAction: 'pan-y',
      }}
    >
      {!rive && <MediaContainerSkeleton />}
      <div
        className={`w-full h-full transition-opacity duration-300 ${rive ? 'opacity-100' : 'opacity-0'}`}
        style={{
          touchAction: 'pan-y',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <RiveComponent />
      </div>
    </div>
  );
}

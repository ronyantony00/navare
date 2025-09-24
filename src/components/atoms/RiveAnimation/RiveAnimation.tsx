'use client';
import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas';
import { useEffect, useRef } from 'react';

interface RiveAnimationProps {
  url: string;
  fitVal?: Fit;
  alignmentVal?: Alignment;
  isTrue?: boolean;
  delay?: number;
}

const RiveAnimation = ({ url, fitVal = Fit.Contain, alignmentVal = Alignment.BottomLeft, isTrue = true, delay = 0 }: RiveAnimationProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { RiveComponent, rive } = useRive({
    src: url,
    autoplay: true,
    stateMachines: 'State Machine 1',
    layout: new Layout({
      fit: fitVal,
      alignment: alignmentVal,
    }),
  });

  useEffect(() => {
    if (!rive) {
      return;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (isTrue) {
      if (delay > 0) {
        timeoutRef.current = setTimeout(() => {
          rive.play();
        }, delay);
      } else {
        rive.play();
      }
    } else {
      rive.pause();
      rive.reset();
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isTrue, rive, delay]);

  return (
    <div className="w-full h-full relative">
      <RiveComponent
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
      />
    </div>
  );
};

export default RiveAnimation;

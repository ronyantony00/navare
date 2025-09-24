'use client';

import { useRive } from '@rive-app/react-canvas';
import { useEffect } from 'react';

interface RiveTextControllerProps {
  text?: string;
  className?: string;
  textInputName?: string;
  src?: string;
}

const RiveTextController = ({ text, className, textInputName, src }: RiveTextControllerProps) => {
  const STATE_MACHINE_NAME = 'State Machine 1';
  const TEXT_INPUT_NAME = textInputName || 'api'; // Changed default to 'api'

  const { rive, RiveComponent } = useRive({
    src,
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
  });

  useEffect(() => {
    if (!rive || !text) {
      return;
    }

    const update = () => {
      try {
        // Try to set the text value
        rive.setTextRunValue(TEXT_INPUT_NAME, text);
        console.warn(`Text "${text}" set to text field "${TEXT_INPUT_NAME}"`);
      } catch (error) {
        console.warn(`TextRun "${TEXT_INPUT_NAME}" not found or error occurred:`, error);
      }
    };

    // Slight delay allows internal mounting to finish
    const timer = setTimeout(update, 100);
    return () => clearTimeout(timer);
  }, [rive, text, TEXT_INPUT_NAME]); // Added dependencies

  return <RiveComponent className={className} />;
};

export default RiveTextController;

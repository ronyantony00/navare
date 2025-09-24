import { useCallback, useEffect, useRef } from 'react';

interface UseClickOutsideParams {
  callback: () => void;
  enabled?: boolean;
  eventType?: 'mousedown' | 'click';
}

interface UseClickOutsideReturn<T extends HTMLElement> {
  ref: React.RefObject<T>;
}

export const useClickOutside = <T extends HTMLElement = HTMLDivElement>({
  callback,
  enabled = true,
  eventType = 'mousedown',
}: UseClickOutsideParams): UseClickOutsideReturn<T> => {
  const ref = useRef<T>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    // Only proceed if enabled and ref exists
    if (!enabled || !ref.current) {
      return;
    }

    // Check if click is outside the element
    if (!ref.current.contains(event.target as Node)) {
      callback();
    }
  }, [callback, enabled]);

  useEffect(() => {
    // Only add listener if enabled
    if (!enabled) {
      return;
    }

    document.addEventListener(eventType, handleClickOutside);

    return () => {
      document.removeEventListener(eventType, handleClickOutside);
    };
  }, [handleClickOutside, enabled, eventType]);

  // Cast ref to the correct type to satisfy the return type
  return { ref: ref as React.RefObject<T> };
};

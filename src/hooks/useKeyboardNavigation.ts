import { useCallback, useEffect } from 'react';

interface KeyHandler {
  callback: () => void;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean; // Cmd key on Mac
}

interface UseKeyboardNavigationParams {
  keyHandlers: Record<string, KeyHandler | (() => void)>;
  enabled?: boolean;
  eventType?: 'keydown' | 'keyup' | 'keypress';
}

export const useKeyboardNavigation = ({
  keyHandlers,
  enabled = true,
  eventType = 'keydown',
}: UseKeyboardNavigationParams): void => {
  const handleKeyEvent = useCallback((event: KeyboardEvent) => {
    if (!enabled) {
      return;
    }

    const handler = keyHandlers[event.key];
    if (!handler) {
      return;
    }

    // Handle simple callback function
    if (typeof handler === 'function') {
      handler();
      return;
    }

    // Handle complex key combination
    const {
      callback,
      ctrlKey = false,
      altKey = false,
      shiftKey = false,
      metaKey = false,
    } = handler;

    // Check if all required modifier keys match
    const modifiersMatch
      = event.ctrlKey === ctrlKey
        && event.altKey === altKey
        && event.shiftKey === shiftKey
        && event.metaKey === metaKey;

    if (modifiersMatch) {
      event.preventDefault(); // Prevent default browser behavior
      callback();
    }
  }, [keyHandlers, enabled]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    document.addEventListener(eventType, handleKeyEvent);

    return () => {
      document.removeEventListener(eventType, handleKeyEvent);
    };
  }, [handleKeyEvent, enabled, eventType]);
};

import { useCallback, useEffect, useRef } from 'react';

interface UseHoverMenuParams {
  isTouchDevice: boolean;
  isMobile: boolean;
  hoveredMenuItem: string | null;
  setActiveMenuItem: (menuId: string | null) => void;
  hoverDelay?: number; // milliseconds
}

interface UseHoverMenuReturn {
  handleMenuItemHover: (menuId: string) => void;
  handleMenuItemLeave: () => void;
  handleMenuItemClick: (menuId: string) => void;
  clearHoverTimeout: () => void;
  closeHoverImmediately: () => void;
}

export const useHoverMenu = ({
  isTouchDevice,
  isMobile,
  hoveredMenuItem,
  setActiveMenuItem,
  hoverDelay = 200,
}: UseHoverMenuParams): UseHoverMenuReturn => {
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearHoverTimeout = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  const closeHoverImmediately = useCallback(() => {
    clearHoverTimeout();
    setActiveMenuItem(null);
  }, [clearHoverTimeout, setActiveMenuItem]);

  useEffect(() => {
    return () => {
      clearHoverTimeout();
    };
  }, [clearHoverTimeout]);

  const handleMenuItemHover = useCallback((menuId: string) => {
    if (isTouchDevice) {
      return;
    }

    clearHoverTimeout();
    setActiveMenuItem(menuId);
  }, [isTouchDevice, clearHoverTimeout, setActiveMenuItem]);

  const handleMenuItemLeave = useCallback(() => {
    if (isTouchDevice) {
      return;
    }

    clearHoverTimeout();

    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenuItem(null);
    }, hoverDelay);
  }, [isTouchDevice, clearHoverTimeout, setActiveMenuItem, hoverDelay]);

  const handleMenuItemClick = useCallback((menuId: string) => {
    clearHoverTimeout();
    setActiveMenuItem(hoveredMenuItem === menuId ? null : menuId);
  }, [hoveredMenuItem, clearHoverTimeout, setActiveMenuItem]);

  return {
    handleMenuItemHover,
    handleMenuItemLeave,
    handleMenuItemClick,
    clearHoverTimeout,
    closeHoverImmediately,
  };
};

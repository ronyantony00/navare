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
}

export const useHoverMenu = ({
  isTouchDevice,
  isMobile,
  hoveredMenuItem,
  setActiveMenuItem,
  hoverDelay = 200,
}: UseHoverMenuParams): UseHoverMenuReturn => {
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear hover timeout helper
  const clearHoverTimeout = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      clearHoverTimeout();
    };
  }, [clearHoverTimeout]);

  // Handle menu item hover (desktop)
  const handleMenuItemHover = useCallback((menuId: string) => {
    // Skip hover on touch devices
    if (isTouchDevice) {
      return;
    }

    clearHoverTimeout();
    setActiveMenuItem(menuId);
  }, [isTouchDevice, clearHoverTimeout, setActiveMenuItem]);

  // Handle menu item leave (desktop)
  const handleMenuItemLeave = useCallback(() => {
    // Skip hover on touch devices
    if (isTouchDevice) {
      return;
    }

    clearHoverTimeout();

    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenuItem(null);
    }, hoverDelay);
  }, [isTouchDevice, clearHoverTimeout, setActiveMenuItem, hoverDelay]);

  // Handle menu item click (mobile/touch)
  const handleMenuItemClick = useCallback((menuId: string) => {
    // Only handle clicks on mobile or touch devices
    if (isMobile || isTouchDevice) {
      clearHoverTimeout();
      setActiveMenuItem(hoveredMenuItem === menuId ? null : menuId);
    }
  }, [isMobile, isTouchDevice, hoveredMenuItem, clearHoverTimeout, setActiveMenuItem]);

  return {
    handleMenuItemHover,
    handleMenuItemLeave,
    handleMenuItemClick,
    clearHoverTimeout,
  };
};

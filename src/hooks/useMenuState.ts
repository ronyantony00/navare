import { useCallback, useState } from 'react';

interface UseMenuStateReturn {
  // States
  isMenuOpen: boolean;
  hoveredMenuItem: string | null;

  // Actions
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  setActiveMenuItem: (menuId: string | null) => void;
  closeAllMenus: () => void;
  handleMobileNavigation: () => void;
}

export const useMenuState = (): UseMenuStateReturn => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null);

  // Toggle mobile menu open/closed
  const toggleMobileMenu = useCallback(() => {
    setIsMenuOpen((prev) => {
      if (prev) {
        // If closing, also clear hovered item
        setHoveredMenuItem(null);
      }
      return !prev;
    });
  }, []);

  // Close mobile menu only
  const closeMobileMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Set which menu item is active/hovered
  const setActiveMenuItem = useCallback((menuId: string | null) => {
    setHoveredMenuItem(menuId);
  }, []);

  // Close everything
  const closeAllMenus = useCallback(() => {
    setIsMenuOpen(false);
    setHoveredMenuItem(null);
  }, []);

  // Handle mobile navigation (when user clicks a link)
  const handleMobileNavigation = useCallback(() => {
    setIsMenuOpen(false);
    setHoveredMenuItem(null);
  }, []);

  return {
    // States
    isMenuOpen,
    hoveredMenuItem,

    // Actions
    toggleMobileMenu,
    closeMobileMenu,
    setActiveMenuItem,
    closeAllMenus,
    handleMobileNavigation,
  };
};

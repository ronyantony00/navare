import { useEffect, useState } from 'react';

export const useDeviceDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Detect mobile and touch devices
  useEffect(() => {
    setIsClient(true);
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth < 992);
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);

    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  // Return false during SSR to avoid hydration mismatches
  return {
    isMobile: isClient ? isMobile : false,
    isTouchDevice: isClient ? isTouchDevice : false,
  };
};

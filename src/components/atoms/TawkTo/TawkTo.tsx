'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

interface TawkToScriptProps {
  tawkToLink: string;
}

export default function TawkToScript({ tawkToLink }: TawkToScriptProps) {
  const [isMounted, setIsMounted] = useState(false);
  const propertyId = tawkToLink;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !propertyId) {
      return;
    }

    // Initialize Tawk.to globals
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Create and inject the script
    const script = document.createElement('script');
    script.async = true;
    script.src = propertyId;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    }

    // Cleanup function to remove the script when component unmounts
    return () => {
      const tawkScript = document.querySelector(
        `script[src="${propertyId}"]`,
      );
      if (tawkScript && tawkScript.parentNode) {
        tawkScript.parentNode.removeChild(tawkScript);
      }

      // Clean up any Tawk.to elements
      const tawkElements = document.querySelectorAll('[id^="tawk"]');
      tawkElements.forEach((element) => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
    };
  }, [isMounted, propertyId]);

  return null;
}

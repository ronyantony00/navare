'use client';

import { useEffect, useState } from 'react';
import SuccessPopup from '../SuccessPopup/SuccessPopup';

const CookiePopup = () => {
  const [showCookiePopup, setShowCookiePopup] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<string | null>(null);
  console.warn('cookieConsent', cookieConsent);

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem('cookieConsent');
    if (!savedConsent) {
      setShowCookiePopup(true);
    } else {
      setCookieConsent(savedConsent);
    }
  }, []);

  const handleAccept = () => {
    setCookieConsent('accepted');
    setShowCookiePopup(false);
    localStorage.setItem('cookieConsent', 'accepted');
  };

  const handleReject = () => {
    setCookieConsent('rejected');
    setShowCookiePopup(false);
    localStorage.setItem('cookieConsent', 'rejected');
  };

  if (!showCookiePopup) {
    return null;
  }

  return (
    <SuccessPopup
      variant="cookies"
      onCookieAccept={handleAccept}
      onCookieReject={handleReject}
    />
  );
};

export default CookiePopup;

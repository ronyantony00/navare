'use client';

/**
 * Loads the Google reCAPTCHA v2 script once per page and reports when the
 * `grecaptcha` API is ready to render widgets.
 *
 * The script is injected on mount of the consuming component rather than in the
 * root layout, so only the pages that actually carry a form pay for it.
 */
import { useEffect, useState } from 'react';

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const SCRIPT_ID = 'google-recaptcha-v2';
const ONLOAD_CALLBACK = 'onRecaptchaApiLoad';

export interface RecaptchaRenderOptions {
  'sitekey': string;
  'theme'?: 'light' | 'dark';
  'size'?: 'normal' | 'compact';
  'callback': (token: string) => void;
  'expired-callback'?: () => void;
  'error-callback'?: () => void;
}

interface Grecaptcha {
  render: (container: HTMLElement, options: RecaptchaRenderOptions) => number;
  reset: (widgetId?: number) => void;
  getResponse: (widgetId?: number) => string;
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
    [ONLOAD_CALLBACK]?: () => void;
  }
}

// Module-level so remounts (including React Strict Mode's double mount) reuse
// the single script tag instead of injecting another one.
let scriptState: 'idle' | 'loading' | 'ready' | 'error' = 'idle';
const subscribers = new Set<(state: 'ready' | 'error') => void>();

const notify = (state: 'ready' | 'error') => {
  scriptState = state;
  subscribers.forEach(fn => fn(state));
};

const loadScript = () => {
  if (scriptState !== 'idle') {
    return;
  }

  if (typeof window === 'undefined') {
    return;
  }

  scriptState = 'loading';

  window[ONLOAD_CALLBACK] = () => notify('ready');

  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.src = `https://www.google.com/recaptcha/api.js?onload=${ONLOAD_CALLBACK}&render=explicit`;
  script.async = true;
  script.defer = true;
  script.onerror = () => notify('error');

  document.head.appendChild(script);
};

export interface UseRecaptchaReturn {
  /** True once `window.grecaptcha` is available and widgets can be rendered. */
  isReady: boolean;
  /** True when the script could not be loaded, or no site key is configured. */
  hasError: boolean;
}

export const useRecaptcha = (): UseRecaptchaReturn => {
  const [state, setState] = useState<typeof scriptState>(() =>
    RECAPTCHA_SITE_KEY ? scriptState : 'error',
  );

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) {
      console.error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set — the captcha cannot be rendered');
      setState('error');
      return;
    }

    // Already resolved before this component mounted.
    if (scriptState === 'ready' || scriptState === 'error') {
      setState(scriptState);
      return;
    }

    const subscriber = (next: 'ready' | 'error') => setState(next);
    subscribers.add(subscriber);
    loadScript();

    return () => {
      subscribers.delete(subscriber);
    };
  }, []);

  return {
    isReady: state === 'ready',
    hasError: state === 'error',
  };
};

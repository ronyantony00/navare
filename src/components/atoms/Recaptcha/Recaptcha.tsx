'use client';

/**
 * Google reCAPTCHA v2 checkbox widget.
 *
 * Rendered explicitly rather than through the automatic `class="g-recaptcha"`
 * scan: `reactStrictMode` is enabled, so React double-mounts in development and
 * the automatic mode would attach two widgets to the same node.
 *
 * The parent owns the token — this component only reports changes through
 * `onChange` and exposes `reset()` for the submit handler to call. v2 tokens
 * are single use, so a form that submits twice must reset in between.
 */
import type { RecaptchaRenderOptions } from '@/hooks/useRecaptcha';
import { useEffect, useImperativeHandle, useRef } from 'react';
import { RECAPTCHA_SITE_KEY, useRecaptcha } from '@/hooks/useRecaptcha';

export interface RecaptchaHandle {
  reset: () => void;
}

interface RecaptchaProps {
  /** Called with the token on solve, and with '' when it expires or errors. */
  onChange: (token: string) => void;
  /** Shown when the widget itself fails to load. */
  onLoadError?: () => void;
  theme?: 'light' | 'dark';
  className?: string;
  ref?: React.Ref<RecaptchaHandle>;
}

const Recaptcha = ({ onChange, onLoadError, theme = 'dark', className, ref }: RecaptchaProps) => {
  const { isReady, hasError } = useRecaptcha();
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  // Callbacks are read through a ref so re-renders of the parent never cause
  // the widget to be torn down and re-rendered, which would clear the token.
  const handlersRef = useRef({ onChange, onLoadError });
  handlersRef.current = { onChange, onLoadError };

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    },
  }), []);

  useEffect(() => {
    if (!isReady || !containerRef.current || widgetIdRef.current !== null || !RECAPTCHA_SITE_KEY) {
      return;
    }

    const options: RecaptchaRenderOptions = {
      'sitekey': RECAPTCHA_SITE_KEY,
      theme,
      'callback': (token: string) => handlersRef.current.onChange(token),
      // The token is only valid for two minutes; clearing it puts the form
      // back into an invalid state so the user is asked to tick again.
      'expired-callback': () => handlersRef.current.onChange(''),
      'error-callback': () => {
        handlersRef.current.onChange('');
        handlersRef.current.onLoadError?.();
      },
    };

    try {
      widgetIdRef.current = window.grecaptcha!.render(containerRef.current, options);
    } catch (error) {
      console.error('Failed to render reCAPTCHA widget:', error);
      handlersRef.current.onLoadError?.();
    }
  }, [isReady, theme]);

  useEffect(() => {
    if (hasError) {
      handlersRef.current.onLoadError?.();
    }
  }, [hasError]);

  return (
    <div className={className}>
      {/* The widget is a fixed 304px wide; scale it down on very narrow
          viewports so it cannot push the form into horizontal scroll. */}
      <div ref={containerRef} className="max-[359px]:scale-[0.85] max-[359px]:origin-top-left" />
    </div>
  );
};

export default Recaptcha;

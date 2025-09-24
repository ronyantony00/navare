'use client';
import { useEffect, useState } from 'react';
import { fetchFromApi } from '@/utils/api';

interface FetchState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

/**
 * React hook to fetch data from an API endpoint.
 *
 * @param endpoint Relative endpoint string (e.g. API_ENDPOINTS.USERS).
 * @param options Optional fetch init options.
 * @param enabled Optional boolean to skip fetch when false.
 */
export function useFetch<T = unknown>(
  endpoint: string,
  options?: RequestInit,
  enabled: boolean = true,
): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ data: null, error: null, loading: true });

  /**
   * Derive a sensible default HTTP method:
   *  – If the caller explicitly specifies a method, honour it.
   *  – If a request `body` is provided but no method, assume `POST`.
   *  – Otherwise default to `GET`.
   */
  const mergedOptions = {
    ...(options ?? {}),
    method: options?.method ?? (options?.body ? 'POST' : 'GET'),
  } as RequestInit;

  // Stringify options for the dependency array to ensure effect re-runs on deep changes.
  const optionsKey = JSON.stringify({ endpoint, ...mergedOptions });

  useEffect(() => {
    if (!enabled) {
      // When disabled, ensure loading is false and keep previous data/error.
      setState(prev => ({ ...prev, loading: false }));
      return;
    }
    let isMounted = true;

    fetchFromApi<T>(endpoint, mergedOptions)
      .then((res) => {
        if (!isMounted) {
          return;
        }
        // console.warn(`API (${endpoint}) response:`, res);
        // If the response has a 'data' property, use it; otherwise, use the whole response
        const normalized = (res && typeof res === 'object' && 'data' in res) ? (res as any).data : res;
        setState({ data: normalized, error: null, loading: false });
      })
      .catch((err: Error) => {
        if (!isMounted) {
          return;
        }
        // console.error(`API (${endpoint}) error:`, err);
        setState({ data: null, error: err, loading: false });
      });

    return () => {
      isMounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsKey, enabled]);

  return state;
}

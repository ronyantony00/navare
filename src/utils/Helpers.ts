import { routing } from '@/libs/i18nNavigation';

export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (
    process.env.VERCEL_ENV === 'production'
    && process.env.VERCEL_PROJECT_PRODUCTION_URL
  ) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
};

export const getI18nPath = (url: string, locale: string) => {
  if (locale === routing.defaultLocale) {
    return url;
  }

  return `/${locale}${url}`;
};

const EXTERNAL_PROTOCOL_PATTERN = /^(https?:|mailto:|tel:)/i;
const DOMAIN_LIKE_PATTERN = /^(www\.)?[a-z0-9-]+(\.[a-z0-9-]+)+(\/.*)?$/i;

export function resolveNavigationLink(path: string): { href: string; external: boolean } {
  const trimmed = path.trim();

  if (!trimmed) {
    return { href: '/', external: false };
  }

  if (trimmed.startsWith('//')) {
    return { href: `https:${trimmed}`, external: true };
  }

  if (EXTERNAL_PROTOCOL_PATTERN.test(trimmed)) {
    return { href: trimmed, external: true };
  }

  if (trimmed.startsWith('/')) {
    return { href: trimmed, external: false };
  }

  if (DOMAIN_LIKE_PATTERN.test(trimmed)) {
    return { href: `https://${trimmed}`, external: true };
  }

  return { href: `/${trimmed}`, external: false };
}

export function getFileUrlByName(files: { name: string; url: string }[], targetName: string): string | null {
  const file = files.find(file => file.name === targetName);
  return file ? `${getBaseUrl()}${file.url}` : null;
}

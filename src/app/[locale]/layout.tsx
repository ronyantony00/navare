import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { PostHogProvider } from '@/components/analytics/PostHogProvider';
import CookiePopup from '@/components/atoms/CookiePopup/CookiePopup';
import TawkToScript from '@/components/atoms/TawkTo/TawkTo';
import Footer from '@/components/organisms/Footer/Footer';
import NavBarMain from '@/components/organisms/NavBarMain/NavBarMain';
import { comme, manrope, satoshi } from '@/fonts/fonts';
import { routing } from '@/libs/i18nNavigation';
import QueryProvider from '@/providers/QueryClientProvider';
import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'Navare Global',
  description: 'Navare is a global logistics platform that provides a comprehensive suite of services to help businesses streamline their supply chain operations.',
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://navareglobal.com',
    title: 'Navare Global',
    description: 'Navare is a global logistics platform that provides a comprehensive suite of services to help businesses streamline their supply chain operations.',
    siteName: 'navareglobal',
    images: [
      {
        url: '/og_image.png',
        width: 1200,
        height: 630,
        alt: 'Navare Global',
      },
    ],
  },
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Using internationalization in Client Components
  const messages = await getMessages();

  // The `suppressHydrationWarning` attribute in <body> is used to prevent hydration errors caused by Sentry Overlay,
  // which dynamically adds a `style` attribute to the body tag.

  return (
    <html lang={locale} className={`${comme.variable} ${manrope.variable} ${satoshi.variable}`}>
      <body suppressHydrationWarning className="font-satoshi bg-landing-hero-bg-color">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <QueryProvider>
            <PostHogProvider>
              <NavBarMain />
              {props.children}
              <Footer />
              <TawkToScript />
              <CookiePopup />
            </PostHogProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

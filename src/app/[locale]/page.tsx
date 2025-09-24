import type { Metadata } from 'next';
import LandingPage from '@/components/organisms/LandingPage/LandingPage';
import { getAllTestimonialDataServer, getArticlesDataServer, getClientLogosDataServer, getLandingPageFooterDataServer, getLandingPageGeneralDataServer, getLandingPageHeroDataServer, getLandingPageKeyValueDataServer } from '@/services/apiService';

export const generateMetadata = async (): Promise<Metadata> => {
  const title = 'Navare | Supply Chain & Logistics Platform';
  const description = 'Navare is a platform revolutionizing supply chain and logistics management. Discover smart solutions for importers, exporters, and logistics providers.';
  const keywords = [
    'Navare',
    'AI',
    'Supply Chain',
    'Logistics',
    'Platform',
    'Import Management',
    'Export Management',
    'Freight',
    'Automation',
    'Smart Logistics',
    'Digital Supply Chain',
    'Logistics Solutions',
    'Supply Chain Optimization',
  ];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://navareglobal.com';
  const url = baseUrl;

  // JSON-LD structured data for Organization
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Navare',
    'url': url,
    'logo': `${url}/og_image.png`,
    'sameAs': [
      'https://www.linkedin.com/company/navareglobal',
      'https://www.instagram.com/navareglobal',
      'https://www.facebook.com/navareglobal',
    ],
  };

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'Navare - AI-powered Supply Chain & Logistics Platform',
      locale: 'en_US',
      images: [
        {
          url: '/og_image.png',
          width: 1200,
          height: 630,
          alt: 'Navare AI-powered Supply Chain Platform',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og_image.png'],
      site: '@navareglobal', // update if you have a Twitter handle
      creator: '@navareglobal', // update if you have a Twitter handle
    },
    alternates: {
      canonical: url,
    },
    other: {
      'application/ld+json': JSON.stringify(jsonLd),
    },
  };
};

export const revalidate = 10;

const Home = async () => {
  const [
    landingPageHeroData,
    landingPageFooterData,
    landingPageGeneralData,
    landingPageKeyValueData,
    testimonialData,
    articlesData,
    clientData,
  ] = await Promise.all([
    getLandingPageHeroDataServer(),
    getLandingPageFooterDataServer(),
    getLandingPageGeneralDataServer(),
    getLandingPageKeyValueDataServer(),
    getAllTestimonialDataServer(),
    getArticlesDataServer(3),
    getClientLogosDataServer(),
  ]);

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <LandingPage
        landingPageDataServer={landingPageHeroData}
        testimonialDataServer={testimonialData}
        footerDataServer={landingPageFooterData}
        articlesDataServer={articlesData}
        generalDataServer={landingPageGeneralData}
        keyValuePairDataServer={landingPageKeyValueData}
        clientDataServer={clientData}
      />
    </div>
  );
};

export default Home;

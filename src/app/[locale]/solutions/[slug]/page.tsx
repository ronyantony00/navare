import type { Metadata } from 'next';
import NotFoundPage from '@/components/atoms/NotFoundPage/NotFoundPage';
import SolutionSection from '@/components/organisms/SolutionsSection/SolutionSection';
import {
  getCaseStudyDataServer,
  getSolutionAdvantageDataServer,
  getSolutionFeatureTabDataServer,
  getSolutionHeroDataServer,
  getSolutionKnowMoreDataServer,
  getSolutionTestimonialsDataServer,
  getSolutionUseCaseDataServer,
} from '@/services/apiService';

export const revalidate = 10;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;

  const title = `Solution | Navare`;
  const description = 'Explore our comprehensive solutions at Navare.';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://navareglobal.com';
  const url = `${baseUrl}/solutions/${resolvedParams.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      siteName: 'Navare',
      images: [
        {
          url: '/og_image.png',
          width: 1200,
          height: 630,
          alt: 'Navare Solution',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og_image.png'],
    },
    alternates: {
      canonical: url,
    },
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page = async (props: PageProps) => {
  const params = await props.params;

  // Fetch all solution data server-side
  const [
    heroResponse,
    advantageResponse,
    useCaseResponse,
    featureTabResponse,
    testimonialResponse,
    caseStudyResponse,
    knowMoreResponse,
  ] = await Promise.all([
    getSolutionHeroDataServer(params.slug),
    getSolutionAdvantageDataServer(params.slug),
    getSolutionUseCaseDataServer(params.slug),
    getSolutionFeatureTabDataServer(params.slug),
    getSolutionTestimonialsDataServer(params.slug),
    getCaseStudyDataServer(),
    getSolutionKnowMoreDataServer(params.slug),
  ]);

  const heroData = heroResponse?.data;
  const solutionAdvantageData = advantageResponse?.data;
  const ourUseCaseData = useCaseResponse?.data;
  const featureTabData = featureTabResponse?.data;
  const testimonialData = testimonialResponse?.data;
  const caseStudyData = caseStudyResponse?.data;
  const knowMoreData = knowMoreResponse?.data;

  if (
    !heroData
    || !Array.isArray(heroData)
    || heroData.length === 0
  ) {
    return <NotFoundPage />;
  }

  return (
    <SolutionSection
      heroData={heroData}
      solutionAdvantageData={solutionAdvantageData}
      ourUseCaseData={ourUseCaseData}
      featureTabData={featureTabData}
      testimonialData={testimonialData}
      caseStudyData={caseStudyData}
      knowMoreSectionData={knowMoreData}
    />
  );
};

export default Page;

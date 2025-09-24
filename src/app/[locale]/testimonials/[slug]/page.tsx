import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TestimonialDetail from '@/components/atoms/TestimonialDetail/TestimonialDetail';
import { getTestimonialDetailServer } from '@/services/apiService';

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;

  const title = `Testimonials | Navare`;
  const description = 'Read our customer testimonials';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://navareglobal.com';
  const url = `${baseUrl}/testimonials/${resolvedParams.slug}`;

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
          alt: 'Navare Testimonials',
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

interface TestimonialDetailPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

const Page = async (props: TestimonialDetailPageProps) => {
  const params = await props.params;

  const [{ data: testimonialData }] = await Promise.all([
    getTestimonialDetailServer(params.slug),
  ]);

  if (!testimonialData || (Array.isArray(testimonialData) && testimonialData.length === 0)) {
    notFound();
  }

  const testimonial = Array.isArray(testimonialData) ? testimonialData[0] : testimonialData;

  return (
    <div>
      <TestimonialDetail data={testimonialData} title={testimonial?.title} />
    </div>
  );
};

export default Page;

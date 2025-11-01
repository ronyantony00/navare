import type { Metadata } from 'next';
import DetailPage from '@/components/organisms/BlogDetailPage/BlogDetailPage';
import { getArticlesDataServer, getBlogDetailDataServer } from '@/services/apiService';

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;

  // Fetch blog data for dynamic metadata
  const blogDetailDataResponse = await getBlogDetailDataServer(resolvedParams.slug);
  const blogDetailData = blogDetailDataResponse?.data;
  const blog = blogDetailData?.[0];

  const title = blog?.title || `Blog | Navare`;
  const description = blog?.description || 'Read our latest blog posts from Navare';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://navareglobal.com';
  const url = `${baseUrl}/blog-detail/${resolvedParams.slug}`;

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
          alt: blog?.title || 'Navare Blog Post',
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

interface BlogDetailPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export const revalidate = 10;

const Page = async (props: BlogDetailPageProps) => {
  const params = await props.params;

  const blogDetailDataResponse = await getBlogDetailDataServer(params.slug);
  const blogDetailData = blogDetailDataResponse?.data;
  const blog = blogDetailData?.[0];
  const articlesDataResponse = await getArticlesDataServer(3, params.slug);
  const articlesData = articlesDataResponse?.data;

  // console.warn('blog', blog?.articleTitle);

  return (
    <div>
      <DetailPage blog={blog} articles={articlesData} blogMainTitle={blog?.articleTitle} />
    </div>
  );
};

export default Page;

import type { Article, title } from '@/types/insights';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import QuoteContainer from '@/components/atoms/QuoteContainer/QuoteContainer';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import VideoComponent from '@/components/atoms/VideoComponent/VideoComponent';
import RichTextRenderer from '@/components/molecules/RichText/RichText';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { getImageUrl } from '@/utils/urlConstructor';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';

interface blogData {
  blog?: Article;
  blogTitle?: title[];
  titleId?: string;
}

const BlogDataSection = ({ blog, blogTitle, titleId }: blogData) => {
  const t = useTranslations('BlogDetailPage.blogDataSection');
  const { titlePrefix, titleHighlight } = extractTitleParts(blogTitle);

  const renderContentBlock = (block: any) => {
    switch (block.__component) {
      case 'shared.richtext-blocks':
        return <div><RichTextRenderer variant="blog-detail" content={block.rich_text} /></div>;

      case 'shared.quote':
        return (
          <div className="my-space-12">
            <QuoteContainer quote={block.body} />
          </div>
        );

      case 'shared.media': {
        const mediaFile = block?.media_file;
        const fullMediaUrl = getImageUrl(mediaFile?.url);
        const isVideo = mediaFile?.mime?.startsWith('video/');

        if (isVideo) {
          return (
            <div className="w-full h-space-100 2xs:h-full aspect-video rounded-lg overflow-hidden mt-space-12">
              <VideoComponent videoUrl={fullMediaUrl} className="h-full" />
            </div>
          );
        } else {
          return (
            <div className="w-full h-full rounded-lg overflow-hidden sm:aspect-[911/332] my-space-12">
              <Image
                src={fullMediaUrl || ImageConstants.BlogDetailImage}
                alt={mediaFile?.alternativeText || 'image'}
                width={911}
                height={332}
                className="w-full min-h-space-100 h-full object-cover"
              />
            </div>
          );
        }
      }
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-full">
      {blogTitle && (
        <div id={titleId}>
          <TextCombo
            title={titlePrefix}
            spanText={titleHighlight}
            titleClass="section-title"
            className="md:w-pct-080"
          />
        </div>
      )}
      {blog?.blogSection?.length > 0
        ? (
            blog?.blogSection?.map((item: any, index: number) => (
              <div key={index}>
                {renderContentBlock(item)}
              </div>
            ))
          )
        : (
            <div className="w-full h-full flex justify-center items-center">
              <div className="text-size-3xs sm:text-size-2xs text-placeholder-text">{t('NoBlog')}</div>
            </div>
          )}
    </div>
  );
};

export default BlogDataSection;

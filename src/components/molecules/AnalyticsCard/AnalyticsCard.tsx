import type { title } from '@/types/usecase';
import Image from 'next/image';
import SectionHeader from '@/components/atoms/SectionHeading/SectionHeading';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';

interface AnalyticsCardProps {
  id: number;
  variant: 'textRight' | 'textLeft';
  title: title[];
  content: string;
  media: string;
}

const AnalyticsCard = ({ variant, title, content, media }: AnalyticsCardProps) => {
  const { titlePrefix, titleHighlight, titleSuffix } = extractTitleParts(title);

  return (
    <article className="bg-secondary">
      <div className={`max-w-section-max-width px-space-12 mx-auto gap-space-30 flex ${variant === 'textRight' ? 'flex-col 2md:flex-row' : 'flex-col-reverse 2md:flex-row-reverse'}`}>
        <div className="flex justify-center items-center 2md:w-1/2">
          {media
            ? (
                <Image
                  src={media}
                  alt="Analytics-image"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-full"
                  priority={false}
                />
              )
            : (
                <div className="text-red-500">No image</div>
              )}
        </div>
        <div className="flex flex-col justify-center gap-space-10 2md:w-1/2">
          <SectionHeader variant="medium" titleHighlight={titleHighlight} titlePrefix={titlePrefix} titleSuffix={titleSuffix} />
          <div className="text-size-3xs text-subtle-text leading-tight">{content}</div>
        </div>
      </div>
    </article>
  );
};

export default AnalyticsCard;

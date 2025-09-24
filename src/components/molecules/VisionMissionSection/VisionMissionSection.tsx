import type { Metric } from '@/types/interfaces';
import type { title } from '@/types/usecase';
import Image from 'next/image';
import KeyMetricCard from '@/components/atoms/KeyMetricCard/KeyMetricCard';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';

interface AboutPageCardProps {
  tag?: string;
  title?: title[];
  description?: string;
  keyMetrics?: Metric[];
  image?: string;
}

const VisionMissionSection = ({ tag, title, description, keyMetrics, image }: AboutPageCardProps) => {
  const { titlePrefix, titleHighlight, titleSuffix } = extractTitleParts(title);
  return (
    <div className="w-full ">
      <div className="max-w-maxwidth bg-[image:var(--bg-about-us-our-vision-bg)] bg-contain bg-center bg-no-repeat mx-auto section-padding-x section-padding-y flex flex-col gap-space-20 lg:gap-space-40">
        <div className="flex lg:flex-row flex-col justify-between lg:gap-space-40 gap-space-20">
          {/* Left Side */}
          <div className="rounded-lg overflow-hidden w-full lg:aspect-[475/565] flex-1">
            <Image src={getImageUrl(image) || ImageConstants.vissionSectionImage} alt="vision-mission" width={475} height={565} className="w-full h-full object-cover" />
          </div>
          {/* Right Side */}
          <div className="flex flex-col justify-center flex-1">
            <TextCombo
              smallText={tag}
              title={titlePrefix}
              spanText={titleHighlight}
              extraTitle={titleSuffix}
              description={description}
              textClass="lg:max-w-pct-080"
              className=""
            />
          </div>
        </div>
        {keyMetrics && keyMetrics?.length > 0 && (
          <div className="grid grid-rows-1 grid-cols-1 sm:grid-rows-2 sm:grid-cols-2 2md:grid-rows-1 2md:grid-cols-4 gap-space-12">
            {keyMetrics?.map(keyMetric => (
              <KeyMetricCard key={keyMetric.id} text={keyMetric.metric_value} description={keyMetric.metric_description} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VisionMissionSection;

import type { title } from '@/types/usecase';
import Image from 'next/image';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { extractTitleParts } from '@/utils/utilFunctions/extractTitleParts';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';
import TextCombo from '../TextCombo/TextCombo';

interface highlightFeature {
  id: number;
  icon: { url: string };
  text: string;
}

interface AboutContentProps {
  tag: string;
  title: title[];
  description: string;
  highlightFeatures: highlightFeature[];
  benefitPoints: string[];
}

const AboutDescription = ({ tag, title, description, highlightFeatures, benefitPoints }: AboutContentProps) => {
  const { titlePrefix, titleHighlight } = extractTitleParts(title);
  return (
    <div className="flex flex-col">
      <div className="text-size-3xs leading-[28px] font-bold text-primary">{tag || 'Who we are'}</div>
      <TextCombo
        title={titlePrefix || 'Reducing costs and increasing'}
        spanText={titleHighlight || 'efficiency'}
        titleClass="md:text-[48px] leading-[60px] font-semibold"
        description={description}
        descClass="text-[20px] font-normal leading[28px]"
      />
      {highlightFeatures && highlightFeatures.map((feature) => {
        const iconUrl = getImageUrl(feature.icon.url);
        return (
          <div key={feature.id} className="flex items-center gap-space-10">
            <Image src={iconUrl || '/assets/icons/truck(1).svg'} alt={feature.text} width={40} height={40} />
            <div className="text-[22px] leading-[30px] font-medium text-[#A8B5AD]">{feature.text || 'Packaging and crating'}</div>
          </div>
        );
      })}
      <div className="border-t border-primary pt-space-16">
        {benefitPoints && benefitPoints.map(point => (
          <div key={point} className="flex gap-space-06">
            <Image src={ImageConstants.GreenTick} alt="check" width={24} height={24} />
            <div className="text-size-4xs leading-[24px] font-normal text-[#A8B5AD]">{point}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutDescription;

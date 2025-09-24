import { useTranslations } from 'next-intl';
import CtaContent from '@/components/atoms/CtaContent/CtaContent';

interface CtaContentSectionProps {
  headingData?: any;
}

const CtaContentSection = ({ headingData }: CtaContentSectionProps) => {
  const ctaT = useTranslations('CtaContent');
  return (
    <div className="flex flex-col w-screen items-center justify-center bg-center bg-no-repeat object-center bg-cover bg-[image:var(--bg-image-train)] relative ">
      <div className="w-full flex flex-col gap-space-30 px-space-15 md:px-space-40 md:py-space-30 py-space-20 max-w-maxwidth ">
        <CtaContent
          title={headingData?.[0]?.personalized_demo_section.title[0].text || ctaT('title')}
          description={headingData?.[0]?.personalized_demo_section.description || ctaT('description')}
          tagline={headingData?.[0]?.personalized_demo_section.tag || ctaT('tag_line')}
          buttonText={ctaT('button_text')}
          mainClass="col-span-2 w-pct-080 z-20 text-white"
          descClass=""
        />
      </div>
    </div>
  );
};

export default CtaContentSection;

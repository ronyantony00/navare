import FeaturesChecklist from '@/components/atoms/FeaturesChecklist/FeaturesChecklist';

interface BulletPoint {
  id: number;
  point: string;
}

interface TitleSectionProps {
  titleDescription?: string;
  bullet_section_heading: string;
  bulletPoints?: BulletPoint[];
}

const DemoPageTitleSection = ({ titleDescription, bullet_section_heading, bulletPoints }: TitleSectionProps) => {
  return (
    <section className="flex flex-col gap-space-14">
      <div className="max-w-space-290 flex flex-col gap-space-11">
        <div className="text-subtle-secondary text-size-2xs font-bold leading-relaxed text-primary-content-white">
          { titleDescription }
        </div>
        <div className="text-subtle-secondary text-size-3xs font-normal leading-relaxed text-primary-content-white">{bullet_section_heading}</div>
      </div>
      {bulletPoints && bulletPoints.length > 0 && (
        <FeaturesChecklist features={bulletPoints} />
      )}
    </section>
  );
};

export default DemoPageTitleSection;

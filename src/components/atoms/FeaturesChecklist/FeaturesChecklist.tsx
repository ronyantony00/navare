import Image from 'next/image';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface bullet_point {
  id: number;
  point: string;
}

interface listProps {
  features?: bullet_point[];
}

const FeaturesChecklist = ({ features }: listProps) => {
  return (
    <div className="flex flex-col gap-space-12">
      {features?.map(feature => (
        <div key={feature.id} className="flex gap-space-05">
          <div className="pt-space-02 md:pt-space-01"><Image src={ImageConstants.GreenCircleTick} width={15} height={15} alt="check" className="min-w-space-10 min-h-space-10" /></div>
          <div className="text-size-3xs text-subheading text-placeholder-text">{feature.point}</div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesChecklist;

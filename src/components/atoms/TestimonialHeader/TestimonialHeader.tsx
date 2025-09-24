import Image from 'next/image';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface HeaderProps {
  image: string;
  name: string;
  description?: string;
  imageType?: 'company' | 'avatar';
}

const TestimonialHeader = ({ image, name, description, imageType }: HeaderProps) => {
  return (
    <div className="flex gap-space-10 max-h-space-23">
      <div className={`overflow-hidden ${imageType === 'avatar' ? 'w-space-22 h-space-22 rounded-full' : 'rounded-xs'}`}>
        <Image src={image || ImageConstants.authorImage} alt="company-logo" width={100} height={100} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-center font-normal">
        <div className="caption text-primary">{name}</div>
        <div className="small-contentc text-subtle-text">{description}</div>
      </div>
    </div>
  );
};

export default TestimonialHeader;

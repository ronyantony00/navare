'use client';
import Image from 'next/image';
import { getImageUrl } from '@/utils/urlConstructor';

interface FeatureCardProps {
  id: number;
  icon: string | { url: string };
  title: string;
  description: string;
  isOpen: boolean;
  onCardClick: (cardId: number) => void;
}

const UsecasePageCard = ({ id, icon, title, description, isOpen, onCardClick }: FeatureCardProps) => {
  const iconUrl = typeof icon === 'object' ? getImageUrl(icon.url) : icon;

  return (
    <button
      type="button"
      onClick={() => onCardClick(id)}
      className={`py-space-08 md:py-space-19 px-space-08 md:px-space-21 lg:max-w-space-315 w-full border rounded-md-3
            cursor-pointer transition-all duration-500 ease-in-out z-30 ${isOpen ? 'bg-navare-green border-hightlight-border' : 'bg-feature-card border-feature-card-border'}`}
    >
      <div className="flex flex-col gap-space-0 sm:flex-row sm:gap-space-12">
        <div className="bg-icon-bg rounded-2xs p-space-03 flex-shrink-0 self-start">
          <Image src={iconUrl} alt="title" width={22} height={22} />
        </div>
        <div className={`flex flex-col ${isOpen ? 'gap-space-08' : 'gap-space-0'}`}>
          <div className="small-card-heading text-subtle-desc text-left pt-space-05 sm:pt-space-00">{title}</div>
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-space-100 opacity-100' : 'max-h-0 opacity-0'
          }`}
          >
            <div className="text-placeholder-text secondary-content text-left">{description}</div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default UsecasePageCard;

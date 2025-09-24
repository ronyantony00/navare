import Image from 'next/image';
import IntegrationBadge from '@/components/atoms/IntegrationBadge/IntegrationBadge';

interface Badge {
  text: string;
  variant?: 'default' | 'techPlatform' | 'featured' | 'carrier';
}

interface FeaturedIntegration {
  id?: number;
  logo: string;
  title: string;
  description: string;
  badges?: Badge[];
  category?: string;
  image: string;
}

const FeaturedIntegrationCard = ({ featuredIntegration }: { featuredIntegration: FeaturedIntegration }) => {
  return (
    <div className="flex w-full">
      <div className="flex flex-col w-1/2">
        <div>
          {featuredIntegration.badges?.map((badge, index) => (
            <IntegrationBadge key={index} variant={badge.variant}>
              {badge.text}
            </IntegrationBadge>
          ))}
        </div>
        <div><Image src={featuredIntegration.logo} alt={featuredIntegration.title} width={200} height={112} /></div>
        <div className="text-size-2xs font-bold md:text-size-sm">{featuredIntegration.title}</div>
        <div className="text-size-3xs leading-normal">{featuredIntegration.description}</div>
      </div>
      <div className="w-1/2"><Image src={featuredIntegration.image} alt={featuredIntegration.title} width={630} height={353} /></div>
    </div>
  );
};

export default FeaturedIntegrationCard;

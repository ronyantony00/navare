import type { Tag } from '@/types/integration';
import Image from 'next/image';
import IntegrationBadge from '@/components/atoms/IntegrationBadge/IntegrationBadge';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';

interface FeaturedCardProps {
  Integration_logo?: { url: string };
  Integration_name?: string;
  description?: string;
  image?: { url: string };
  integration_tags?: Tag[];
}

const FeaturedCard = ({ Integration_logo, Integration_name, description, image, integration_tags }: FeaturedCardProps) => {
  const logoUrl = Integration_logo?.url ? getImageUrl(Integration_logo?.url) : undefined;
  const imageUrl = image?.url ? getImageUrl(image.url) : undefined;

  return (
    <div className="flex flex-col-reverse md:flex-row w-full bg-white border border-white/20 rounded-lg gap-space-08 overflow-hidden">
      <div className="flex flex-col md:w-1/2 py-space-16 px-space-12 gap-space-08">
        <div className="flex justify-end gap-space-03">
          {integration_tags?.map((tag, index) => (
            <IntegrationBadge key={`${tag.id}-${index}`}>
              {tag.tagName}
            </IntegrationBadge>
          ))}
        </div>
        {logoUrl && (
          <div>
            <Image src={logoUrl} alt={Integration_name || 'logo'} width={200} height={112} />
          </div>
        )}
        <div className="text-size-2xs font-bold md:text-size-sm">{Integration_name}</div>
        <div className="text-size-3xs leading-normal">{description}</div>
      </div>
      {imageUrl && (
        <div className="md:w-1/2">
          <Image src={imageUrl} alt={Integration_name || 'image'} width={630} height={353} className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
};

export default FeaturedCard;

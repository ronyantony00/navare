import type { CardContent } from '@/types/usecase';
import UsecasePageCard from '@/components/molecules/UsecasePageCard/UsecasePageCard';
import { cardData } from '@/constants/dataConstants/landingPageConstant';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';

interface UsecaseCardContainerProps {
  CardData: CardContent[];
}

const UsecaseCardContainer = ({ CardData }: UsecaseCardContainerProps) => {
  return (
    <div className="flex justify-center z-50">
      <div className="flex flex-col justify-between 2md:flex-row 2md:w-full 2md:justify-center gap-space-10 2md:gap-space-12">
        {cardData && CardData?.map((data) => {
          return (
            <div key={data.id}>
              <UsecasePageCard
                icon={data?.icon?.url ? getImageUrl(data.icon.url) : ''}
                title={data.title}
                description={data.content}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsecaseCardContainer;

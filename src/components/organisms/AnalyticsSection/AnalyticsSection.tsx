import type { advantage } from '@/types/usecase';
import AnalyticsCard from '@/components/molecules/AnalyticsCard/AnalyticsCard';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';

interface AnalyticsSectionProps {
  analyticsData: advantage[];
}

const AnalyticsSection = ({ analyticsData }: AnalyticsSectionProps) => {
  if (!analyticsData || analyticsData.length === 0) {
    return (
      <div className="my-space-05"></div>
    );
  }

  return (
    <div className="flex flex-col gap-space-30">
      {analyticsData.map((data, index) => (
        <AnalyticsCard
          id={data.id}
          key={data.id}
          variant={index % 2 === 0 ? 'textRight' : 'textLeft'}
          title={data?.title}
          content={data.content}
          media={data.media.url ? getImageUrl(data.media.url) : ''}
        />
      ))}
    </div>
  );
};

export default AnalyticsSection;

import InfoItem from '@/components/atoms/ContactInfoItem/ContactInfoItem';

interface Info {
  id?: number;
  city?: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
  location?: string;
}

interface InfoCardProps {
  title?: string;
  infoSet?: Info[];
}

const InfoCard = ({ title, infoSet }: InfoCardProps) => {
  return (
    <div className="flex flex-col gap-space-16">
      <div className="card-title text-subtle-desc">{title}</div>
      <div className="flex flex-col gap-space-12">
        {infoSet?.map(item => (
          <InfoItem
            key={item.id}
            city={item.city}
            address={item.address}
            email={item.email}
            phone={item.phoneNumber}
            mapEmbedUrl={item.location}
          />
        ))}
      </div>
    </div>
  );
};

export default InfoCard;

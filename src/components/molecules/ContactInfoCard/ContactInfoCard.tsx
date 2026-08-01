import InfoItem from '@/components/atoms/ContactInfoItem/ContactInfoItem';

interface Info {
  id?: number;
  city?: string;
  tag?: string;
  address?: string;
  email?: string | any;
  phoneNumber?: string;
  phone_contact?: any;
  location?: string;
  locations?: string;
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
        {infoSet?.map((item, index) => {
          const getPhone = () => {
            if (item.phoneNumber) return item.phoneNumber;
            if (Array.isArray(item.phone_contact)) {
              return item.phone_contact.map((p: any) => (typeof p === 'string' ? p : p?.phone || '')).filter(Boolean).join(', ');
            }
            if (typeof item.phone_contact === 'string') return item.phone_contact;
            return '';
          };

          return (
            <InfoItem
              key={item.id || index}
              city={item.city || item.tag}
              address={item.address}
              email={item.email}
              phone={getPhone()}
              mapEmbedUrl={item.location || item.locations}
            />
          );
        })}
      </div>
    </div>
  );
};

export default InfoCard;

import InfoCard from '@/components/molecules/ContactInfoCard/ContactInfoCard';

interface Info {
  id?: number;
  city?: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
  locations?: string;
}

interface ContactInfo {
  id: number;
  country_name?: string;
  offices?: Info[];
}

interface InfoSectionProps {
  ContactInfo?: ContactInfo[];
}

const ContactInfoSection = ({ ContactInfo }: InfoSectionProps) => {
  return (
    <div className="max-w-maxwidth mx-auto flex flex-col gap-space-26 section-padding-x section-padding-y">
      {ContactInfo?.map((info, index) => (
        <InfoCard key={index} title={info.country_name} infoSet={info.offices} />
      ))}
    </div>
  );
};

export default ContactInfoSection;

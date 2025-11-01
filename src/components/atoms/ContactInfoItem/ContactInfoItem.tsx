import SimpleMap from '../SimpleMap/SimpleMap';

interface InfoItemProps {
  city?: string;
  address?: string;
  email?: string;
  phone?: string;
  mapEmbedUrl?: string;
}

const ContactInfoItem = ({ city, address, email, phone, mapEmbedUrl }: InfoItemProps) => {
  // console.warn('MAP EMBED URL:', mapEmbedUrl);
  return (
    <div className="rounded-md-3 p-space-10 md:px-space-29 md:py-space-15 feature-card-bg md:max-h-space-150 border border-border-color relative overflow-hidden">
      <span className="absolute top-space-89 w-space-200 h-space-100 right-space-10 bg-primary-blur blur-[80px] opacity-80"></span>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex xl:flex-row flex-col z-50 w-full">
          <div className="flex flex-col gap-space-08 max-w-pct-080 xl:max-w-pct-030 w-fit">
            <div className="small-card-heading text-subtle-desc">{city || 'city'}</div>
            <div className="secondary-content text-text-placeholder">{address}</div>
          </div>
          <div className="secondary-content text-text-placeholder pt-space-12 pl-space-00 xl:pl-space-12 xl:pt-space-00 flex-1 flex flex-col justify-end">
            <div>
              E-Mail:
              {' '}
              {email}
            </div>
            <div>
              Phone:
              {' '}
              {phone}
            </div>
          </div>
        </div>
        <div className="rounded-md-2 mt-space-06 md:mt-space-00 overflow-hidden w-full md:max-w-space-150 h-space-100 z-50">
          <SimpleMap mapUrl={mapEmbedUrl || ''} />
        </div>
      </div>
    </div>
  );
};

export default ContactInfoItem;

import SimpleMap from '../SimpleMap/SimpleMap';

interface InfoItemProps {
  city?: string;
  address?: string;
  email?: string | string[] | any;
  phone?: string;
  mapEmbedUrl?: string;
}

const ContactInfoItem = ({ city, address, email, phone, mapEmbedUrl }: InfoItemProps) => {
  const parseEmails = (input: any): string[] => {
    if (!input) return [];
    if (Array.isArray(input)) {
      return input.map(item => (typeof item === 'string' ? item : item?.email_id || item?.email || '')).filter(Boolean);
    }
    if (typeof input === 'string') {
      return input.split(/[,;\n]+/).map(e => e.trim()).filter(Boolean);
    }
    return [];
  };

  const emailList = parseEmails(email);

  return (
    <div className="rounded-md-3 p-space-10 md:px-space-29 md:py-space-15 feature-card-bg border border-border-color relative overflow-hidden">
      <span className="absolute top-space-89 w-space-200 h-space-100 right-space-10 bg-primary-blur blur-[80px] opacity-80 pointer-events-none"></span>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-space-16">
        <div className="flex xl:flex-row flex-col gap-space-12 xl:gap-space-20 z-10 w-full">
          <div className="flex flex-col gap-space-08 max-w-pct-080 xl:max-w-pct-035 w-fit">
            <div className="small-card-heading text-subtle-desc font-semibold">{city || 'Office'}</div>
            <div className="secondary-content text-text-placeholder leading-relaxed">{address}</div>
          </div>
          <div className="secondary-content text-text-placeholder pt-space-12 pl-space-00 xl:pl-space-12 xl:pt-space-00 flex-1 flex flex-col justify-end gap-space-08">
            {emailList.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-start gap-x-space-08 gap-y-space-02">
                <span className="font-medium text-secondary-text shrink-0">E-Mail:</span>
                <div className="flex flex-col gap-space-03">
                  {emailList.map((mail, idx) => (
                    <a
                      key={idx}
                      href={`mailto:${mail}`}
                      className="hover:text-primary transition-colors duration-200 underline-offset-2 hover:underline break-all"
                    >
                      {mail}
                    </a>
                  ))}
                </div>
              </div>
            )}
            {phone && (
              <div className="flex flex-row items-center gap-space-08">
                <span className="font-medium text-secondary-text shrink-0">Phone:</span>
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="hover:text-primary transition-colors duration-200 hover:underline"
                >
                  {phone}
                </a>
              </div>
            )}
          </div>
        </div>
        {mapEmbedUrl ? (
          <div className="rounded-md-2 mt-space-06 md:mt-space-00 overflow-hidden w-full md:max-w-space-150 h-space-100 z-10 shrink-0">
            <SimpleMap mapUrl={mapEmbedUrl} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ContactInfoItem;

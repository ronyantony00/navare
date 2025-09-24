import type { faqType } from '@/types/interfaces';
import Image from 'next/image';
import FaqSection from '../ContactPageFaqSection/ContactPageFaqSection';

interface IntegrationFAQProps {
  data: faqType[];
  titlePrefix: string;
  titleHighlight: string;
}

const IntegrationFAQ = ({ data, titlePrefix, titleHighlight }: IntegrationFAQProps) => {
  return (
    <div className="max-w-maxwidth mx-auto w-full relative">
      <div className="absolute top-0 right-0">
        <Image src="/assets/images/CommonAssets/bg-point-circle.svg" alt="FAQ Background" width={300} height={300} />
      </div>
      <div className="absolute bottom-0 left-0">
        <Image src="/assets/images/CommonAssets/bg-point-circle(2).svg" alt="FAQ Background" width={250} height={250} />
      </div>
      <FaqSection data={data || []} titlePrefix={titlePrefix} titleHighlight={titleHighlight} />
    </div>
  );
};

export default IntegrationFAQ;

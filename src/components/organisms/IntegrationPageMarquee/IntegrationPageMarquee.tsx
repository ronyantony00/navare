import type { ClientLogo } from '@/types/interfaces';
import type { title } from '@/types/usecase';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import Marquee from '@/components/molecules/Marquee/Marquee';
// import { logos } from '@/constants/dataConstants/NavareConstants';

interface MarqueeProps {
  clientLogos: ClientLogo[];
  title?: title[];
  description?: string;
  titlePrefix: string;
  titleHighlight: string;
}

const IntegrationLogoMarquee = ({ clientLogos, titlePrefix, titleHighlight, description }: MarqueeProps) => {
  if (clientLogos.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-maxwidth mx-auto">
      <div className="flex flex-col lg:gap-space-24 gap-space-08 relative section-padding-x overflow-hidden">
        <span className="absolute bg-primary-blur top-space-50 left-pct-050 lg:w-space-100 w-space-75 lg:h-space-250 h-space-150 blur-3xl opacity-50 -rotate-45 z-10"></span>
        <TextCombo
          title={titlePrefix}
          spanText={titleHighlight}
          description={description || 'Navare connects with industry-leading tools to bring together logistics, finance, and ecommerce - all in one system.'}
          textClass="sm:max-w-pct-060"
          descClass="sm:max-w-pct-060"
          className="items-center text-center mx-auto section-padding-x lg:pt-space-30 pt-space-20 relative z-20"
        />
        <div className="flex flex-col gap-space-10 z-10 relative">
          <div className="absolute -right-space-10 h-full marquee-overlay md:w-space-200 w-space-100"></div>
          <div className="flex flex-col gap-space-10 lg:pb-space-30 pb-space-20">
            <Marquee logos={clientLogos} direction="left" />
            <Marquee logos={clientLogos} direction="right" />
            <Marquee logos={clientLogos} direction="left" />
          </div>
          <div className="absolute -left-space-10 rotate-180 h-full marquee-overlay md:w-space-200 w-space-100"></div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationLogoMarquee;

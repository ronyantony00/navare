import type { ClientLogo } from '@/types/interfaces';
import LogoCircle from '@/components/atoms/LogoCircle/LogoCircle';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';

interface HeroSectionProps {
  tag?: string;
  description?: string;
  title?: string;
  clientLogos?: ClientLogo[];
}

const logoCircleConfigs = [
  { className: 'lg:flex hidden lg:size-space-25 size-space-10 bg-hightlight-border/12 border border-primary opacity-20', doubleLayer: false },
  { className: 'md:flex hidden lg:size-space-30 size-space-20 bg-hightlight-border/12 border border-primary opacity-30', doubleLayer: false },
  { className: '2xs:flex hidden lg:size-space-40 size-space-30 bg-hightlight-border/12 border border-primary opacity-50', doubleLayer: false },
  { className: 'flex lg:size-space-50 size-space-40 bg-hightlight-border/12 border border-primary opacity-90', doubleLayer: false },
  { className: 'flex lg:size-space-70 size-space-60 bg-hightlight-border/12', doubleLayer: true },
  { className: 'flex lg:size-space-50 size-space-40 bg-hightlight-border/12 border border-primary opacity-90', doubleLayer: false },
  { className: '2xs:flex hidden lg:size-space-40 size-space-30 bg-hightlight-border/12 border border-primary opacity-50', doubleLayer: false },
  { className: 'md:flex hidden lg:size-space-30 size-space-20 bg-hightlight-border/12 border border-primary opacity-30', doubleLayer: false },
  { className: 'lg:flex hidden lg:size-space-25 size-space-10 bg-hightlight-border/12 border border-primary opacity-20', doubleLayer: false },
];

const IntegrationsHero = ({ description, title, clientLogos }: HeroSectionProps) => {
  const logos = clientLogos?.slice(0, 9) || [];
  return (
    <div className="bg-[image:var(--bg-integrations-hero-image)] bg-contain bg-center bg-no-repeat">
      <div className="max-w-maxwidth mx-auto section-padding-x section-padding-y relative overflow-visible">
        <div className="flex flex-col items-center lg:gap-space-24 gap-space-08">
          <TextCombo
            title={title}
            description={description}
            titleClass="hero-title"
            className="items-center text-center z-30 lg:max-w-pct-080"
            descClass="lg:max-w-pct-080"
          />
          <div className="flex 2xs:gap-space-10 gap-space-05 items-center">
            {logos.map((logo, idx) => {
              const config = logoCircleConfigs[idx] || logoCircleConfigs[0];
              const src = logo.logo && typeof logo.logo === 'object' && logo.logo.url ? getImageUrl(logo.logo.url) : '';
              const alt = logo.clientName || 'Logo';
              return (
                <LogoCircle
                  key={logo.id || idx}
                  src={src}
                  alt={alt}
                  className={config?.className}
                  doubleLayer={config?.doubleLayer}
                />
              );
            })}
          </div>
          <span className="absolute bg-primary-blur md:bottom-0 bottom-space-10 mx-auto w-full h-space-10 blur-[var(--blur-intensity)] opacity-60 z-10"></span>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsHero;

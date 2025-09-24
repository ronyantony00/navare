'use client';
import type { ClientLogo } from '@/types/interfaces';
import { useTranslations } from 'next-intl';
import Marquee from '../Marquee/Marquee';

interface MarqueeProps {
  logos: ClientLogo[];
  title?: string;
}

const LogoMarquee = ({ title, logos }: MarqueeProps) => {
  const t = useTranslations('DemoBookingPage');
  return (
    <div className="max-w-section-max-width mx-auto px-space-12 py-space-05">
      <div className="flex flex-col md:flex-row gap-space-20">
        <div className="text-center bg-blue my-auto md:w-1/3">{title || t('joinBuisness')}</div>
        <div className="relative overflow-hidden w-full">
          <div className="absolute left-0 top-0 w-8 md:w-16 lg:w-space-40 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-8 md:w-16 lg:w-space-40 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          <div className="flex flex-col gap-space-12">
            <div><Marquee logos={logos} /></div>
            <div className="block md:hidden"><Marquee logos={logos} /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoMarquee;

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import NavBarPromoCard from '@/components/atoms/NavBarPromoCard/NavBarPromoCard';
import NavOptionSection from '@/components/molecules/NavOptionSection/NavOptionSection';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface Option {
  id: number;
  title: string;
  description: string;
  icon: string;
  href?: string;
}

interface MegaMenuPanelProps {
  options: Option[];
  promoCardImage?: string;
  promoCardDescription?: string;
  linkOnCard?: string;
  linkOnButton?: string;
  ButtonText?: string;
  onNavigate?: () => void;
  onMobileNavigate?: () => void;
}

const MegaMenuPanel = ({ options, promoCardImage, promoCardDescription, linkOnCard, linkOnButton, ButtonText, onNavigate, onMobileNavigate }: MegaMenuPanelProps) => {
  const [promoCardVisible, setPromoCardVisible] = useState(true);
  const optionsLength = options.length;
  useEffect(() => {
    if (optionsLength > 4) {
      setPromoCardVisible(false);
    } else {
      setPromoCardVisible(true);
    }
  }, [optionsLength]);
  return (
    <div className="bg-navare-green border-b 2md:border-t border-navare-green-light relative max-h-[80vh] overflow-y-auto scrollbar-hide" role="menu" aria-label="Navigation menu">
      <span className="absolute top-space-80 right-space-40 bg-primary-blur h-space-240 w-pct-050 rounded-full blur-[100px] opacity-65" />
      <span className="absolute top-space-50 -left-space-200 bg-blue-circle-bg w-space-290 h-space-225 blur-[100px] opacity-40"></span>

      <div className={`flex justify-between h-full gap-space-10 max-w-maxwidth mx-auto px-space-12 xl:px-space-40 pb-space-10
        2md:pt-space-10
        ${!promoCardVisible ? 'bg-[image:var(--bg-image-mega-menu)] bg-no-repeat bg-right' : ''}`}
      >
        <div className={`flex flex-col gap-space-16 md:gap-space-20 justify-between ${promoCardVisible ? '2md:w-1/2' : ''}`}>
          {options.length > 0 && (
            <div className={`${promoCardVisible ? '' : ''} pt-space-10 w-full 2md:pl-space-12 z-10`}>
              <NavOptionSection options={options} onNavigate={onMobileNavigate || onNavigate} />
            </div>
          )}

          {/* button */}
          <Link
            href={linkOnButton || ''}
            className="2xs:flex hidden items-center rounded-full 2md:max-w-space-325 px-space-15 py-space-10 justify-between
            group border border-navare-green-light cursor-pointer z-10 "
            onClick={onMobileNavigate || onNavigate}
          >
            <div className="text-secondary-text group-hover:text-primary font-bold text-size-3xs">{ButtonText}</div>
            <Image src={ImageConstants.rightArrow} alt="arrow" width={28} height={28} />
          </Link>
        </div>

        {/* promo card */}
        { promoCardVisible && promoCardImage && (
          <div className="hidden 2md:flex 2md:w-1/2 2md:justify-end">
            <div className="max-w-space-290 w-full z-10">
              <NavBarPromoCard
                description={promoCardDescription || ''}
                href={linkOnCard || ''}
                image={promoCardImage || ''}
                onNavigate={onMobileNavigate || onNavigate}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MegaMenuPanel;

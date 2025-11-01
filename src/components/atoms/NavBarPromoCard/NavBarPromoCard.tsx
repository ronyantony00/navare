'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface PromoCardProps {
  image: string;
  description: string;
  href: string;
  onNavigate?: () => void;
}
const NavBarPromoCard = ({ image, description, href, onNavigate }: PromoCardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 200);

    if (href && pathname && pathname !== href) {
      router.push(`/blog-detail/${href}`);
    }
  };

  return (
    <button
      type="button"
      className={`rounded-2xl px-space-09 pt-space-09 pb-space-20 bg-navare-green border border-navare-green-light
    max-w-space-300 cursor-pointer w-full h-full transition-transform duration-200 ease-out
    ${isClicked ? 'scale-105' : 'scale-100 hover:scale-102'}`}
      onClick={() => {
        handleClick();
        onNavigate?.();
      }}
    >
      <div className="flex flex-col h-full w-full gap-space-20">
        <div className="border border-navare-green-light rounded-md-3 relative overflow-hidden max-h-space-165">
          {image && (
            <Image
              src={image}
              alt="promo-image"
              width={300}
              height={175}
              className="w-full h-full"
            />
          )}
        </div>
        <div className="flex gap-space-13 justify-between">
          <div className="text-base-white hover:text-primary my-auto text-size-4xs font-normal text-left">{description}</div>
          <div className="my-auto"><Image src={ImageConstants.rightArrow} alt="arrow" width={28} height={28} className="min-w-space-14 min-h-space-14" /></div>
        </div>
      </div>
    </button>
  );
};

export default NavBarPromoCard;

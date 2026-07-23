import Image from 'next/image';
import React from 'react';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';

export interface LandingPageFooterProps {
  titlePrefix?: string;
  titleHighlight?: string;
  description?: string;
  buttonOneText?: string;
  image?: string;
}

const LandingPageFooter = ({ titlePrefix, titleHighlight, description, buttonOneText, image }: LandingPageFooterProps) => {
  const footerImageSrc = getImageUrl(image) || ImageConstants.LandingFooterImage;

  return (
    <div className="w-full max-w-maxwidth section-padding-y section-padding-x">
      <div className="w-full gradient-border-corners-footer flex flex-col h-full items-center justify-center p-space-01 rounded-lg overflow-hidden border relative">
        <div className="absolute top-0 left-0 w-full h-full z-10 p-space-01 overflow-hidden">
          <Image
            src={footerImageSrc}
            alt="landing page footer"
            width={1265}
            height={528}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="ml-auto lg:max-w-pct-060 lg:p-space-40 sm:p-space-20 p-space-05 pt-space-20 z-10">
          <TextCombo
            title={titlePrefix || ''}
            spanText={titleHighlight || ''}
            description={description || ''}
            buttonOneText={buttonOneText}
            buttonOneLink="/schedule-demo"
            className="flex flex-col items-center text-center sm:p-space-20 p-space-10 landing-footer-bg rounded-lg"
            titleClass="sub-heading font-bold"
            descClass="text-desc-text secondary-content"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPageFooter;

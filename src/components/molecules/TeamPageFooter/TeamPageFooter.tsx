import Image from 'next/image';
import React from 'react';
import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';

interface TeamPageFooterProps {
  title?: string;
  spanText?: string;
  description?: string;
  buttonOneText?: string;
  buttonOneLink?: string;
  footerImage?: string;
}
const TeamPageFooter = ({ title, spanText, description, buttonOneText, buttonOneLink, footerImage }: TeamPageFooterProps) => {
  return (
    <div className="w-full flex flex-col h-full items-center justify-center lg:py-space-30 py-space-20 ">
      <div className="w-full  flex flex-col h-full items-center justify-center p-space-01 rounded-lg gradient-border-corners-footer">

        <div className="relative flex bg-team-hero-bg w-full h-full rounded-lg pt-space-20 ">
          {/* Overlay for dark effect */}
          <div className="absolute top-0 left-0 w-full h-full rounded-lg overlay-dark z-10" />
          <div className="ml-auto lg:max-w-pct-060 lg:p-space-40 sm:p-space-20 p-space-02 z-50 ">
            <TextCombo
              title={title}
              spanText={spanText}
              description={description}
              buttonOneText={buttonOneText}
              buttonOneLink={buttonOneLink || '/careers'}
              className="flex flex-col items-center text-center sm:p-space-20 p-space-10 landing-footer-bg rounded-lg border border-border-color"
              textClass="max-w-pct-090 2md:max-w-full"
              descClass="text-desc-text max-w-pct-090"
              titleClass="sub-heading font-bold"
            />
          </div>
          <Image
            src={getImageUrl(footerImage) || ImageConstants.TeamFooterImage}
            alt="Team Footer"
            width={500}
            height={500}
            className="absolute object-cover top-0 left-0 w-full h-full rounded-lg "
          />
        </div>
      </div>
    </div>
  );
};

export default TeamPageFooter;

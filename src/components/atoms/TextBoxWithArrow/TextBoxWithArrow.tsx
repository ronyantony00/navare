import Image from 'next/image';
import React from 'react';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface TextBoxWithArrowProps {
  title: string;
  description: string;
  onMessageButtonClick?: () => void;
}

const TextBoxWithArrow = ({ title, description, onMessageButtonClick }: TextBoxWithArrowProps) => {
  return (
    <div className="grow flex flex-col gap-space-15 h-full">
      <div className="h-fit flex justify-between gap-space-10 md:p-space-20 p-space-10">
        <Image
          src={ImageConstants.NavareWhiteLogo}
          alt="Navare Solutions - Home"
          width={90}
          height={30}
          className="cursor-pointer"
          priority
        />
        <div className="flex">
          <Image
            src={ImageConstants.EmployeeImageOne}
            alt="EmployeeImageOne"
            width={30}
            height={30}
            className="cursor-pointer size-space-20 rounded-full object-cover"
          />
          <Image
            src={ImageConstants.EmployeeImageTwo}
            alt="EmployeeImageTwo"
            width={30}
            height={30}
            className="relative -left-space-10 cursor-pointer size-space-20 rounded-full object-cover"
          />
        </div>
      </div>
      {/* home section */}
      <div className="flex flex-col gap-space-05 md:p-space-20 p-space-10">
        <div className="flex flex-col gap-space-02">
          <div className="base:text-size-md-2 text-size-sm-2 font-comme font-bold text-desc-text">
            Hi There
          </div>
          <div className="base:text-size-md-2 text-size-sm-2 font-comme font-bold text-white">
            How can we help?
          </div>
        </div>
        {/* message div button */}
        <button
          type="button"
          className="stories-card-bg cursor-pointer flex justify-between items-center base:p-space-10 p-space-05 rounded-sm w-full text-left"
          onClick={onMessageButtonClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onMessageButtonClick?.();
            }
          }}
        >
          <div className="">
            <div className="base:text-size-2xs text-size-sm-2 font-bold font-comme text-white">{title}</div>
            <div className="base:text-siz-3xs text-size-4xs text-desc-text">{description}</div>
          </div>
          <Image
            src={ImageConstants.GreenArrow}
            alt="GreenArrow"
            width={50}
            height={50}
            className="cursor-pointer"
          />
        </button>
      </div>
      {/* chat section */}
      <div className="flex flex-col items-center justify-between h-full gap-space-05 hidden">
        <Image
          src={ImageConstants.ChatMsgInactiveIcon}
          alt="ChatHomeInactiveIcon"
          width={50}
          height={50}
        />
        <div className="base:text-size-2xs text-size-sm-2 font-bold font-comme text-white">No Messages</div>
        <div className="base:text-siz-3xs text-size-4xs text-desc-text">Messages from the team will be shown here</div>
      </div>
    </div>
  );
};

export default TextBoxWithArrow;

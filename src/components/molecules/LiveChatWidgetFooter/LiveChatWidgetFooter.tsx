import Image from 'next/image';
import React from 'react';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface LiveChatWidgetFooterProps {
  activeSection: 'home' | 'message';
  onSectionChange: (section: 'home' | 'message') => void;
}

const LiveChatWidgetFooter = ({ activeSection, onSectionChange }: LiveChatWidgetFooterProps) => {
  return (
    <div className="stories-card-bg flex justify-around items-center base:p-space-10 p-space-05 rounded-tl-sm rounded-tr-sm">
      {/* home section */}
      <button
        className="flex flex-col items-center gap-space-05 cursor-pointer bg-transparent border-none"
        onClick={() => onSectionChange('home')}
        type="button"
      >
        <Image
          src={activeSection === 'home' ? ImageConstants.LiveChatHomeIcon : ImageConstants.ChatHomeInactiveIcon}
          alt="LiveChatHideIcon"
          width={20}
          height={20}
          className="cursor-pointer"
        />
        <div className={`text-size-4xs ${activeSection === 'home' ? 'text-primary' : 'text-desc-text'}`}>
          Home
        </div>
      </button>
      {/* message section */}
      <button
        className="flex flex-col items-center gap-space-05 cursor-pointer bg-transparent border-none"
        onClick={() => onSectionChange('message')}
        type="button"
      >
        <Image
          src={activeSection === 'message' ? ImageConstants.LiveChatMsgIcon : ImageConstants.ChatMsgInactiveIcon}
          alt="LiveChatIcon"
          width={20}
          height={20}
          className="cursor-pointer"
        />
        <div className={`text-size-4xs ${activeSection === 'message' ? 'text-primary' : 'text-desc-text'}`}>
          Message
        </div>
      </button>
    </div>
  );
};

export default LiveChatWidgetFooter;

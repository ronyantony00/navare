'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Button from '@/components/atoms/CustomButton/Button';
import TextBoxWithArrow from '@/components/atoms/TextBoxWithArrow/TextBoxWithArrow';
import LiveChatWidgetFooter from '@/components/molecules/LiveChatWidgetFooter/LiveChatWidgetFooter';
import LiveChatWindow from '@/components/molecules/LiveChatWindow/LiveChatWindow';
import ImageConstants from '@/constants/imageConstants/imageConstants';

const LiveChatWidget = () => {
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<'home' | 'message'>('home');
  const [showChatWindow, setShowChatWindow] = useState(false);

  const toggleWidget = () => {
    setIsWidgetVisible(!isWidgetVisible);
    // Reset chat window visibility when widget is toggled
    if (!isWidgetVisible) {
      setShowChatWindow(false);
    }
  };

  const handleSectionChange = (section: 'home' | 'message') => {
    setActiveSection(section);
  };

  const handleMessageButtonClick = () => {
    setShowChatWindow(true);
  };

  const handleBackClick = () => {
    setShowChatWindow(false);
  };

  const handleCloseClick = () => {
    setIsWidgetVisible(false);
    setShowChatWindow(false);
  };

  return (
    <div className="fixed flex flex-col sm:max-w-space-200 max-w-pct-090 w-full gap-space-05 items-end bottom-space-10 right-space-10 z-999">
      {/* Live Chat Widget */}
      {isWidgetVisible && (
        <div
          className="stories-card-bg size-full min-h-vh-md-2 flex flex-col justify-between overflow-hidden rounded-lg transition-all duration-300 ease-in-out opacity-100 translate-y-0"
        >
          {/* Home Section */}
          {activeSection === 'home' && !showChatWindow && (
            <TextBoxWithArrow
              title="Send us a message"
              description="We typically reply within a day"
              onMessageButtonClick={handleMessageButtonClick}
            />
          )}

          {/* Message Section */}
          {activeSection === 'message' && !showChatWindow && (
            <div className="grow flex flex-col gap-space-15 justify-between base:p-space-20 p-space-10">
              <div className="sm:text-size-xs text-size-sm-2 font-medium font-comme text-desc-text mx-auto">Messages</div>
              <div className="flex flex-col items-center text-center justify-center gap-space-10">
                <Image
                  src={ImageConstants.ChatMsgInactiveIcon}
                  alt="ChatHomeInactiveIcon"
                  width={50}
                  height={50}
                />
                <div className="sm:text-size-xs text-size-sm-2 font-bold font-comme text-white">No Messages</div>
                <div className="sm:text-size-3xs text-size-4xs text-desc-text">Messages from the team will be shown here</div>
              </div>
              {/* message div button */}
              <Button
                text="Send Us a Message"
                variant="primary"
                arrow={true}
                mainClass="w-fit mx-auto"
                arrowClassName="size-space-05"
                onClick={handleMessageButtonClick}
              />
            </div>
          )}

          {/* Live Chat Window - only show when showChatWindow is true */}
          {showChatWindow && (
            <LiveChatWindow onBack={handleBackClick} onClose={handleCloseClick} />
          )}

          <LiveChatWidgetFooter
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
        </div>
      )}
      {/* Live Chat Icon */}
      <Image
        src={ImageConstants.LiveChatIcon}
        alt="LiveChatIcon"
        width={50}
        height={50}
        className="cursor-pointer hover:scale-110 transition-transform duration-200 pr-space-10"
        onClick={toggleWidget}
      />
    </div>
  );
};

export default LiveChatWidget;

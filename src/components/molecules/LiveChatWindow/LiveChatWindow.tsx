import Image from 'next/image';
import React from 'react';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface LiveChatWindowProps {
  onBack?: () => void;
  onClose?: () => void;
}

const LiveChatWindow = ({ onBack, onClose }: LiveChatWindowProps) => {
  return (
    <div className="grow flex flex-col justify-between gap-space-05">
      <div className="flex justify-between items-center gap-space-10 p-space-05">
        <div className="flex justify-start items-center">
          <Image
            src={ImageConstants.ChatBackIcon}
            alt="ChatBackIcon"
            width={20}
            height={20}
            className="cursor-pointer mx-space-05"
            onClick={onBack}
          />
          <div className="flex items-center justify-center">
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
          <div className="flex flex-col">
            <div className="text-size-3xs font-bold font-comme text-desc-text">Navare AI</div>
            <div className="flex gap-space-02 text-size-4xs text-desc-text">
              <Image
                src={ImageConstants.ChatTimeIcon}
                alt="ChatTimeIcon"
                width={20}
                height={20}
                className="cursor-pointer"
              />
              <span className="text-desc-text">Back later today</span>
            </div>
          </div>
        </div>
        <Image
          src={ImageConstants.ChatCloseIcon}
          alt="ChatCloseIcon"
          width={50}
          height={50}
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>
      <div className="flex flex-col gap-space-05 p-space-05">
        <div className="text-desc-text text-size-3xs text-center">How can we help? Ask a question</div>
        <div className="flex items-start text-desc-text text-size-3xs gap-space-05">
          <Image
            src={ImageConstants.ChatImpoIcon}
            alt="ChatInputIcon"
            width={50}
            height={50}
            className="cursor-pointer"
          />
          <div className="">
            This chat is dedicated to assisting with any issues you might encounter on our website.
          </div>
        </div>
      </div>
      <div className="p-space-05">
        <div className="flex flex-col gap-space-05 stories-card-bg p-space-05 rounded-sm text-desc-text text-size-3xs">
          <input type="text" placeholder="example@gmail.com" className="w-full border-b border-desc-text" />
          <textarea placeholder="Message" className="w-full" />
          <div className="flex items-center justify-end gap-space-05">
            <Image
              src={ImageConstants.ChatEmojiIcon}
              alt="ChatEmojiIcon"
              width={22}
              height={22}
              className="cursor-pointer"
            />
            <Image
              src={ImageConstants.ChatSendIcon}
              alt="ChatSendIcon"
              width={22}
              height={22}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChatWindow;

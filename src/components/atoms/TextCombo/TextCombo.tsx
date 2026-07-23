'use client';
import type { BlocksContent } from '@strapi/blocks-react-renderer';
import type { ReactNode } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Button from '@/components/atoms/CustomButton/Button';
import RichTextRenderer from '@/components/molecules/RichText/RichText';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';

export interface TextComboProps {
  className?: string;
  spanClass?: string;
  title?: string;
  titleClass?: string;
  extraTitle?: string;
  spanText?: string;
  description?: BlocksContent | string;
  descClass?: string;
  breakText?: ReactNode;
  bannerText?: string;
  buttonOneText?: string;
  buttonTwoText?: string;
  smallText?: string;
  btnClass?: string;
  linkPrefixText?: string;
  keyText?: string;
  valueText?: string | { id: number | string; value: string }[];
  textClass?: string;
  buttonOneLink?: string;
  buttonTwoLink?: string;
  buttonOneClick?: () => void;
  bannerImage?: string;
}

const TextCombo = ({ spanClass, title, description, spanText, className, titleClass = 'section-title', extraTitle, descClass = 'text-small-text', bannerText, breakText, buttonOneText, buttonTwoText, smallText, btnClass, keyText, valueText, textClass = '', buttonOneLink, buttonTwoLink, buttonOneClick, bannerImage }: TextComboProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!Array.isArray(valueText) || valueText.length <= 1) {
      return;
    }

    const animateText = () => {
      if (!textRef.current) {
        return;
      }

      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      timelineRef.current = gsap.timeline();
      timelineRef.current
        .to(textRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
        .call(() => {
          setCurrentIndex(prevIndex => (prevIndex + 1) % valueText.length);
        })
        .set(textRef.current, {
          y: -20,
          opacity: 0,
        })
        .to(textRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
    };

    const interval = setInterval(animateText, 3000);

    return () => {
      clearInterval(interval);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [valueText]);

  return (
    <div className={`flex flex-col min-w-0 max-w-full ${className}`}>
      {bannerImage && (
        <div className="bg-white h-8 md:h-14 object-contain flex items-center rounded-2xs p-space-03 md:p-space-05 w-fit max-w-[9.5rem] md:max-w-none overflow-hidden mb-space-05">
          <Image
            src={getImageUrl(bannerImage)}
            alt="logo"
            width={131}
            height={29}
            className="h-full w-full object-contain"
          />
        </div>
      )}
      {bannerText && <div className="button-text hidden 2xs:block text-center px-space-08 md:px-space-14 py-space-03 md:py-space-05 border rounded-xl text-subtle-desc mb-space-12 w-fit">{bannerText}</div>}
      {smallText && <div className="very-small-heading pb-space-06 text-primary">{smallText}</div>}
      <div className={`${textClass} w-full max-w-full min-w-0 leading-sub-title font-medium font-comme pb-space-06 lg:pb-space-12`}>
        <span className={`${titleClass} gradient-text break-words [overflow-wrap:anywhere] ${title ? 'mr-space-05' : ''}`}>
          {title}
          {breakText}
        </span>
        {/* {' '} */}
        {spanText && <span className={` ${spanClass} ${titleClass} text-primary break-words [overflow-wrap:anywhere] ${spanText ? 'mr-space-05' : ''}`}>{spanText}</span>}
        {/* {' '} */}
        {extraTitle && <span className={`${titleClass} gradient-text break-words [overflow-wrap:anywhere]`}>{extraTitle}</span>}
      </div>
      {description && (
        <div className={`leading-description primary-content text-desc-text break-words [overflow-wrap:anywhere] max-w-full ${descClass} pb-space-06 lg:pb-space-12`}>
          {typeof description === 'string' ? description : <RichTextRenderer content={description} />}
        </div>
      )}
      {keyText && (
        <div className={`text-size-2xs text-white flex flex-wrap sm:flex-row flex-col gap-space-05 font-bold leading-description lg:pb-space-06 pb-space-12 ${descClass}`}>
          {keyText}
          <div className="h-space-15 overflow-hidden">
            <div className="flex flex-col gap-space-05">
              {Array.isArray(valueText)
                ? (
                    <div
                      ref={textRef}
                      className="font-medium text-blue-text"
                    >
                      {valueText[currentIndex]?.value}
                    </div>
                  )
                : (
                    <div className="font-medium text-blue-text">
                      {' '}
                      {valueText}
                    </div>
                  )}
            </div>
          </div>
        </div>
      )}
      {(buttonOneText || buttonTwoText) && (
        <div className={`flex flex-wrap gap-space-09 text-size-3xs text-desc-text ${btnClass}`}>
          {buttonOneText && (
            <Button animation text={buttonOneText || 'Get Started'} variant="primary" arrow={true} onClick={buttonOneClick} link={buttonOneLink} mainClass="gap-space-05" arrowClassName="size-space-05" />
          )}
          {buttonTwoText && (
            <Button animation text={buttonTwoText || 'Schedule a Demo'} variant="outline" link={buttonTwoLink} arrow={true} mainClass="text-desc-text" />
          )}
        </div>
      )}
    </div>
  );
};

export default TextCombo;

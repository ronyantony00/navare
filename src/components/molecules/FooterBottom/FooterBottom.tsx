import type { FooterText } from '@/types/commonTypes';
import Link from 'next/link';
import React from 'react';

interface footerBottomProps {
  footerServerTexts: FooterText[];
}
const FooterBottom = ({ footerServerTexts }: footerBottomProps) => {
  // Map footerServerTexts to footerTexts format
  const mappedFooterTexts: FooterText[] = footerServerTexts.map(serverText => ({
    id: serverText.id,
    footerText: serverText.footerText,
    path: serverText.footerText === 'Legal Hub.' ? '/legal' : undefined,
  }));

  return (
    <div className="flex flex-col 2xs:flex-row items-center justify-center 2xs:gap-space-10 gap-space-05">
      {mappedFooterTexts.map(obj => (
        obj.footerText === 'Legal Hub.'
          ? (
              <Link href="/legal" key={obj.id}>
                <div className="text-size-4xs cursor-pointer hover:text-link-subtle text-placeholder-text transition-colors duration-200">{obj.footerText}</div>
              </Link>
            )
          : (
              <div key={obj.id} className="text-size-4xs text-placeholder-text">{obj.footerText}</div>
            )
      ))}
    </div>
  );
};

export default FooterBottom;

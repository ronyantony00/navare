import Image from 'next/image';
import Link from 'next/link';
import FooterBottom from '@/components/molecules/FooterBottom/FooterBottom';
import { footerLinks } from '@/constants/dataConstants/FooterConstants';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { getFooterTextDataServer, getResourceCompanyNavbarDataServer, getSocialLinksDataServer, getSolutionsNavbarDataServer, getUseCaseNavbarDataServer } from '@/services/apiService';
import FooterLinkSection from '../FooterLinkSection/FooterLinkSection';

const Footer = async () => {
  const [solutionsNavbarDataResponse, useCaseNavbarDataResponse, socialLinksDataResponse, footerTextDataResponse, resourceCompanyNavbarDataResponse] = await Promise.all([
    getSolutionsNavbarDataServer(),
    getUseCaseNavbarDataServer(),
    getSocialLinksDataServer(),
    getFooterTextDataServer(),
    getResourceCompanyNavbarDataServer(),

  ]);
  const solutionsNavbarData = solutionsNavbarDataResponse.data;
  const useCaseNavbarData = useCaseNavbarDataResponse.data;
  const socialLinksData = socialLinksDataResponse.data;
  const footerServerTexts = footerTextDataResponse.data;
  const resourceCompanyData = resourceCompanyNavbarDataResponse.data;
  return (
    <footer className="bg-landing-hero-bg-color relative overflow-hidden" role="contentinfo">
      <span className="absolute top-space-00 w-space-290 h-space-250 -left-space-200 bg-primary-blur rounded-full blur-[var(--blur-intensity)] opacity-60"></span>
      <div className="flex flex-col w-full mx-auto max-w-maxwidth section-padding-x relative overflow-hidden">
        <span className="absolute top-space-70 left-space-300 bg-primary-blur h-space-240 w-space-300 blur-[var(--blur-intensity)] opacity-80" />
        <div className="flex flex-col gap-space-20 2md:flex-row 2md:items-start 2md:gap-space-30 xl:gap-space-40 items-start pt-space-30 lg:pt-space-55 pb-space-28 2xs:pb-space-35 z-10 w-full">
          <Link href="/" className="transition-transform duration-200 active:scale-90 cursor-pointer shrink-0">
            <Image
              src={ImageConstants.NavareWhiteLogo}
              width={130}
              height={40}
              alt="Navare-logo"
              loading="lazy"
            />
          </Link>
          <FooterLinkSection
            FooterLinks={footerLinks}
            socialLinks={socialLinksData}
            solutionsNavbarData={solutionsNavbarData}
            useCaseNavbarData={useCaseNavbarData}
            resourceCompanyData={resourceCompanyData}
          />
        </div>
        <div className="pt-space-12 pb-space-21 2xs:py-space-20 border-t border-navare-green-light z-10">
          <FooterBottom
            footerServerTexts={footerServerTexts}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

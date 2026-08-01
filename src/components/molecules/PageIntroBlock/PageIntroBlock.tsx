import TextCombo from '@/components/atoms/TextCombo/TextCombo';
import { ExternalMediaConstants } from '@/constants/externalMediaConstants/mediaConstants';

interface PageIntroBlockProps {
  titlePrefix?: string;
  titleHighlight?: string;
  titleSuffix?: string;
  description?: string;
  tagText?: string;
  buttonOneLink?: string;
  buttonOneText?: string;
}

const PageIntroBlock = ({ titlePrefix, description, tagText, buttonOneText, buttonOneLink }: PageIntroBlockProps) => {
  return (
    <div className="bg-navare-green border-subtle-border flex justify-center items-center relative py-space-15 md:py-space-30 w-full h-full base:min-h-max-height">
      <video
        src={ExternalMediaConstants.UseCaseHeroVideo}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover absolute inset-0 z-0"
        poster="/assets/backgroundImage/usecase-hero-fallback.svg"
      />
      <div className="w-full h-full absolute inset-0 bg-navare-green opacity-80 z-10"></div>
      <div className="flex flex-col max-w-section-max-width px-space-18 mx-auto">
        <div className="justify-center mb-space-06 sm:flex hidden z-10">
        </div>
        <div className="mx-auto 2md:max-w-pct-080 z-10">
          <TextCombo
            bannerText={tagText}
            title={titlePrefix}
            titleClass="hero-title"
            description={description}
            descClass="primary-content text-center text-subtle-secondary max-w-[95%] sm:max-w-pct-070 mx-auto"
            className="text-center flex justify-center items-center w-full"
            buttonOneText={buttonOneText}
            btnClass="justify-center"
            buttonOneLink={buttonOneLink || '/schedule-demo'}
          />
        </div>
      </div>
    </div>
  );
};

export default PageIntroBlock;

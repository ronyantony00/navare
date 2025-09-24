import type { BlocksContent } from '@strapi/blocks-react-renderer';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/atoms/CustomButton/Button';
import RichTextRenderer from '@/components/molecules/RichText/RichText';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface TestimonialCardProps {
  mainClass?: string;
  rating?: number;
  logo?: any;
  title?: string;
  link?: string;
  description?: BlocksContent;
  clientName?: string;
  designation?: string;
  buttonLink?: string;
  buttonText?: string;
  caseStudy?: string;
  descriptionClass?: string;
}
const TestimonialCard = ({ mainClass, rating, logo, title, link, description, clientName, designation, buttonLink, buttonText, caseStudy, descriptionClass }: TestimonialCardProps) => {
  return (
    <div className={`relative px-space-16 py-space-15 border border-small-text
    rounded-sm flex flex-col gap-space-10 overflow-hidden ${mainClass}`}
    >
      <div className="">
        {rating !== undefined && (
          <div className="flex gap-space-01">
            {Array.from({ length: 5 }, (_, index) => (
              <Image
                key={index}
                src={index < (rating ?? 0) ? ImageConstants.ActiveStar : ImageConstants.InactiveStar}
                alt="Stars"
                width={24}
                height={24}
              />
            ))}
          </div>
        )}
        {caseStudy && (
          <div className="text-size-3xs leading-description">
            {caseStudy}
          </div>
        )}
      </div>

      <div className="flex xl:flex-row flex-col gap-space-10">
        {logo && (
          <Image
            src={logo}
            alt="company logo"
            width={100}
            height={100}
            className="w-fit max-w-pct-040 object-contain"
          />
        )}
        <div className="flex flex-col gap-space-01">
          <div className="text-size-3xs">{clientName}</div>
          <div className="text-size-4xs text-desc-text leading-description">{designation}</div>
        </div>
      </div>
      <div className="flex flex-col gap-space-08">
        <div className="text-size-sm leading-sub-title">
          {title}
        </div>
        {description && (
          <div className={`text-size-3xs text-desc-text leading-description ${descriptionClass}`}>
            <RichTextRenderer content={description} />
          </div>
        )}
        {link && (
          <Link
            href={link}
            className="text-size-3xs text-plan-card-name underline leading-description"
          />
        )}
        {buttonText && (
          <Button
            variant="linkButton"
            mainClass="rounded-xs-2 px-space-03 w-fit bg-transparent text-white"
            link={buttonLink}
            text={buttonText}
          />
        )}
      </div>
    </div>
  );
};

export default TestimonialCard;

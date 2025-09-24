import Image from 'next/image';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface QuoteContainerProps {
  quote?: string;
}

const QuoteContainer = ({ quote }: QuoteContainerProps) => {
  return (
    <div className="border border-green-secondary rounded-md-3 bg-container-gradient py-space-15 px-space-10 md:pt-space-22 md:px-space-16 w-full">
      <div className="flex flex-col md:flex-row gap-space-08 md:gap-space-15">
        <Image src={ImageConstants.quoteImage} alt="quote-icon" width={49} height={72} className="h-fit" />
        <div className="small-card-heading text-desc-text font-comme mt-space-07">
          {quote}
        </div>
      </div>
    </div>
  );
};

export default QuoteContainer;

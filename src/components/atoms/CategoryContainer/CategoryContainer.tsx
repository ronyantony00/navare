import Image from 'next/image';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface CategoryContainerProps {
  category: string;
  active?: boolean;
  onClick?: () => void;
}

const CategoryContainer = ({ category, active = false, onClick }: CategoryContainerProps) => {
  return (
    <button
      className={`w-full py-space-04 pl-space-05 pr-space-03 bg-container-gradient border border-border-color hover:border-primary rounded-sm cursor-pointer transition-all duration-200 ${
        active
          ? 'border-primary bg-primary/20 shadow-md scale-105'
          : 'hover:scale-102'
      }`}
      onClick={onClick}
      type="button"
    >
      <div className="flex justify-between gap-space-10">
        <div className="flex gap-space-06">
          <Image src="/assets/icons/green-rectangle.svg" alt="list-icon" width={15} height={15} />
          <div
            className={`text-left font-normal text-size-3xs leading-normal transition-colors duration-200 ${
              active ? 'text-primary-content-white font-semibold' : 'text-desc-text'
            }`}
          >
            {category}
          </div>
        </div>
        <Image
          src={ImageConstants.GreenArrow}
          alt="arrow-right"
          width={30}
          height={30}
          className={`ml-space-05 transition-transform duration-200 ${
            active ? 'rotate-90' : ''
          }`}
        />
      </div>
    </button>
  );
};

export default CategoryContainer;

import type { StaticImageData } from 'next/image';
import clsx from 'clsx';
import Image from 'next/image';

interface LogoCircleProps {
  /**
   * Image source to render inside the circle.
   */
  src: StaticImageData | string;
  /**
   * Alternative text for the image.
   */
  alt?: string;
  /**
   * Additional classes to apply to the outer wrapper. This should include size & visibility utilities.
   */
  className?: string;
  /**
   * Whether the circle should have a second inner layer (used for the largest circle).
   */
  doubleLayer?: boolean;
  /**
   * Image width (defaults to 100).
   */
  width?: number;
  /**
   * Image height (defaults to 100).
   */
  height?: number;
}

const LogoCircle = ({
  src,
  alt = 'logo',
  className = '',
  doubleLayer = false,
  width = 100,
  height = 100,
}: LogoCircleProps) => (
  <div
    className={clsx(
      'flex flex-col items-center justify-center p-space-05 rounded-full',
      className,
    )}
  >
    {doubleLayer
      ? (
          <div className="size-full flex items-center justify-center p-space-05 rounded-full border border-primary bg-[#186E38]/12">
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              loading="eager"
              unoptimized
              className="object-contain z-50 h-space-20"
            />
          </div>
        )
      : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="eager"
            unoptimized
            className="object-contain z-50 h-space-20"
          />
        )}
  </div>
);

export default LogoCircle;

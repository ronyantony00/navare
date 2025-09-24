import type { StaticImageData } from 'next/image';
import React from 'react';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';

interface AboutUsSvgImageProps {
  imageUrl1?: string | StaticImageData | null;
  imageUrl2?: string | StaticImageData | null;
  className?: string;
}

const AboutUsSvgImage: React.FC<AboutUsSvgImageProps> = ({
  imageUrl1 = null,
  imageUrl2 = null,
  className = '',
}) => {
  const actualImageUrl1 = getImageUrl(imageUrl1);
  const actualImageUrl2 = getImageUrl(imageUrl2);

  return (
    <div className={`relative inline-block w-full ${className}`}>
      <svg
        viewBox="0 0 514 625"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Clip path for the main/left rectangle - using actual path shape */}
          <clipPath id="rectangle1Clip">
            <path d="M16 1C27 1.00003 466 1 477 1C488 1 492 7.49994 492 16C492 24.5001 492 371 492 381C492 391 488 396.5 477 396.5C466 396.5 329.5 396.5 318 396.5C306.5 396.5 303.5 401.5 303.5 411L303.5 586C303.5 597 298.5 602 288 602C277.5 602 29 602 16 602C3 602 2 591 1.99954 585.74C1.99954 585.74 1 25.5001 1 16C1 6.49994 4.99999 0.999973 16 1Z" />
          </clipPath>

          {/* Clip path for the bottom/right rectangle - using actual path shape */}
          <clipPath id="rectangle2Clip">
            <path d="M329 409C339.5 409 488.5 409 497.5 409C506.5 409 512.5 413.5 512.5 422C512.5 430.5 513 599 513 608.5C513 618 509.5 624 499 624C488.5 624 342.5 624 331 624C319.5 624 315 620.5 315 610C315 599.5 315 433 315 424C315 415 318.5 409 329 409Z" />
          </clipPath>
        </defs>

        {/* Background image 1 (main rectangle) - true cover behavior */}
        {actualImageUrl1 && (
          <g clipPath="url(#rectangle1Clip)">
            <image
              href={actualImageUrl1}
              x="-50"
              y="-50"
              width="600"
              height="700"
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
        )}

        {/* Background image 2 (bottom rectangle) - true cover behavior */}
        {actualImageUrl2 && (
          <g clipPath="url(#rectangle2Clip)">
            <image
              href={actualImageUrl2}
              x="250"
              y="350"
              width="320"
              height="320"
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
        )}

        {/* Main border path */}
        <path
          d="M2 586C1.99982 585.898 1.99954 585.74 1.99954 585.74M1.99954 585.74C1.99954 585.74 1 25.5001 1 16C1 6.49994 4.99999 0.999973 16 1C27 1.00003 466 1 477 1C488 1 492 7.49994 492 16C492 24.5001 492 371 492 381C492 391 488 396.5 477 396.5C466 396.5 329.5 396.5 318 396.5C306.5 396.5 303.5 401.5 303.5 411C303.5 420.5 303.5 575 303.5 586C303.5 597 298.5 602 288 602C277.5 602 29 602 16 602C3 602 2 591 1.99954 585.74ZM329 409C339.5 409 488.5 409 497.5 409C506.5 409 512.5 413.5 512.5 422C512.5 430.5 513 599 513 608.5C513 618 509.5 624 499 624C488.5 624 342.5 624 331 624C319.5 624 315 620.5 315 610C315 599.5 315 433 315 424C315 415 318.5 409 329 409Z"
          fill="none"
        />

        {/* Optional overlay to show rectangle boundaries when no images */}
        {!actualImageUrl1 && (
          <path
            d="M16 1C27 1.00003 466 1 477 1C488 1 492 7.49994 492 16C492 24.5001 492 371 492 381C492 391 488 396.5 477 396.5C466 396.5 329.5 396.5 318 396.5C306.5 396.5 303.5 401.5 303.5 411L303.5 586C303.5 597 298.5 602 288 602C277.5 602 29 602 16 602C3 602 2 591 1.99954 585.74C1.99954 585.74 1 25.5001 1 16C1 6.49994 4.99999 0.999973 16 1Z"
            fill="rgba(200,200,200,0.1)"
            stroke="rgba(150,150,150,0.3)"
            strokeDasharray="5,5"
          />
        )}

        {!actualImageUrl2 && (
          <path
            d="M329 409C339.5 409 488.5 409 497.5 409C506.5 409 512.5 413.5 512.5 422C512.5 430.5 513 599 513 608.5C513 618 509.5 624 499 624C488.5 624 342.5 624 331 624C319.5 624 315 620.5 315 610C315 599.5 315 433 315 424C315 415 318.5 409 329 409Z"
            fill="rgba(200,200,200,0.1)"
            stroke="rgba(150,150,150,0.3)"
            strokeDasharray="5,5"
          />
        )}

        {/* Labels for empty rectangles */}
        {!actualImageUrl1 && (
          <text
            x="246"
            y="200"
            textAnchor="middle"
            fill="rgba(100,100,100,0.7)"
            fontSize="16"
            fontFamily="Arial, sans-serif"
          >
            Rectangle 1
          </text>
        )}

        {!actualImageUrl2 && (
          <text
            x="414"
            y="520"
            textAnchor="middle"
            fill="rgba(100,100,100,0.7)"
            fontSize="16"
            fontFamily="Arial, sans-serif"
          >
            Rectangle 2
          </text>
        )}
      </svg>
    </div>
  );
};

export default AboutUsSvgImage;

import type { StaticImageData } from 'next/image';
import React from 'react';

interface UseCaseSvgImageProps {
  imageUrl?: string | StaticImageData;
  className?: string;
}

const UseCaseSvgImage: React.FC<UseCaseSvgImageProps> = ({
  imageUrl = null,
  className = '',
}) => {
  const getImageUrl = (imageUrl: string | StaticImageData | null): string | null => {
    if (!imageUrl) {
      return null;
    }
    if (typeof imageUrl === 'string') {
      return imageUrl;
    }
    return imageUrl.src;
  };

  const actualImageUrl = getImageUrl(imageUrl);

  return (
    <div className={`relative inline-block w-full ${className}`}>
      <svg
        viewBox="0 0 603 575"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Clip path to constrain image to the border area */}
          <clipPath id="borderClip">
            <path d="M557.5 451.5V456V512.5C557.5 537.5 537 538.5 530.5 538.5C530.5 538.5 209 539 192.5 539C176 539 163.5 535.5 163.5 511C163.5 486.5 163.5 411.5 163.5 377.5C163.5 343.5 146.5 331 109.5 331C72.5 331 64 331 48.5 331C33 331 24 323.5 24 311C24 298.5 24 29.5 24 20C24 10.5 32 0.999998 51 1C70 1 286.5 1 286.5 1C286.5 1 323.12 1 323.5 40.75C323.88 80.5 360.5 80.5 360.5 80.5C360.5 80.5 555.5 80.5 578.5 80.5C601.5 80.5 601.5 94.5 601.5 98.5C601.5 102.5 601.5 419.5 601.5 419.5C601.5 419.5 603 435.25 579.5 435.25C556 435.25 557.5 451 557.5 451" />
          </clipPath>

          {/* Filter for the green rectangle shadow */}
          <filter id="filter0_d_6007_3242" x="0.299999" y="359.3" width="135.4" height="215.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="12" />
            <feGaussianBlur stdDeviation="11.85" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.0240385 0 0 0 0 0.0214959 0 0 0 0 0.0214959 0 0 0 0.41 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6007_3242" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6007_3242" result="shape" />
          </filter>

          {/* Linear gradient for the green rectangle */}
          <linearGradient id="paint0_linear_6007_3242" x1="68" y1="371" x2="74.5104" y2="491.699" gradientUnits="userSpaceOnUse">
            <stop stopColor="#478A4B" />
            <stop offset="1" stopColor="#165A25" />
          </linearGradient>
        </defs>

        {/* Background image (if provided) clipped to border with cover behavior */}
        {actualImageUrl && (
          <g clipPath="url(#borderClip)">
            <image
              href={actualImageUrl}
              x="-50"
              y="-50"
              width="700"
              height="675"
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
        )}

        {/* Main border path */}
        <path
          d="M557.5 451.5V456V512.5C557.5 537.5 537 538.5 530.5 538.5C530.5 538.5 209 539 192.5 539C176 539 163.5 535.5 163.5 511C163.5 486.5 163.5 411.5 163.5 377.5C163.5 343.5 146.5 331 109.5 331C72.5 331 64 331 48.5 331C33 331 24 323.5 24 311C24 298.5 24 29.5 24 20C24 10.5 32 0.999998 51 1C70 1 286.5 1 286.5 1C286.5 1 323.12 1 323.5 40.75C323.88 80.5 360.5 80.5 360.5 80.5C360.5 80.5 555.5 80.5 578.5 80.5C601.5 80.5 601.5 94.5 601.5 98.5C601.5 102.5 601.5 419.5 601.5 419.5C601.5 419.5 603 435.25 579.5 435.25C556 435.25 557.5 451 557.5 451"
          fill="none"
        />

        {/* Green rectangle with shadow */}
        <g filter="url(#filter0_d_6007_3242)">
          <path
            d="M24 391C24 379.954 32.9543 371 44 371H92C103.046 371 112 379.954 112 391V519C112 530.046 103.046 539 92 539H44C32.9543 539 24 530.046 24 519V391Z"
            fill="url(#paint0_linear_6007_3242)"
          />
        </g>

        {/* Green dot/ellipse */}
        <ellipse cx="362.5" cy="33" rx="18.5" ry="17" fill="#2ED960" />

        {/* Optional placeholder when no image */}
        {!actualImageUrl && (
          <g clipPath="url(#borderClip)">
            <rect
              x="24"
              y="1"
              width="577"
              height="538"
              fill="rgba(200,200,200,0.1)"
              stroke="rgba(150,150,150,0.3)"
              strokeDasharray="8,8"
            />
            <text
              x="312"
              y="270"
              textAnchor="middle"
              fill="rgba(100,100,100,0.7)"
              fontSize="18"
              fontFamily="Arial, sans-serif"
            >
              Upload Image Here
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

export default UseCaseSvgImage;

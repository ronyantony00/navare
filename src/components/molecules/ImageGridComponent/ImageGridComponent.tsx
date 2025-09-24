import Image from 'next/image';
import React from 'react';

interface ImageGridComponentProps {
  logo: string;
  className?: string;
}

const ImageGridComponent: React.FC<ImageGridComponentProps> = ({ logo, className }) => (
  <Image
    src={logo}
    alt="Seamless Integration"
    width={100}
    height={100}
    className={`p-space-10 w-full md:h-space-50 h-space-40 object-contain rounded-sm border border-small-text ${className}`}
  />
);

export default ImageGridComponent;

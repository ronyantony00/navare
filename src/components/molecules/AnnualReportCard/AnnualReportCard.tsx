'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import ReportCardTitleSection from '../ReportCardTitleSection/ReportCardTitleSection';

const AnnualReportCard = () => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  const marginX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 140],
  );

  const marginY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 60],
  );

  return (
    <>
      <motion.div
        ref={cardRef}
        className="py-space-25 md:py-space-36 2md:py-space-72 rounded-md-3 bg-primary"
        style={{
          marginLeft: marginX,
          marginRight: marginX,
          marginTop: marginY,
          marginBottom: marginY,
        }}
        initial={{
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        <div className="px-space-12 sm:px-space-18 2md:px-space-35">
          <div className="flex justify-center">
            <div className="flex flex-col 2md:flex-row gap-space-40 2md:gap-space-60">
              <div className="2md:w-1/2 max-w-space-425 2md:max-w-space-300">
                <ReportCardTitleSection />
              </div>
              <div className="2md:w-1/2 max-w-space-425 2md:max-w-space-300">
                <Image
                  src={ImageConstants.ReportCardImage}
                  alt="annual-report"
                  width={590}
                  height={480}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AnnualReportCard;

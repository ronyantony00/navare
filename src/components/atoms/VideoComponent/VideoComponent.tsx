'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface VideoComponentProps {
  videoUrl?: string;
  className?: string;
  author?: string;
  designation?: string;
  videoOverLay?: string;
  autoPlay?: boolean;
  playButtonClass?: string;
}

const VideoComponent = ({ videoUrl, className, author, designation, videoOverLay = 'video-overlay', autoPlay = false, playButtonClass }: VideoComponentProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [overlayDismissed, setOverlayDismissed] = useState(false);

  const pauseOtherVideos = () => {
    if (typeof window === 'undefined') {
      return;
    }
    const videos = document.querySelectorAll('video');
    videos.forEach((vid) => {
      if (vid !== videoRef.current) {
        try {
          vid.pause();
        } catch (error) {
          // Ignore pause errors for other videos
          console.warn('Failed to pause video:', error);
        }
      }
    });
  };

  // Play video on hover
  const handleMouseEnter = async () => {
    try {
      pauseOtherVideos();
      if (videoRef.current && !videoRef.current.paused) {
        return; // Already playing
      }
      if (videoRef.current) {
        await videoRef.current.play();
        setIsPlaying(true);
        setOverlayDismissed(true);
      }
    } catch (error) {
      console.warn('Failed to play video:', error);
      setIsPlaying(false);
    }
  };

  // Pause video when mouse leaves
  const handleMouseLeave = () => {
    try {
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
        setIsPlaying(false);
        setOverlayDismissed(false);
      }
    } catch (error) {
      console.warn('Failed to pause video:', error);
    }
  };

  return (
    <div
      className={`relative ${className ?? ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        autoPlay={autoPlay}
      />
      {(!isPlaying || (autoPlay && !overlayDismissed)) && (
        <div
          className={`absolute inset-0 w-full h-full p-space-10 flex flex-col items-center justify-center ${videoOverLay}`}
          style={{ pointerEvents: 'none' }}
        >
          <div className="size-full flex items-center justify-center">
            <Image
              src={ImageConstants.VideoPauseIcon}
              alt="Play video"
              width={64}
              height={64}
              priority
              className={`xl:size-space-3 self-center size-space-20 ${playButtonClass}`}
            />
          </div>
          {(author || designation) && (
            <div className="absolute bottom-0 left-0 xl:p-space-10 p-space-05 text-size-4xs flex flex-col items-start xl:gap-space-01">
              <div className="text-primary">{author || 'Andrew Pearce'}</div>
              <div className="text-white">{designation || 'Chief Technology Office, Bend'}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoComponent;

'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import ImageConstants from '@/constants/imageConstants/imageConstants';
import { getImageUrl } from '@/utils/utilFunctions/urlConstructor';

interface VideoComponentProps {
  videoUrl?: string;
  className?: string;
  author?: string;
  designation?: string;
  videoOverLay?: string;
  autoPlay?: boolean;
  playButtonClass?: string;
  muted?: boolean;
  controls?: boolean;
}

function getPlaybackErrorKey(errorCode?: number): 'decodeError' | 'formatNotSupported' | 'networkError' | 'playbackError' {
  switch (errorCode) {
    case MediaError.MEDIA_ERR_DECODE:
      return 'decodeError';
    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
      return 'formatNotSupported';
    case MediaError.MEDIA_ERR_NETWORK:
      return 'networkError';
    default:
      return 'playbackError';
  }
}

const VideoComponent = ({
  videoUrl,
  className,
  author,
  designation,
  videoOverLay = 'video-overlay',
  autoPlay = false,
  playButtonClass,
  muted = true,
  controls = false,
}: VideoComponentProps) => {
  const t = useTranslations('VideoPlayer');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [overlayDismissed, setOverlayDismissed] = useState(false);
  const [playbackErrorKey, setPlaybackErrorKey] = useState<ReturnType<typeof getPlaybackErrorKey> | null>(null);

  const resolvedVideoUrl = getImageUrl(videoUrl);

  useEffect(() => {
    setPlaybackErrorKey(null);
    setIsPlaying(autoPlay);
    setOverlayDismissed(false);
  }, [resolvedVideoUrl, autoPlay]);

  const handlePlaybackError = (errorCode?: number) => {
    setPlaybackErrorKey(getPlaybackErrorKey(errorCode));
    setIsPlaying(false);
    setOverlayDismissed(false);
  };

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
          console.warn('Failed to pause video:', error);
        }
      }
    });
  };

  const handleMouseEnter = async () => {
    if (controls || playbackErrorKey) {
      return;
    }

    try {
      pauseOtherVideos();
      if (videoRef.current && !videoRef.current.paused) {
        return;
      }
      if (videoRef.current) {
        await videoRef.current.play();
        setIsPlaying(true);
        setOverlayDismissed(true);
      }
    } catch (error) {
      console.warn('Failed to play video:', error);
      handlePlaybackError(videoRef.current?.error?.code);
    }
  };

  const handleMouseLeave = () => {
    if (controls) {
      return;
    }

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

  if (!resolvedVideoUrl) {
    return null;
  }

  const showPlayOverlay = !controls && !playbackErrorKey && (!isPlaying || (autoPlay && !overlayDismissed));

  return (
    <div
      className={`relative ${className ?? ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={resolvedVideoUrl}
        loop={!controls}
        muted={muted}
        playsInline
        controls={controls}
        preload="metadata"
        className="w-full h-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => handlePlaybackError(videoRef.current?.error?.code)}
        autoPlay={autoPlay && !playbackErrorKey}
      />
      {playbackErrorKey && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-space-04 bg-black/80 p-space-10 text-center"
          role="alert"
        >
          <div className="text-size-3xs font-semibold text-primary">{t('unavailableTitle')}</div>
          <p className="text-size-4xs text-desc-text max-w-pct-090">{t(playbackErrorKey)}</p>
          <p className="text-size-4xs text-placeholder-text max-w-pct-090">{t('formatHint')}</p>
        </div>
      )}
      {showPlayOverlay && (
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

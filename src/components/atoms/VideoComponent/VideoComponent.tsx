'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import MediaContainerSkeleton from '@/components/molecules/Skeleton/MediaContainerSkeleton';
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
  /** When true (default), hover starts muted preview playback. When false, hover only reveals the play icon. */
  playOnHover?: boolean;
}

const MEDIA_ERR_NETWORK = 2;
const MEDIA_ERR_DECODE = 3;
const MEDIA_ERR_SRC_NOT_SUPPORTED = 4;

function getPlaybackErrorKey(errorCode?: number): 'decodeError' | 'formatNotSupported' | 'networkError' | 'playbackError' {
  switch (errorCode) {
    case MEDIA_ERR_DECODE:
      return 'decodeError';
    case MEDIA_ERR_SRC_NOT_SUPPORTED:
      return 'formatNotSupported';
    case MEDIA_ERR_NETWORK:
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
  playOnHover = true,
}: VideoComponentProps) => {
  const t = useTranslations('VideoPlayer');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(controls);
  const [isMediaLoading, setIsMediaLoading] = useState(true);
  const [playbackErrorKey, setPlaybackErrorKey] = useState<ReturnType<typeof getPlaybackErrorKey> | null>(null);

  const resolvedVideoUrl = getImageUrl(videoUrl);
  const usesHoverPreview = playOnHover && !controls;

  useEffect(() => {
    setPlaybackErrorKey(null);
    setIsPlaying(false);
    setShowControls(controls);
    setIsMediaLoading(true);
  }, [resolvedVideoUrl, controls]);

  // Keep muted in sync (required for browser autoplay policies).
  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    videoRef.current.muted = muted;
  }, [muted, resolvedVideoUrl]);

  // Explicit play() — HTML autoPlay alone is unreliable after client-only mount.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoPlay || !resolvedVideoUrl) {
      return;
    }

    let cancelled = false;
    video.muted = true;

    const tryPlay = async () => {
      try {
        await video.play();
        if (!cancelled) {
          setIsPlaying(true);
          setIsMediaLoading(false);
        }
      } catch (error) {
        console.warn('Autoplay failed:', error);
        if (!cancelled) {
          setIsPlaying(false);
          setIsMediaLoading(false);
        }
      }
    };

    if (video.readyState >= 2) {
      void tryPlay();
    } else {
      const onCanPlay = () => {
        void tryPlay();
      };
      video.addEventListener('canplay', onCanPlay, { once: true });
      video.load();
      return () => {
        cancelled = true;
        video.removeEventListener('canplay', onCanPlay);
      };
    }

    return () => {
      cancelled = true;
    };
  }, [autoPlay, resolvedVideoUrl]);

  const handlePlaybackError = (errorCode?: number) => {
    setPlaybackErrorKey(getPlaybackErrorKey(errorCode));
    setIsPlaying(false);
    setIsMediaLoading(false);
  };

  const pauseOtherVideos = () => {
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
    if (playbackErrorKey) {
      return;
    }

    if (autoPlay && !playOnHover && !controls) {
      setShowControls(true);
      return;
    }

    if (!usesHoverPreview) {
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
      }
    } catch (error) {
      console.warn('Failed to play video:', error);
      handlePlaybackError(videoRef.current?.error?.code);
    }
  };

  const handleMouseLeave = () => {
    if (autoPlay && !playOnHover && !controls) {
      return;
    }

    if (!usesHoverPreview) {
      return;
    }

    try {
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.warn('Failed to pause video:', error);
    }
  };

  const handlePlayClick = async () => {
    if (playbackErrorKey || !videoRef.current) {
      return;
    }

    try {
      pauseOtherVideos();
      setShowControls(true);
      videoRef.current.muted = muted;
      await videoRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.warn('Failed to play video:', error);
      handlePlaybackError(videoRef.current?.error?.code);
    }
  };

  if (!resolvedVideoUrl) {
    return null;
  }

  const showPlayOverlay = !showControls && !playbackErrorKey && !isPlaying && !isMediaLoading;

  return (
    <div
      className={`relative group ${className ?? ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isMediaLoading && !playbackErrorKey && <MediaContainerSkeleton />}
      <video
        ref={videoRef}
        src={resolvedVideoUrl}
        {...(!showControls ? { loop: true } : {})}
        muted={muted}
        {...(showControls ? { controls: true } : {})}
        {...(autoPlay ? { autoPlay: true } : {})}
        playsInline
        preload={autoPlay ? 'auto' : 'metadata'}
        className={`w-full h-full object-cover bg-black transition-opacity duration-300 ${isMediaLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoadedData={() => setIsMediaLoading(false)}
        onCanPlay={() => setIsMediaLoading(false)}
        onPlay={() => {
          setIsPlaying(true);
          setIsMediaLoading(false);
        }}
        onPause={() => setIsPlaying(false)}
        onError={() => handlePlaybackError(videoRef.current?.error?.code)}
        suppressHydrationWarning
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
        <button
          type="button"
          className={`absolute inset-0 w-full h-full p-space-10 flex flex-col items-center justify-center ${videoOverLay}`}
          onClick={handlePlayClick}
          aria-label="Play video"
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
        </button>
      )}
    </div>
  );
};

export default VideoComponent;

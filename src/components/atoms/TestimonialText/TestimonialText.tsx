'use client';

import React, { useEffect, useRef, useState } from 'react';

interface TestimonialTextProps {
  text: string;
  maxLines?: number;
  className?: string;
}

const TestimonialText: React.FC<TestimonialTextProps> = ({
  text,
  maxLines = 5,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      const lineHeight = Number.parseInt(window.getComputedStyle(element).lineHeight) || 24; // Default line height
      const maxHeight = lineHeight * maxLines;
      const actualHeight = element.scrollHeight;

      setShowSeeMore(actualHeight > maxHeight);
    }
  }, [text, maxLines]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!text) {
    return null;
  }

  return (
    <div className="relative">
      <div
        ref={textRef}
        className={`secondary-content transition-all duration-300 ${className}`}
        style={{
          display: '-webkit-box',
          WebkitLineClamp: !isExpanded ? maxLines : 'unset',
          WebkitBoxOrient: 'vertical',
          overflow: !isExpanded ? 'hidden' : 'visible',
          textOverflow: !isExpanded ? 'ellipsis' : 'clip',
        }}
      >
        {text}
      </div>
      {showSeeMore && (
        <button
          type="button"
          onClick={toggleExpanded}
          className="text-primary text-size-4xs font-medium hover:underline mt-space-05"
        >
          {isExpanded ? 'See less' : 'See more'}
        </button>
      )}
    </div>
  );
};

export default TestimonialText;

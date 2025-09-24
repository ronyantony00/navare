'use client';

import { useState } from 'react';

interface ToggleButtonProps {
  leftLabel?: string;
  rightLabel?: string;
  onChange: (isYearly: boolean) => void;
}

export default function ToggleButton({ leftLabel, rightLabel, onChange }: ToggleButtonProps) {
  const [isYearly, setIsYearly] = useState(false);

  const handleLeftClick = () => {
    setIsYearly(false);
    onChange(false);
  };

  const handleRightClick = () => {
    setIsYearly(true);
    onChange(true);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative toggle-button-bg rounded-full p-1 shadow-xl border border-toggle-border">
        <div className="flex relative">
          {/* Active background slider */}
          <div
            className={`absolute top-0 h-full w-1/2 toggle-button-slider rounded-full transition-transform duration-300 ease-in-out shadow-inner ${
              isYearly ? 'translate-x-full' : 'translate-x-0'
            }`}
          />

          {/* Buttons */}
          <button
            type="button"
            onClick={handleLeftClick}
            className="relative z-10 rounded-full text-white font-medium transition-all duration-200 hover:bg-green-700/20 min-w-space-40 sm:min-w-space-75 text-[16px] sm:text-[20px] "
          >
            {leftLabel}
          </button>
          <button
            type="button"
            onClick={handleRightClick}
            className="relative z-10 px-space-20 py-space-06 rounded-full text-white font-medium transition-all duration-200 hover:bg-green-700/20 min-w-space-40 sm:min-w-space-75 tetx-[16px] sm:text-[20px]"
          >
            {rightLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

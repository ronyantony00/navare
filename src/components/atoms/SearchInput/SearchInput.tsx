import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import ImageConstants from '@/constants/imageConstants/imageConstants';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  placeholder: string;
  isActive: boolean;
  onSectionClick: () => void;
  onClear: () => void;
  searchResults?: Array<{
    id: string | number;
    jobTitle: string;
    department?: { departmentName: string };
  }>;
  showSearchResults: boolean;
  onResultClick: (result: any) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onKeyPress,
  onBlur,
  placeholder,
  isActive,
  onSectionClick,
  onClear,
  searchResults,
  showSearchResults,
  onResultClick,
}) => {
  const defaultSearchResults: Array<{
    id: string | number;
    jobTitle: string;
    department?: { departmentName: string };
  }> = [];

  const results = searchResults || defaultSearchResults;
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // Reset focused index when search results change
  useEffect(() => {
    setFocusedIndex(-1);
  }, [results]);

  // Handle keyboard navigation for dropdown
  const handleDropdownKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!showSearchResults || results.length === 0) {
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev =>
          prev < results.length - 1 ? prev + 1 : 0,
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev =>
          prev > 0 ? prev - 1 : results.length - 1,
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < results.length) {
          onResultClick(results[focusedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setFocusedIndex(-1);
        break;
    }
  }, [showSearchResults, results, focusedIndex, onResultClick]);

  // Handle input key down events
  const handleInputKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    // Call the original onKeyPress handler
    onKeyPress(e);

    // Handle dropdown navigation
    handleDropdownKeyDown(e);
  }, [onKeyPress, handleDropdownKeyDown]);

  // Handle result item key down
  const handleResultKeyDown = useCallback((e: React.KeyboardEvent, result: any) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onResultClick(result);
    }
  }, [onResultClick]);

  return (
    <div
      className={`py-space-09 px-space-10 w-full flex justify-center gap-space-06 cursor-pointer relative ${isActive
        ? 'border border-border-color'
        : 'border-b border-border-color'
      }`}
      onClick={onSectionClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSectionClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <Image src={ImageConstants.WhiteSearchIcon} width={26} height={26} alt="search-icon" />
      {isActive
        ? (
            <div className="flex-1 relative">
              <input
                type="text"
                value={value}
                onChange={onChange}
                onKeyDown={handleInputKeyDown}
                onBlur={onBlur}
                placeholder={placeholder}
                className="primary-content text-text-placeholder bg-transparent border-none outline-none w-full text-left"
                aria-expanded={showSearchResults && results.length > 0}
                aria-haspopup="listbox"
                aria-autocomplete="list"
                role="combobox"
                aria-controls="search-results-dropdown"
                aria-label="Search for jobs"
              />
              {value && (
                <button
                  type="button"
                  onClick={onClear}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-text-placeholder hover:text-white"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          )
        : <div className="primary-content text-text-placeholder">{placeholder}</div>}
      {showSearchResults && results.length > 0 && isActive && (
        <div
          className="absolute top-full left-0 right-0 bg-navare-green border border-border-color shadow-lg z-50 max-h-60 overflow-y-auto"
          id="search-results-dropdown"
          role="listbox"
          aria-label="Search results"
        >
          {results.map((result, index) => (
            <div
              key={result.id}
              onClick={() => onResultClick(result)}
              onKeyDown={e => handleResultKeyDown(e, result)}
              onMouseEnter={() => setFocusedIndex(index)}
              role="option"
              tabIndex={0}
              aria-selected={focusedIndex === index}
              className={`px-space-10 py-3 cursor-pointer border-b border-gray-700 last:border-b-0 transition-colors ${
                focusedIndex === index
                  ? 'stories-card-bg bg-opacity-80'
                  : 'hover:stories-card-bg'
              }`}
            >
              <div className="text-subtle-desc small-content">{result.jobTitle}</div>
              {result.department && (
                <div className="text-subtle-desc secondary-content mt-1">{result.department.departmentName}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;

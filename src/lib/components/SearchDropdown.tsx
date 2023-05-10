import React, { useRef } from 'react';
import { MdFilterAltOff, MdFilterAlt } from 'react-icons/md';

interface SearchDropdownProps {
  inputValues: Record<string, string | undefined>;
  property: string;
  handleToggle: (property: string) => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  inputValues,
  property,
  handleToggle,
}) => {
  const dropdownSearchRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    handleToggle(property);
  };

  const isFilterProperty = inputValues[property] ? true : false;

  return (
    <div className="dropdownContainerSearch" ref={dropdownSearchRef}>
      <button
        onClick={handleClick}
        className={
          isFilterProperty ? 'btnFilter selectedBtnFilter' : 'btnFilter'
        }
        data-testid={`btnOpenSearch-${property}`}
        aria-label={`Show search filter by ${property}`}
      >
        {isFilterProperty ? <MdFilterAlt /> : <MdFilterAltOff />}
      </button>
    </div>
  );
};

export default SearchDropdown;

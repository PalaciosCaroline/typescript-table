import React, { useRef } from 'react';
import { MdFilterAltOff, MdFilterAlt } from 'react-icons/md';

/**
 * SearchDropdownProps: The properties passed to the SearchDropdown component.
 * @param {Record<string, string | undefined>} inputValues : The name of the property associated with the search dropdown.
 * @param {string} property The name of the property associated with the search dropdown.
 * @param {(property: string) => void} handleToggle: A function that is called when the search dropdown is toggled.;
 */
export interface SearchDropdownProps {
  inputValues: Record<string, string | undefined>;
  property: string;
  handleToggle: (property: string) => void;
}

/**
 * Component for the search dropdown.
 *
 * @component
 * @param {SearchDropdownProps} props - The props for the SearchDropdown component.
 * @returns {React.ReactElement} The rendered SearchDropdown component.
 */
const SearchDropdown: React.FC<SearchDropdownProps> = ({
  inputValues,
  property,
  handleToggle,
}: SearchDropdownProps): React.ReactElement => {
  /**
   * Reference to the dropdown container element.
   */
  const dropdownSearchRef = useRef<HTMLDivElement>(null);

  /**
   * Handles the click event on the dropdown button.
   */
  const handleClick = () => {
    handleToggle(property);
  };

  /**
   * Determines whether the filter property is set or not.
   */
  const isFilterProperty = inputValues[property] ? true : false;

  return (
    <div className="dropdownContainerSearch" ref={dropdownSearchRef}>
       {/* Button for opening the search dropdown */}
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

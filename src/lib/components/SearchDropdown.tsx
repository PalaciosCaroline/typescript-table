import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import { MdFilterAltOff, MdFilterAlt } from 'react-icons/md';
import SearchByProperty from './SearchByProperty';
import { InputValues } from './Table';

interface SearchDropdownProps<U extends string | number | readonly string[] | undefined = string> {
  inputValues: InputValues<U>;
  property: string;
  handleSearchByProperty: (name: string, value: string) => void;
  handleReset: (property: string) => void;
}

const SearchDropdown = <U extends string | number | readonly string[] | undefined = string>({ inputValues, property, handleSearchByProperty, handleReset }: SearchDropdownProps<U>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownSearchRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  function handleClickOutside(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (dropdownSearchRef.current && !dropdownSearchRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside as unknown as EventListener);
    return () => {
      document.removeEventListener('click', handleClickOutside as unknown as EventListener);
    };
  }, []);

  const isFilterProperty = inputValues[property] ? true : false;

  return (
    <div className="dropdownContainerSearch" ref={dropdownSearchRef}>
      <button
        onClick={handleToggle}
        className={isFilterProperty ? 'btnFilter selectedBtnFilter' : 'btnFilter'}
        aria-label={`Show search filter by ${property}`}
        data-testid={`btnOpenSearch-${property}`}
      >
        {isFilterProperty ? <MdFilterAlt /> : <MdFilterAltOff />}
      </button>
      {isOpen && (
        <div className="boxSearchPropertyContent">
          <SearchByProperty<U>
            key={property}
            property={property}
            inputValues={inputValues}
            handleSearchByProperty={handleSearchByProperty}
            handleReset={handleReset}
            handleClose={handleClose}
          />
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
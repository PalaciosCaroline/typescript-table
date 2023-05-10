import React, { useState, useEffect, useRef } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

interface DropdownProps {
  defaultValueSelectedOption?: string | undefined;
  options: string[];
  onOptionClick: (option: string) => void;
  className: string;
  classNameProps: string;
}

function Dropdown(props: DropdownProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(
    props.defaultValueSelectedOption || '',
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleOptionClick(option: string): void {
    setSelectedOption(option);
    setIsOpen(false);
    props.onOptionClick(option);
  }

  function toggleDropdown(): void {
    setIsOpen(!isOpen);
  }

  function handleChevronClick(
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ): void {
    event.stopPropagation(); // Arrêter la propagation de l'événement pour éviter que le clic ne soit transmis au bouton parent
    toggleDropdown();
  }

  function handleClickOutside(event: MouseEvent): void {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDropdown();
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`dropdownTable dropdownTable${props.classNameProps}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        className={`dropdownToggleTable buttonToggle${props.classNameProps}`}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        data-testid="btnPerPage"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="dropdown-label"
        aria-label="options of dropdown"
      >
        {selectedOption || props.defaultValueSelectedOption}
        <span
          className={`chevronTable chevron${props.classNameProps}`}
          onClick={handleChevronClick}
        >
          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </button>
      {isOpen && (
        <ul
          className={`dropdownMenuTable dropdownMenu${props.classNameProps}`}
          role="listbox"
        >
          {props.options.map((option) => (
            <li
              key={option}
              className={`dropdownOptionTable dropdownOptionRowPerPage ${
                option === selectedOption ? `selectedTable selectedOption` : ''
              }`}
              onClick={() => handleOptionClick(option)}
              role="option"
              aria-selected={option === selectedOption}
              data-testid={`optionPerPage-${option}`}
              tabIndex={0}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      <span id="dropdown-label" className="sr-only">
        options of dropdown
      </span>
    </div>
  );
}

export default Dropdown;

import React, { useState, useEffect, useRef } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

interface DropdownProps {
defaultValueSelectedOption?: string;
options: string[];
onOptionClick: (option: string) => void;
}

function Dropdown(props: DropdownProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(props.defaultValueSelectedOption || '');
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleOptionClick(option: string): void {
    setSelectedOption(option);
    setIsOpen(false);
    props.onOptionClick(option);
  }

  function toggleDropdown(): void {
    setIsOpen(!isOpen);
  }

  function handleChevronClick(event: React.MouseEvent<HTMLSpanElement, MouseEvent>): void {
    event.stopPropagation(); // Arrêter la propagation de l'événement pour éviter que le clic ne soit transmis au bouton parent
    toggleDropdown();
  }

  function handleClickOutside(event: MouseEvent): void {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
    document.removeEventListener('click', handleClickOutside);
    };  
  }, []);

  return (
    <div className='dropdownTable dropdownRowPerPage' ref={dropdownRef}>
      <button
        type="button"
        className='dropdownToggleTable buttonToggleRowPerPage'
        onClick={toggleDropdown}
        data-testid='btnPerPage'
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="dropdown-label"
        aria-label="Options de la liste déroulante"
      >
        {selectedOption || props.defaultValueSelectedOption}
        <span className='chevronTable chevronRowPerPage' onClick={handleChevronClick}>
          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </button>
      {isOpen && (
        <ul className='dropdownMenuTable dropdownMenuRowPerPage' role="listbox">
          {props.options.map((option) => (
          <li
            key={option}
            data-testid={`optionPerPage-${option}`}
            className={`dropdownOptionTable dropdownOptionRowPerPage ${option === selectedOption ? `selectedTable selectedOption` : ''}`}
            onClick={() => handleOptionClick(option)}
            role="option"
            aria-selected={option === selectedOption}
          >
            {option}
          </li>
          ))}
        </ul>
      )}
      <span id="dropdown-label" className="sr-only">Options de la liste déroulante</span>
    </div>
  );
}

export default Dropdown;
import React, { useState, useEffect, useRef, createRef } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

interface DropdownProps {
  defaultValueSelectedOption?: string | undefined;
  options: string[];
  onOptionClick: (option: string) => void;
  className: string;
  classNameProps: string;
  style: React.CSSProperties;
  dataTestId: string
}

function Dropdown(props: DropdownProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<string>(
    props.defaultValueSelectedOption || '',
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<React.RefObject<HTMLButtonElement>[]>([]);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);

  useEffect(() => {
    optionRefs.current = props.options.map(
      (_, i) => optionRefs.current[i] ?? createRef(),
    );
  }, [props.options]);

  // Focus sur le bouton de l'option lorsque l'option est mise en évidence
  useEffect(() => {
    if (isOpen && focusedOptionIndex !== -1) {
      optionRefs.current[focusedOptionIndex].current?.focus();
    }
  }, [focusedOptionIndex, isOpen]);

  const handleOptionClick = (option: string): void => {
    setSelectedOption(option);
    setIsOpen(false);
    props.onOptionClick(option);
  };

  const toggleDropdown = (): void => {
    setIsOpen((prevIsOpen) => {
      if (!prevIsOpen) {
        setFocusedOptionIndex(0); // Sélectionnez la première option lors de l'ouverture du menu déroulant
      }
      return !prevIsOpen;
    });
  };

  const handleChevronClick = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ): void => {
    event.stopPropagation(); // Arrêter la propagation de l'événement pour éviter que le clic ne soit transmis au bouton parent
    toggleDropdown();
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent): void => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        setFocusedOptionIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex,
        );
        break;
      case 'ArrowDown':
        event.preventDefault();
        setFocusedOptionIndex((prevIndex) =>
          prevIndex < props.options.length - 1 ? prevIndex + 1 : prevIndex,
        );
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (isOpen && focusedOptionIndex >= 0) {
          handleOptionClick(props.options[focusedOptionIndex]);
        } else {
          toggleDropdown();
        }
        break;
      case 'Tab':
        // Si l'utilisateur appuie sur 'Tab', fermez le menu déroulant
        // event.preventDefault();
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (
      isOpen &&
      focusedOptionIndex >= 0 &&
      focusedOptionIndex < props.options.length &&
      dropdownRef.current // Ajoutez une vérification pour s'assurer que dropdownRef.current n'est pas null
    ) {
      const optionElement = dropdownRef.current.querySelector(
        `li:nth-child(${focusedOptionIndex + 1})`,
      );

      // Convertir l'élément en HTMLElement avant de faire appel à la méthode focus
      const htmlElement = optionElement as HTMLElement;

      // Ajoutez une vérification pour s'assurer que l'élément existe
      if (htmlElement) {
        htmlElement.focus();
      }
    }
  }, [focusedOptionIndex, isOpen, props.options.length]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleOptionKeyDown = (
    event: React.KeyboardEvent,
    option: string,
  ): void => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleOptionClick(option);
        break;
      case 'Tab':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`dropdownTable dropdownTable${props.classNameProps}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        className={`dropdownToggleTable buttonToggle${props.classNameProps} customComponent`}
        onClick={toggleDropdown}
        onKeyDown={handleTriggerKeyDown}
        data-testid={props.dataTestId}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="dropdown-label"
        aria-label="options of dropdown"
        style={props.style}
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
          {props.options.map((option, index) => (
            <li
              key={option}
              className={`dropdownOptionTable dropdownOptionRowPerPage customComponent ${
                index === focusedOptionIndex ? 'focused' : ''
              } ${
                option === selectedOption ? `selectedTable selectedOption` : ''
              }`}
              role="option"
              aria-selected={option === selectedOption}
              style={props.style}
            >
              <button
                onKeyDown={(event) => handleOptionKeyDown(event, option)}
                onClick={() => handleOptionClick(option)}
                onMouseOver={() => setFocusedOptionIndex(index)}
                className="dropdownOptionButton customComponent" 
                tabIndex={0}
                style={props.style}
                data-testid={`optionPerPage-${option}`}

              >
                {option}
              </button>
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

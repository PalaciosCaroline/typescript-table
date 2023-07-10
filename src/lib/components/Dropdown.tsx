import React, { useState, useEffect, useRef, createRef } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

// /**
//  * DropdownProps: The props passed to the Dropdown component.
//  *
//  * @param {string | undefined} defaultValueSelectedOption - The default selected option when the dropdown is first initialized.
//  * @param {string[]} options - An array of strings representing the options available in the dropdown.
//  * @param {(option: string) => void} onOptionClick - A function that is triggered when an option in the dropdown is clicked.
//  * @param {string} className - A string representing the className of the dropdown component.
//  * @param {string} classNameProps - A string representing the className of the dropdown's properties.
//  * @param {React.CSSProperties} style - The CSS properties to be applied to the dropdown component.
//  * @param {string} dataTestId - A string representing the test-id for testing purposes.
//  */
// interface DropdownProps {
//   defaultValueSelectedOption?: string | undefined;
//   options: string[];
//   onOptionClick: (option: string) => void;
//   className: string;
//   classNameProps: string;
//   style: React.CSSProperties;
//   dataTestId: string;
// }

/**
 * The props passed to the Dropdown component.
 */
export interface DropdownProps {
  /**
   * The default selected option when the dropdown is first initialized.
   */
  defaultValueSelectedOption?: string;

  /**
   * An array of strings representing the options available in the dropdown.
   */
  options: string[];

  /**
   * A function that is triggered when an option in the dropdown is clicked.
   * @param option - The selected option.
   */
  onOptionClick: (option: string) => void;

  /**
   * A string representing the className of the dropdown component.
   */
  className: string;

  /**
   * A string representing the className of the dropdown's properties.
   */
  classNameProps: string;

  /**
   * The CSS properties to be applied to the dropdown component.
   */
  style: React.CSSProperties;

  /**
   * A string representing the test-id for testing purposes.
   */
  dataTestId: string;
}

/**
 * Dropdown component.
 * @param props - The props passed to the Dropdown component.
 * @returns The Dropdown component.
 */
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

  // Focus on the option button when the option is highlighted
  useEffect(() => {
    if (isOpen && focusedOptionIndex !== -1) {
      optionRefs.current[focusedOptionIndex].current?.focus();
    }
  }, [focusedOptionIndex, isOpen]);

  /**
   * Handles an option click event.
   * @param option - The option that has been clicked.
   */
  const handleOptionClick = (option: string): void => {
    setSelectedOption(option);
    setIsOpen(false);
    props.onOptionClick(option);
  };

  const toggleDropdown = (): void => {
    setIsOpen((prevIsOpen) => {
      if (!prevIsOpen) {
        setFocusedOptionIndex(0); // Select the first option when opening the dropdown menu
      }
      return !prevIsOpen;
    });
  };

  const handleChevronClick = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ): void => {
    event.stopPropagation();
    toggleDropdown();
  };

  /**
   * Handles a click outside the dropdown.
   * @param event - The click event.
   */
  const handleClickOutside = (event: MouseEvent): void => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      isOpen
    ) {
      setIsOpen(false);
    }
  };

  /**
   * Handles a key down event in the dropdown.
   * @param event - The keydown event.
   */
  const handleTriggerKeyDown = (event: React.KeyboardEvent): void => {
    if (event.currentTarget !== event.target) {
      return;
    }
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
        if (isOpen) {
          event.preventDefault();
          if (focusedOptionIndex >= 0) {
            handleOptionClick(props.options[focusedOptionIndex]);
          } else {
            toggleDropdown();
          }
        }
        break;
      case 'Tab':
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
      dropdownRef.current // Add a check to ensure that dropdownRef.current is not null.
    ) {
      const optionElement = dropdownRef.current.querySelector(
        `li:nth-child(${focusedOptionIndex + 1})`,
      );

      // Convert the element to an HTMLElement before calling the focus method
      const htmlElement = optionElement as HTMLElement;

      // Add a check to ensure that the element exists.
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

  /**
   * Handles a key down event on an option.
   * @param event - The keydown event.
   * @param option - The option that has received the keydown event.
   */
  const handleOptionKeyDown = (
    event: React.KeyboardEvent,
    option: string,
  ): void => {
    if (event.currentTarget !== event.target) {
      return;
    }
    switch (event.key) {
      case 'Enter':
      case ' ':
        if (isOpen) {
          event.preventDefault();
          handleOptionClick(option);
        }
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
        {isOpen
          ? `Dropdown options for ${props.classNameProps} are now visible`
          : `Dropdown options for ${props.classNameProps} are hidden. Press Enter to display them`}
      </span>
    </div>
  );
}

export default Dropdown;

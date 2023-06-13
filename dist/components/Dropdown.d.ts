import React from 'react';
/**
 * DropdownProps: The props passed to the Dropdown component.
 *
 * @param {string | undefined} defaultValueSelectedOption - The default selected option when the dropdown is first initialized.
 * @param {string[]} options - An array of strings representing the options available in the dropdown.
 * @param {(option: string) => void} onOptionClick - A function that is triggered when an option in the dropdown is clicked.
 * @param {string} className - A string representing the className of the dropdown component.
 * @param {string} classNameProps - A string representing the className of the dropdown's properties.
 * @param {React.CSSProperties} style - The CSS properties to be applied to the dropdown component.
 * @param {string} dataTestId - A string representing the test-id for testing purposes.
 */
interface DropdownProps {
    defaultValueSelectedOption?: string | undefined;
    options: string[];
    onOptionClick: (option: string) => void;
    className: string;
    classNameProps: string;
    style: React.CSSProperties;
    dataTestId: string;
}
/**
 * Dropdown: A Dropdown component that allows a user to choose an option from a dropdown menu.
 *
 * @param {DropdownProps} props - The props passed to the Dropdown component.
 *
 * @returns {JSX.Element} - Returns a JSX element representing the Dropdown component.
 */
declare function Dropdown(props: DropdownProps): JSX.Element;
export default Dropdown;

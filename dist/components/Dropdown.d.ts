import React from 'react';
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
declare function Dropdown(props: DropdownProps): JSX.Element;
export default Dropdown;

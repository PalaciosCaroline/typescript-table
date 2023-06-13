import React from 'react';
/**
 * SearchDropdownProps: The properties passed to the SearchDropdown component.
 * @param {Record<string, string | undefined>} inputValues : The name of the property associated with the search dropdown.
 * @param {string} property The name of the property associated with the search dropdown.
 * @param {(property: string) => void} handleToggle: A function that is called when the search dropdown is toggled.;
 */
interface SearchDropdownProps {
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
declare const SearchDropdown: React.FC<SearchDropdownProps>;
export default SearchDropdown;

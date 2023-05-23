import React from 'react';
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

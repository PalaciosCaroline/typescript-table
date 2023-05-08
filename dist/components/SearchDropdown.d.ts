import React from 'react';
interface SearchDropdownProps {
    inputValues: Record<string, string | undefined>;
    property: string;
    handleToggle: (property: string) => void;
}
declare const SearchDropdown: React.FC<SearchDropdownProps>;
export default SearchDropdown;

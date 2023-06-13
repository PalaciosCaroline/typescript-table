import React from 'react';
/**
 * SearchAndResetGlobalProps: The properties passed to the SearchAndResetGlobal component.
 *
 * @param {string} searchTerm - The current search term.
 * @param {React.CSSProperties} style - The CSS styles to be applied to the component.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} handleSearch - A function that is called when the search term changes.
 * @param {() => void} handleResetSearch - A function that is called when the reset search button is clicked.
 */
interface SearchAndResetGlobalProps {
    searchTerm: string;
    style: React.CSSProperties;
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleResetSearch: () => void;
}
/**
 * SearchAndResetGlobal: A component for global search and reset all search (global and by property).
 *
 * @component
 * @param {SearchAndResetGlobalProps} props - The properties passed to the SearchAndResetGlobal component.
 * @returns {React.ReactElement} - Returns a JSX element representing the rendered SearchAndResetGlobal component.
 */
export declare const SearchAndResetGlobal: React.FC<SearchAndResetGlobalProps>;
export {};

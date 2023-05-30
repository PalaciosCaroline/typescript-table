import React from 'react';
interface SearchAndResetGlobalProps {
    searchTerm: string;
    style: React.CSSProperties;
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleResetSearch: () => void;
}
/**
 * Component for global search and reset all search (global and by property).
 *
 * @component
 * @param {SearchAndResetGlobalProps} props - The props for the SearchAndResetGlobal component.
 * @returns {React.ReactElement} The rendered SearchAndResetGlobal component.
 */
export declare const SearchAndResetGlobal: React.FC<SearchAndResetGlobalProps>;
export {};

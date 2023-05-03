import React from 'react';
interface SearchAndResetGlobalProps {
    searchTerm: string;
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleResetSearch: () => void;
}
export declare const SearchAndResetGlobal: React.FC<SearchAndResetGlobalProps>;
export {};

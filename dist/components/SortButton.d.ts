import React from 'react';
interface SortButtonProps {
    isSortKey: boolean;
    sortOrder: 'asc' | 'desc' | 'noSort';
    property: string;
    dateFormat: string;
    handleColumnSort: (property: string, dateFormat: string) => void;
}
/**
 * Component for the sort button.
 *
 * @component
 * @param {SortButtonProps} props - The props for the SortButton component.
 * @returns {React.ReactElement} The rendered SortButton component.
 */
declare const SortButton: React.FC<SortButtonProps>;
export default SortButton;

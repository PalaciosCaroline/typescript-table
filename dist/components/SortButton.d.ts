import React from 'react';
/**
 * SortButtonProps Interface
 * @interface
 * @property {boolean} isSortKey - Indicates if the property is currently the sort key.
 * @property {'asc' | 'desc' | 'noSort'} sortOrder - The current order of the sort. Can be 'asc', 'desc' or 'noSort'.
 * @property {string} property - The property to be sorted when the button is clicked.
 * @property {string} dateFormat - The format of the date for sorting, if the property is a date.
 * @property {(property: string, dateFormat: string) => void} handleColumnSort - The function that is called when the button is clicked.
 */
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

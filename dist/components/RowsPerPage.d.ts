import React from 'react';
/**
 * RowsPerPageProps: The properties passed to the RowsPerPage component.
 *
 * @param {(option: string) => void} handlePerPageChange - A function that is called when the selected page size changes.
 * @param {React.CSSProperties} style - The CSS styles to be applied to the component.
 */
interface RowsPerPageProps {
    handlePerPageChange: (option: string) => void;
    style: React.CSSProperties;
}
/**
 * RowsPerPage: A component for selecting the number of rows to display per page.
 *
 * @component
 * @param {RowsPerPageProps} props - The properties passed to the RowsPerPage component.
 * @returns {React.ReactElement} - Returns a JSX element representing the rendered RowsPerPage component.
 */
declare const RowsPerPage: React.FC<RowsPerPageProps>;
export default RowsPerPage;

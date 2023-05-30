import React from 'react';
interface RowsPerPageProps {
    handlePerPageChange: (option: string) => void;
    style: React.CSSProperties;
}
/**
 * Component for selecting the number of rows per page.
 *
 * @component
 * @param {RowsPerPageProps} props - The props for the RowsPerPage component.
 * @returns {React.ReactElement} The rendered RowsPerPage component.
 */
declare const RowsPerPage: React.FC<RowsPerPageProps>;
export default RowsPerPage;

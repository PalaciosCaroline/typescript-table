import React from 'react';
import { ColumnManaged } from './Table';
/**
 * ManageColumnsProps: The props passed to the ManageColumns component.
 *
 * @param {ColumnManaged[]} columns - An array of ColumnManaged objects representing the columns of the table.
 * @param {(property: string) => void} handleColumnVisibility - A function to handle the visibility of a column based on its property.
 * @param {() => void} handleVisibleAllColumns - A function to make all columns visible.
 * @param {() => void} handleVisibleSelectRowsColumn - A function to handle the visibility of the select rows column.
 * @param {boolean} selectRowColumnVisible - A boolean indicating if the select row column is visible.
 * @param {React.CSSProperties} style - The CSS properties to be applied to the ManageColumns component.
 */
interface ManageColumnsProps {
    columns: ColumnManaged[];
    handleColumnVisibility: (property: string) => void;
    handleVisibleAllColumns: () => void;
    handleVisibleSelectRowsColumn: () => void;
    selectRowColumnVisible: boolean;
    style: React.CSSProperties;
}
/**
/**
 * ManageColumns: A component for managing the visibility of columns in a table.
 *
 * @param {ManageColumnsProps} props - The props passed to the ManageColumns component.
 *
 * @returns {JSX.Element} - Returns a JSX element representing the ManageColumns component.
 */
declare function ManageColumns(props: ManageColumnsProps): JSX.Element;
export default ManageColumns;

import React from 'react';
import { ColumnManaged } from './Table';
/**
 * DataItem: A dictionary object containing data items in the table.
 * @template T - The type of data items in the table.
 * @param {T | undefined} [key: string] - A key-value pair representing the data item.
 */
interface DataItem<T> {
    [key: string]: T | undefined;
}
/**
 * ManageTableProps: The props passed to the ManageTable component.
 * @template T - The type of data items in the table.
 *
 * @param {React.CSSProperties} style - The CSS properties to be applied to the ManageTable component.
 * @param {Set<T | undefined>} selectedRows - A set of selected rows in the table.
 * @param {(optionValue: string) => void} handlePerPageChange - A function to handle changes in the per page option value.
 * @param {ColumnManaged[]} columnsManaged - An array of ColumnManaged objects representing the managed columns of the table.
 * @param {(property: string) => void} handleColumnVisibility - A function to handle the visibility of a column based on its property.
 * @param {() => void} handleVisibleAllColumns - A function to make all columns visible.
 * @param {DataItem<T | undefined>[]} filteredData - An array of DataItem objects representing the filtered data in the table.
 * @param {() => void} handleVisibleSelectRowsColumn - A function to handle the visibility of the select rows column.
 * @param {boolean} selectRowColumnVisible - A boolean indicating if the select row column is visible.
 * @param {(filteredData: DataItem<T | undefined>[], columnsManaged: ColumnManaged[], headerProperty?: string,) => React.ReactNode} [renderExportDataComponent] - A function to render a component for exporting data.
 */
export interface ManageTableProps<T> {
    style: React.CSSProperties;
    selectedRows: Set<T | undefined>;
    handlePerPageChange: (optionValue: string) => void;
    columnsManaged: ColumnManaged[];
    handleColumnVisibility: (property: string) => void;
    handleVisibleAllColumns: () => void;
    filteredData: DataItem<T | undefined>[];
    handleVisibleSelectRowsColumn: () => void;
    selectRowColumnVisible: boolean;
    disableSelectRow: boolean;
    renderExportDataComponent?: (filteredData: DataItem<T | undefined>[], columnsManaged: ColumnManaged[], headerProperty?: string) => React.ReactNode;
}
/**
 * ManageTable: A component for managing the elements of a table.
 *
 * @component
 * @template T - The type of data items in the table.
 * @param {ManageTableProps<T>} props - The props passed to the ManageTable component.
 * @returns {React.ReactElement} - Returns a React element representing the ManageTable component.
 */
declare const ManageTable: <T>(props: ManageTableProps<T>) => React.ReactElement;
export default ManageTable;

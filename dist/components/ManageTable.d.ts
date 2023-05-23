import React from 'react';
import { ColumnManaged } from './Table';
interface DataItem<T> {
    [key: string]: T | undefined;
}
interface ManageTableProps<T> {
    selectedRows: Set<T | undefined>;
    handlePerPageChange: (optionValue: string) => void;
    columnsManaged: ColumnManaged[];
    handleColumnVisibility: (property: string) => void;
    handleVisibleAllColumns: () => void;
    filteredData: DataItem<T | undefined>[];
    handleVisibleSelectRowsColumn: () => void;
    selectRowColumnVisible: boolean;
    renderExportDataComponent?: (filteredData: DataItem<T | undefined>[], columnsManaged: ColumnManaged[], headerProperty?: string) => React.ReactNode;
}
/**
 * Component for managing a table.
 *
 * @component
 * @template T - The type of data items in the table.
 * @param {ManageTableProps<T>} props - The props for the ManageTable component.
 * @returns {React.ReactElement} The rendered ManageTable component.
 */
declare const ManageTable: <T>(props: ManageTableProps<T>) => React.ReactElement;
export default ManageTable;

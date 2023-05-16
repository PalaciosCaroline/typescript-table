import React from 'react';
import { ColumnManaged } from './Table';
interface DataItem<T> {
    [key: string]: T | undefined;
}
interface ManageTableProps<T> {
    selectedRows: any;
    handlePerPageChange: (optionValue: string) => void;
    columnsManaged: ColumnManaged[];
    handleColumnVisibility: (property: string) => void;
    handleVisibleAllColumns: () => void;
    filteredData: DataItem<T | undefined>[];
    handleVisibleSelectRowsColumn: () => void;
    selectRowColumnVisible: boolean;
    renderExportDataComponent?: (filteredData: DataItem<T | undefined>[], columnsManaged: ColumnManaged[], headerProperty?: string) => React.ReactNode;
}
declare const ManageTable: <T>(props: ManageTableProps<T>) => React.ReactElement;
export default ManageTable;

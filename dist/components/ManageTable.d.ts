import React from 'react';
interface DataItem<T> {
    [key: string]: T | undefined;
}
interface ManageTableProps<T> {
    selectedRows: any;
    handlePerPageChange: (optionValue: string) => void;
    columnsManaged: Column[];
    handleColumnVisibility: (property: string) => void;
    handleVisibleAllColumns: () => void;
    filteredData: DataItem<T | undefined>[];
    handleVisibleSelectRowsColumn: () => void;
    selectRowColumnVisible: boolean;
    renderExportDataComponent?: (filteredData: DataItem<T | undefined>[], columnsManaged: Column[], headerProperty?: string) => React.ReactNode;
}
interface Column {
    label: string;
    property: string;
    isVisible: boolean;
    dateFormat?: string;
    disableSort?: boolean;
    disableFilter?: boolean;
}
declare const ManageTable: <T>(props: ManageTableProps<T>) => React.ReactElement;
export default ManageTable;

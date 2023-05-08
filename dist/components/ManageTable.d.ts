import React from 'react';
interface DataItem<T> {
    [key: string]: T | undefined;
}
interface ManageTableProps<T> {
    handlePerPageChange: (optionValue: string) => void;
    columnsManaged: Column[];
    handleColumnVisibility: (property: string) => void;
    handleVisibleAllColumns: () => void;
    filteredData: DataItem<T | undefined>[];
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

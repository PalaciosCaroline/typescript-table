import React from 'react';
import './../styles/table.css';
interface Column {
    label: string;
    property: string;
    dateFormat?: string;
    disableSort?: boolean;
    disableFilter?: boolean;
}
interface ColumnManaged {
    label: string;
    property: string;
    isVisible?: boolean;
    dateFormat?: string;
    disableSort?: boolean;
    disableFilter?: boolean;
}
export interface InputValues<T> {
    [key: string]: T | undefined;
}
export interface DataItem<T> {
    [key: string]: T | undefined;
}
interface Props<T> {
    data: DataItem<T | undefined>[];
    columns: Column[];
    renderExportDataComponent?: (filteredData: DataItem<T | undefined>[], columnsManaged: ColumnManaged[]) => React.ReactNode;
}
export declare function Table<T>({ data, columns, renderExportDataComponent }: Props<T>): JSX.Element;
export {};

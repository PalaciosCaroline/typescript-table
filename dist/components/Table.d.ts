import React from 'react';
import './../styles/table.css';
export interface Column {
    label: string;
    property: string;
    dateFormat?: string;
    disableSort?: boolean;
    disableFilter?: boolean;
}
export interface ColumnManaged extends Column {
    isVisible?: boolean;
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
    renderExportDataComponent?: (filteredData: DataItem<T | undefined>[], columnsManaged: ColumnManaged[], headerProperty?: string) => React.ReactNode;
}
export declare function Table<T>({ data, columns, renderExportDataComponent, }: Props<T>): import("react/jsx-runtime").JSX.Element;
export {};

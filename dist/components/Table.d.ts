import React from 'react';
import './../styles/table.css';
import './../styles/CustomComponent.css';
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
/**
 * L'interface Props représente les propriétés du composant Table.
 */
interface Props<T> {
    data: DataItem<T | undefined>[];
    columns: Column[];
    background?: string;
    color?: string;
    hoverBackground?: string;
    selectedRowsBackground?: string;
    renderExportDataComponent?: (filteredData: DataItem<T | undefined>[], columnsManaged: ColumnManaged[], headerProperty?: string) => React.ReactNode;
}
export declare function Table<T>({ data, columns, background, color, hoverBackground, selectedRowsBackground, renderExportDataComponent, }: Props<T>): import("react/jsx-runtime").JSX.Element;
export {};

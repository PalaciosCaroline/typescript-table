import React from 'react';
import './../styles/table.css';
import './../styles/CustomComponent.css';
/**
 * The Column interface represents a column in the table.
 * @interface
 * @property {string} label - The label of the column.
 * @property {string} property - The property of the column.
 * @property {string} [dateFormat] - The date format of the column (optional).
 * @property {boolean} [disableSort] - Flag indicating if sorting is disabled for the column (optional).
 * @property {boolean} [disableFilter] - Flag indicating if filtering is disabled for the column (optional).
 */
export interface Column {
    label: string;
    property: string;
    dateFormat?: string;
    disableSort?: boolean;
    disableFilter?: boolean;
}
/**
 * The ColumnManaged interface extends the Column interface with visibility property.
 * @interface
 * @property {boolean} [isVisible] - Flag indicating if the column is visible (optional).
 */
export interface ColumnManaged extends Column {
    isVisible?: boolean;
}
/**
 * The InputValues interface is a generic for a record where the key is a string and the value can be any type or undefined.
 * @interface
 * @template T - Any type that will be the type of the values in the record.
 */
export interface InputValues<T> {
    [key: string]: T | undefined;
}
/**
 * The DataItem interface is a generic for a record where the key is a string and the value can be any type or undefined.
 * @interface
 * @template T - Any type that will be the type of the values in the record.
 */
export interface DataItem<T> {
    [key: string]: T | undefined;
}
/**
 * The Props interface represents the properties of the Table component.
 * @interface
 * @property {DataItem<T | undefined>[]} data - The data to be displayed in the table.
 * @property {Column[]} columns - The columns of the table.
 * @property {string} [background] - The background color of the table (optional).
 * @property {string} [color] - The color of the text in the table (optional).
 * @property {string} [hoverBackground] - The background color of the hovered rows in the table (optional).
 * @property {string} [selectedRowsBackground] - The background color of the selected rows in the table (optional).
 * @property {(filteredData: DataItem<T | undefined>[], columnsManaged: ColumnManaged[], headerProperty?: string) => React.ReactNode} [renderExportDataComponent] - A function to render a data export component (optional).
 * @property {boolean} [editRowColumnVisible] - Flag indicating if the edit row column is visible (optional).
 * @property {(id: T, e?: any) => void} [handleEditRow] - The function to handle row editing (optional).
 * @property {boolean} [archiveRowColumnVisible] - Flag indicating if the archive row column is visible (optional).
 * @property {(id: T, e?: any) => void} [handleArchiveRow] - The function to handle row archiving (optional).
 * @property {boolean} [deleteRowColumnVisible] - Flag indicating if the delete row column is visible (optional).
 * @property {(id: T, e?: any) => void} [handleDeleteRow] - The function to handle row deletion (optional).
 */
export interface TableProps<T> {
    data: DataItem<T | undefined>[];
    columns: Column[];
    background?: string;
    color?: string;
    hoverBackground?: string;
    selectedRowsBackground?: string;
    renderExportDataComponent?: (filteredData: DataItem<T | undefined>[], columnsManaged: ColumnManaged[], headerProperty?: string) => React.ReactNode;
    editRowColumnVisible?: boolean;
    handleEditRow?: (id: number | string, e?: Event) => void;
    archiveRowColumnVisible?: boolean;
    handleArchiveRow?: (id: number | string, e?: Event) => void;
    deleteRowColumnVisible?: boolean;
    handleDeleteRow?: (id: number | string, e?: Event) => void;
}
export declare function Table<T>({ data, columns, background, color, hoverBackground, selectedRowsBackground, renderExportDataComponent, editRowColumnVisible, handleEditRow, archiveRowColumnVisible, handleArchiveRow, deleteRowColumnVisible, handleDeleteRow, }: TableProps<T>): import("react/jsx-runtime").JSX.Element;

/// <reference types="react" />
import './../styles/table.css';
interface Column {
    label: string;
    property: string;
    dateFormat?: string;
    disableSort: boolean;
    disableFilter: boolean;
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
}
export default function Table<T>({ data, columns }: Props<T>): JSX.Element;
export {};

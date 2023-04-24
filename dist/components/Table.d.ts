/// <reference types="react" />
import './../styles/table.css';
interface Column {
    label: string;
    property: string;
}
export interface InputValues<T> {
    [key: string]: T | string;
}
interface DataItem<T> {
    [key: string]: T;
}
interface Props<T> {
    data: DataItem<T>[];
    columns: Column[];
}
export default function Table<T extends readonly string[]>({ data, columns }: Props<T>): JSX.Element;
export {};

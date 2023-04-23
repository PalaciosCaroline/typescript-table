/// <reference types="react" />
import './../styles/table.css';
interface Column {
    label: string;
    property: string;
}
interface DataItem<T> {
    [key: string]: T;
}
interface Props<T> {
    data: DataItem<T>[];
    columns: Column[];
}
export default function Table<T>({ data, columns }: Props<T>): JSX.Element;
export {};

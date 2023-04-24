import React from 'react';
interface ColumnManaged {
    label: string;
    property: string;
    isVisible: boolean;
}
interface InputValues {
    [key: string]: string;
}
interface Props {
    columnData: ColumnManaged[];
    inputValues: InputValues;
    handleSearchByProperty: (name: string, value: string) => void;
    handleSort: (property: string) => void;
    sortOrder: string;
    handleReset: (property: string) => void;
    sortKey: string;
}
declare const TableHeader: React.FC<Props>;
export default TableHeader;

import React from 'react';
interface TableHeaderProps {
    label: string;
    property: string;
    isVisible: boolean;
    dateFormat: string;
    isSortKey: boolean;
    sortOrder: 'asc' | 'desc' | 'noSort';
    disableSort?: boolean;
    disableFilter?: boolean;
    inputValues: {
        [key: string]: string | undefined;
    };
    handleSort: (property: string, dateFormat: string) => void;
    handleSearchByProperty: (property: string, value: string) => void;
    handleReset: (property: string) => void;
}
export declare const TableHeader: React.FC<TableHeaderProps>;
export {};

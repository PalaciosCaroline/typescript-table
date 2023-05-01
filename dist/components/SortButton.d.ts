import React from 'react';
interface SortButtonProps {
    isSortKey: boolean;
    sortOrder: 'asc' | 'desc' | 'noSort';
    property: string;
    dateFormat: string;
    handleSort: (property: string, dateFormat: string) => void;
}
declare const SortButton: React.FC<SortButtonProps>;
export default SortButton;

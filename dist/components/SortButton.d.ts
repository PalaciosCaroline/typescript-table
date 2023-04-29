import React from 'react';
interface SortButtonProps {
    isSortKey: boolean;
    sortOrder: 'asc' | 'desc' | 'noSort';
    property: string;
    usaDate: boolean;
    handleSort: (property: string, usaDate: boolean) => void;
}
declare const SortButton: React.FC<SortButtonProps>;
export default SortButton;

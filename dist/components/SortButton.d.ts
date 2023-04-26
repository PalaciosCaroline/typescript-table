import React from 'react';
interface SortButtonProps {
    isSortKey: boolean;
    sortOrder: 'asc' | 'desc' | 'noSort';
    property: string;
    handleSort: (property: string) => void;
}
declare const SortButton: React.FC<SortButtonProps>;
export default SortButton;

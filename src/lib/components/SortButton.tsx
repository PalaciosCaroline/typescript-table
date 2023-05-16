import React from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

interface SortButtonProps {
  isSortKey: boolean;
  sortOrder: 'asc' | 'desc' | 'noSort';
  property: string;
  dateFormat: string;
  handleColumnSort: (property: string, dateFormat: string) => void;
}

const SortButton: React.FC<SortButtonProps> = ({
  isSortKey,
  sortOrder,
  property,
  handleColumnSort,
  dateFormat,
}) => {
  const renderSortButton = (
    icon: React.ReactNode,
    label: string,
    testIdSuffix: string,
  ) => (
    <button
      onClick={() => handleColumnSort(property, dateFormat)}
      className={`btnSort btnSort_tableComponent ${
        isSortKey && sortOrder != 'noSort' ? ' selectedBtnSort' : ''
      }`}
      aria-label={label}
      data-testid={`btnSort${testIdSuffix}-${property}`}
    >
      {icon}
    </button>
  );

  return (
    <>
      {(!isSortKey || (isSortKey && sortOrder === 'noSort')) &&
        renderSortButton(<FaSort />, 'no sorted, change by ascendant', 'ByAsc')}
      {isSortKey &&
        sortOrder === 'asc' &&
        renderSortButton(
          <FaSortUp />,
          'sorted by ascendant, change by descendant',
          'byDesc',
        )}
      {isSortKey &&
        sortOrder === 'desc' &&
        renderSortButton(
          <FaSortDown />,
          'sorted by descendant, change by no sorted',
          'byNoSort',
        )}
    </>
  );
};

export default SortButton;

import React from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

interface SortButtonProps {
  isSortKey: boolean;
  sortOrder: 'asc' | 'desc' | 'noSort';
  property: string;
  dateFormat: string;
  handleColumnSort: (property: string, dateFormat: string) => void;
}

/**
 * Component for the sort button.
 *
 * @component
 * @param {SortButtonProps} props - The props for the SortButton component.
 * @returns {React.ReactElement} The rendered SortButton component.
 */
const SortButton: React.FC<SortButtonProps> = ({
  isSortKey,
  sortOrder,
  property,
  handleColumnSort,
  dateFormat,
}) => {
  /**
   * Renders the sort button.
   *
   * @param {React.ReactNode} icon - The icon for the sort button.
   * @param {string} label - The label for the sort button.
   * @param {string} testIdSuffix - The test ID suffix for the sort button.
   * @returns {React.ReactElement} The rendered sort button.
   */
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
      {/* Render the sort button for no sorted */}
      {(!isSortKey || (isSortKey && sortOrder === 'noSort')) &&
        renderSortButton(<FaSort />, 'no sorted, change by ascendant', 'ByAsc')}

      {/* Render the sort button for ascending */}
      {isSortKey &&
        sortOrder === 'asc' &&
        renderSortButton(
          <FaSortUp />,
          'sorted by ascendant, change by descendant',
          'byDesc',
        )}
      {/* Render the sort button for descending */}
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

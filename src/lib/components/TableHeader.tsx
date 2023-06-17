import React from 'react';
import SortButton from './SortButton';
import SearchDropdown from './SearchDropdown';
import SearchByProperty from './SearchByProperty';

/**
 * The TableHeaderProps interface represents the properties of the TableHeader component.
 * @interface
 * @property {string} label - The label of the table header.
 * @property {string} property - The property of the table header.
 * @property {boolean} isVisible - Flag indicating if the table header is visible.
 * @property {string} dateFormat - The date format of the table header.
 * @property {boolean} isSortKey - Indicates if the property is currently the sort key.
 * @property {'asc' | 'desc' | 'noSort'} sortOrder - The current order of the sort. Can be 'asc', 'desc' or 'noSort'.
 * @property {boolean} [disableSort] - Flag indicating if sorting is disabled for the table header (optional).
 * @property {boolean} [disableFilter] - Flag indicating if filtering is disabled for the table header (optional).
 * @property {{ [key: string]: string | undefined }} inputValues - The current input values for searching.
 * @property {(property: string, dateFormat: string) => void} handleColumnSort - The function that is called when the sort button is clicked.
 * @property {(property: string, value: string) => void} handleSearchByProperty - The function that is called when the search by property is triggered.
 * @property {(property: string) => void} handleReset - The function that is called when the reset button is clicked.
 * @property {{ [property: string]: boolean }} isOpenSearchByProperty - Record indicating whether search by property is open for each property.
 * @property {(property: string) => void} handleToggle - The function that is called when the toggle button is clicked.
 */
interface TableHeaderProps {
  label: string;
  property: string;
  isVisible: boolean;
  dateFormat: string;
  isSortKey: boolean;
  sortOrder: 'asc' | 'desc' | 'noSort';
  disableSort?: boolean;
  disableFilter?: boolean;
  inputValues: { [key: string]: string | undefined };
  handleColumnSort: (property: string, dateFormat: string) => void;
  handleSearchByProperty: (property: string, value: string) => void;
  handleReset: (property: string) => void;
  isOpenSearchByProperty: { [property: string]: boolean };
  handleToggle: (property: string) => void;
}

/**
 * The TableHeader component displays the header of the table.
 *
 * @component
 * @param {TableHeaderProps} props - The props for the TableHeader component.
 * @returns {React.ReactElement | null} The rendered TableHeader component or null if the header is not visible.
 */
const TableHeader: React.FC<TableHeaderProps> = ({
  label,
  property,
  isVisible,
  dateFormat,
  isSortKey,
  sortOrder,
  handleColumnSort,
  disableSort,
  disableFilter,
  handleSearchByProperty,
  inputValues,
  handleReset,
  isOpenSearchByProperty,
  handleToggle,
}: TableHeaderProps): React.ReactElement | null => {
  if (!isVisible) return null;

  return (
    <th
      key={property}
      style={{ position: 'relative' }}
      className={`th_${property} thColor th_tableComponent`}
    >
      <div className="box_labelAndBtnsColumn">
        <p
          className="label label_tableComponent"
          data-testid={`columnManaged-${property}`}
        >
          {label}
        </p>
        <div className="box_btnsColumn">
          {!disableSort && (
            <SortButton
              isSortKey={isSortKey}
              sortOrder={sortOrder}
              property={property}
              handleColumnSort={handleColumnSort}
              dateFormat={dateFormat}
            />
          )}
          {!disableFilter && (
            <SearchDropdown
              inputValues={inputValues}
              property={property}
              handleToggle={handleToggle}
            />
          )}
        </div>
      </div>
      {isOpenSearchByProperty[property] && (
        <div className="boxSearchPropertyContent">
          <SearchByProperty
            key={property}
            property={property}
            inputValues={inputValues}
            handleSearchByProperty={handleSearchByProperty}
            handleReset={handleReset}
          />
        </div>
      )}
    </th>
  );
};

export default TableHeader;
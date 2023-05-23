import React from 'react';
import SortButton from './SortButton';
import SearchDropdown from './SearchDropdown';
import SearchByProperty from './SearchByProperty';

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

export const TableHeader: React.FC<TableHeaderProps> = ({
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
}) => {
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

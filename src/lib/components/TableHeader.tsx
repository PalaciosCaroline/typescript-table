import React from 'react';
import SortButton from './SortButton';
import SearchDropdown from './SearchDropdown';

interface TableHeaderProps {
    label: string;
    property: string;
    isVisible: boolean;
    dateFormat: string;
    isSortKey: boolean;
    sortOrder: 'asc' | 'desc' | 'noSort';
    disableSort: boolean;
    disableFilter: boolean;
    inputValues: { [key: string]: string | undefined };
    handleSort: (property: string, dateFormat: string) => void;
    handleSearchByProperty: (property: string, value: string) => void;
    handleReset: (property: string) => void;
  }
  
 export const TableHeader: React.FC<TableHeaderProps> = ({
    label,
    property,
    isVisible,
    dateFormat,
    isSortKey,
    sortOrder,
    handleSort,
    disableSort,
    disableFilter,
    handleSearchByProperty,
    inputValues,
    handleReset,
  }) => {
    if (!isVisible) return null;
  
    return (
      <th key={property} style={{ position: 'relative' }} className={`th_tableComponent th_${property} thColor`}>
        <div className='box_labelAndBtnsColumn'>
          <p className='label' data-testid={`columnManaged-${property} label__tableComponent`}>{label}</p>
          <div className='box_btnsColumn'>
          {!disableSort && (
            <SortButton isSortKey={isSortKey} sortOrder={sortOrder} property={property} handleSort={handleSort} dateFormat={dateFormat}/>
          )}
          {!disableFilter && (
            <SearchDropdown
            property={property}
            inputValues={inputValues}
            handleSearchByProperty={handleSearchByProperty}
            handleReset={handleReset}
          />
          )}
          </div>
        </div>
      </th>
    );
  };

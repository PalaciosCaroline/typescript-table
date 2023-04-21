import React from 'react';
import { FaSortDown, FaSortUp, FaSort } from 'react-icons/fa';
import SearchDropdown from './SearchDropdown';

interface ColumnManaged {
  label: string;
  property: string;
  isVisible: boolean;
}

interface InputValues { [key: string]: string; }

interface Props {
  columnData: ColumnManaged[];
  inputValues: InputValues;
  handleSearchByProperty: (name: string, value: string) => void;
  handleSort: (property: string) => void;
  sortOrder: string;
  handleReset: (property: string) => void;
  sortKey: string;
}

const TableHeader: React.FC<Props> = ({ columnData, inputValues, handleSearchByProperty, handleSort, sortOrder, handleReset, sortKey }) => {
  return (
    <thead>
      <tr>
        {columnData.map(({ label, property, isVisible }) => {
          if (isVisible) {
            const isSortKey = sortKey === property;
            return (
              <th key={property} style={{ position: 'relative' }} className={`th_${property} thColor`}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <p className='label'>{label}</p>
                  {/* {!isSortKey && (
                    <button onClick={() => handleSort(property, 'asc')} className='btnSort'>
                      <FaSort />
                    </button>
                  )}
                  {isSortKey && sortOrder === 'asc' && (
                    <button onClick={() => handleSort(property, 'desc')} className={sortKey === property ? 'btnSort selectedBtnSort' : 'btnSort'}>
                      <FaSortUp />
                    </button>
                  )}
                  {isSortKey && sortOrder === 'desc' && (
                    <button onClick={() => handleSort(property, 'noSort')} className={sortKey === property ? 'selectedBtnSort btnSort' : 'btnSort'}>
                      <FaSortDown />
                    </button>
                  )} */}

{(!isSortKey || (isSortKey && sortOrder === "noSort"))  && (
  <button onClick={() => handleSort(property)} className="btnSort">
    <FaSort />
  </button>
)}
{isSortKey && sortOrder === "asc" && (
  <button
    onClick={() => handleSort(property)}
    className={sortKey === property ? "btnSort selectedBtnSort" : "btnSort"}
  >
    <FaSortUp />
  </button>
)}
{isSortKey && sortOrder === "desc" && (
  <button
    onClick={() => handleSort(property)}
    className={sortKey === property ? "selectedBtnSort btnSort" : "btnSort"}
  >
    <FaSortDown />
  </button>
)}
                  <SearchDropdown
                    inputValues={inputValues}
                    property={property}
                    handleSearchByProperty={handleSearchByProperty}
                    handleReset={handleReset}
                  />
                </div>
              </th>
            );
          }
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
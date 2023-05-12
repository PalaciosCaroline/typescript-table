import React, { useState, useEffect, useRef } from 'react';
import { customSort } from '../utils/sortDatas';
import filterData from '../utils/filterData';
import Pagination from './Pagination';
import './../styles/table.css';
import { TableHeader } from './TableHeader';
import { SearchAndResetGlobal } from './searchAndResetGlobal';
import ManageTable from './ManageTable';

interface Column {
  label: string;
  property: string;
  dateFormat?: string;
  disableSort?: boolean;
  disableFilter?: boolean;
}
interface ColumnManaged {
  label: string;
  property: string;
  isVisible?: boolean;
  dateFormat?: string;
  disableSort?: boolean;
  disableFilter?: boolean;
}

export interface InputValues<T> {
  [key: string]: T | undefined;
}

interface SearchByProp {
  [key: string]: string | undefined;
}
interface SearchTerms {
  [key: string]: string;
}

export interface DataItem<T> {
  [key: string]: T | undefined;
}
interface Props<T> {
  data: DataItem<T | undefined>[];
  columns: Column[];
  renderExportDataComponent?: (
    filteredData: DataItem<T | undefined>[],
    columnsManaged: ColumnManaged[],
    headerProperty?: string,
  ) => React.ReactNode;
}

export function Table<T>({
  data,
  columns,
  renderExportDataComponent,
}: Props<T>) {
  //useState to sort
  const [sortKey, setSortKey] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'noSort'>(
    'noSort',
  );
  const [sortedData, setSortedData] = useState<DataItem<T | undefined>[]>([]);
  // useState pagination
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  // useState formatDate for sort
  const [dateFormatForSort, setDateFormatForSort] = useState<string>('none');
  // useState to global search
  const [searchTerm, setSearchTerm] = useState<string>('');
  // useState search by property
  const [searchTerms, setSearchTerms] = useState<SearchTerms>({});
  const initialIsOpenSearchBProp: Record<string, boolean> = {};
  columns.forEach(({ property }) => {
    initialIsOpenSearchBProp[property] = false;
  });
  const [isOpenSearchBProp, setIsOpenSearchBProp] = useState<
    Record<string, boolean>
  >(initialIsOpenSearchBProp);
  const initialInputValues: SearchByProp = {};
  columns.forEach(({ property }) => {
    initialInputValues[property] = '';
  });
  const [inputValues, setInputValues] = useState(initialInputValues);
  // useSate select rows to export
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);
  const [isIndeterminate, setIndeterminate] = useState(false);
  const selectAllRef = useRef<HTMLInputElement | null>(null);
  const [selectRowColumnVisible, setSelectRowColumnVisible] = useState(true);

  // sort data (data => sortedData)
  useEffect(() => {
    setSortedData(customSort(data, sortKey, sortOrder, dateFormatForSort));
  }, [data, sortKey, sortOrder, dateFormatForSort]);

  const handleSort = (property: string, dateFormat: string) => {
    if (sortKey === property) {
      setSortOrder(
        sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? 'noSort' : 'asc',
      );
    } else {
      setSortKey(property);
      setSortOrder('asc');
      setDateFormatForSort(dateFormat);
    }
  };

  // search global and by property (sortedData => filteredData)
  const filteredData = filterData(sortedData, searchTerm, searchTerms);

  // pagination display
  useEffect(() => {
    const newTotalPages =
      filteredData.length > perPage
        ? Math.ceil(filteredData.length / perPage)
        : 1;
    setTotalPages(newTotalPages);
    setPage((prevPage) => {
      if (prevPage >= newTotalPages) {
        return newTotalPages;
      }
      return prevPage;
    });
  }, [filteredData, perPage]);

  // manage rows per page display
  const handlePerPageChange = (optionValue: string) => {
    if (optionValue === 'All') {
      setPerPage(filteredData.length);
    } else {
      setPerPage(parseInt(optionValue));
    }
  };

  // manage change page
  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  };

  // manage global search record
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  // manage search by property record
  const handleSearchByProperty = (property: string, value: string) => {
    setInputValues({
      ...inputValues,
      [property]: value,
    });
    setSearchTerms({
      ...searchTerms,
      [property]: value,
    });
  };

  // manage all searchs
  const handleReset = (property: string): void => {
    setSearchTerms((prevSearchTerms) => ({
      ...prevSearchTerms,
      [property]: '',
    }));
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [property]: '',
    }));
  };

  // manage button global reset search
  const handleResetSearch = (): void => {
    setSearchTerm('');
    setSearchTerms({});
    setInputValues(initialInputValues);
  };

  // manage columns display instruction (isVisible change)
  const handleColumnVisibility = (property: string): void => {
    setColumnsManaged((prevColumns) => {
      const columnToToggle = prevColumns.find(
        (column) => column.property === property,
      );
      if (columnToToggle) {
        return prevColumns.map((column) => {
          if (column.property === property) {
            return { ...column, isVisible: !column.isVisible };
          }
          return column;
        });
      }
      return prevColumns;
    });
  };

  // manage isVisible instruction
  const handleVisibleAllColumns = (): void => {
    const updatedColumns = columnsManaged.map((column) => {
      return {
        ...column,
        isVisible: true,
      };
    });
    setColumnsManaged(updatedColumns);
  };

  // manage dateFormat instruction
  const [columnsManaged, setColumnsManaged] = useState(() => {
    return columns.map(
      ({ label, property, dateFormat, disableSort, disableFilter }) => ({
        label,
        property,
        isVisible: true,
        dateFormat: dateFormat !== undefined ? dateFormat : 'none',
        disableSort,
        disableFilter,
      }),
    );
  });

  //manage display data per page
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const currentData: DataItem<T>[] = filteredData.slice(
    start,
    end,
  ) as DataItem<T>[];

  // manage display object array and date type
  function formatNestedDate<T>(value: T, depth = 0): string | React.ReactNode {
    if (depth >= 4) {
      return <span>...</span>;
    }
    if (value instanceof Date) {
      return value.toLocaleDateString();
    } else if (Array.isArray(value)) {
      return (
        <ul className="ul_tableComponent">
          {value.map((item, index) => (
            <li
              key={`item-${index}`}
              className={`liOjectData liOjectData_${depth}`}
            >
              {formatNestedDate(item, depth + 1)}
            </li>
          ))}
        </ul>
      );
    } else if (typeof value === 'object' && value !== null) {
      return (
        <ul className={`ul_tableComponent ul_tableComponent_${depth}`}>
          {Object.entries(value).map(([key, item], index) => (
            <li
              key={`key-${index}`}
              className={`liOjectData liOjectData_${depth}`}
            >
              {key}: {formatNestedDate(item, depth + 1)}
            </li>
          ))}
        </ul>
      );
    }
    return value as React.ReactNode;
  }

  // manage display object array and date type
  function formatDate(value: T | undefined): string | React.ReactNode {
    return formatNestedDate(value);
  }

  // Toggle search by property
  const handleToggle = (property: string): void => {
    setIsOpenSearchBProp((prevState: Record<string, boolean>) => ({
      ...prevState,
      [property]: !prevState[property],
    }));
  };

  // Fonction pour gérer la sélection des lignes
  const handleRowSelection = (id: T | undefined) => {
    if (id !== undefined) {
      setSelectedRows((prevSelectedRows) => {
        const newSelectedRows = new Set(prevSelectedRows);
        if (newSelectedRows.has(id)) {
          newSelectedRows.delete(id);
        } else {
          newSelectedRows.add(id);
        }
        return newSelectedRows;
      });
    }
  };

  // select or unselect all rows
  const handleSelectAll = () => {
    if (selectAllChecked) {
      setSelectedRows(new Set());
      setSelectAllChecked(false);
    } else {
      setSelectedRows(new Set(filteredData.map((item) => item.id)));
      setSelectAllChecked(true);
    }
  };

  useEffect(() => {
    if (selectedRows.size === filteredData.length) {
      setSelectAllChecked(true);
      setIndeterminate(false);
    } else if (selectedRows.size === 0) {
      setSelectAllChecked(false);
      setIndeterminate(false);
    } else {
      setSelectAllChecked(false);
      setIndeterminate(true);
    }
  }, [selectedRows, filteredData]);

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = isIndeterminate;
      if (isIndeterminate) {
        selectAllRef.current.classList.add('indeterminate');
      } else {
        selectAllRef.current.classList.remove('indeterminate');
      }
    }
}, [isIndeterminate]);

// toggle visible row select column
const handleVisibleSelectRowsColumn = () => {
  setSelectRowColumnVisible(!selectRowColumnVisible);
};

  return (
    <div className="box_table box_tableAndFeatures">
      <SearchAndResetGlobal
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        handleResetSearch={handleResetSearch}
      />

      <div className="box_tableManaged scrollerTable">
        <ManageTable
          handlePerPageChange={handlePerPageChange}
          filteredData={filteredData}
          columnsManaged={columnsManaged}
          handleColumnVisibility={handleColumnVisibility}
          handleVisibleAllColumns={handleVisibleAllColumns}
          renderExportDataComponent={renderExportDataComponent}
          selectedRows={selectedRows}
          handleVisibleSelectRowsColumn={handleVisibleSelectRowsColumn}
          selectRowColumnVisible={selectRowColumnVisible}
        />

        <table className="tableComponent">
          <colgroup>
            {columnsManaged.map(({ property, isVisible }) => {
              if (isVisible) {
                return (
                  <col key={`{col_${property}`} id={`col_${property}`}></col>
                );
              }
            })}
          </colgroup>
          <thead className="thead_tableComponent">
            <tr role="row" className="tr_tableComponent">
            {selectRowColumnVisible && 
              <th className='thColor th_tableComponent box_inputSelectAllRows'>
                <input
                  type="checkbox"
                  data-role="checkbox-three-state"
                  data-caption="Checkbox"
                  checked={selectAllChecked}
                  onChange={handleSelectAll}
                  ref={selectAllRef}
                  className='inputSelectAllRows inputSelectRows'
                />
              </th>
              }
              {columnsManaged.map(
                ({
                  label,
                  property,
                  isVisible,
                  dateFormat,
                  disableSort,
                  disableFilter,
                }) => {
                  const isSortKey = sortKey === property;
                  return (
                    <TableHeader
                      key={property}
                      label={label}
                      property={property}
                      isVisible={isVisible}
                      dateFormat={dateFormat}
                      isSortKey={isSortKey}
                      sortOrder={sortOrder}
                      handleSort={handleSort}
                      inputValues={inputValues}
                      handleReset={handleReset}
                      disableSort={disableSort}
                      disableFilter={disableFilter}
                      handleSearchByProperty={handleSearchByProperty}
                      isOpenSearchBProp={
                        isOpenSearchBProp[property]
                          ? { [property]: isOpenSearchBProp[property] }
                          : {}
                      }
                      handleToggle={handleToggle}
                    />
                  );
                },
              )}
            </tr>
          </thead>

          <tbody className="tbody_tableComponent">
            {currentData.map((item: DataItem<T | undefined>, index) => (
              <tr
                key={index}
                role="row"
                className={`tr_${index} tr_tableComponent ${
                  selectedRows.has(item.id) ? 'selected' : ''
                }`}
                onClick={() => handleRowSelection(item.id)}
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onChange={() => {}}
              >
                {selectRowColumnVisible && 
                <td className='box_inputSelectRow'>
                <input
                  type="checkbox"
                  checked={selectedRows.has(item.id)}
                  className='inputSelectRows inputSelectRow'
                  onClick={(e) => {
                    e.stopPropagation(); // Empêcher la propagation de l'événement onClick
                    handleRowSelection(item.id);
                  }}
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  onChange={() => {}}
                />
              </td>
                
                }
                

                {columnsManaged.map(({ property, isVisible }) => {
                  if (isVisible) {
                    return (
                      <td
                        key={`cell-${index}-${property} td_tableComponent`}
                        role="cell"
                        className={`table-cell table-cell_${property}_${index} td_tableComponent`}
                      >
                        {formatDate(item[property])}
                      </td>
                    );
                  }
                  return null;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="box_entriesAndPage">
        <div className="showingEntries">
          {filteredData.length <= 0
            ? `0 results of ${data.length} entries`
            : filteredData.length === 1
            ? `1 entry`
            : `${(page - 1) * perPage + 1} - ${Math.min(
                page * perPage,
                filteredData.length,
              )} of ${filteredData.length} entries`}
        </div>
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

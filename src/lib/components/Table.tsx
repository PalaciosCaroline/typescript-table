import React, { useState, useEffect, useRef } from 'react';
import { customSort } from '../utils/sortDatas';
import filterData from '../utils/filterData';
import Pagination from './Pagination';
import './../styles/table.css';
import { TableHeader } from './TableHeader';
import { SearchAndResetGlobal } from './searchAndResetGlobal';
import ManageTable from './ManageTable';

export interface Column {
  label: string;
  property: string;
  dateFormat?: string;
  disableSort?: boolean;
  disableFilter?: boolean;
}

export interface ColumnManaged extends Column {
  isVisible?: boolean;
}

export interface InputValues<T> {
  [key: string]: T | undefined;
}

/**
 * L'interface SearchByProp permet de définir un enregistrement où la clé est une chaîne et la valeur est une chaîne ou undefined.
 * Elle est utilisée pour la recherche par propriété.
 */
interface SearchByProperty {
  [key: string]: string | undefined;
}

/**
 * L'interface SearchTerms permet de définir un enregistrement où la clé est une chaîne et la valeur est une chaîne.
 * Elle est utilisée pour stocker les termes de recherche.
 */
interface SearchTerms {
  [key: string]: string;
}

export interface DataItem<T> {
  [key: string]: T | undefined;
}

/**
 * L'interface Props représente les propriétés du composant Table.
 */
interface Props<T> {
  data: DataItem<T | undefined>[]; // Les données à afficher dans le tableau
  columns: Column[]; // Les colonnes du tableau
  renderExportDataComponent?: (
    // Une fonction pour rendre un composant d'exportation de données
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
  // useState for sorting
  const [sortKey, setSortKey] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'noSort'>(
    'noSort',
  );
  const [sortedData, setSortedData] = useState<DataItem<T | undefined>[]>([]);
  // useState for pagination
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  // useState for date format used in sorting
  const [dateFormatForSort, setDateFormatForSort] = useState<string>('none');
  // useState for global search
  const [searchTerm, setSearchTerm] = useState<string>('');
  // useState for search by property
  const [searchTerms, setSearchTerms] = useState<SearchTerms>({});
  const initialIsOpenSearchByProperty: Record<string, boolean> = {};
  columns.forEach(({ property }) => {
    initialIsOpenSearchByProperty[property] = false;
  });
  const [isOpenSearchByProperty, setIsOpenSearchByProperty] = useState<
    Record<string, boolean>
  >(initialIsOpenSearchByProperty);
  const initialInputValues: SearchByProperty = {};
  columns.forEach(({ property }) => {
    initialInputValues[property] = '';
  });
  const [inputValues, setInputValues] = useState(initialInputValues);
  // useState for selecting rows to export
  const [selectedRows, setSelectedRows] = useState<Set<T | undefined>>(new Set());
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);
  const [isIndeterminate, setIndeterminate] = useState(false);
  const selectAllRef = useRef<HTMLInputElement | null>(null);
  const [selectRowColumnVisible, setSelectRowColumnVisible] = useState(true);

  // useEffect for sorting data
  useEffect(() => {
    setSortedData(customSort(data, sortKey, sortOrder, dateFormatForSort));
  }, [data, sortKey, sortOrder, dateFormatForSort]);

  const updateSortOrder = (sortOrder: 'asc' | 'desc' | 'noSort') => {
    return sortOrder === 'asc'
      ? 'desc'
      : sortOrder === 'desc'
      ? 'noSort'
      : 'asc';
  };

  /**
   * Handles the column sorting based on the provided property and date format.
   *
   * @param {string} property - The property of the column being sorted.
   * @param {string} dateFormat - The date format used for sorting (e.g., 'YYYY/MM/DD').
   * @function handleColumnSort
   * @returns {void}
   */
  const handleColumnSort = (property: string, dateFormat: string) => {
    if (sortKey === property) {
      setSortOrder(updateSortOrder(sortOrder));
    } else {
      setSortKey(property);
      setSortOrder('asc');
      setDateFormatForSort(dateFormat);
    }
  };

  /**
   * Updates search terms and input values for a specific property.
   *
   * @param {string} property - The property to update.
   * @param {string} value - The new search value for the property.
   * @param {SearchTerms} prevSearchTerms - The previous search terms object.
   * @param {SearchByProp} prevInputValues - The previous input values object.
   *
   * @returns {Object} An object containing the updated search terms and input values.
   */
  const updateSearchTerms = (
    property: string,
    value: string,
    prevSearchTerms: SearchTerms,
    prevInputValues: SearchByProperty,
  ) => {
    const updatedSearchTerms = {
      ...prevSearchTerms,
      [property]: value,
    };
    const updatedInputValues = {
      ...prevInputValues,
      [property]: value,
    };

    return { updatedSearchTerms, updatedInputValues };
  };

  /**
   * Handles the update of search terms and input values when a search by property is performed.
   *
   * @param {string} property - The property to search on.
   * @param {string} value - The search value for the property.
   */
  const handleSearchByProperty = (property: string, value: string) => {
    const { updatedSearchTerms, updatedInputValues } = updateSearchTerms(
      property,
      value,
      searchTerms,
      inputValues,
    );
    setSearchTerms(updatedSearchTerms);
    setInputValues(updatedInputValues);
  };

  // Filters the sorted data based on the searchTerm and searchTerms.
  const filteredData = filterData(sortedData, searchTerm, searchTerms);

  // Calculates and sets the total number of pages based on the length of the filtered data.
  // If the current page number exceeds the total pages, resets the page number to the total.
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

  /**
   * Resets the search term and input value for a given property in the respective states.
   *
   * @param {string} property - The property for which the search term and input value should be reset.
   * @function handleReset
   * @returns {void}
   */
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

  /**
   * Toggles the visibility of a column in a table based on its property name.
   *
   * @param {string} property - The property name of the column whose visibility will be toggled.
   * @function handleColumnVisibility
   * @returns {void}
   */
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

  /**
   * Sets all columns in a table to visible.
   *
   * If the 'select row' column is not visible, the function will also make it visible.
   *
   * @function handleVisibleAllColumns
   * @returns {void}
   */
  const handleVisibleAllColumns = (): void => {
    const updatedColumns = columnsManaged.map((column) => {
      return {
        ...column,
        isVisible: true,
      };
    });
    setColumnsManaged(updatedColumns);
    if (!selectRowColumnVisible) {
      handleVisibleSelectRowsColumn();
    }
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

  // display data object or array
  function renderList<T>(
    items: T[],
    itemRenderer: (item: T, index: number) => React.ReactNode,
    depth: number,
  ): React.ReactElement {
    return (
      <ul className={`ul_tableComponent ul_tableComponent_${depth}`}>
        {items.map((item, index) => (
          <li
            key={`item-${index}`}
            className={`liOjectData liOjectData_${depth}`}
          >
            {itemRenderer(item, index)}
          </li>
        ))}
      </ul>
    );
  }

  /**
   * Formats a nested date structure into a readable format, handling Date objects, arrays, and other objects.
   *
   * @function formatNestedDate
   * @template T - The type of value to be formatted
   * @param {T} value - The value to be formatted. This can be a Date object, array, or other objects.
   * @param {number} [depth=0] - The current nesting depth.
   * @returns {string | React.ReactNode} - Returns a formatted string if the value is a Date object. If the value is an array or an object, the function recursively formats nested values and returns a React component. If the depth is 4 or more, it returns a '...' string wrapped in a span.
   */
  function formatNestedDate<T>(value: T, depth = 0): string | React.ReactNode {
    if (depth >= 4) {
      return <span>...</span>;
    }
    if (value instanceof Date) {
      return value.toLocaleDateString();
    } else if (Array.isArray(value)) {
      return renderList(
        value,
        (item) => formatNestedDate(item, depth + 1),
        depth,
      );
    } else if (typeof value === 'object' && value !== null) {
      return renderList(
        Object.entries(value),
        ([key, item]) => `${key}: ${formatNestedDate(item, depth + 1)}`,
        depth,
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
    setIsOpenSearchByProperty((prevState: Record<string, boolean>) => ({
      ...prevState,
      [property]: !prevState[property],
    }));
  };

  /**
   * Handles the selection or deselection of a row identified by its ID.
   *
   * @param {T | undefined} id - The ID of the row to be selected or deselected.
   * @function handleRowSelection
   * @returns {void}
   */
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

  // control if row is selected
  const isRowSelected = (id: T | undefined): boolean => {
    return selectedRows.has(id);
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

  // manage select case of head (allChecked, indeterminate, and noChecked)
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

  // manage style of indeterminate case
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
              {selectRowColumnVisible && (
                <th className="thColor th_tableComponent box_inputSelectAllRows">
                  <input
                    id="selectAll"
                    type="checkbox"
                    data-role="checkbox-three-state"
                    data-caption="Checkbox"
                    checked={selectAllChecked}
                    onChange={handleSelectAll}
                    ref={selectAllRef}
                    className="inputSelectAllRows inputSelectRows"
                    role="checkbox"
                    aria-checked={
                      selectAllChecked
                        ? 'true'
                        : isIndeterminate
                        ? 'mixed'
                        : 'false'
                    }
                    aria-label={
                      selectAllChecked
                        ? 'all rows are checked'
                        : isIndeterminate
                        ? 'some rows are selected'
                        : 'no row is checked'
                    }
                  />
                  <label htmlFor="selectAll" className="sr-only">
                    Select all rows
                  </label>
                </th>
              )}
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
                      handleColumnSort={handleColumnSort}
                      inputValues={inputValues}
                      handleReset={handleReset}
                      disableSort={disableSort}
                      disableFilter={disableFilter}
                      handleSearchByProperty={handleSearchByProperty}
                      isOpenSearchByProperty={
                        isOpenSearchByProperty[property]
                          ? { [property]: isOpenSearchByProperty[property] }
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
                aria-label="Select this row"
              >
                {selectRowColumnVisible && (
                  <td className="box_inputSelectRow">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(item.id)}
                      className="inputSelectRows inputSelectRow"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowSelection(item.id);
                      }}
                      aria-checked={isRowSelected(item.id) ? 'true' : 'false'}
                      aria-label={`Select row with ${item[1]} and ${item[2]}`}
                      aria-labelledby={`row-${item.id}`}
                      // eslint-disable-next-line @typescript-eslint/no-empty-function
                      onChange={() => {}}
                    />
                    <label htmlFor={`selectRow-${item.id}`} className="sr-only">
                      select this row
                    </label>
                  </td>
                )}

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
            ? `0 result of ${data.length} entries`
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

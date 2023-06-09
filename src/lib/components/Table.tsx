import React, { useState, useEffect, useRef, ReactElement } from 'react';
import customSort from '../utils/sortDatas';
import filterData from '../utils/filterData';
import Pagination from './Pagination';
import TableHeaderCell from './TableHeaderCell';
import SearchAndResetGlobal from './searchAndResetGlobal';
import ManageTable from './ManageTable';
import ActionButton from './ActionButton';
import EntriesInfo from './EntriesInfo';
import { FiEdit3, FiArchive } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import './../styles/table.css';
import './../styles/CustomComponent.css';

/**
 * The Column interface represents a column in the table.
 * @interface
 * @property {string} label - The label of the column.
 * @property {string} property - The property of the column.
 * @property {string} [dateFormat] - The date format of the column (optional).
 * @property {boolean} [disableSort] - Flag indicating if sorting is disabled for the column (optional).
 * @property {boolean} [disableFilter] - Flag indicating if filtering is disabled for the column (optional).
 */
export interface Column {
  label: string;
  property: string;
  dateFormat?: string;
  disableSort?: boolean;
  disableFilter?: boolean;
}

/**
 * The ColumnManaged interface extends the Column interface with visibility property.
 * @interface
 * @property {boolean} [isVisible] - Flag indicating if the column is visible (optional).
 */
export interface ColumnManaged extends Column {
  isVisible?: boolean;
}

/**
 * The InputValues interface is a generic for a record where the key is a string and the value can be any type or undefined.
 * @interface
 * @template T - Any type that will be the type of the values in the record.
 */
export interface InputValues<T> {
  [key: string]: T | undefined;
}

/**
 * The SearchByProperty interface represents a record where the key is a string and the value is a string or undefined.
 * It's used for searching by property.
 * @interface
 */
export interface SearchByProperty {
  [key: string]: string | undefined;
}

/**
 * The SearchTerms interface represents a record where the key is a string and the value is a string.
 * It's used for storing search terms.
 * @interface
 */
export interface SearchTerms {
  [key: string]: string;
}

/**
 * The DataItem interface is a generic for a record where the key is a string and the value can be any type or undefined.
 * @interface
 * @template T - Any type that will be the type of the values in the record.
 */
export interface DataItem<T> {
  [key: string]: T | undefined;
}

/**
 * The Props interface represents the properties of the Table component.
 * @interface
 * @property {DataItem<T | undefined>[]} data - The data to be displayed in the table.
 * @property {Column[]} columns - The columns of the table.
 * @property {string} [background] - The background color of the table (optional).
 * @property {string} [color] - The color of the text in the table (optional).
 * @property {string} [hoverBackground] - The background color of the hovered rows in the table (optional).
 * @property {string} [selectedRowsBackground] - The background color of the selected rows in the table (optional).
 * @property {(filteredData: DataItem<T | undefined>[], columnsManaged: ColumnManaged[], headerProperty?: string) => React.ReactNode} [renderExportDataComponent] - A function to render a data export component (optional).
 * @property {boolean} [editRowColumnVisible] - Flag indicating if the edit row column is visible (optional).
 * @property {(id:number | string, e?: any) => void} [handleEditRow] - The function to handle row editing (optional).
 * @property {boolean} [archiveRowColumnVisible] - Flag indicating if the archive row column is visible (optional).
 * @property {(id:number | string, e?: any) => void} [handleArchiveRow] - The function to handle row archiving (optional).
 * @property {boolean} [deleteRowColumnVisible] - Flag indicating if the delete row column is visible (optional).
 * @property {(id: number | string, e?: any) => void} [handleDeleteRow] - The function to handle row deletion (optional).
 */
export interface TableProps<T> {
  data: DataItem<T | undefined>[]; // data to display
  columns: Column[]; // columns of table
  background?: string;
  color?: string;
  hoverBackground?: string;
  selectedRowsBackground?: string;
  renderExportDataComponent?: (
    filteredData: DataItem<T | undefined>[],
    columnsManaged: ColumnManaged[],
    headerProperty?: string,
  ) => React.ReactNode;
  editRowColumnVisible?: boolean;
  handleEditRow?: (id: number | string, e?: Event) => void;
  archiveRowColumnVisible?: boolean;
  handleArchiveRow?: (id: number | string, e?: Event) => void;
  deleteRowColumnVisible?: boolean;
  handleDeleteRow?: (id: number | string, e?: Event) => void;
  disableSelectRow?: boolean;
}

/**
 * `Table` is a functional component that renders a sortable, paginated, and filterable table.
 * 
 * This component provides the following features:
 * - Sorting by column
 * - Pagination
 * - Global filtering
 * - Filtering by columns
 * - Customizable visual properties, such as colors
 * - Optional row-based actions, such as editing, archiving and deletion
 * - Customizable row selection
 * - Support for exporting table data
 *
 * @template T The type of data for each row in the table.
 * 
 * @param {TableProps<T>} props The properties of the Table component.
 * @returns {ReactElement} A React element that represents the table.
 */
export function Table<T>({
  data,
  columns,
  background = '#677e11',
  color = 'white',
  hoverBackground = '#7e9b16',
  selectedRowsBackground = 'rgba(175 228 145 / 20%)',
  renderExportDataComponent,
  editRowColumnVisible,
  handleEditRow,
  archiveRowColumnVisible,
  handleArchiveRow,
  deleteRowColumnVisible,
  handleDeleteRow,
  disableSelectRow = false,
}: TableProps<T>): ReactElement {
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
  const [selectedRows, setSelectedRows] = useState<Set<T | undefined>>(
    new Set(),
  );
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);
  const [isIndeterminate, setIndeterminate] = useState(false);
  const selectAllRef = useRef<HTMLInputElement | null>(null);
  const [selectRowColumnVisible, setSelectRowColumnVisible] = useState(true);
  // style
  const style = {
    '--background-color': background,
    '--color': color,
    '--hover-background-color': hoverBackground,
    '--selected-background-color': selectedRowsBackground,
  } as React.CSSProperties;

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
  const handleColumnSort = (property: string, dateFormat: string): void => {
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
  const handleRowSelection = (id: T | undefined): void => {
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
    if (filteredData.length === 0) {
      setSelectAllChecked(false);
      setIndeterminate(false);
    } else if (selectedRows.size === filteredData.length) {
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

  const actionButtons = [
    {
      type: 'edit' as const,
      isVisible: editRowColumnVisible,
      handler: handleEditRow,
      icon: <FiEdit3 />,
    },
    {
      type: 'archive' as const,
      isVisible: archiveRowColumnVisible,
      handler: handleArchiveRow,
      icon: <FiArchive />,
    },
    {
      type: 'delete' as const,
      isVisible: deleteRowColumnVisible,
      handler: handleDeleteRow,
      icon: <RiDeleteBin6Line />,
    },
  ];

  const isAtLeastOneButtonVisible = actionButtons.some(
    (button) => button.isVisible && typeof button.handler === 'function',
  );

  let totalColumns = columnsManaged.reduce(
    (count, { isVisible }) => (isVisible ? count + 1 : count),
    0,
  );
  if (selectRowColumnVisible) {
    totalColumns += 1;
  }
  if (isAtLeastOneButtonVisible) {
    totalColumns += 1;
  }

  return (
    <div className="box_table box_tableAndFeatures">
      <SearchAndResetGlobal
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        handleResetSearch={handleResetSearch}
        style={style}
      />

      <div className="box_tableManaged scrollerTable">
        <ManageTable
          style={style}
          handlePerPageChange={handlePerPageChange}
          filteredData={filteredData}
          columnsManaged={columnsManaged}
          handleColumnVisibility={handleColumnVisibility}
          handleVisibleAllColumns={handleVisibleAllColumns}
          renderExportDataComponent={renderExportDataComponent}
          selectedRows={selectedRows}
          handleVisibleSelectRowsColumn={handleVisibleSelectRowsColumn}
          selectRowColumnVisible={selectRowColumnVisible}
          disableSelectRow={disableSelectRow}
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
              {!disableSelectRow && 
              selectRowColumnVisible && (
                <th className="thColor th_tableComponent box_inputSelectAllRows">
                  <input
                    id="selectAll"
                    type="checkbox"
                    data-role="checkbox-three-state"
                    data-caption="Checkbox"
                    checked={selectAllChecked}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSelectAll();
                      }
                    }}
                    onChange={handleSelectAll}
                    ref={selectAllRef}
                    className="inputSelectAllRows inputSelectRows customComponent"
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
                    style={style}
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
                    <TableHeaderCell
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
              {isAtLeastOneButtonVisible ? (
                <th className="thColor th_tableComponent">
                  <span>Action</span>
                </th>
              ) : null}
            </tr>
          </thead>

          <tbody className="tbody_tableComponent">
            {data === undefined || filteredData.length === 0 ? (
              <tr>
                <td colSpan={totalColumns} className="table_noData">
                  No data to display
                </td>
              </tr>
            ) : (
              currentData.map((item: DataItem<T | undefined>, index) => (
                <tr
                  key={index}
                  role="row"
                  className={`tr_${index} tr_tableComponent ${
                    selectedRows.has(item.id) ? 'selected' : ''
                  }`}
                  style={style}
                >
                  {!disableSelectRow && selectRowColumnVisible && (
                    <td className="box_inputSelectRow">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(item.id)}
                        className="inputSelectRows inputSelectRow customComponent"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowSelection(item.id);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleRowSelection(item.id);
                          }
                        }}
                        aria-checked={isRowSelected(item.id) ? 'true' : 'false'}
                        aria-label={`Select row with ${item[1]} and ${item[2]}`}
                        aria-labelledby={`row-${item.id}-label`}
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        onChange={() => {}}
                        style={style}
                        id={`selectRow-${item.id}`}
                        name={`selectRow-${item.id}`}
                      />
                      <label
                        htmlFor={`selectRow-${item.id}`}
                        className="sr-only"
                        id={`row-${item.id}-label`}
                      >
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
                          onClick={() => {if (!disableSelectRow)handleRowSelection(item.id);}}
                          onKeyDown={(e) => {
                            if (!disableSelectRow){
                            if (e.key === 'Enter') {
                              handleRowSelection(item.id);
                            }}
                          }}
                          // eslint-disable-next-line @typescript-eslint/no-empty-function
                          onChange={() => {}}
                          aria-label={`Select this row ${item[property]}`}
                        >
                          {formatDate(item[property])}
                        </td>
                      );
                    }
                    return null;
                  })}

                  {isAtLeastOneButtonVisible ? (
                    <td
                      role="cell"
                      className="td_tableComponent box_btnEditArchiveDelete"
                    >
                      {actionButtons.map(({ type, isVisible, handler, icon }) =>
                        isVisible && handler && item.id !== undefined ? (
                          <ActionButton
                            key={`${type}_btnAction`}
                            actionType={type}
                            visible={isVisible && !!handler}
                            handleAction={(itemId, e) => {
                              handler(itemId, e);
                            }}
                            itemId={item.id}
                            icons={{
                              [type]: icon,
                            }}
                          />
                        ) : null,
                      )}
                    </td>
                  ) : null}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="box_entriesAndPage">
        <EntriesInfo
          filteredDataLength={filteredData.length}
          dataLength={data.length}
          page={page}
          perPage={perPage}
        />
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

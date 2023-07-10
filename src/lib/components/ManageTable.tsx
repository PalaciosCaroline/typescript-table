import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import ManageColumns from './ManageColumns';
import RowsPerPage from './RowsPerPage';
import { ColumnManaged } from './Table';

/**
 * DataItem: A dictionary object containing data items in the table.
 * @template T - The type of data items in the table.
 * @param {T | undefined} [key: string] - A key-value pair representing the data item.
 */
interface DataItem<T> {
  [key: string]: T | undefined;
}

/**
 * ManageTableProps: The props passed to the ManageTable component.
 * @template T - The type of data items in the table.
 *
 * @param {React.CSSProperties} style - The CSS properties to be applied to the ManageTable component.
 * @param {Set<T | undefined>} selectedRows - A set of selected rows in the table.
 * @param {(optionValue: string) => void} handlePerPageChange - A function to handle changes in the per page option value.
 * @param {ColumnManaged[]} columnsManaged - An array of ColumnManaged objects representing the managed columns of the table.
 * @param {(property: string) => void} handleColumnVisibility - A function to handle the visibility of a column based on its property.
 * @param {() => void} handleVisibleAllColumns - A function to make all columns visible.
 * @param {DataItem<T | undefined>[]} filteredData - An array of DataItem objects representing the filtered data in the table.
 * @param {() => void} handleVisibleSelectRowsColumn - A function to handle the visibility of the select rows column.
 * @param {boolean} selectRowColumnVisible - A boolean indicating if the select row column is visible.
 * @param {(filteredData: DataItem<T | undefined>[], columnsManaged: ColumnManaged[], headerProperty?: string,) => React.ReactNode} [renderExportDataComponent] - A function to render a component for exporting data.
 */
export interface ManageTableProps<T> {
  style: React.CSSProperties;
  selectedRows: Set<T | undefined>;
  handlePerPageChange: (optionValue: string) => void;
  columnsManaged: ColumnManaged[];
  handleColumnVisibility: (property: string) => void;
  handleVisibleAllColumns: () => void;
  filteredData: DataItem<T | undefined>[];
  handleVisibleSelectRowsColumn: () => void;
  selectRowColumnVisible: boolean;
  disableSelectRow: boolean;
  renderExportDataComponent?: (
    filteredData: DataItem<T | undefined>[],
    columnsManaged: ColumnManaged[],
    headerProperty?: string,
  ) => React.ReactNode;
}

/**
 * ManageTable: A component for managing the elements of a table.
 *
 * @component
 * @template T - The type of data items in the table.
 * @param {ManageTableProps<T>} props - The props passed to the ManageTable component.
 * @returns {React.ReactElement} - Returns a React element representing the ManageTable component.
 */
const ManageTable = <T,>(props: ManageTableProps<T>): React.ReactElement => {
  // useState for managing the dropdown open state
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  // Toggles the dropdown to manage Table open
  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  // Retrieves the selected data based on the selected rows
  const getSelectedData = () => {
    if (props.selectedRows.size === 0) {
      return props.filteredData;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    else
      return props.filteredData.filter((item: any) =>
        props.selectedRows.has(item.id),
      );
  };

  const selectedData = getSelectedData();

  return (
    <div
      className={`box-manageFeatearesTable ${
        isDropDownOpen ? 'box-manageFeatearesOpen' : ''
      } ${
        props.selectRowColumnVisible
          ? 'styleWithSelectColumn'
          : 'styleWithoutSelectColumn'
      }`}
    >
      {/* Toggle button for managing the table */}
      <button
        className={`toggle-btnManageTable ${
          isDropDownOpen ? 'btnOpenManageTable' : ''
        } customComponent`}
        style={props.style}
        onClick={toggleDropDown}
        aria-label="manage Table"
        data-testid="manageTable"
      >
        <div className="icon-container">
          <FaTimes className={`icon ${isDropDownOpen ? 'show' : 'hide'}`} />
          <FaEllipsisH
            className={`icon ${!isDropDownOpen ? 'show' : 'hide'}`}
          />
        </div>
      </button>
      {/* Dropdown content for managing the table */}
      {isDropDownOpen && (
        <div
          className={`manageTable-dropdown ${
            isDropDownOpen ? 'box-manageFeatearesOpen' : ''
          }`}
        >
          <ul className="manageTable-dropdownUl">
            {/* Render export data component */}
            {props.renderExportDataComponent && (
              <li className="manageTable-dropdownLi">
                {props.renderExportDataComponent(
                  selectedData,
                  props.columnsManaged,
                )}
              </li>
            )}
            {/* Rows per page dropdown */}
            <li className="manageTable-dropdownLi">
              <RowsPerPage
                handlePerPageChange={props.handlePerPageChange}
                style={props.style}
              />
            </li>
            {/* Manage columns component */}
            <li className="manageTable-dropdownLi li_manageColumns">
              <ManageColumns
                style={props.style}
                columns={props.columnsManaged}
                handleColumnVisibility={props.handleColumnVisibility}
                handleVisibleAllColumns={props.handleVisibleAllColumns}
                handleVisibleSelectRowsColumn={
                  props.handleVisibleSelectRowsColumn
                }
                selectRowColumnVisible={props.selectRowColumnVisible}
                disableSelectRow={props.disableSelectRow}
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ManageTable;

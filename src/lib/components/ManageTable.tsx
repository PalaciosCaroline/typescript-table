import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import ManageColumns from './ManageColumns';
import RowsPerPage from './RowsPerPage';
import { ColumnManaged } from './Table';

interface DataItem<T> {
  [key: string]: T | undefined;
}

interface ManageTableProps<T> {
  selectedRows: Set<T | undefined>;
  handlePerPageChange: (optionValue: string) => void;
  columnsManaged: ColumnManaged[];
  handleColumnVisibility: (property: string) => void;
  handleVisibleAllColumns: () => void;
  filteredData: DataItem<T | undefined>[];
  handleVisibleSelectRowsColumn: () => void;
  selectRowColumnVisible:boolean;
  renderExportDataComponent?: (
    filteredData: DataItem<T | undefined>[],
    columnsManaged: ColumnManaged[],
    headerProperty?: string
  ) => React.ReactNode;
}

/**
 * Component for managing a table.
 *
 * @component
 * @template T - The type of data items in the table.
 * @param {ManageTableProps<T>} props - The props for the ManageTable component.
 * @returns {React.ReactElement} The rendered ManageTable component.
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
    if(props.selectedRows.size === 0){
      return props.filteredData;
    } else 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return props.filteredData.filter((item: any) => props.selectedRows.has(item.id));
  };

  const selectedData = getSelectedData();

  return (
    <div
      className={`box-manageFeatearesTable ${
        isDropDownOpen ? 'box-manageFeatearesOpen' : ''
      } ${props.selectRowColumnVisible ? 'styleWithSelectColumn' : 'styleWithoutSelectColumn' }`}
    >
      {/* Toggle button for managing the table */}
      <button
        className={`toggle-btnManageTable ${
          isDropDownOpen ? 'btnOpenManageTable' : ''
        }`}
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
              <RowsPerPage handlePerPageChange={props.handlePerPageChange} />
            </li>
             {/* Manage columns component */}
            <li className="manageTable-dropdownLi li_manageColumns">
              <ManageColumns
                columns={props.columnsManaged}
                handleColumnVisibility={props.handleColumnVisibility}
                handleVisibleAllColumns={props.handleVisibleAllColumns}
                handleVisibleSelectRowsColumn={props.handleVisibleSelectRowsColumn}
                selectRowColumnVisible={props.selectRowColumnVisible}
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ManageTable;

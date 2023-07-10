import React, { useState } from 'react';
import Modal from './Modal';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { ColumnManaged } from './Table';

/**
 * ManageColumnsProps: The props passed to the ManageColumns component.
 *
 * @param {ColumnManaged[]} columns - An array of ColumnManaged objects representing the columns of the table.
 * @param {(property: string) => void} handleColumnVisibility - A function to handle the visibility of a column based on its property.
 * @param {() => void} handleVisibleAllColumns - A function to make all columns visible.
 * @param {() => void} handleVisibleSelectRowsColumn - A function to handle the visibility of the select rows column.
 * @param {boolean} selectRowColumnVisible - A boolean indicating if the select row column is visible.
 * @param {React.CSSProperties} style - The CSS properties to be applied to the ManageColumns component.
 */
export interface ManageColumnsProps {
  columns: ColumnManaged[];
  handleColumnVisibility: (property: string) => void;
  handleVisibleAllColumns: () => void;
  handleVisibleSelectRowsColumn: () => void;
  selectRowColumnVisible: boolean;
  style: React.CSSProperties;
  disableSelectRow: boolean;
}

/**
/**
 * ManageColumns: A component for managing the visibility of columns in a table.
 * 
 * @param {ManageColumnsProps} props - The props passed to the ManageColumns component.
 * 
 * @returns {JSX.Element} - Returns a JSX element representing the ManageColumns component.
 */
function ManageColumns(props: ManageColumnsProps): JSX.Element {
  const [isModalColumnsOpen, setIsModalColumnsOpen] = useState<boolean>(false);

  return (
    <>
      {/* Toggle button for managing columns */}
      <button
        className={`toggle-btnManagedColumns customComponent ${
          isModalColumnsOpen ? 'btnOpen' : ''
        }`}
        onClick={() => setIsModalColumnsOpen(!isModalColumnsOpen)}
        aria-label="managed columns"
        style={props.style}
      >
        <span className={isModalColumnsOpen ? 'btnManagedColumnsOpen' : ''}>
          Manage Columns
        </span>
        {!isModalColumnsOpen ? <FiChevronDown /> : <FiChevronUp />}
      </button>
      {/* Modal for managing columns */}
      <Modal
        isModalTableOpen={isModalColumnsOpen}
        onClose={() => setIsModalColumnsOpen(false)}
        style={props.style}
      >
        {/* Button for showing all columns */}
        <button
          className="btnShowAllColumns customComponent"
          onClick={props.handleVisibleAllColumns}
          data-testid="btnVisibleColumn"
          style={props.style}
        >
          <span className="btnShowSpan">Show All Columns</span>
        </button>
        {/* List of columns */}
        <ul className="columns-list">
          {/* Select Rows Column */}
          {!props.disableSelectRow && (
            <li
              key="selectRowsColumn"
              className="liManagedColumns"
              data-testid={`li-selectRows`}
            >
              <div className="toggle-switch">
                <input
                  id="toggle-input-allColumnVisible"
                  name="toggle-input-allColumnVisible"
                  className="toggle-input"
                  type="checkbox"
                  checked={props.selectRowColumnVisible}
                  onChange={props.handleVisibleSelectRowsColumn}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      props.handleVisibleSelectRowsColumn();
                    }
                  }}
                  data-testid="inputManaged-selectRowColumn"
                />
                <label
                  className="toggle-label"
                  htmlFor="toggle-input-allColumnVisible"
                />
              </div>
              Select Rows Column
            </li>
          )}
          {/* Columns by label of the table */}
          {props.columns.map(({ label, property, isVisible }) => (
            <li
              key={property}
              className="liManagedColumns"
              data-testid={`li-${property}`}
            >
              <div className="toggle-switch">
                <input
                  id={`toggle-input-${property}`}
                  name={`toggle-input-${property}`}
                  className="toggle-input"
                  type="checkbox"
                  checked={isVisible}
                  onChange={() => props.handleColumnVisibility(property)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      props.handleColumnVisibility(property);
                    }
                  }}
                  data-testid={`inputManaged-${property}`}
                />
                <label
                  className="toggle-label"
                  htmlFor={`toggle-input-${property}`}
                />
              </div>
              {label}
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
}

export default ManageColumns;

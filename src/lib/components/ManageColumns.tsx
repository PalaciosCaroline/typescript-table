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
interface ManageColumnsProps {
  columns: ColumnManaged[];
  handleColumnVisibility: (property: string) => void;
  handleVisibleAllColumns: () => void;
  handleVisibleSelectRowsColumn: () => void;
  selectRowColumnVisible: boolean;
  style: React.CSSProperties;
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Handles keydown event for column visibility toggle
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    property: string,
  ): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      props.handleColumnVisibility(property);
    }
  };

  // Handles keydown event for select rows column visibility toggle
  const handleKeyDownSelect = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      props.handleVisibleSelectRowsColumn();
    }
  };

  return (
    <>
     {/* Toggle button for managing columns */}
      <button
        className={`toggle-btnManagedColumns customComponent ${isModalOpen ? 'btnOpen' : ''}`}
        onClick={() => setIsModalOpen(!isModalOpen)}
        aria-label="managed columns"
        style={props.style}
      >
        <span className={isModalOpen ? 'btnManagedColumnsOpen' : ''}>
          Manage Columns
        </span>
        {!isModalOpen ? <FiChevronDown /> : <FiChevronUp />}
      </button>
      {/* Modal for managing columns */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} style={props.style}>
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
          <li
            key="selectRowsColumn"
            className="liManagedColumns"
            data-testid={`li-selectRows`}
          >
            <div className="toggle-switch">
              <input
                className="toggle-input"
                type="checkbox"
                checked={props.selectRowColumnVisible}
                onChange={props.handleVisibleSelectRowsColumn}
                onKeyDown={(e) => handleKeyDownSelect(e)}
                data-testid="inputManaged-selectRowColumn"
              />
              <label className="toggle-label" />
            </div>
            Select Rows Column
          </li>
          {/* Columns by label of the table */}
          {props.columns.map(({ label, property, isVisible }) => (
            <li
              key={property}
              className="liManagedColumns"
              data-testid={`li-${property}`}
            >
              <div className="toggle-switch">
                <input
                  className="toggle-input"
                  type="checkbox"
                  checked={isVisible}
                  onChange={() => props.handleColumnVisibility(property)}
                  onKeyDown={(e) => handleKeyDown(e, property)}
                  data-testid={`inputManaged-${property}`}
                />
                <label className="toggle-label" />
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

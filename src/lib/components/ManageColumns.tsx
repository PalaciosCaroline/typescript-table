import React, { useState } from 'react';
import Modal from './Modal';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

interface Column {
  label: string;
  property: string;
  isVisible: boolean;
}

interface ManageColumnsProps {
  columns: Column[];
  handleColumnVisibility: (property: string) => void;
  handleVisibleAllColumns: () => void;
  handleVisibleSelectRowsColumn: () => void;
  selectRowColumnVisible:boolean
}

function ManageColumns(props: ManageColumnsProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    property: string,
  ): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      props.handleColumnVisibility(property);
    }
  };

  const handleKeyDownSelect = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      props.handleVisibleSelectRowsColumn();
    }
  };

  return (
    <>
      <button
        className={`toggle-btnManagedColumns ${isModalOpen ? 'btnOpen' : ''}`}
        onClick={() => setIsModalOpen(!isModalOpen)}
        aria-label="managed columns"
      >
        <span className={isModalOpen ? 'btnManagedColumnsOpen' : ''}>
          Manage Columns
        </span>
        {!isModalOpen ? <FiChevronDown /> : <FiChevronUp />}
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <button
          className="btnShowAllColumns"
          onClick={props.handleVisibleAllColumns}
          data-testid="btnVisibleColumn"
        >
          <span className="btnShowSpan">Show All Columns</span>
        </button>
        <ul className="columns-list">
            <li
              key='selectRowsColumn'
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
                  data-testid='inputManaged-selectRowColumn'
                />
                <label className="toggle-label" />
              </div>
              Select Rows Column
              </li>
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

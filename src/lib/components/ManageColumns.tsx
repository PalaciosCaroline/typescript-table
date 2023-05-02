import React, { useState } from 'react';
import Modal from './Modal';
import { FaEllipsisH } from 'react-icons/fa';

interface Column {
    label: string;
    property: string;
    isVisible: boolean;
}

interface ManageColumnsProps {
    columns: Column[];
    handleColumnVisibility: (property: string) => void;
    handleVisibleAllColumns: () => void;
}

function ManageColumns(props: ManageColumnsProps): JSX.Element {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
 
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, property: string): void => {
        if (e.key === 'Enter') {
            e.preventDefault();
            props.handleColumnVisibility(property);
        }
    };

    return (
        <>
            <button
                className={`toggle-btnManagedColumns ${isModalOpen ? 'btnOpen' : ''}`}
                onClick={() => setIsModalOpen(!isModalOpen)}
                aria-label="managed columns"
            >
                <FaEllipsisH />
                <p className={isModalOpen ? 'btnManagedColumnsOpen' : ''}>Manage Columns</p>
            </button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <button className="btnShowAllColumns" onClick={props.handleVisibleAllColumns} data-testId="btnVisibleColumn">
                    Show All Columns
                </button>
                <ul className="columns-list">
                    {props.columns.map(({ label, property, isVisible }) => (
                        <li key={property} style={{ display: 'flex', width: '200px', justifyContent: 'flex-start' }} data-testid={`li-${property}`}>
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

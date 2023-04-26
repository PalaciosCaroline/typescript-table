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

    const handleToggleModal = (): void => {
        setIsModalOpen(!isModalOpen);
    };

    const handleCloseModal = (): void => {
        setIsModalOpen(false);
    };

    return (
    <>
        <button className={`toggle-btnManagedColumns ${isModalOpen? 'btnOpen' : ''}`} onClick={handleToggleModal} aria-label="managed columns">
            <FaEllipsisH />
            <p className={isModalOpen? 'btnManagedColumnsOpen' : ''}>Manage Columns</p> 
        </button>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <button className="btnShowAllColumns" onClick={props.handleVisibleAllColumns}>
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
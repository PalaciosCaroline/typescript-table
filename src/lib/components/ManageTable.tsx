
import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import ManageColumns from './ManageColumns';
import RowsPerPage from './RowsPerPage';


interface DataItem<T> {
    [key: string]: T | undefined;
}

interface ManageTableProps<T> {
    handlePerPageChange: (optionValue: string) => void;
    // defaultValueSelectedOption: number;
    columnsManaged: Column[];
    handleColumnVisibility: (property: string) => void;
    handleVisibleAllColumns: () => void;
    filteredData: DataItem<T | undefined>[];
}

interface Column {
    label: string;
    property: string;
    isVisible: boolean;
    dateFormat?: string;
    disableSort?: boolean;
    disableFilter?: boolean;
}

const ManageTable = <T,>(props: ManageTableProps<T>): React.ReactElement => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    const toggleDropDown = () => {
        setIsDropDownOpen(!isDropDownOpen);
    };

    return (
        <div className={`box-manageFeatearesTable ${isDropDownOpen ? 'box-manageFeatearesOpen' : ''}`}>
            <button
                className={`toggle-btnManageTable ${isDropDownOpen ? 'btnOpenManageTable' : ''}`}
                onClick={toggleDropDown}
                aria-label="manage Table"
                data-testid="manageTable"
            >
            <div className="icon-container" >  
      <FaTimes className={`icon ${isDropDownOpen ? 'show' : 'hide'}`} />
      <FaEllipsisH className={`icon ${!isDropDownOpen ? 'show' : 'hide'}`} />
      </div> 
          
            </button>
            {isDropDownOpen && (
                <div className={`manageTable-dropdown ${isDropDownOpen ? 'box-manageFeatearesOpen' : ''}`}>
                    <ul className="manageTable-dropdownUl">
                        {/* {props.renderExportDataComponent && 
                            <li className="manageTable-dropdownLi">
                                {props.renderExportDataComponent(props.filteredData, props.columnsManaged)}
                            </li>
                        } */}
                        <li className="manageTable-dropdownLi">
                            <RowsPerPage
                                handlePerPageChange={props.handlePerPageChange}
                                // defaultValueSelectedOption={props.defaultValueSelectedOption}
                            />
                        </li>
                        <li className="manageTable-dropdownLi li_manageColumns">
                            <ManageColumns
                                columns={props.columnsManaged}
                                handleColumnVisibility={props.handleColumnVisibility}
                                handleVisibleAllColumns={props.handleVisibleAllColumns}
                            />
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ManageTable;

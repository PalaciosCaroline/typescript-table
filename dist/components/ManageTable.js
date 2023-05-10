var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import ManageColumns from './ManageColumns';
import RowsPerPage from './RowsPerPage';
var ManageTable = function (props) {
    var _a = useState(false), isDropDownOpen = _a[0], setIsDropDownOpen = _a[1];
    var toggleDropDown = function () {
        setIsDropDownOpen(!isDropDownOpen);
    };
    return (_jsxs("div", __assign({ className: "box-manageFeatearesTable ".concat(isDropDownOpen ? 'box-manageFeatearesOpen' : '') }, { children: [_jsx("button", __assign({ className: "toggle-btnManageTable ".concat(isDropDownOpen ? 'btnOpenManageTable' : ''), onClick: toggleDropDown, "aria-label": "manage Table", "data-testid": "manageTable" }, { children: _jsxs("div", __assign({ className: "icon-container" }, { children: [_jsx(FaTimes, { className: "icon ".concat(isDropDownOpen ? 'show' : 'hide') }), _jsx(FaEllipsisH, { className: "icon ".concat(!isDropDownOpen ? 'show' : 'hide') })] })) })), isDropDownOpen && (_jsx("div", __assign({ className: "manageTable-dropdown ".concat(isDropDownOpen ? 'box-manageFeatearesOpen' : '') }, { children: _jsxs("ul", __assign({ className: "manageTable-dropdownUl" }, { children: [props.renderExportDataComponent && (_jsx("li", __assign({ className: "manageTable-dropdownLi" }, { children: props.renderExportDataComponent(props.filteredData, props.columnsManaged) }))), _jsx("li", __assign({ className: "manageTable-dropdownLi" }, { children: _jsx(RowsPerPage, { handlePerPageChange: props.handlePerPageChange }) })), _jsx("li", __assign({ className: "manageTable-dropdownLi li_manageColumns" }, { children: _jsx(ManageColumns, { columns: props.columnsManaged, handleColumnVisibility: props.handleColumnVisibility, handleVisibleAllColumns: props.handleVisibleAllColumns }) }))] })) })))] })));
};
export default ManageTable;

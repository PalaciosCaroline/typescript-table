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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import Modal from './Modal';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
/**
/**
 * ManageColumns: A component for managing the visibility of columns in a table.
 *
 * @param {ManageColumnsProps} props - The props passed to the ManageColumns component.
 *
 * @returns {JSX.Element} - Returns a JSX element representing the ManageColumns component.
 */
function ManageColumns(props) {
    var _a = useState(false), isModalOpen = _a[0], setIsModalOpen = _a[1];
    // Handles keydown event for column visibility toggle
    var handleKeyDown = function (e, property) {
        if (e.key === 'Enter') {
            e.preventDefault();
            props.handleColumnVisibility(property);
        }
    };
    // Handles keydown event for select rows column visibility toggle
    var handleKeyDownSelect = function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            props.handleVisibleSelectRowsColumn();
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("button", __assign({ className: "toggle-btnManagedColumns customComponent ".concat(isModalOpen ? 'btnOpen' : ''), onClick: function () { return setIsModalOpen(!isModalOpen); }, "aria-label": "managed columns", style: props.style }, { children: [_jsx("span", __assign({ className: isModalOpen ? 'btnManagedColumnsOpen' : '' }, { children: "Manage Columns" })), !isModalOpen ? _jsx(FiChevronDown, {}) : _jsx(FiChevronUp, {})] })), _jsxs(Modal, __assign({ isOpen: isModalOpen, onClose: function () { return setIsModalOpen(false); }, style: props.style }, { children: [_jsx("button", __assign({ className: "btnShowAllColumns customComponent", onClick: props.handleVisibleAllColumns, "data-testid": "btnVisibleColumn", style: props.style }, { children: _jsx("span", __assign({ className: "btnShowSpan" }, { children: "Show All Columns" })) })), _jsxs("ul", __assign({ className: "columns-list" }, { children: [_jsxs("li", __assign({ className: "liManagedColumns", "data-testid": "li-selectRows" }, { children: [_jsxs("div", __assign({ className: "toggle-switch" }, { children: [_jsx("input", { className: "toggle-input", type: "checkbox", checked: props.selectRowColumnVisible, onChange: props.handleVisibleSelectRowsColumn, onKeyDown: function (e) { return handleKeyDownSelect(e); }, "data-testid": "inputManaged-selectRowColumn" }), _jsx("label", { className: "toggle-label" })] })), "Select Rows Column"] }), "selectRowsColumn"), props.columns.map(function (_a) {
                                var label = _a.label, property = _a.property, isVisible = _a.isVisible;
                                return (_jsxs("li", __assign({ className: "liManagedColumns", "data-testid": "li-".concat(property) }, { children: [_jsxs("div", __assign({ className: "toggle-switch" }, { children: [_jsx("input", { className: "toggle-input", type: "checkbox", checked: isVisible, onChange: function () { return props.handleColumnVisibility(property); }, onKeyDown: function (e) { return handleKeyDown(e, property); }, "data-testid": "inputManaged-".concat(property) }), _jsx("label", { className: "toggle-label" })] })), label] }), property));
                            })] }))] }))] }));
}
export default ManageColumns;

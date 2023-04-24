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
import { FaEllipsisH } from 'react-icons/fa';
function ManageColumns(props) {
    var _a = useState(false), isModalOpen = _a[0], setIsModalOpen = _a[1];
    var handleToggleModal = function () {
        setIsModalOpen(!isModalOpen);
    };
    var handleCloseModal = function () {
        setIsModalOpen(false);
    };
    return (_jsxs(_Fragment, { children: [_jsxs("button", __assign({ className: "toggle-btnManagedColumns ".concat(isModalOpen ? 'btnOpen' : ''), onClick: handleToggleModal }, { children: [_jsx(FaEllipsisH, {}), _jsx("p", __assign({ className: isModalOpen ? 'btnManagedColumnsOpen' : '' }, { children: "Manage Columns" }))] })), _jsxs(Modal, __assign({ isOpen: isModalOpen, onClose: handleCloseModal }, { children: [_jsx("button", __assign({ className: "btnShowAllColumns", onClick: props.handleVisibleAllColumns }, { children: "Show All Columns" })), _jsx("ul", __assign({ className: "columns-list" }, { children: props.columns.map(function (_a) {
                            var label = _a.label, property = _a.property, isVisible = _a.isVisible;
                            return (_jsxs("li", __assign({ style: { display: 'flex', width: '200px', justifyContent: 'flex-start' }, "data-testid": "li-".concat(property) }, { children: [_jsxs("div", __assign({ className: "toggle-switch" }, { children: [_jsx("input", { className: "toggle-input", type: "checkbox", checked: isVisible, onChange: function () { return props.handleColumnVisibility(property); }, "data-testid": "inputManaged-".concat(property) }), _jsx("label", { className: "toggle-label" })] })), label] }), property));
                        }) }))] }))] }));
}
export default ManageColumns;

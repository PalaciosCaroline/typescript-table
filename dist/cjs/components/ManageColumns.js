"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var Modal_1 = __importDefault(require("./Modal"));
var fa_1 = require("react-icons/fa");
function ManageColumns(props) {
    var _a = (0, react_1.useState)(false), isModalOpen = _a[0], setIsModalOpen = _a[1];
    var handleToggleModal = function () {
        setIsModalOpen(!isModalOpen);
    };
    var handleCloseModal = function () {
        setIsModalOpen(false);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("button", __assign({ className: "toggle-btnManagedColumns ".concat(isModalOpen ? 'btnOpen' : ''), onClick: handleToggleModal }, { children: [(0, jsx_runtime_1.jsx)(fa_1.FaEllipsisH, {}), (0, jsx_runtime_1.jsx)("p", __assign({ className: isModalOpen ? 'btnManagedColumnsOpen' : '' }, { children: "Manage Columns" }))] })), (0, jsx_runtime_1.jsxs)(Modal_1.default, __assign({ isOpen: isModalOpen, onClose: handleCloseModal }, { children: [(0, jsx_runtime_1.jsx)("button", __assign({ className: "btnShowAllColumns", onClick: props.handleVisibleAllColumns }, { children: "Show All Columns" })), (0, jsx_runtime_1.jsx)("ul", __assign({ className: "columns-list" }, { children: props.columns.map(function (_a) {
                            var label = _a.label, property = _a.property, isVisible = _a.isVisible;
                            return ((0, jsx_runtime_1.jsxs)("li", __assign({ style: { display: 'flex', width: '200px', justifyContent: 'flex-start' }, "data-testid": "li-".concat(property) }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "toggle-switch" }, { children: [(0, jsx_runtime_1.jsx)("input", { className: "toggle-input", type: "checkbox", checked: isVisible, onChange: function () { return props.handleColumnVisibility(property); }, "data-testid": "inputManaged-".concat(property) }), (0, jsx_runtime_1.jsx)("label", { className: "toggle-label" })] })), label] }), property));
                        }) }))] }))] }));
}
exports.default = ManageColumns;

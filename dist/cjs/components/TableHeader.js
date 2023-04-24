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
var fa_1 = require("react-icons/fa");
var SearchDropdown_1 = __importDefault(require("./SearchDropdown"));
var TableHeader = function (_a) {
    var columnData = _a.columnData, inputValues = _a.inputValues, handleSearchByProperty = _a.handleSearchByProperty, handleSort = _a.handleSort, sortOrder = _a.sortOrder, handleReset = _a.handleReset, sortKey = _a.sortKey;
    return ((0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsx)("tr", { children: columnData.map(function (_a) {
                var label = _a.label, property = _a.property, isVisible = _a.isVisible;
                if (isVisible) {
                    var isSortKey = sortKey === property;
                    return ((0, jsx_runtime_1.jsx)("th", __assign({ style: { position: 'relative' }, className: "th_".concat(property, " thColor") }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ style: { display: 'flex', alignItems: 'center' } }, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ className: 'label' }, { children: label })), (!isSortKey || (isSortKey && sortOrder === "noSort")) && ((0, jsx_runtime_1.jsx)("button", __assign({ onClick: function () { return handleSort(property); }, className: "btnSort" }, { children: (0, jsx_runtime_1.jsx)(fa_1.FaSort, {}) }))), isSortKey && sortOrder === "asc" && ((0, jsx_runtime_1.jsx)("button", __assign({ onClick: function () { return handleSort(property); }, className: sortKey === property ? "btnSort selectedBtnSort" : "btnSort" }, { children: (0, jsx_runtime_1.jsx)(fa_1.FaSortUp, {}) }))), isSortKey && sortOrder === "desc" && ((0, jsx_runtime_1.jsx)("button", __assign({ onClick: function () { return handleSort(property); }, className: sortKey === property ? "selectedBtnSort btnSort" : "btnSort" }, { children: (0, jsx_runtime_1.jsx)(fa_1.FaSortDown, {}) }))), (0, jsx_runtime_1.jsx)(SearchDropdown_1.default, { inputValues: inputValues, property: property, handleSearchByProperty: handleSearchByProperty, handleReset: handleReset })] })) }), property));
                }
            }) }) }));
};
exports.default = TableHeader;

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
import { FaSortDown, FaSortUp, FaSort } from 'react-icons/fa';
import SearchDropdown from './SearchDropdown';
var TableHeader = function (_a) {
    var columnData = _a.columnData, inputValues = _a.inputValues, handleSearchByProperty = _a.handleSearchByProperty, handleSort = _a.handleSort, sortOrder = _a.sortOrder, handleReset = _a.handleReset, sortKey = _a.sortKey;
    return (_jsx("thead", { children: _jsx("tr", { children: columnData.map(function (_a) {
                var label = _a.label, property = _a.property, isVisible = _a.isVisible;
                if (isVisible) {
                    var isSortKey = sortKey === property;
                    return (_jsx("th", __assign({ style: { position: 'relative' }, className: "th_".concat(property, " thColor") }, { children: _jsxs("div", __assign({ style: { display: 'flex', alignItems: 'center' } }, { children: [_jsx("p", __assign({ className: 'label' }, { children: label })), (!isSortKey || (isSortKey && sortOrder === "noSort")) && (_jsx("button", __assign({ onClick: function () { return handleSort(property); }, className: "btnSort" }, { children: _jsx(FaSort, {}) }))), isSortKey && sortOrder === "asc" && (_jsx("button", __assign({ onClick: function () { return handleSort(property); }, className: sortKey === property ? "btnSort selectedBtnSort" : "btnSort" }, { children: _jsx(FaSortUp, {}) }))), isSortKey && sortOrder === "desc" && (_jsx("button", __assign({ onClick: function () { return handleSort(property); }, className: sortKey === property ? "selectedBtnSort btnSort" : "btnSort" }, { children: _jsx(FaSortDown, {}) }))), _jsx(SearchDropdown, { inputValues: inputValues, property: property, handleSearchByProperty: handleSearchByProperty, handleReset: handleReset })] })) }), property));
                }
            }) }) }));
};
export default TableHeader;

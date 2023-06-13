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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
/**
 * Component for the sort button.
 *
 * @component
 * @param {SortButtonProps} props - The props for the SortButton component.
 * @returns {React.ReactElement} The rendered SortButton component.
 */
var SortButton = function (_a) {
    var isSortKey = _a.isSortKey, sortOrder = _a.sortOrder, property = _a.property, handleColumnSort = _a.handleColumnSort, dateFormat = _a.dateFormat;
    /**
    * Renders the sort button.
    *
    * @param {React.ReactNode} icon - The icon for the sort button.
    * @param {string} label - The label for the sort button.
    * @param {string} testIdSuffix - The test ID suffix for the sort button.
    * @returns {React.ReactElement} The rendered sort button.
    */
    var renderSortButton = function (icon, label, testIdSuffix) { return (_jsx("button", __assign({ onClick: function () { return handleColumnSort(property, dateFormat); }, className: "btnSort btnSort_tableComponent ".concat(isSortKey && sortOrder != 'noSort' ? ' selectedBtnSort' : ''), "aria-label": label, "data-testid": "btnSort".concat(testIdSuffix, "-").concat(property) }, { children: icon }))); };
    return (_jsxs(_Fragment, { children: [(!isSortKey || (isSortKey && sortOrder === 'noSort')) &&
                renderSortButton(_jsx(FaSort, {}), 'no sorted, change by ascendant', 'ByAsc'), isSortKey &&
                sortOrder === 'asc' &&
                renderSortButton(_jsx(FaSortUp, {}), 'sorted by ascendant, change by descendant', 'byDesc'), isSortKey &&
                sortOrder === 'desc' &&
                renderSortButton(_jsx(FaSortDown, {}), 'sorted by descendant, change by no sorted', 'byNoSort')] }));
};
export default SortButton;

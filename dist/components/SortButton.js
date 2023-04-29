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
var SortButton = function (_a) {
    var isSortKey = _a.isSortKey, sortOrder = _a.sortOrder, property = _a.property, handleSort = _a.handleSort, usaDate = _a.usaDate;
    var renderSortButton = function (icon, label, testIdSuffix) { return (_jsx("button", __assign({ onClick: function () { return handleSort(property, usaDate); }, className: "btnSort ".concat((isSortKey && sortOrder != 'noSort') ? " selectedBtnSort" : ""), "aria-label": label, "data-testid": "btnSort".concat(testIdSuffix, "-").concat(property) }, { children: icon }))); };
    return (_jsxs(_Fragment, { children: [(!isSortKey || (isSortKey && sortOrder === "noSort")) && renderSortButton(_jsx(FaSort, {}), "no sorted, change by ascendant", "ByAsc"), isSortKey && sortOrder === "asc" && renderSortButton(_jsx(FaSortUp, {}), "sorted by ascendant, change by descendant", "byDesc"), isSortKey && sortOrder === "desc" && renderSortButton(_jsx(FaSortDown, {}), "sorted by descendant, change by no sorted", "byNoSort")] }));
};
export default SortButton;

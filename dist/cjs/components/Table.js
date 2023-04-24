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
// import TableHeader from './TableHeader';
var fa_1 = require("react-icons/fa");
var SearchDropdown_1 = __importDefault(require("./SearchDropdown"));
// import TableBody from './TableBody';
var fa_2 = require("react-icons/fa");
var sortDates_1 = require("./../utils/sortDates");
var filterData_1 = __importDefault(require("../utils/filterData"));
var Pagination_1 = __importDefault(require("./Pagination"));
require("./../styles/table.css");
var Dropdown_1 = __importDefault(require("./Dropdown"));
var ManageColumns_1 = __importDefault(require("./ManageColumns"));
function Table(_a) {
    var data = _a.data, columns = _a.columns;
    var _b = (0, react_1.useState)(null), sortKey = _b[0], setSortKey = _b[1];
    var _c = (0, react_1.useState)('noSort'), sortOrder = _c[0], setSortOrder = _c[1];
    var _d = (0, react_1.useState)(1), page = _d[0], setPage = _d[1];
    var defaultValueSelectedOption = 10;
    var _e = (0, react_1.useState)(defaultValueSelectedOption), perPage = _e[0], setPerPage = _e[1];
    var _f = (0, react_1.useState)(0), totalPages = _f[0], setTotalPages = _f[1];
    var _g = (0, react_1.useState)([]), sortedData = _g[0], setSortedData = _g[1];
    var _h = (0, react_1.useState)(''), searchTerm = _h[0], setSearchTerm = _h[1];
    var _j = (0, react_1.useState)({}), searchTerms = _j[0], setSearchTerms = _j[1];
    var initialInputValues = {};
    columns.forEach(function (_a) {
        var property = _a.property;
        initialInputValues[property] = '';
    });
    var _k = (0, react_1.useState)(initialInputValues), inputValues = _k[0], setInputValues = _k[1];
    (0, react_1.useEffect)(function () {
        setSortedData((0, sortDates_1.customSort)(data, sortKey, sortOrder));
    }, [data, sortKey, sortOrder]);
    var handleSort = function (property) {
        if (sortKey === property) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? 'noSort' : 'asc');
        }
        else {
            setSortKey(property);
            setSortOrder('asc');
        }
    };
    var filteredData = (0, filterData_1.default)(sortedData, searchTerm, searchTerms);
    (0, react_1.useEffect)(function () {
        var newTotalPages = filteredData.length > perPage ? Math.ceil(filteredData.length / perPage) : 1;
        setTotalPages(newTotalPages);
        setPage(function (prevPage) {
            if (prevPage >= newTotalPages) {
                return newTotalPages;
            }
            return prevPage;
        });
    }, [filteredData, perPage]);
    var handlePerPageChange = function (optionValue) {
        if (optionValue === 'All') {
            setPerPage(filteredData.length);
        }
        else {
            setPerPage(parseInt(optionValue));
        }
    };
    var handlePageChange = function (newPage) {
        setPage(newPage);
    };
    var handleSearch = function (event) {
        setSearchTerm(event.target.value);
    };
    var handleSearchByProperty = function (property, value) {
        var _a, _b;
        setInputValues(__assign(__assign({}, inputValues), (_a = {}, _a[property] = value, _a)));
        setSearchTerms(__assign(__assign({}, searchTerms), (_b = {}, _b[property] = value, _b)));
    };
    var handleReset = function (property) {
        setSearchTerms(function (prevSearchTerms) {
            var _a;
            return (__assign(__assign({}, prevSearchTerms), (_a = {}, _a[property] = '', _a)));
        });
        setInputValues(function (prevInputValues) {
            var _a;
            return (__assign(__assign({}, prevInputValues), (_a = {}, _a[property] = '', _a)));
        });
    };
    var handleResetSearch = function () {
        setSearchTerm('');
        setSearchTerms({});
        setInputValues(initialInputValues);
    };
    var handleColumnVisibility = function (property) {
        setColumnsManaged(function (prevColumns) {
            var columnToToggle = prevColumns.find(function (column) { return column.property === property; });
            if (columnToToggle) {
                return prevColumns.map(function (column) {
                    if (column.property === property) {
                        return __assign(__assign({}, column), { isVisible: !column.isVisible });
                    }
                    return column;
                });
            }
            return prevColumns;
        });
    };
    var handleVisibleAllColumns = function () {
        var updatedColumns = columnsManaged.map(function (column) {
            return __assign(__assign({}, column), { isVisible: true });
        });
        setColumnsManaged(updatedColumns);
    };
    var _l = (0, react_1.useState)(function () {
        return columns.map(function (_a) {
            var label = _a.label, property = _a.property;
            return ({
                label: label,
                property: property,
                isVisible: true,
            });
        });
    }), columnsManaged = _l[0], setColumnsManaged = _l[1];
    var start = (page - 1) * perPage;
    var end = start + perPage;
    var currentData = filteredData.slice(start, end);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: 'box_table' }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: 'box_searchReset' }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: 'box_searchGlobal' }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: searchTerm, onChange: handleSearch, placeholder: "Search...", id: 'searchGlobal' }), (0, jsx_runtime_1.jsx)("label", __assign({ htmlFor: "searchGlobal" }, { children: (0, jsx_runtime_1.jsx)(fa_2.FaSearch, {}) }))] })), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: handleResetSearch, style: { marginRight: '20px' }, className: 'btn_Reset' }, { children: "Reset all search" }))] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: 'box_ChoiceEntries' }, { children: [(0, jsx_runtime_1.jsx)("span", { children: "Rows per page:" }), (0, jsx_runtime_1.jsx)(Dropdown_1.default, { options: ['All', '5', '10', '25', '50', '100'], onOptionClick: function (option) { return handlePerPageChange(option); }, defaultValueSelectedOption: defaultValueSelectedOption.toString() })] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: 'box_tableManaged scrollerTable' }, { children: [(0, jsx_runtime_1.jsx)(ManageColumns_1.default, { columns: columnsManaged, handleColumnVisibility: handleColumnVisibility, handleVisibleAllColumns: handleVisibleAllColumns }), (0, jsx_runtime_1.jsxs)("table", __assign({ className: 'tableComponent' }, { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsx)("tr", { children: columnsManaged.map(function (_a) {
                                        var label = _a.label, property = _a.property, isVisible = _a.isVisible;
                                        if (isVisible) {
                                            var isSortKey = sortKey === property;
                                            return ((0, jsx_runtime_1.jsx)("th", __assign({ style: { position: 'relative' }, className: "th_".concat(property, " thColor") }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ style: { display: 'flex', alignItems: 'center' } }, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ className: 'label', "data-testid": "columnManaged-".concat(property) }, { children: label })), (!isSortKey || (isSortKey && sortOrder === "noSort")) && ((0, jsx_runtime_1.jsx)("button", __assign({ onClick: function () { return handleSort(property); }, className: "btnSort" }, { children: (0, jsx_runtime_1.jsx)(fa_1.FaSort, {}) }))), isSortKey && sortOrder === "asc" && ((0, jsx_runtime_1.jsx)("button", __assign({ onClick: function () { return handleSort(property); }, className: sortKey === property ? "btnSort selectedBtnSort" : "btnSort" }, { children: (0, jsx_runtime_1.jsx)(fa_1.FaSortUp, {}) }))), isSortKey && sortOrder === "desc" && ((0, jsx_runtime_1.jsx)("button", __assign({ onClick: function () { return handleSort(property); }, className: sortKey === property ? "selectedBtnSort btnSort" : "btnSort" }, { children: (0, jsx_runtime_1.jsx)(fa_1.FaSortDown, {}) }))), (0, jsx_runtime_1.jsx)(SearchDropdown_1.default, { inputValues: inputValues, property: property, handleSearchByProperty: handleSearchByProperty, handleReset: handleReset })] })) }), property));
                                        }
                                    }) }) }), (0, jsx_runtime_1.jsx)("tbody", { children: currentData.map(function (item, index) { return ((0, jsx_runtime_1.jsx)("tr", { children: columnsManaged.map(function (_a) {
                                        var property = _a.property, isVisible = _a.isVisible;
                                        if (isVisible) {
                                            return ((0, jsx_runtime_1.jsx)("td", { children: item[property] }, "cell-".concat(index, "-").concat(property)));
                                        }
                                        return null;
                                    }) }, index)); }) })] }))] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: 'showingEntries' }, { children: [filteredData.length > 0 ? "".concat(page === 1 ? 'Showing 1' : "Showing ".concat((page - 1) * perPage + 1), " to ").concat(Math.min(page * perPage, filteredData.length), " of ").concat(filteredData.length, " entries") : '', (filteredData.length <= 0) ? "0 result of ".concat(data.length, " entries filtered") : ''] })), (0, jsx_runtime_1.jsx)(Pagination_1.default, { page: page, totalPages: totalPages, handlePageChange: handlePageChange })] })));
}
exports.default = Table;

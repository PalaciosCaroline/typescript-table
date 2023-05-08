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
import { useState, useEffect } from 'react';
import { customSort } from '../utils/sortDatas';
import filterData from '../utils/filterData';
import Pagination from './Pagination';
import './../styles/table.css';
import { TableHeader } from './TableHeader';
import { SearchAndResetGlobal } from './searchAndResetGlobal';
import ManageTable from './ManageTable';
export default function Table(_a) {
    var data = _a.data, columns = _a.columns;
    var _b = useState(undefined), sortKey = _b[0], setSortKey = _b[1];
    var _c = useState('noSort'), sortOrder = _c[0], setSortOrder = _c[1];
    var _d = useState(1), page = _d[0], setPage = _d[1];
    var _e = useState(10), perPage = _e[0], setPerPage = _e[1];
    var _f = useState(0), totalPages = _f[0], setTotalPages = _f[1];
    var _g = useState([]), sortedData = _g[0], setSortedData = _g[1];
    var _h = useState(''), searchTerm = _h[0], setSearchTerm = _h[1];
    var _j = useState({}), searchTerms = _j[0], setSearchTerms = _j[1];
    var _k = useState('none'), dateFormatForSort = _k[0], setDateFormatForSort = _k[1];
    var initialIsOpenSearchBProp = {};
    columns.forEach(function (_a) {
        var property = _a.property;
        initialIsOpenSearchBProp[property] = false;
    });
    var _l = useState(initialIsOpenSearchBProp), isOpenSearchBProp = _l[0], setIsOpenSearchBProp = _l[1];
    var initialInputValues = {};
    columns.forEach(function (_a) {
        var property = _a.property;
        initialInputValues[property] = '';
    });
    var _m = useState(initialInputValues), inputValues = _m[0], setInputValues = _m[1];
    useEffect(function () {
        setSortedData(customSort(data, sortKey, sortOrder, dateFormatForSort));
    }, [data, sortKey, sortOrder, dateFormatForSort]);
    var handleSort = function (property, dateFormat) {
        if (sortKey === property) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? 'noSort' : 'asc');
        }
        else {
            setSortKey(property);
            setSortOrder('asc');
            setDateFormatForSort(dateFormat);
        }
    };
    var filteredData = filterData(sortedData, searchTerm, searchTerms);
    useEffect(function () {
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
    var _o = useState(function () {
        return columns.map(function (_a) {
            var label = _a.label, property = _a.property, dateFormat = _a.dateFormat, disableSort = _a.disableSort, disableFilter = _a.disableFilter;
            return ({
                label: label,
                property: property,
                isVisible: true,
                dateFormat: dateFormat !== undefined ? dateFormat : 'none',
                disableSort: disableSort,
                disableFilter: disableFilter
            });
        });
    }), columnsManaged = _o[0], setColumnsManaged = _o[1];
    var start = (page - 1) * perPage;
    var end = start + perPage;
    var currentData = filteredData.slice(start, end);
    function formatNestedDate(value, depth) {
        if (depth === void 0) { depth = 0; }
        if (depth >= 4) {
            return _jsx("span", { children: "..." });
        }
        if (value instanceof Date) {
            return value.toLocaleDateString();
        }
        else if (Array.isArray(value)) {
            return (_jsx("ul", __assign({ className: 'ul_tableComponent' }, { children: value.map(function (item, index) { return (_jsx("li", __assign({ className: "liOjectData liOjectData_".concat(depth) }, { children: formatNestedDate(item, depth + 1) }), index)); }) })));
        }
        else if (typeof value === 'object' && value !== null) {
            return (_jsx("ul", __assign({ className: "ul_tableComponent ul_tableComponent_".concat(depth) }, { children: Object.entries(value).map(function (_a, index) {
                    var key = _a[0], item = _a[1];
                    return (_jsxs("li", __assign({ className: "liOjectData liOjectData_".concat(depth) }, { children: [key, ": ", formatNestedDate(item, depth + 1)] }), index));
                }) })));
        }
        return value;
    }
    function formatDate(value) {
        return formatNestedDate(value);
    }
    var handleToggle = function (property) {
        setIsOpenSearchBProp(function (prevState) {
            var _a;
            return (__assign(__assign({}, prevState), (_a = {}, _a[property] = !prevState[property], _a)));
        });
    };
    return (_jsxs("div", __assign({ className: 'box_table box_tableAndFeatures' }, { children: [_jsx(SearchAndResetGlobal, { searchTerm: searchTerm, handleSearch: handleSearch, handleResetSearch: handleResetSearch }), _jsxs("div", __assign({ className: 'box_tableManaged scrollerTable' }, { children: [_jsx(ManageTable, { handlePerPageChange: handlePerPageChange, filteredData: filteredData, columnsManaged: columnsManaged, handleColumnVisibility: handleColumnVisibility, handleVisibleAllColumns: handleVisibleAllColumns }), _jsxs("table", __assign({ className: 'tableComponent' }, { children: [_jsx("colgroup", { children: columnsManaged.map(function (_a) {
                                    var property = _a.property, isVisible = _a.isVisible;
                                    if (isVisible) {
                                        return (_jsx("col", { id: "col_".concat(property) }, "{col_".concat(property)));
                                    }
                                }) }), _jsx("thead", __assign({ className: 'thead_tableComponent' }, { children: _jsx("tr", __assign({ role: "row", className: 'tr_tableComponent' }, { children: columnsManaged.map(function (_a) {
                                        var _b;
                                        var label = _a.label, property = _a.property, isVisible = _a.isVisible, dateFormat = _a.dateFormat, disableSort = _a.disableSort, disableFilter = _a.disableFilter;
                                        var isSortKey = sortKey === property;
                                        return (_jsx(TableHeader, { label: label, property: property, isVisible: isVisible, dateFormat: dateFormat, isSortKey: isSortKey, sortOrder: sortOrder, handleSort: handleSort, inputValues: inputValues, handleReset: handleReset, disableSort: disableSort, disableFilter: disableFilter, handleSearchByProperty: handleSearchByProperty, isOpenSearchBProp: isOpenSearchBProp[property] ? (_b = {}, _b[property] = isOpenSearchBProp[property], _b) : {}, handleToggle: handleToggle }, property));
                                    }) })) })), _jsx("tbody", __assign({ className: 'tbody_tableComponent' }, { children: currentData.map(function (item, index) { return (_jsx("tr", __assign({ role: "row", className: "tr_".concat(index, " tr_tableComponent") }, { children: columnsManaged.map(function (_a) {
                                        var property = _a.property, isVisible = _a.isVisible;
                                        if (isVisible) {
                                            return (_jsx("td", __assign({ role: "cell", className: "table-cell table-cell_".concat(property, "_").concat(index, " td_tableComponent") }, { children: formatDate(item[property]) }), "cell-".concat(index, "-").concat(property, " td_tableComponent")));
                                        }
                                        return null;
                                    }) }), index)); }) }))] }))] })), _jsxs("div", __assign({ className: 'box_entriesAndPage' }, { children: [_jsx("div", __assign({ className: 'showingEntries' }, { children: filteredData.length <= 0
                            ? "0 results of ".concat(data.length, " entries")
                            : filteredData.length === 1
                                ? "1 entry"
                                : "".concat((page - 1) * perPage + 1, " - ").concat(Math.min(page * perPage, filteredData.length), " of ").concat(filteredData.length, " entries") })), _jsx(Pagination, { page: page, totalPages: totalPages, handlePageChange: handlePageChange })] }))] })));
}

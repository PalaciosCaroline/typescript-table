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
// import TableHeader from './TableHeader';
import { FaSortDown, FaSortUp, FaSort } from 'react-icons/fa';
import SearchDropdown from './SearchDropdown';
// import TableBody from './TableBody';
import { FaSearch } from 'react-icons/fa';
import { customSort } from './../utils/sortDates';
import filterData from '../utils/filterData';
import Pagination from './Pagination';
import './../styles/table.css';
import Dropdown from './Dropdown';
import ManageColumns from './ManageColumns';
export default function Table(_a) {
    var data = _a.data, columns = _a.columns;
    var _b = useState(null), sortKey = _b[0], setSortKey = _b[1];
    var _c = useState('noSort'), sortOrder = _c[0], setSortOrder = _c[1];
    var _d = useState(1), page = _d[0], setPage = _d[1];
    var defaultValueSelectedOption = 10;
    var _e = useState(defaultValueSelectedOption), perPage = _e[0], setPerPage = _e[1];
    var _f = useState(0), totalPages = _f[0], setTotalPages = _f[1];
    var _g = useState([]), sortedData = _g[0], setSortedData = _g[1];
    var _h = useState(''), searchTerm = _h[0], setSearchTerm = _h[1];
    var _j = useState({}), searchTerms = _j[0], setSearchTerms = _j[1];
    var initialInputValues = {};
    columns.forEach(function (_a) {
        var property = _a.property;
        initialInputValues[property] = '';
    });
    var _k = useState(initialInputValues), inputValues = _k[0], setInputValues = _k[1];
    useEffect(function () {
        setSortedData(customSort(data, sortKey, sortOrder));
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
    var _l = useState(function () {
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
    return (_jsxs("div", __assign({ className: 'box_table' }, { children: [_jsxs("div", __assign({ className: 'box_searchReset' }, { children: [_jsxs("div", __assign({ className: 'box_searchGlobal' }, { children: [_jsx("input", { type: "text", value: searchTerm, onChange: handleSearch, placeholder: "Search...", id: 'searchGlobal' }), _jsx("label", __assign({ htmlFor: "searchGlobal" }, { children: _jsx(FaSearch, {}) }))] })), _jsx("button", __assign({ onClick: handleResetSearch, style: { marginRight: '20px' }, className: 'btn_Reset' }, { children: "Reset all search" }))] })), _jsxs("div", __assign({ className: 'box_ChoiceEntries' }, { children: [_jsx("span", { children: "Rows per page:" }), _jsx(Dropdown, { options: ['All', '5', '10', '25', '50', '100'], onOptionClick: function (option) { return handlePerPageChange(option); }, defaultValueSelectedOption: defaultValueSelectedOption.toString() })] })), _jsxs("div", __assign({ className: 'box_tableManaged scrollerTable' }, { children: [_jsx(ManageColumns, { columns: columnsManaged, handleColumnVisibility: handleColumnVisibility, handleVisibleAllColumns: handleVisibleAllColumns }), _jsxs("table", __assign({ className: 'tableComponent' }, { children: [_jsx("thead", { children: _jsx("tr", { children: columnsManaged.map(function (_a) {
                                        var label = _a.label, property = _a.property, isVisible = _a.isVisible;
                                        if (isVisible) {
                                            var isSortKey = sortKey === property;
                                            return (_jsx("th", __assign({ style: { position: 'relative' }, className: "th_".concat(property, " thColor") }, { children: _jsxs("div", __assign({ style: { display: 'flex', alignItems: 'center' } }, { children: [_jsx("p", __assign({ className: 'label', "data-testid": "columnManaged-".concat(property) }, { children: label })), (!isSortKey || (isSortKey && sortOrder === "noSort")) && (_jsx("button", __assign({ onClick: function () { return handleSort(property); }, className: "btnSort" }, { children: _jsx(FaSort, {}) }))), isSortKey && sortOrder === "asc" && (_jsx("button", __assign({ onClick: function () { return handleSort(property); }, className: sortKey === property ? "btnSort selectedBtnSort" : "btnSort" }, { children: _jsx(FaSortUp, {}) }))), isSortKey && sortOrder === "desc" && (_jsx("button", __assign({ onClick: function () { return handleSort(property); }, className: sortKey === property ? "selectedBtnSort btnSort" : "btnSort" }, { children: _jsx(FaSortDown, {}) }))), _jsx(SearchDropdown, { inputValues: inputValues, property: property, handleSearchByProperty: handleSearchByProperty, handleReset: handleReset })] })) }), property));
                                        }
                                    }) }) }), _jsx("tbody", { children: currentData.map(function (item, index) { return (_jsx("tr", { children: columnsManaged.map(function (_a) {
                                        var property = _a.property, isVisible = _a.isVisible;
                                        if (isVisible) {
                                            return (_jsx("td", { children: item[property] }, "cell-".concat(index, "-").concat(property)));
                                        }
                                        return null;
                                    }) }, index)); }) })] }))] })), _jsxs("div", __assign({ className: 'showingEntries' }, { children: [filteredData.length > 0 ? "".concat(page === 1 ? 'Showing 1' : "Showing ".concat((page - 1) * perPage + 1), " to ").concat(Math.min(page * perPage, filteredData.length), " of ").concat(filteredData.length, " entries") : '', (filteredData.length <= 0) ? "0 result of ".concat(data.length, " entries filtered") : ''] })), _jsx(Pagination, { page: page, totalPages: totalPages, handlePageChange: handlePageChange })] })));
}

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
import { useState, useEffect, useRef } from 'react';
import customSort from '../utils/sortDatas';
import filterData from '../utils/filterData';
import Pagination from './Pagination';
import TableHeaderCell from './TableHeaderCell';
import SearchAndResetGlobal from './searchAndResetGlobal';
import ManageTable from './ManageTable';
import ActionButton from './ActionButton';
import EntriesInfo from './EntriesInfo';
import { FiEdit3, FiArchive } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import './../styles/table.css';
import './../styles/CustomComponent.css';
/**
 * `Table` is a functional component that renders a sortable, paginated, and filterable table.
 *
 * This component provides the following features:
 * - Sorting by column
 * - Pagination
 * - Global filtering
 * - Filtering by columns
 * - Customizable visual properties, such as colors
 * - Optional row-based actions, such as editing, archiving and deletion
 * - Customizable row selection
 * - Support for exporting table data
 *
 * @template T The type of data for each row in the table.
 *
 * @param {TableProps<T>} props The properties of the Table component.
 * @returns {ReactElement} A React element that represents the table.
 */
export function Table(_a) {
    var data = _a.data, columns = _a.columns, _b = _a.background, background = _b === void 0 ? '#677e11' : _b, _c = _a.color, color = _c === void 0 ? 'white' : _c, _d = _a.hoverBackground, hoverBackground = _d === void 0 ? '#7e9b16' : _d, _e = _a.selectedRowsBackground, selectedRowsBackground = _e === void 0 ? 'rgba(175 228 145 / 20%)' : _e, renderExportDataComponent = _a.renderExportDataComponent, editRowColumnVisible = _a.editRowColumnVisible, handleEditRow = _a.handleEditRow, archiveRowColumnVisible = _a.archiveRowColumnVisible, handleArchiveRow = _a.handleArchiveRow, deleteRowColumnVisible = _a.deleteRowColumnVisible, handleDeleteRow = _a.handleDeleteRow, _f = _a.disableSelectRow, disableSelectRow = _f === void 0 ? false : _f;
    // useState for sorting
    var _g = useState(undefined), sortKey = _g[0], setSortKey = _g[1];
    var _h = useState('noSort'), sortOrder = _h[0], setSortOrder = _h[1];
    var _j = useState([]), sortedData = _j[0], setSortedData = _j[1];
    // useState for pagination
    var _k = useState(1), page = _k[0], setPage = _k[1];
    var _l = useState(10), perPage = _l[0], setPerPage = _l[1];
    var _m = useState(0), totalPages = _m[0], setTotalPages = _m[1];
    // useState for date format used in sorting
    var _o = useState('none'), dateFormatForSort = _o[0], setDateFormatForSort = _o[1];
    // useState for global search
    var _p = useState(''), searchTerm = _p[0], setSearchTerm = _p[1];
    // useState for search by property
    var _q = useState({}), searchTerms = _q[0], setSearchTerms = _q[1];
    var initialIsOpenSearchByProperty = {};
    columns.forEach(function (_a) {
        var property = _a.property;
        initialIsOpenSearchByProperty[property] = false;
    });
    var _r = useState(initialIsOpenSearchByProperty), isOpenSearchByProperty = _r[0], setIsOpenSearchByProperty = _r[1];
    var initialInputValues = {};
    columns.forEach(function (_a) {
        var property = _a.property;
        initialInputValues[property] = '';
    });
    var _s = useState(initialInputValues), inputValues = _s[0], setInputValues = _s[1];
    // useState for selecting rows to export
    var _t = useState(new Set()), selectedRows = _t[0], setSelectedRows = _t[1];
    var _u = useState(false), selectAllChecked = _u[0], setSelectAllChecked = _u[1];
    var _v = useState(false), isIndeterminate = _v[0], setIndeterminate = _v[1];
    var selectAllRef = useRef(null);
    var _w = useState(true), selectRowColumnVisible = _w[0], setSelectRowColumnVisible = _w[1];
    // style
    var style = {
        '--background-color': background,
        '--color': color,
        '--hover-background-color': hoverBackground,
        '--selected-background-color': selectedRowsBackground,
    };
    // useEffect for sorting data
    useEffect(function () {
        setSortedData(customSort(data, sortKey, sortOrder, dateFormatForSort));
    }, [data, sortKey, sortOrder, dateFormatForSort]);
    var updateSortOrder = function (sortOrder) {
        return sortOrder === 'asc'
            ? 'desc'
            : sortOrder === 'desc'
                ? 'noSort'
                : 'asc';
    };
    /**
     * Handles the column sorting based on the provided property and date format.
     *
     * @param {string} property - The property of the column being sorted.
     * @param {string} dateFormat - The date format used for sorting (e.g., 'YYYY/MM/DD').
     * @function handleColumnSort
     * @returns {void}
     */
    var handleColumnSort = function (property, dateFormat) {
        if (sortKey === property) {
            setSortOrder(updateSortOrder(sortOrder));
        }
        else {
            setSortKey(property);
            setSortOrder('asc');
            setDateFormatForSort(dateFormat);
        }
    };
    /**
     * Updates search terms and input values for a specific property.
     *
     * @param {string} property - The property to update.
     * @param {string} value - The new search value for the property.
     * @param {SearchTerms} prevSearchTerms - The previous search terms object.
     * @param {SearchByProp} prevInputValues - The previous input values object.
     *
     * @returns {Object} An object containing the updated search terms and input values.
     */
    var updateSearchTerms = function (property, value, prevSearchTerms, prevInputValues) {
        var _a, _b;
        var updatedSearchTerms = __assign(__assign({}, prevSearchTerms), (_a = {}, _a[property] = value, _a));
        var updatedInputValues = __assign(__assign({}, prevInputValues), (_b = {}, _b[property] = value, _b));
        return { updatedSearchTerms: updatedSearchTerms, updatedInputValues: updatedInputValues };
    };
    /**
     * Handles the update of search terms and input values when a search by property is performed.
     *
     * @param {string} property - The property to search on.
     * @param {string} value - The search value for the property.
     */
    var handleSearchByProperty = function (property, value) {
        var _a = updateSearchTerms(property, value, searchTerms, inputValues), updatedSearchTerms = _a.updatedSearchTerms, updatedInputValues = _a.updatedInputValues;
        setSearchTerms(updatedSearchTerms);
        setInputValues(updatedInputValues);
    };
    // Filters the sorted data based on the searchTerm and searchTerms.
    var filteredData = filterData(sortedData, searchTerm, searchTerms);
    // Calculates and sets the total number of pages based on the length of the filtered data.
    // If the current page number exceeds the total pages, resets the page number to the total.
    useEffect(function () {
        var newTotalPages = filteredData.length > perPage
            ? Math.ceil(filteredData.length / perPage)
            : 1;
        setTotalPages(newTotalPages);
        setPage(function (prevPage) {
            if (prevPage >= newTotalPages) {
                return newTotalPages;
            }
            return prevPage;
        });
    }, [filteredData, perPage]);
    // manage rows per page display
    var handlePerPageChange = function (optionValue) {
        if (optionValue === 'All') {
            setPerPage(filteredData.length);
        }
        else {
            setPerPage(parseInt(optionValue));
        }
    };
    // manage change page
    var handlePageChange = function (newPage) {
        setPage(newPage);
    };
    // manage global search record
    var handleSearch = function (event) {
        setSearchTerm(event.target.value);
    };
    /**
     * Resets the search term and input value for a given property in the respective states.
     *
     * @param {string} property - The property for which the search term and input value should be reset.
     * @function handleReset
     * @returns {void}
     */
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
    // manage button global reset search
    var handleResetSearch = function () {
        setSearchTerm('');
        setSearchTerms({});
        setInputValues(initialInputValues);
    };
    /**
     * Toggles the visibility of a column in a table based on its property name.
     *
     * @param {string} property - The property name of the column whose visibility will be toggled.
     * @function handleColumnVisibility
     * @returns {void}
     */
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
    /**
     * Sets all columns in a table to visible.
     *
     * If the 'select row' column is not visible, the function will also make it visible.
     *
     * @function handleVisibleAllColumns
     * @returns {void}
     */
    var handleVisibleAllColumns = function () {
        var updatedColumns = columnsManaged.map(function (column) {
            return __assign(__assign({}, column), { isVisible: true });
        });
        setColumnsManaged(updatedColumns);
        if (!selectRowColumnVisible) {
            handleVisibleSelectRowsColumn();
        }
    };
    // manage dateFormat instruction
    var _x = useState(function () {
        return columns.map(function (_a) {
            var label = _a.label, property = _a.property, dateFormat = _a.dateFormat, disableSort = _a.disableSort, disableFilter = _a.disableFilter;
            return ({
                label: label,
                property: property,
                isVisible: true,
                dateFormat: dateFormat !== undefined ? dateFormat : 'none',
                disableSort: disableSort,
                disableFilter: disableFilter,
            });
        });
    }), columnsManaged = _x[0], setColumnsManaged = _x[1];
    //manage display data per page
    var start = (page - 1) * perPage;
    var end = start + perPage;
    var currentData = filteredData.slice(start, end);
    // display data object or array
    function renderList(items, itemRenderer, depth) {
        return (_jsx("ul", __assign({ className: "ul_tableComponent ul_tableComponent_".concat(depth) }, { children: items.map(function (item, index) { return (_jsx("li", __assign({ className: "liOjectData liOjectData_".concat(depth) }, { children: itemRenderer(item, index) }), "item-".concat(index))); }) })));
    }
    /**
     * Formats a nested date structure into a readable format, handling Date objects, arrays, and other objects.
     *
     * @function formatNestedDate
     * @template T - The type of value to be formatted
     * @param {T} value - The value to be formatted. This can be a Date object, array, or other objects.
     * @param {number} [depth=0] - The current nesting depth.
     * @returns {string | React.ReactNode} - Returns a formatted string if the value is a Date object. If the value is an array or an object, the function recursively formats nested values and returns a React component. If the depth is 4 or more, it returns a '...' string wrapped in a span.
     */
    function formatNestedDate(value, depth) {
        if (depth === void 0) { depth = 0; }
        if (depth >= 4) {
            return _jsx("span", { children: "..." });
        }
        if (value instanceof Date) {
            return value.toLocaleDateString();
        }
        else if (Array.isArray(value)) {
            return renderList(value, function (item) { return formatNestedDate(item, depth + 1); }, depth);
        }
        else if (typeof value === 'object' && value !== null) {
            return renderList(Object.entries(value), function (_a) {
                var key = _a[0], item = _a[1];
                return "".concat(key, ": ").concat(formatNestedDate(item, depth + 1));
            }, depth);
        }
        return value;
    }
    // manage display object array and date type
    function formatDate(value) {
        return formatNestedDate(value);
    }
    // Toggle search by property
    var handleToggle = function (property) {
        setIsOpenSearchByProperty(function (prevState) {
            var _a;
            return (__assign(__assign({}, prevState), (_a = {}, _a[property] = !prevState[property], _a)));
        });
    };
    /**
     * Handles the selection or deselection of a row identified by its ID.
     *
     * @param {T | undefined} id - The ID of the row to be selected or deselected.
     * @function handleRowSelection
     * @returns {void}
     */
    var handleRowSelection = function (id) {
        if (id !== undefined) {
            setSelectedRows(function (prevSelectedRows) {
                var newSelectedRows = new Set(prevSelectedRows);
                if (newSelectedRows.has(id)) {
                    newSelectedRows.delete(id);
                }
                else {
                    newSelectedRows.add(id);
                }
                return newSelectedRows;
            });
        }
    };
    // control if row is selected
    var isRowSelected = function (id) {
        return selectedRows.has(id);
    };
    // select or unselect all rows
    var handleSelectAll = function () {
        if (selectAllChecked) {
            setSelectedRows(new Set());
            setSelectAllChecked(false);
        }
        else {
            setSelectedRows(new Set(filteredData.map(function (item) { return item.id; })));
            setSelectAllChecked(true);
        }
    };
    // manage select case of head (allChecked, indeterminate, and noChecked)
    useEffect(function () {
        if (filteredData.length === 0) {
            setSelectAllChecked(false);
            setIndeterminate(false);
        }
        else if (selectedRows.size === filteredData.length) {
            setSelectAllChecked(true);
            setIndeterminate(false);
        }
        else if (selectedRows.size === 0) {
            setSelectAllChecked(false);
            setIndeterminate(false);
        }
        else {
            setSelectAllChecked(false);
            setIndeterminate(true);
        }
    }, [selectedRows, filteredData]);
    // manage style of indeterminate case
    useEffect(function () {
        if (selectAllRef.current) {
            selectAllRef.current.indeterminate = isIndeterminate;
            if (isIndeterminate) {
                selectAllRef.current.classList.add('indeterminate');
            }
            else {
                selectAllRef.current.classList.remove('indeterminate');
            }
        }
    }, [isIndeterminate]);
    // toggle visible row select column
    var handleVisibleSelectRowsColumn = function () {
        setSelectRowColumnVisible(!selectRowColumnVisible);
    };
    var actionButtons = [
        {
            type: 'edit',
            isVisible: editRowColumnVisible,
            handler: handleEditRow,
            icon: _jsx(FiEdit3, {}),
        },
        {
            type: 'archive',
            isVisible: archiveRowColumnVisible,
            handler: handleArchiveRow,
            icon: _jsx(FiArchive, {}),
        },
        {
            type: 'delete',
            isVisible: deleteRowColumnVisible,
            handler: handleDeleteRow,
            icon: _jsx(RiDeleteBin6Line, {}),
        },
    ];
    var isAtLeastOneButtonVisible = actionButtons.some(function (button) { return button.isVisible && typeof button.handler === 'function'; });
    var totalColumns = columnsManaged.reduce(function (count, _a) {
        var isVisible = _a.isVisible;
        return (isVisible ? count + 1 : count);
    }, 0);
    if (selectRowColumnVisible) {
        totalColumns += 1;
    }
    if (isAtLeastOneButtonVisible) {
        totalColumns += 1;
    }
    return (_jsxs("div", __assign({ className: "box_table box_tableAndFeatures" }, { children: [_jsx(SearchAndResetGlobal, { searchTerm: searchTerm, handleSearch: handleSearch, handleResetSearch: handleResetSearch, style: style }), _jsxs("div", __assign({ className: "box_tableManaged scrollerTable" }, { children: [_jsx(ManageTable, { style: style, handlePerPageChange: handlePerPageChange, filteredData: filteredData, columnsManaged: columnsManaged, handleColumnVisibility: handleColumnVisibility, handleVisibleAllColumns: handleVisibleAllColumns, renderExportDataComponent: renderExportDataComponent, selectedRows: selectedRows, handleVisibleSelectRowsColumn: handleVisibleSelectRowsColumn, selectRowColumnVisible: selectRowColumnVisible, disableSelectRow: disableSelectRow }), _jsxs("table", __assign({ className: "tableComponent" }, { children: [_jsx("colgroup", { children: columnsManaged.map(function (_a) {
                                    var property = _a.property, isVisible = _a.isVisible;
                                    if (isVisible) {
                                        return (_jsx("col", { id: "col_".concat(property) }, "{col_".concat(property)));
                                    }
                                }) }), _jsx("thead", __assign({ className: "thead_tableComponent" }, { children: _jsxs("tr", __assign({ role: "row", className: "tr_tableComponent" }, { children: [!disableSelectRow &&
                                            selectRowColumnVisible && (_jsxs("th", __assign({ className: "thColor th_tableComponent box_inputSelectAllRows" }, { children: [_jsx("input", { id: "selectAll", type: "checkbox", "data-role": "checkbox-three-state", "data-caption": "Checkbox", checked: selectAllChecked, onKeyDown: function (e) {
                                                        if (e.key === 'Enter') {
                                                            handleSelectAll();
                                                        }
                                                    }, onChange: handleSelectAll, ref: selectAllRef, className: "inputSelectAllRows inputSelectRows customComponent", role: "checkbox", "aria-checked": selectAllChecked
                                                        ? 'true'
                                                        : isIndeterminate
                                                            ? 'mixed'
                                                            : 'false', "aria-label": selectAllChecked
                                                        ? 'all rows are checked'
                                                        : isIndeterminate
                                                            ? 'some rows are selected'
                                                            : 'no row is checked', style: style }), _jsx("label", __assign({ htmlFor: "selectAll", className: "sr-only" }, { children: "Select all rows" }))] }))), columnsManaged.map(function (_a) {
                                            var _b;
                                            var label = _a.label, property = _a.property, isVisible = _a.isVisible, dateFormat = _a.dateFormat, disableSort = _a.disableSort, disableFilter = _a.disableFilter;
                                            var isSortKey = sortKey === property;
                                            return (_jsx(TableHeaderCell, { label: label, property: property, isVisible: isVisible, dateFormat: dateFormat, isSortKey: isSortKey, sortOrder: sortOrder, handleColumnSort: handleColumnSort, inputValues: inputValues, handleReset: handleReset, disableSort: disableSort, disableFilter: disableFilter, handleSearchByProperty: handleSearchByProperty, isOpenSearchByProperty: isOpenSearchByProperty[property]
                                                    ? (_b = {}, _b[property] = isOpenSearchByProperty[property], _b) : {}, handleToggle: handleToggle }, property));
                                        }), isAtLeastOneButtonVisible ? (_jsx("th", __assign({ className: "thColor th_tableComponent" }, { children: _jsx("span", { children: "Action" }) }))) : null] })) })), _jsx("tbody", __assign({ className: "tbody_tableComponent" }, { children: data === undefined || filteredData.length === 0 ? (_jsx("tr", { children: _jsx("td", __assign({ colSpan: totalColumns, className: "table_noData" }, { children: "No data to display" })) })) : (currentData.map(function (item, index) { return (_jsxs("tr", __assign({ role: "row", className: "tr_".concat(index, " tr_tableComponent ").concat(selectedRows.has(item.id) ? 'selected' : ''), style: style }, { children: [!disableSelectRow && selectRowColumnVisible && (_jsxs("td", __assign({ className: "box_inputSelectRow" }, { children: [_jsx("input", { type: "checkbox", checked: selectedRows.has(item.id), className: "inputSelectRows inputSelectRow customComponent", onClick: function (e) {
                                                        e.stopPropagation();
                                                        handleRowSelection(item.id);
                                                    }, onKeyDown: function (e) {
                                                        if (e.key === 'Enter') {
                                                            handleRowSelection(item.id);
                                                        }
                                                    }, "aria-checked": isRowSelected(item.id) ? 'true' : 'false', "aria-label": "Select row with ".concat(item[1], " and ").concat(item[2]), "aria-labelledby": "row-".concat(item.id, "-label"), 
                                                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                                                    onChange: function () { }, style: style, id: "selectRow-".concat(item.id), name: "selectRow-".concat(item.id) }), _jsx("label", __assign({ htmlFor: "selectRow-".concat(item.id), className: "sr-only", id: "row-".concat(item.id, "-label") }, { children: "select this row" }))] }))), columnsManaged.map(function (_a) {
                                            var property = _a.property, isVisible = _a.isVisible;
                                            if (isVisible) {
                                                return (_jsx("td", __assign({ role: "cell", className: "table-cell table-cell_".concat(property, "_").concat(index, " td_tableComponent"), onClick: function () { if (!disableSelectRow)
                                                        handleRowSelection(item.id); }, onKeyDown: function (e) {
                                                        if (!disableSelectRow) {
                                                            if (e.key === 'Enter') {
                                                                handleRowSelection(item.id);
                                                            }
                                                        }
                                                    }, 
                                                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                                                    onChange: function () { }, "aria-label": "Select this row ".concat(item[property]) }, { children: formatDate(item[property]) }), "cell-".concat(index, "-").concat(property, " td_tableComponent")));
                                            }
                                            return null;
                                        }), isAtLeastOneButtonVisible ? (_jsx("td", __assign({ role: "cell", className: "td_tableComponent box_btnEditArchiveDelete" }, { children: actionButtons.map(function (_a) {
                                                var _b;
                                                var type = _a.type, isVisible = _a.isVisible, handler = _a.handler, icon = _a.icon;
                                                return isVisible && handler && item.id !== undefined ? (_jsx(ActionButton, { actionType: type, visible: isVisible && !!handler, handleAction: function (itemId, e) {
                                                        handler(itemId, e);
                                                    }, itemId: item.id, icons: (_b = {},
                                                        _b[type] = icon,
                                                        _b) }, "".concat(type, "_btnAction"))) : null;
                                            }) }))) : null] }), index)); })) }))] }))] })), _jsxs("div", __assign({ className: "box_entriesAndPage" }, { children: [_jsx(EntriesInfo, { filteredDataLength: filteredData.length, dataLength: data.length, page: page, perPage: perPage }), _jsx(Pagination, { page: page, totalPages: totalPages, handlePageChange: handlePageChange })] }))] })));
}

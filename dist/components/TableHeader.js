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
import SortButton from './SortButton';
import SearchDropdown from './SearchDropdown';
import SearchByProperty from './SearchByProperty';
export var TableHeader = function (_a) {
    var label = _a.label, property = _a.property, isVisible = _a.isVisible, dateFormat = _a.dateFormat, isSortKey = _a.isSortKey, sortOrder = _a.sortOrder, handleSort = _a.handleSort, disableSort = _a.disableSort, disableFilter = _a.disableFilter, handleSearchByProperty = _a.handleSearchByProperty, inputValues = _a.inputValues, handleReset = _a.handleReset, isOpenSearchBProp = _a.isOpenSearchBProp, handleToggle = _a.handleToggle;
    if (!isVisible)
        return null;
    return (_jsxs("th", __assign({ style: { position: 'relative' }, className: "th_".concat(property, " thColor th_tableComponent") }, { children: [_jsxs("div", __assign({ className: 'box_labelAndBtnsColumn' }, { children: [_jsx("p", __assign({ className: 'label label_tableComponent', "data-testid": "columnManaged-".concat(property) }, { children: label })), _jsxs("div", __assign({ className: 'box_btnsColumn' }, { children: [!disableSort && (_jsx(SortButton, { isSortKey: isSortKey, sortOrder: sortOrder, property: property, handleSort: handleSort, dateFormat: dateFormat })), !disableFilter && (_jsx(SearchDropdown, { inputValues: inputValues, property: property, handleToggle: handleToggle }))] }))] })), isOpenSearchBProp[property] && (_jsx("div", __assign({ className: 'boxSearchPropertyContent' }, { children: _jsx(SearchByProperty, { property: property, inputValues: inputValues, handleSearchByProperty: handleSearchByProperty, handleReset: handleReset }, property) })))] }), property));
};

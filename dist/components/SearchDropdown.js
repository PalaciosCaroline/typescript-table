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
import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from 'react';
import { MdFilterAltOff, MdFilterAlt } from 'react-icons/md';
var SearchDropdown = function (_a) {
    var inputValues = _a.inputValues, property = _a.property, handleToggle = _a.handleToggle;
    var dropdownSearchRef = useRef(null);
    var handleClick = function () {
        handleToggle(property);
    };
    var isFilterProperty = inputValues[property] ? true : false;
    return (_jsx("div", __assign({ className: "dropdownContainerSearch", ref: dropdownSearchRef }, { children: _jsx("button", __assign({ onClick: handleClick, className: isFilterProperty ? 'btnFilter selectedBtnFilter' : 'btnFilter', "data-testid": "btnOpenSearch-".concat(property), "aria-label": "Show search filter by ".concat(property) }, { children: isFilterProperty ? _jsx(MdFilterAlt, {}) : _jsx(MdFilterAltOff, {}) })) })));
};
export default SearchDropdown;

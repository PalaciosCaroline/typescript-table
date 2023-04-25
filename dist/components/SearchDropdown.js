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
import { useState, useRef, useEffect } from 'react';
import { MdFilterAltOff, MdFilterAlt } from 'react-icons/md';
import SearchByProperty from './SearchByProperty';
var SearchDropdown = function (_a) {
    var inputValues = _a.inputValues, property = _a.property, handleSearchByProperty = _a.handleSearchByProperty, handleReset = _a.handleReset;
    var _b = useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var dropdownSearchRef = useRef(null);
    var handleToggle = function () {
        setIsOpen(!isOpen);
    };
    var handleClose = function () {
        setIsOpen(false);
    };
    function handleClickOutside(event) {
        if (dropdownSearchRef.current && !dropdownSearchRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    }
    useEffect(function () {
        document.addEventListener('click', handleClickOutside);
        return function () {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    var isFilterProperty = inputValues[property] ? true : false;
    return (_jsxs("div", __assign({ className: "dropdownContainerSearch", ref: dropdownSearchRef }, { children: [_jsx("button", __assign({ onClick: handleToggle, className: isFilterProperty ? 'btnFilter selectedBtnFilter' : 'btnFilter', "aria-label": "Show search filter by ".concat(property), "data-testid": "btnOpenSearch-".concat(property) }, { children: isFilterProperty ? _jsx(MdFilterAlt, {}) : _jsx(MdFilterAltOff, {}) })), isOpen && (_jsx("div", __assign({ className: "boxSearchPropertyContent" }, { children: _jsx(SearchByProperty, { property: property, inputValues: inputValues, handleSearchByProperty: handleSearchByProperty, handleReset: handleReset, handleClose: handleClose }, property) })))] })));
};
export default SearchDropdown;

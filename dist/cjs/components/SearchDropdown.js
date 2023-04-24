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
var md_1 = require("react-icons/md");
var SearchByProperty_1 = __importDefault(require("./SearchByProperty"));
var SearchDropdown = function (_a) {
    var inputValues = _a.inputValues, property = _a.property, handleSearchByProperty = _a.handleSearchByProperty, handleReset = _a.handleReset;
    var _b = (0, react_1.useState)(false), isOpen = _b[0], setIsOpen = _b[1];
    var dropdownSearchRef = (0, react_1.useRef)(null);
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
    (0, react_1.useEffect)(function () {
        document.addEventListener('click', handleClickOutside);
        return function () {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    var isFilterProperty = inputValues[property] ? true : false;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "dropdownContainerSearch", ref: dropdownSearchRef }, { children: [(0, jsx_runtime_1.jsx)("button", __assign({ onClick: handleToggle, className: isFilterProperty ? 'btnFilter selectedBtnFilter' : 'btnFilter' }, { children: isFilterProperty ? (0, jsx_runtime_1.jsx)(md_1.MdFilterAlt, {}) : (0, jsx_runtime_1.jsx)(md_1.MdFilterAltOff, {}) })), isOpen && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "boxSearchPropertyContent" }, { children: (0, jsx_runtime_1.jsx)(SearchByProperty_1.default, { property: property, inputValues: inputValues, handleSearchByProperty: handleSearchByProperty, handleReset: handleReset, handleClose: handleClose }, property) })))] })));
};
exports.default = SearchDropdown;

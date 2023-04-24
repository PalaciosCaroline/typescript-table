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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var fi_1 = require("react-icons/fi");
function Dropdown(props) {
    var _a = (0, react_1.useState)(false), isOpen = _a[0], setIsOpen = _a[1];
    var _b = (0, react_1.useState)(props.defaultValueSelectedOption || ''), selectedOption = _b[0], setSelectedOption = _b[1];
    var dropdownRef = (0, react_1.useRef)(null);
    function handleOptionClick(option) {
        setSelectedOption(option);
        setIsOpen(false);
        props.onOptionClick(option);
    }
    function toggleDropdown() {
        setIsOpen(!isOpen);
    }
    function handleChevronClick(event) {
        event.stopPropagation(); // Arrêter la propagation de l'événement pour éviter que le clic ne soit transmis au bouton parent
        toggleDropdown();
    }
    function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    }
    (0, react_1.useEffect)(function () {
        document.addEventListener('click', handleClickOutside);
        return function () {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: 'dropdownTable dropdownRowPerPage', ref: dropdownRef }, { children: [(0, jsx_runtime_1.jsxs)("button", __assign({ type: "button", className: 'dropdownToggleTable buttonToggleRowPerPage', onClick: toggleDropdown, "data-testid": 'btnPerPage', "aria-haspopup": "listbox", "aria-expanded": isOpen, "aria-labelledby": "dropdown-label", "aria-label": "Options de la liste d\u00E9roulante" }, { children: [selectedOption || props.defaultValueSelectedOption, (0, jsx_runtime_1.jsx)("span", __assign({ className: 'chevronTable chevronRowPerPage', onClick: handleChevronClick }, { children: isOpen ? (0, jsx_runtime_1.jsx)(fi_1.FiChevronUp, {}) : (0, jsx_runtime_1.jsx)(fi_1.FiChevronDown, {}) }))] })), isOpen && ((0, jsx_runtime_1.jsx)("ul", __assign({ className: 'dropdownMenuTable dropdownMenuRowPerPage', role: "listbox" }, { children: props.options.map(function (option) { return ((0, jsx_runtime_1.jsx)("li", __assign({ "data-testid": "optionPerPage-".concat(option), className: "dropdownOptionTable dropdownOptionRowPerPage ".concat(option === selectedOption ? "selectedTable selectedOption" : ''), onClick: function () { return handleOptionClick(option); }, role: "option", "aria-selected": option === selectedOption }, { children: option }), option)); }) }))), (0, jsx_runtime_1.jsx)("span", __assign({ id: "dropdown-label", className: "sr-only" }, { children: "Options de la liste d\u00E9roulante" }))] })));
}
exports.default = Dropdown;

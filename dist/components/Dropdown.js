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
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
function Dropdown(props) {
    var _a = useState(false), isOpen = _a[0], setIsOpen = _a[1];
    var _b = useState(props.defaultValueSelectedOption || ''), selectedOption = _b[0], setSelectedOption = _b[1];
    var dropdownRef = useRef(null);
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
    function handleKeyDown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleDropdown();
        }
    }
    useEffect(function () {
        document.addEventListener('click', handleClickOutside);
        return function () {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (_jsxs("div", __assign({ className: "dropdownTable dropdownTable".concat(props.classNameProps), ref: dropdownRef }, { children: [_jsxs("button", __assign({ type: "button", className: "dropdownToggleTable buttonToggle".concat(props.classNameProps), onClick: toggleDropdown, onKeyDown: handleKeyDown, "data-testid": 'btnPerPage', "aria-haspopup": "listbox", "aria-expanded": isOpen, "aria-labelledby": "dropdown-label", "aria-label": "options of dropdown" }, { children: [selectedOption || props.defaultValueSelectedOption, _jsx("span", __assign({ className: "chevronTable chevron".concat(props.classNameProps), onClick: handleChevronClick }, { children: isOpen ? _jsx(FiChevronUp, {}) : _jsx(FiChevronDown, {}) }))] })), isOpen && (_jsx("ul", __assign({ className: "dropdownMenuTable dropdownMenu".concat(props.classNameProps), role: "listbox" }, { children: props.options.map(function (option) { return (_jsx("li", __assign({ className: "dropdownOptionTable dropdownOptionRowPerPage ".concat(option === selectedOption ? "selectedTable selectedOption" : ''), onClick: function () { return handleOptionClick(option); }, role: "option", "aria-selected": option === selectedOption, "data-testid": "optionPerPage-".concat(option), tabIndex: 0 }, { children: option }), option)); }) }))), _jsx("span", __assign({ id: "dropdown-label", className: "sr-only" }, { children: "options of dropdown" }))] })));
}
export default Dropdown;

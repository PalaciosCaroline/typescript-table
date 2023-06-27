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
import { useState, useEffect, useRef, createRef } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
/**
 * Dropdown: A Dropdown component that allows a user to choose an option from a dropdown menu.
 *
 * @param {DropdownProps} props - The props passed to the Dropdown component.
 *
 * @returns {JSX.Element} - Returns a JSX element representing the Dropdown component.
 */
function Dropdown(props) {
    var _a = useState(props.defaultValueSelectedOption || ''), selectedOption = _a[0], setSelectedOption = _a[1];
    var _b = useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var dropdownRef = useRef(null);
    var optionRefs = useRef([]);
    var _c = useState(-1), focusedOptionIndex = _c[0], setFocusedOptionIndex = _c[1];
    useEffect(function () {
        optionRefs.current = props.options.map(function (_, i) { var _a; return (_a = optionRefs.current[i]) !== null && _a !== void 0 ? _a : createRef(); });
    }, [props.options]);
    // Focus on the option button when the option is highlighted
    useEffect(function () {
        var _a;
        if (isOpen && focusedOptionIndex !== -1) {
            (_a = optionRefs.current[focusedOptionIndex].current) === null || _a === void 0 ? void 0 : _a.focus();
        }
    }, [focusedOptionIndex, isOpen]);
    var handleOptionClick = function (option) {
        setSelectedOption(option);
        setIsOpen(false);
        props.onOptionClick(option);
    };
    var toggleDropdown = function () {
        setIsOpen(function (prevIsOpen) {
            if (!prevIsOpen) {
                setFocusedOptionIndex(0); // Select the first option when opening the dropdown menu
            }
            return !prevIsOpen;
        });
    };
    var handleChevronClick = function (event) {
        event.stopPropagation();
        toggleDropdown();
    };
    var handleClickOutside = function (event) {
        if (dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            isOpen) {
            setIsOpen(false);
        }
    };
    var handleTriggerKeyDown = function (event) {
        if (event.currentTarget !== event.target) {
            return;
        }
        switch (event.key) {
            case 'ArrowUp':
                event.preventDefault();
                setFocusedOptionIndex(function (prevIndex) {
                    return prevIndex > 0 ? prevIndex - 1 : prevIndex;
                });
                break;
            case 'ArrowDown':
                event.preventDefault();
                setFocusedOptionIndex(function (prevIndex) {
                    return prevIndex < props.options.length - 1 ? prevIndex + 1 : prevIndex;
                });
                break;
            case 'Enter':
            case ' ':
                if (isOpen) {
                    event.preventDefault();
                    if (focusedOptionIndex >= 0) {
                        handleOptionClick(props.options[focusedOptionIndex]);
                    }
                    else {
                        toggleDropdown();
                    }
                }
                break;
            case 'Tab':
                setIsOpen(false);
                break;
            default:
                break;
        }
    };
    useEffect(function () {
        if (isOpen &&
            focusedOptionIndex >= 0 &&
            focusedOptionIndex < props.options.length &&
            dropdownRef.current // Add a check to ensure that dropdownRef.current is not null.
        ) {
            var optionElement = dropdownRef.current.querySelector("li:nth-child(".concat(focusedOptionIndex + 1, ")"));
            // Convert the element to an HTMLElement before calling the focus method
            var htmlElement = optionElement;
            // Add a check to ensure that the element exists.
            if (htmlElement) {
                htmlElement.focus();
            }
        }
    }, [focusedOptionIndex, isOpen, props.options.length]);
    useEffect(function () {
        document.addEventListener('click', handleClickOutside);
        return function () {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    var handleOptionKeyDown = function (event, option) {
        if (event.currentTarget !== event.target) {
            return;
        }
        switch (event.key) {
            case 'Enter':
            case ' ':
                if (isOpen) {
                    event.preventDefault();
                    handleOptionClick(option);
                }
                break;
            case 'Tab':
                setIsOpen(false);
                break;
            default:
                break;
        }
    };
    return (_jsxs("div", __assign({ className: "dropdownTable dropdownTable".concat(props.classNameProps), ref: dropdownRef }, { children: [_jsxs("button", __assign({ type: "button", className: "dropdownToggleTable buttonToggle".concat(props.classNameProps, " customComponent"), onClick: toggleDropdown, onKeyDown: handleTriggerKeyDown, "data-testid": props.dataTestId, "aria-haspopup": "listbox", "aria-expanded": isOpen, "aria-labelledby": "dropdown-label", "aria-label": "options of dropdown", style: props.style }, { children: [selectedOption || props.defaultValueSelectedOption, _jsx("span", __assign({ className: "chevronTable chevron".concat(props.classNameProps), onClick: handleChevronClick }, { children: isOpen ? _jsx(FiChevronUp, {}) : _jsx(FiChevronDown, {}) }))] })), isOpen && (_jsx("ul", __assign({ className: "dropdownMenuTable dropdownMenu".concat(props.classNameProps), role: "listbox" }, { children: props.options.map(function (option, index) { return (_jsx("li", __assign({ className: "dropdownOptionTable dropdownOptionRowPerPage customComponent ".concat(index === focusedOptionIndex ? 'focused' : '', " ").concat(option === selectedOption ? "selectedTable selectedOption" : ''), role: "option", "aria-selected": option === selectedOption, style: props.style }, { children: _jsx("button", __assign({ onKeyDown: function (event) { return handleOptionKeyDown(event, option); }, onClick: function () { return handleOptionClick(option); }, onMouseOver: function () { return setFocusedOptionIndex(index); }, className: "dropdownOptionButton customComponent", tabIndex: 0, style: props.style, "data-testid": "optionPerPage-".concat(option) }, { children: option })) }), option)); }) }))), _jsx("span", __assign({ id: "dropdown-label", className: "sr-only" }, { children: "options of dropdown" }))] })));
}
export default Dropdown;

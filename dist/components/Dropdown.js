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
function Dropdown(props) {
    var _a = useState(props.defaultValueSelectedOption || ''), selectedOption = _a[0], setSelectedOption = _a[1];
    var _b = useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var dropdownRef = useRef(null);
    var optionRefs = useRef([]);
    var _c = useState(-1), focusedOptionIndex = _c[0], setFocusedOptionIndex = _c[1];
    useEffect(function () {
        optionRefs.current = props.options.map(function (_, i) { var _a; return (_a = optionRefs.current[i]) !== null && _a !== void 0 ? _a : createRef(); });
    }, [props.options]);
    // Focus sur le bouton de l'option lorsque l'option est mise en évidence
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
                setFocusedOptionIndex(0); // Sélectionnez la première option lors de l'ouverture du menu déroulant
            }
            return !prevIsOpen;
        });
    };
    var handleChevronClick = function (event) {
        event.stopPropagation(); // Arrêter la propagation de l'événement pour éviter que le clic ne soit transmis au bouton parent
        toggleDropdown();
    };
    var handleClickOutside = function (event) {
        if (dropdownRef.current &&
            !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    // function handleKeyDown(event: React.KeyboardEvent): void {
    //   if (event.key === 'Enter' || event.key === ' ') {
    //     event.preventDefault();
    //     toggleDropdown();
    //   }
    // }
    var handleTriggerKeyDown = function (event) {
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
                event.preventDefault();
                if (isOpen && focusedOptionIndex >= 0) {
                    handleOptionClick(props.options[focusedOptionIndex]);
                }
                else {
                    toggleDropdown();
                }
                break;
            case 'Tab':
                // Si l'utilisateur appuie sur 'Tab', fermez le menu déroulant
                // event.preventDefault();
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
            dropdownRef.current // Ajoutez une vérification pour s'assurer que dropdownRef.current n'est pas null
        ) {
            var optionElement = dropdownRef.current.querySelector("li:nth-child(".concat(focusedOptionIndex + 1, ")"));
            // Convertir l'élément en HTMLElement avant de faire appel à la méthode focus
            var htmlElement = optionElement;
            // Ajoutez une vérification pour s'assurer que l'élément existe
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
        switch (event.key) {
            case 'Enter':
            case ' ':
                event.preventDefault();
                handleOptionClick(option);
                break;
            case 'Tab':
                setIsOpen(false);
                break;
            default:
                break;
        }
    };
    return (_jsxs("div", __assign({ className: "dropdownTable dropdownTable".concat(props.classNameProps), ref: dropdownRef }, { children: [_jsxs("button", __assign({ type: "button", className: "dropdownToggleTable buttonToggle".concat(props.classNameProps), 
                // onClick={toggleDropdown}
                // onKeyDown={handleKeyDown}
                onClick: toggleDropdown, onKeyDown: handleTriggerKeyDown, "data-testid": "btnPerPage", "aria-haspopup": "listbox", "aria-expanded": isOpen, "aria-labelledby": "dropdown-label", "aria-label": "options of dropdown" }, { children: [selectedOption || props.defaultValueSelectedOption, _jsx("span", __assign({ className: "chevronTable chevron".concat(props.classNameProps), onClick: handleChevronClick }, { children: isOpen ? _jsx(FiChevronUp, {}) : _jsx(FiChevronDown, {}) }))] })), isOpen && (_jsx("ul", __assign({ className: "dropdownMenuTable dropdownMenu".concat(props.classNameProps), role: "listbox" }, { children: props.options.map(function (option, index) { return (_jsx("li", __assign({ className: "dropdownOptionTable dropdownOptionRowPerPage ".concat(index === focusedOptionIndex ? 'focused' : '', " ").concat(option === selectedOption ? "selectedTable selectedOption" : ''), role: "option", "aria-selected": option === selectedOption, "data-testid": "optionPerPage-".concat(option) }, { children: _jsx("button", __assign({ onKeyDown: function (event) { return handleOptionKeyDown(event, option); }, onClick: function () { return handleOptionClick(option); }, onMouseOver: function () { return setFocusedOptionIndex(index); }, className: "dropdownOptionButton" // Ajoutez une classe pour styliser ce bouton comme vous le souhaitez
                        , tabIndex: 0 }, { children: option })) }), option)); }) }))), _jsx("span", __assign({ id: "dropdown-label", className: "sr-only" }, { children: "options of dropdown" }))] })));
}
export default Dropdown;

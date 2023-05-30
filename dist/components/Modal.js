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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
/**
 * Component for displaying a modal.
 *
 * @component
 * @param {ModalProps} props - The props for the Modal component.
 * @returns {JSX.Element} The rendered Modal component.
 */
function Modal(props) {
    // useRef for storing references to the modal elements
    var modalRef = useRef(null);
    var lastActiveElement = useRef(null);
    useEffect(function () {
        // Event handler for handling keydown events
        var handleKeyDown = function (event) {
            var _a;
            if (event.key === 'Escape') {
                props.onClose();
            }
            else if (event.key === 'Tab') {
                var focusableElements = (_a = modalRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                var firstFocusableElement = focusableElements === null || focusableElements === void 0 ? void 0 : focusableElements[0];
                var lastFocusableElement = focusableElements === null || focusableElements === void 0 ? void 0 : focusableElements[focusableElements.length - 1];
                if (document.activeElement === lastFocusableElement &&
                    !event.shiftKey) {
                    event.preventDefault();
                    firstFocusableElement.focus();
                }
                else if (document.activeElement === firstFocusableElement &&
                    event.shiftKey) {
                    event.preventDefault();
                    lastFocusableElement.focus();
                }
            }
        };
        if (props.isOpen) {
            lastActiveElement.current = document.activeElement;
            document.addEventListener('keydown', handleKeyDown);
            // Move focus to the first focusable element inside the modal
            requestAnimationFrame(function () {
                var _a;
                var firstFocusableElement = (_a = modalRef.current) === null || _a === void 0 ? void 0 : _a.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                firstFocusableElement === null || firstFocusableElement === void 0 ? void 0 : firstFocusableElement.focus();
            });
        }
        else {
            document.removeEventListener('keydown', handleKeyDown);
            // Return focus to the previously focused element when the modal is closed
            if (lastActiveElement.current) {
                lastActiveElement.current.focus();
            }
        }
        return function () {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [props.isOpen]);
    return (_jsx(_Fragment, { children: props.isOpen && (_jsxs("div", __assign({ className: "modalTable", role: "dialog", "aria-modal": "true", "aria-labelledby": "modal-title", ref: modalRef }, { children: [_jsx("button", __assign({ className: "btn_closeModalTable customComponent", onClick: props.onClose, "aria-label": "Fermer la fen\u00EAtre", tabIndex: 0, "data-testid": "btnCloseModal", style: props.style }, { children: _jsx(FaTimes, { className: "btn_closeModalTable_icon" }) })), _jsx("div", __assign({ className: "modalTable-content" }, { children: props.children }))] }))) }));
}
export default Modal;

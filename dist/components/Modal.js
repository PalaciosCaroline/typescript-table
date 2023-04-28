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
function Modal(props) {
    var modalRef = useRef(null);
    useEffect(function () {
        var handleKeyDown = function (event) {
            var _a, _b;
            if (event.key === 'Escape') {
                props.onClose();
            }
            else if (event.key === 'Tab') {
                var focusableElements = (_a = modalRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                var firstFocusableElement = focusableElements === null || focusableElements === void 0 ? void 0 : focusableElements[0];
                var lastFocusableElement = focusableElements === null || focusableElements === void 0 ? void 0 : focusableElements[focusableElements.length - 1];
                if (document.activeElement === lastFocusableElement && !event.shiftKey) {
                    event.preventDefault();
                    var closeButton = (_b = modalRef.current) === null || _b === void 0 ? void 0 : _b.querySelector('.btn_closeModalTable');
                    closeButton === null || closeButton === void 0 ? void 0 : closeButton.focus();
                }
                else if (document.activeElement === firstFocusableElement && event.shiftKey) {
                    event.preventDefault();
                    lastFocusableElement.focus();
                }
            }
        };
        if (props.isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        else {
            document.removeEventListener('keydown', handleKeyDown);
        }
        return function () {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [props.isOpen]);
    return (_jsx(_Fragment, { children: props.isOpen && (_jsxs("div", __assign({ className: "modalTable", role: "dialog", "aria-modal": "true", "aria-labelledby": "modal-title", ref: modalRef }, { children: [_jsx("button", __assign({ className: "btn_closeModalTable", onClick: props.onClose, "aria-label": "Fermer la fen\u00EAtre", tabIndex: 0 }, { children: _jsx(FaTimes, { className: "btn_closeModalTable_icon" }) })), _jsx("div", __assign({ className: "modalTable-content" }, { children: props.children }))] }))) }));
}
export default Modal;

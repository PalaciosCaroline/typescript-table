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
import { FaTimes } from 'react-icons/fa';
var SearchByProperty = function (_a) {
    var _b;
    var inputValues = _a.inputValues, property = _a.property, handleSearchByProperty = _a.handleSearchByProperty, handleReset = _a.handleReset, handleClose = _a.handleClose;
    var handleResetClose = function () {
        handleReset(property);
        handleClose();
    };
    var handleInputChange = function (event) {
        var property = event.target.name;
        var value = event.target.value;
        handleSearchByProperty(property, value);
    };
    return (_jsxs("div", __assign({ style: { position: 'relative', display: 'flex', alignItems: 'center' } }, { children: [_jsx("input", { type: "text", value: (_b = inputValues[property]) !== null && _b !== void 0 ? _b : inputValues[property], onChange: handleInputChange, placeholder: "Search...", name: property, className: "inputSearchByProperty" }), _jsx("button", __assign({ type: "button", className: "btnSearchByPropertyReset", onClick: handleResetClose, "aria-label": "Effacer et fermer la recherche sur la ".concat(property), style: {
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '20px',
                    height: '100%',
                    backgroundColor: 'transparent',
                    margin: '0',
                    paddingRight: '25px'
                } }, { children: _jsx(FaTimes, {}) }))] })));
};
export default SearchByProperty;

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
/**
 * SearchByProperty: A component for searching by property.
 *
 * @component
 * @template U - The type of the input values. By default, it's set to 'string'.
 * @param {Props<U>} props - The properties passed to the SearchByProperty component.
 * @returns {React.ReactElement} - Returns a JSX element representing the rendered SearchByProperty component.
 */
var SearchByProperty = function (_a) {
    var inputValues = _a.inputValues, property = _a.property, handleSearchByProperty = _a.handleSearchByProperty, handleReset = _a.handleReset;
    var handleResetSearchByProperty = function () {
        handleReset(property);
    };
    /**
    * Handles the input change event.
    *
    * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
    */
    var handleInputChange = function (event) {
        var property = event.target.name;
        var value = event.target.value;
        handleSearchByProperty(property, value);
    };
    return (_jsxs("div", __assign({ className: "box_searchBProps" }, { children: [_jsx("input", { type: "text", value: inputValues[property], onChange: handleInputChange, placeholder: "Search...", name: property, className: "inputSearchByProperty", "data-testid": "btnSearch-".concat(property) }), _jsx("button", __assign({ type: "button", className: "btnSearchByPropertyReset", onClick: handleResetSearchByProperty, onKeyDown: function (e) {
                    if (e.key === 'Enter') {
                        handleResetSearchByProperty();
                    }
                }, "data-testid": "btnResetClose-".concat(property), "aria-label": "Clear the search by ".concat(property) }, { children: _jsx(FaTimes, {}) }))] })));
};
export default SearchByProperty;

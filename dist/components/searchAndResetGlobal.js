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
import { FaSearch } from 'react-icons/fa';
/**
 * SearchAndResetGlobal: A component for global search and reset all search (global and by property).
 *
 * @component
 * @param {SearchAndResetGlobalProps} props - The properties passed to the SearchAndResetGlobal component.
 * @returns {React.ReactElement} - Returns a JSX element representing the rendered SearchAndResetGlobal component.
 */
var SearchAndResetGlobal = function (_a) {
    var searchTerm = _a.searchTerm, style = _a.style, handleSearch = _a.handleSearch, handleResetSearch = _a.handleResetSearch;
    return (_jsxs("div", __assign({ className: "box_searchReset" }, { children: [_jsxs("div", __assign({ className: "box_searchGlobal" }, { children: [_jsx("input", { type: "text", value: searchTerm, onChange: handleSearch, placeholder: "Search...", id: "searchGlobal" }), _jsx("label", __assign({ htmlFor: "searchGlobal" }, { children: _jsx(FaSearch, {}) }))] })), _jsx("button", __assign({ onClick: handleResetSearch, className: "btn_Reset customComponent", style: style }, { children: _jsx("p", __assign({ className: "btnResetAllTexte" }, { children: "Reset all search" })) }))] })));
};
export default SearchAndResetGlobal;

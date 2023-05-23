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
 * Component for global search and reset all search (global and by property).
 *
 * @component
 * @param {SearchAndResetGlobalProps} props - The props for the SearchAndResetGlobal component.
 * @returns {React.ReactElement} The rendered SearchAndResetGlobal component.
 */
export var SearchAndResetGlobal = function (_a) {
    var searchTerm = _a.searchTerm, handleSearch = _a.handleSearch, handleResetSearch = _a.handleResetSearch;
    return (_jsxs("div", __assign({ className: "box_searchReset" }, { children: [_jsxs("div", __assign({ className: "box_searchGlobal" }, { children: [_jsx("input", { type: "text", value: searchTerm, onChange: handleSearch, placeholder: "Search...", id: "searchGlobal" }), _jsx("label", __assign({ htmlFor: "searchGlobal" }, { children: _jsx(FaSearch, {}) }))] })), _jsx("button", __assign({ onClick: handleResetSearch, style: { marginRight: '20px' }, className: "btn_Reset" }, { children: _jsx("p", __assign({ className: "btnResetAllTexte" }, { children: "Reset all search" })) }))] })));
};

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
var fi_1 = require("react-icons/fi");
function Pagination(props) {
    var page = props.page, totalPages = props.totalPages, handlePageChange = props.handlePageChange;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "pagination" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "replacementBtnPage" }, { children: page > 1 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", __assign({ className: "paginationButton", style: { border: 'none', fontSize: '1.2rem' }, onClick: function () { return handlePageChange(1); } }, { children: (0, jsx_runtime_1.jsx)(fi_1.FiChevronsLeft, {}) })), (0, jsx_runtime_1.jsx)("button", __assign({ className: "paginationButton", style: { border: 'none', fontSize: '1.2rem' }, onClick: function () { return handlePageChange(page - 1); } }, { children: (0, jsx_runtime_1.jsx)(fi_1.FiChevronLeft, {}) }))] })) : '' })), (0, jsx_runtime_1.jsxs)("span", __assign({ className: "paginationText" }, { children: ["Page ", page, " of ", totalPages] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "replacementBtnPage" }, { children: [page < totalPages ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", __assign({ className: "paginationButton", style: { border: 'none', fontSize: '1.2rem' }, onClick: function () { return handlePageChange(page + 1); } }, { children: (0, jsx_runtime_1.jsx)(fi_1.FiChevronRight, {}) })), (0, jsx_runtime_1.jsx)("button", __assign({ className: "paginationButton", style: { border: 'none', fontSize: '1.2rem' }, onClick: function () { return handlePageChange(totalPages); } }, { children: (0, jsx_runtime_1.jsx)(fi_1.FiChevronsRight, {}) }))] })) : '', " "] }))] })));
}
exports.default = Pagination;

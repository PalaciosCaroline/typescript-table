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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { FiChevronsLeft, FiChevronsRight, FiChevronLeft, FiChevronRight, } from 'react-icons/fi';
/**
 * Component for rendering pagination controls.
 *
 * @component
 * @param {Props} props - The props for the Pagination component.
 * @returns {JSX.Element} The rendered Pagination component.
 */
function Pagination(props) {
    var page = props.page, totalPages = props.totalPages, handlePageChange = props.handlePageChange;
    return (_jsxs("div", __assign({ className: "pagination" }, { children: [_jsx("div", __assign({ className: "replacementBtnPage" }, { children: page > 1 ? (_jsxs(_Fragment, { children: [_jsx("button", __assign({ className: "paginationButton", style: { border: 'none', fontSize: '1.2rem' }, onClick: function () { return handlePageChange(1); }, "aria-label": "return to first page", "data-testid": "btnFirstPage" }, { children: _jsx(FiChevronsLeft, {}) })), _jsx("button", __assign({ className: "paginationButton", style: { border: 'none', fontSize: '1.2rem' }, onClick: function () { return handlePageChange(page - 1); }, "aria-label": "go to the previous page", "data-testid": "btnPreviousPage" }, { children: _jsx(FiChevronLeft, {}) }))] })) : ('') })), _jsxs("span", __assign({ className: "paginationText" }, { children: ["Page ", page, " of ", totalPages] })), _jsxs("div", __assign({ className: "replacementBtnPage" }, { children: [page < totalPages ? (_jsxs(_Fragment, { children: [_jsx("button", __assign({ className: "paginationButton", style: { border: 'none', fontSize: '1.2rem' }, onClick: function () { return handlePageChange(page + 1); }, "aria-label": "go to the next page", "data-testid": "btnNextPage" }, { children: _jsx(FiChevronRight, {}) })), _jsx("button", __assign({ className: "paginationButton", style: { border: 'none', fontSize: '1.2rem' }, onClick: function () { return handlePageChange(totalPages); }, "aria-label": "go to the last page", "data-testid": "btnLastPage" }, { children: _jsx(FiChevronsRight, {}) }))] })) : (''), ' '] }))] })));
}
export default Pagination;

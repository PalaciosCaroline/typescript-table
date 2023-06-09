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
import Dropdown from './Dropdown';
/**
 * RowsPerPage: A component for selecting the number of rows to display per page.
 *
 * @component
 * @param {RowsPerPageProps} props - The properties passed to the RowsPerPage component.
 * @returns {React.ReactElement} - Returns a JSX element representing the rendered RowsPerPage component.
 */
var RowsPerPage = function (_a) {
    var handlePerPageChange = _a.handlePerPageChange, style = _a.style;
    return (_jsxs("div", __assign({ className: "box_ChoiceEntries customComponent noHoverEffect", id: "box_ChoiceEntries", style: style }, { children: [_jsx("span", __assign({ className: "box_ChoiceEntriesText" }, { children: "Rows per page:" })), _jsx(Dropdown, { options: ['All', '5', '10', '25', '50', '100'], onOptionClick: function (option) { return handlePerPageChange(option); }, className: "selectNumberOfEntriesPerPage", defaultValueSelectedOption: "10", classNameProps: "RowPerPage", style: style, dataTestId: "RowPerPage" })] })));
};
export default RowsPerPage;

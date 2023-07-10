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
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * A functional component that shows the number of entries and their range.
 *
 * @param props - The props that define the number of entries and their range.
 */
var EntriesInfo = function (_a) {
    var filteredDataLength = _a.filteredDataLength, dataLength = _a.dataLength, page = _a.page, perPage = _a.perPage;
    var content;
    if (filteredDataLength <= 0) {
        content = "0 result of ".concat(dataLength, " entries");
    }
    else if (filteredDataLength === 1) {
        content = "1 entry";
    }
    else {
        content = "".concat((page - 1) * perPage + 1, " - ").concat(Math.min(page * perPage, filteredDataLength), " of ").concat(filteredDataLength, " entries");
    }
    return _jsx("div", __assign({ className: "showingEntries" }, { children: content }));
};
export default EntriesInfo;

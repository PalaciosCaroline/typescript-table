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
var ActionButton = function (_a) {
    var actionType = _a.actionType, visible = _a.visible, handleAction = _a.handleAction, itemId = _a.itemId, icons = _a.icons;
    if (!visible)
        return null;
    return (_jsx("button", __assign({ className: "btn".concat(actionType.charAt(0).toUpperCase() + actionType.slice(1)), onClick: function (e) {
            e.stopPropagation(); // to prevent triggering row selection
            handleAction(itemId);
        }, "aria-label": "".concat(actionType, " this row") }, { children: icons[actionType] })));
};
export default ActionButton;

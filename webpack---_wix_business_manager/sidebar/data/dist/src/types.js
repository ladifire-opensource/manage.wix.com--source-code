"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aSeparator = exports.isSeparator = exports.isSlot = exports.isTitle = exports.isLink = exports.isCategory = void 0;
exports.isCategory = function (category) {
    return !!category.subItems;
};
exports.isLink = function (link) {
    return !!link.navigateToConfig;
};
exports.isTitle = function (entry) {
    return !exports.isCategory(entry) && !exports.isLink(entry) && !!entry.label;
};
exports.isSlot = function (slot) {
    return !!slot.moduleId;
};
exports.isSeparator = function (separator) {
    return !separator.label;
};
var separatorId = 0;
exports.aSeparator = function (id) {
    if (id === void 0) { id = "" + separatorId++; }
    return ({ id: id });
};
//# sourceMappingURL=types.js.map
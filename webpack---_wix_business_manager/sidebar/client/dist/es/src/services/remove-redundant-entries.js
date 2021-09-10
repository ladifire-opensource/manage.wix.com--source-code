import { __assign } from "tslib";
import { isCategory, isLink, isTitle, isSeparator } from '@wix/business-manager-sidebar-data';
export var removeRedundantEntries = function (entries) {
    var pendingTitle;
    var pendingSeparator;
    var cleanEntries = [];
    var appendEntry = function (entry) {
        appendTitleAndSeparator();
        cleanEntries.push(entry);
    };
    var appendCategory = function (entry) {
        var category = __assign(__assign({}, entry), { subItems: removeRedundantEntries(entry.subItems) });
        if (category.subItems.length > 0) {
            appendEntry(category);
        }
    };
    var appendTitleAndSeparator = function () {
        if (pendingSeparator) {
            cleanEntries.push(pendingSeparator);
            pendingSeparator = null;
        }
        if (pendingTitle) {
            cleanEntries.push(pendingTitle);
            pendingTitle = null;
        }
    };
    var removeRedundantFirstDivider = function () {
        if (cleanEntries.length > 0 && isSeparator(cleanEntries[0])) {
            cleanEntries.splice(0, 1);
        }
    };
    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
        var entry = entries_1[_i];
        if (isCategory(entry)) {
            appendCategory(entry);
        }
        else if (isLink(entry)) {
            appendEntry(entry);
        }
        else if (isTitle(entry)) {
            pendingTitle = entry;
        }
        else if (isSeparator(entry)) {
            pendingSeparator = entry;
        }
    }
    removeRedundantFirstDivider();
    return cleanEntries;
};
//# sourceMappingURL=remove-redundant-entries.js.map
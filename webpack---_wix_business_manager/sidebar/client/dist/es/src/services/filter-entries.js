import { __assign } from "tslib";
import { isCategory } from '@wix/business-manager-sidebar-data';
var toEntryWithSubItemsThatMeetTheCondition = function (filters) { return function (entry) {
    if (!isCategory(entry)) {
        return entry;
    }
    return __assign(__assign({}, entry), { subItems: filterEntries(entry.subItems, filters) });
}; };
var byFilters = function (filters) { return function (entry) { return filters.every(function (filter) { return filter(entry); }); }; };
var emptyCategories = function (entry) {
    return isCategory(entry) ? !!entry.subItems.length : true;
};
export var filterEntries = function (entries, filters) {
    return entries
        .map(toEntryWithSubItemsThatMeetTheCondition(filters))
        .filter(byFilters(filters))
        .filter(emptyCategories);
};
//# sourceMappingURL=filter-entries.js.map
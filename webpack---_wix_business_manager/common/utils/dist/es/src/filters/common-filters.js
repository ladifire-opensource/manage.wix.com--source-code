export var isGroupEnabled = function (isEnabled, requiredItems) {
    var isSubGroupEnabled = function (itemsSubGroup) { return toArray(itemsSubGroup).every(isEnabled); };
    var itemsArray = toArray(requiredItems);
    return !itemsArray.length || itemsArray.some(isSubGroupEnabled);
};
var toArray = function (item) { return Array.isArray(item) ? item : [item]; };
//# sourceMappingURL=common-filters.js.map
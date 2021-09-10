import { __assign, __spreadArrays } from "tslib";
import { isSlot, isCategory } from '@wix/business-manager-sidebar-data';
import { get } from 'lodash';
var getEntries = function (entry, configs) {
    if (isCategory(entry)) {
        return [
            __assign(__assign({}, entry), { subItems: populateSlots(entry.subItems, configs) })
        ];
    }
    if (isSlot(entry)) {
        var slotEntries = get(configs, [entry.moduleId, 'slotItems', entry.id], []);
        var fieldsToExtractFromEntry_1 = [
            'enabledByPermissions',
            'visibleByPermission',
            'visibleByExperiments',
            'hideInEditorMode',
            'requireApps',
            'enabledInFlashSite',
            'visibleInSiteless'
        ];
        return slotEntries.map(function (slotEntry) {
            fieldsToExtractFromEntry_1.forEach(function (field) {
                if (typeof entry[field] !== 'undefined') {
                    slotEntry[field] = entry[field];
                }
            });
            return slotEntry;
        });
    }
    return [entry];
};
export var populateSlots = function (entries, configs) {
    return entries.reduce(function (all, entry) { return __spreadArrays(all, getEntries(entry, configs)); }, []);
};
//# sourceMappingURL=populate-slots.js.map
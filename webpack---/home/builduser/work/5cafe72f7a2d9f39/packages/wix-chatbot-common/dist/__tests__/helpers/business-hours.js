"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessHoursBuilder = void 0;
var factory_ts_1 = require("factory.ts");
var businessHoursFactory = factory_ts_1.makeFactory({
    openTwentyFourSeven: false,
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
});
var businessHoursBuilder = function (overrides) {
    if (overrides === void 0) { overrides = {}; }
    var businessHours = businessHoursFactory.build(overrides);
    var methods = {
        build: function () { return businessHours; },
        withOpenTwentyFourSeven: function () {
            businessHours.openTwentyFourSeven = true;
            return methods;
        },
        withMondayActivity: function (start, end, enabled) {
            if (enabled === void 0) { enabled = true; }
            businessHours.monday.push({
                enabled: enabled,
                start: start,
                end: end,
            });
            return methods;
        },
        withSundayActivity: function (start, end, enabled) {
            if (enabled === void 0) { enabled = true; }
            businessHours.sunday.push({
                enabled: enabled,
                start: start,
                end: end,
            });
            return methods;
        },
        withSaturdayActivity: function (start, end, enabled) {
            if (enabled === void 0) { enabled = true; }
            businessHours.saturday.push({
                enabled: enabled,
                start: start,
                end: end,
            });
            return methods;
        },
        withFridayActivity: function (start, end, enabled) {
            if (enabled === void 0) { enabled = true; }
            businessHours.friday.push({
                enabled: enabled,
                start: start,
                end: end,
            });
            return methods;
        },
    };
    return methods;
};
exports.businessHoursBuilder = businessHoursBuilder;
//# sourceMappingURL=business-hours.js.map
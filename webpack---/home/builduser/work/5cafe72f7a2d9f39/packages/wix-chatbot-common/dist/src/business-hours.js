"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInWorkingTime = exports.WEEKDAYS = void 0;
var WEEKDAYS;
(function (WEEKDAYS) {
    WEEKDAYS["sunday"] = "sunday";
    WEEKDAYS["monday"] = "monday";
    WEEKDAYS["tuesday"] = "tuesday";
    WEEKDAYS["wednesday"] = "wednesday";
    WEEKDAYS["thursday"] = "thursday";
    WEEKDAYS["friday"] = "friday";
    WEEKDAYS["saturday"] = "saturday";
})(WEEKDAYS = exports.WEEKDAYS || (exports.WEEKDAYS = {}));
var isInWorkingTime = function (date, businessHours) {
    if (businessHours.openTwentyFourSeven) {
        return true;
    }
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    var weekDay = Object.values(WEEKDAYS)[date.getUTCDay()];
    return businessHours[weekDay].some(function (_a) {
        var enabled = _a.enabled, start = _a.start, end = _a.end;
        var isBefore = start.hours > hours || (start.hours === hours && minutes < start.minutes);
        var isAfter = end.hours < hours || (end.hours === hours && minutes > end.minutes);
        return enabled && !isBefore && !isAfter;
    });
};
exports.isInWorkingTime = isInWorkingTime;
//# sourceMappingURL=business-hours.js.map
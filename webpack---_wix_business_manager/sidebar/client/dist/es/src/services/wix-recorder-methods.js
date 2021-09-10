var addCustomAttribute = function (key, value) { return !!window.wixRecorder && window.wixRecorder.addCustomAttribute(key, value); };
export var reportRole = function (role) { return addCustomAttribute('siteRole', role); };
export var reportPremiumState = function (premiumState) { return addCustomAttribute('premiumState', premiumState); };
//# sourceMappingURL=wix-recorder-methods.js.map
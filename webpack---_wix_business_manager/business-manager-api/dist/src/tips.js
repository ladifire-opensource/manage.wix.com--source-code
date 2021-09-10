"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showTip = exports.showTipActioMethodName = void 0;
var module_registry_1 = require("react-module-container/dist/src/module-registry");
exports.showTipActioMethodName = 'businessManager.showTip';
exports.showTip = function (showTipParams) { return module_registry_1.default.invoke(exports.showTipActioMethodName, showTipParams); };
//# sourceMappingURL=tips.js.map
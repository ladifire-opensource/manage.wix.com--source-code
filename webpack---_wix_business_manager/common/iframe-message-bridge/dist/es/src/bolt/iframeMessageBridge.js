import { __awaiter, __generator } from "tslib";
import { uniqueId } from 'lodash';
export var iframeMessageBridge = function (port, methods) {
    var callbacks = {};
    var toCallbacks = function (arg) {
        if (arg && arg.callbackId) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return port.postMessage({ responseCallbackId: arg.callbackId, args: args });
            };
        }
        return arg;
    };
    var toCallbackId = function (arg) {
        if (typeof arg === 'function') {
            var callbackId = uniqueId();
            callbacks[callbackId] = arg;
            return { callbackId: callbackId };
        }
        if (Array.isArray(arg)) {
            return arg.map(toCallbackId);
        }
        if (arg && typeof arg === 'object') {
            return Object.entries(arg).reduce(function (newObject, _a) {
                var key = _a[0], value = _a[1];
                newObject[key] = toCallbackId(value);
                return newObject;
            }, {});
        }
        return arg;
    };
    port.onmessage = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, method, _b, args, messageId, responseCallbackId, methodCall, argsWithCallbacks, result, _c, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = event.data, method = _a.method, _b = _a.args, args = _b === void 0 ? [] : _b, messageId = _a.messageId, responseCallbackId = _a.responseCallbackId;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 5, , 6]);
                    if (!responseCallbackId) return [3 /*break*/, 2];
                    callbacks[responseCallbackId].apply(callbacks, args);
                    return [3 /*break*/, 4];
                case 2:
                    methodCall = methods[method];
                    if (!methodCall) {
                        throw new Error("TypeError: " + method + " is not a function");
                    }
                    argsWithCallbacks = args.map(toCallbacks);
                    _c = toCallbackId;
                    return [4 /*yield*/, methodCall.apply(void 0, argsWithCallbacks)];
                case 3:
                    result = _c.apply(void 0, [_d.sent()]);
                    port.postMessage({ messageId: messageId, result: result });
                    _d.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_1 = _d.sent();
                    port.postMessage({ messageId: messageId, error: error_1 });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
};
//# sourceMappingURL=iframeMessageBridge.js.map
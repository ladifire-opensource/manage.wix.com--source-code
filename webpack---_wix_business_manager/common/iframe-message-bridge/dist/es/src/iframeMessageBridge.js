import { expose, proxy, windowEndpoint } from 'comlink';
var fromClonablesProxiesTuple = function (clones, proxies) {
    var mapProxies = function (obj) {
        if (obj === Object(obj) && 'proxyId' in obj) {
            // This current scheme can cause issues/exceptions if the API tries to get a function instead of invoke it.
            // This could be adding a proxyType flag and then `return () => proxies[obj.proxyId]()` for those.
            return proxies[obj.proxyId];
        }
        if (Array.isArray(obj)) {
            return obj.map(mapProxies);
        }
        if (obj === Object(obj)) {
            return Object.entries(obj).reduce(function (entries, _a) {
                var key = _a[0], value = _a[1];
                entries[key] = mapProxies(value);
                return entries;
            }, {});
        }
        return obj;
    };
    return mapProxies(clones);
};
function isFunction(functionToCheck) {
    return (functionToCheck && {}.toString.call(functionToCheck) === '[object Function]');
}
// In the thunderbolt side we use a more complex scheme which separates the proxy types from the object.
// This is because existing APIs may already try to reference existing properties in objects and would not
// expect those to be async.
// I feel this type of "best effort" scheme where we try to pass simple cloneable object as is, but if
// any property needs a proxy pass the entire parameter as a proxy is justified, because it's a new API and
// likely doesn't break any existing APIs
var needsProxy = function (obj) {
    if (obj instanceof Promise || isFunction(obj)) {
        return true;
    }
    // Actually the next clause covers arrays too, but this is more readable.
    if (Array.isArray(obj)) {
        return obj.some(needsProxy);
    }
    if (obj === Object(obj)) {
        return Object.values(obj).some(needsProxy);
    }
    return false;
};
var createWrappedMethod = function (method) {
    return function (clones, proxies) {
        var result = method.apply(void 0, fromClonablesProxiesTuple(clones, proxies));
        return needsProxy(result) ? proxy(result) : result;
    };
};
var wrapWithArgumentCombiner = function (api) {
    return Object.keys(api).reduce(function (mapped, key) {
        mapped[key] = createWrappedMethod(api[key]);
        return mapped;
    }, {});
};
export var iframeMessageBridge = function (iframe, methods) {
    expose(wrapWithArgumentCombiner(methods), windowEndpoint(iframe.contentWindow));
};
//# sourceMappingURL=iframeMessageBridge.js.map
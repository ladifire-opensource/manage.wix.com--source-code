!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("BusinessManagerAPI"),require("reactModuleContainer"),require("React"),require("ReactDOM"),require("Sentry")):"function"==typeof define&&define.amd?define("AutoCMS",["BusinessManagerAPI","reactModuleContainer","React","ReactDOM","Sentry"],e):"object"==typeof exports?exports.AutoCMS=e(require("BusinessManagerAPI"),require("reactModuleContainer"),require("React"),require("ReactDOM"),require("Sentry")):(t.AutoCMS=t.AutoCMS||{},t.AutoCMS["auto-cms-bm-module"]=e(t.BusinessManagerAPI,t.reactModuleContainer,t.React,t.ReactDOM,t.Sentry))}(this,(function(t,e,n,r,o){return function(){var i={50090:function(t,e,n){"use strict";var r=a(n(29610)),o=a(n(92175)),i=a(n(22898)),u=a(n(43277)),c=n(10403);function a(t){return t&&t.__esModule?t:{default:t}}function s(t){if("string"==typeof t)try{return JSON.parse(t)}catch(t){}return t}var f=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,i.default)(this,t),this.useNewApi=e.useNewApi||!1,this.experiments=e.experiments||{},this.loaders=[],this.baseUrl=e.baseUrl||"",e.scope&&this.load(e.scope)}return(0,u.default)(t,[{key:"add",value:function(t){this.experiments=(0,o.default)({},this.experiments,t)}},{key:"get",value:function(t){return this.experiments[t]}},{key:"enabled",value:function(t){return"true"===this.get(t)}},{key:"all",value:function(){return this.experiments}},{key:"_addLoader",value:function(t){var e=this;return this.loaders.push(t),t.then((function(){e.loaders=e.loaders.filter((function(e){return e!==t}))})),t}},{key:"_getUrlWithFallback",value:function(t,e){return function(t){return new Promise((function(e,n){var r=new XMLHttpRequest;r.open("GET",t,!0),r.responseType="text",r.withCredentials=!0,r.onload=function(){r.status>=200&&r.status<400?e(r.responseText):n("Failed to load "+t+", status "+r.status)},r.onerror=function(){return n("Failed to load "+t)},r.send()}))}(t).catch((function(){return e}))}},{key:"load",value:function(t){var e=this,n=""+this.baseUrl+(0,c.getAllInScopePath)(t,this.useNewApi),r=this._getUrlWithFallback(n,{}).then(s).then((function(t){return e.add(t)}));return this._addLoader(r)}},{key:"conduct",value:function(t,e){var n=this,o=""+this.baseUrl+(0,c.getExperimentPath)(t,e,this.useNewApi),i=this._getUrlWithFallback(o,e).then((function(e){return n.add((0,r.default)({},t,e)),e}));return this._addLoader(i)}},{key:"pending",value:function(){return!!this.loaders.length}},{key:"ready",value:function(){return Promise.all(this.loaders)}}]),t}();e.Z=f},10403:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=e.petriUrlMap={new:{conductAllInScope:"/_api/wix-laboratory-server/v1/laboratory/platform/conductAllInScope",conductExperiment:"/_api/wix-laboratory-server/v1/laboratory/platform/conductExperiment"},old:{conductAllInScope:"/_api/wix-laboratory-server/laboratory/conductAllInScope",conductExperiment:"/_api/wix-laboratory-server/laboratory/conductExperiment"}};e.getAllInScopePath=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=e?n.new.conductAllInScope+"?scope="+t:n.old.conductAllInScope+"?scope="+t;return r},e.getExperimentPath=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=r?n.new.conductExperiment+"?key="+t+"&fallbackValue="+e:n.old.conductExperiment+"?key="+t+"&fallback="+e;return o}},52664:function(t,e,n){t.exports={default:n(84522),__esModule:!0}},38732:function(t,e,n){t.exports={default:n(22623),__esModule:!0}},22898:function(t,e){"use strict";e.__esModule=!0,e.default=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},43277:function(t,e,n){"use strict";e.__esModule=!0;var r,o=n(38732),i=(r=o)&&r.__esModule?r:{default:r};e.default=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,i.default)(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}()},29610:function(t,e,n){"use strict";e.__esModule=!0;var r,o=n(38732),i=(r=o)&&r.__esModule?r:{default:r};e.default=function(t,e,n){return e in t?(0,i.default)(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},92175:function(t,e,n){"use strict";e.__esModule=!0;var r,o=n(52664),i=(r=o)&&r.__esModule?r:{default:r};e.default=i.default||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}},84522:function(t,e,n){n(4600),t.exports=n(97779).Object.assign},22623:function(t,e,n){n(11662);var r=n(97779).Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)}},68766:function(t){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},94179:function(t,e,n){var r=n(63509);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},17110:function(t,e,n){var r=n(96477),o=n(92112),i=n(85346);t.exports=function(t){return function(e,n,u){var c,a=r(e),s=o(a.length),f=i(u,s);if(t&&n!=n){for(;s>f;)if((c=a[f++])!=c)return!0}else for(;s>f;f++)if((t||f in a)&&a[f]===n)return t||f||0;return!t&&-1}}},71020:function(t){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},97779:function(t){var e=t.exports={version:"2.6.12"};"number"==typeof __e&&(__e=e)},57738:function(t,e,n){var r=n(68766);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},61056:function(t){t.exports=function(t){if(null==t)throw TypeError("Can't call method on  "+t);return t}},29313:function(t,e,n){t.exports=!n(12552)((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},50647:function(t,e,n){var r=n(63509),o=n(5045).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},20592:function(t){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},51955:function(t,e,n){var r=n(5045),o=n(97779),i=n(57738),u=n(68765),c=n(91555),a=function(t,e,n){var s,f,l,p=t&a.F,d=t&a.G,y=t&a.S,h=t&a.P,v=t&a.B,g=t&a.W,m=d?o:o[e]||(o[e]={}),b=m.prototype,w=d?r:y?r[e]:(r[e]||{}).prototype;for(s in d&&(n=e),n)(f=!p&&w&&void 0!==w[s])&&c(m,s)||(l=f?w[s]:n[s],m[s]=d&&"function"!=typeof w[s]?n[s]:v&&f?i(l,r):g&&w[s]==l?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(l):h&&"function"==typeof l?i(Function.call,l):l,h&&((m.virtual||(m.virtual={}))[s]=l,t&a.R&&b&&!b[s]&&u(b,s,l)))};a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},12552:function(t){t.exports=function(t){try{return!!t()}catch(t){return!0}}},5045:function(t){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},91555:function(t){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},68765:function(t,e,n){var r=n(60168),o=n(96394);t.exports=n(29313)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},76752:function(t,e,n){t.exports=!n(29313)&&!n(12552)((function(){return 7!=Object.defineProperty(n(50647)("div"),"a",{get:function(){return 7}}).a}))},87604:function(t,e,n){var r=n(71020);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},63509:function(t){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},18217:function(t){t.exports=!0},92858:function(t,e,n){"use strict";var r=n(29313),o=n(31824),i=n(20895),u=n(7666),c=n(24471),a=n(87604),s=Object.assign;t.exports=!s||n(12552)((function(){var t={},e={},n=Symbol(),r="abcdefghijklmnopqrst";return t[n]=7,r.split("").forEach((function(t){e[t]=t})),7!=s({},t)[n]||Object.keys(s({},e)).join("")!=r}))?function(t,e){for(var n=c(t),s=arguments.length,f=1,l=i.f,p=u.f;s>f;)for(var d,y=a(arguments[f++]),h=l?o(y).concat(l(y)):o(y),v=h.length,g=0;v>g;)d=h[g++],r&&!p.call(y,d)||(n[d]=y[d]);return n}:s},60168:function(t,e,n){var r=n(94179),o=n(76752),i=n(93772),u=Object.defineProperty;e.f=n(29313)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},20895:function(t,e){e.f=Object.getOwnPropertySymbols},26162:function(t,e,n){var r=n(91555),o=n(96477),i=n(17110)(!1),u=n(17455)("IE_PROTO");t.exports=function(t,e){var n,c=o(t),a=0,s=[];for(n in c)n!=u&&r(c,n)&&s.push(n);for(;e.length>a;)r(c,n=e[a++])&&(~i(s,n)||s.push(n));return s}},31824:function(t,e,n){var r=n(26162),o=n(20592);t.exports=Object.keys||function(t){return r(t,o)}},7666:function(t,e){e.f={}.propertyIsEnumerable},96394:function(t){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},17455:function(t,e,n){var r=n(59055)("keys"),o=n(40255);t.exports=function(t){return r[t]||(r[t]=o(t))}},59055:function(t,e,n){var r=n(97779),o=n(5045),i="__core-js_shared__",u=o[i]||(o[i]={});(t.exports=function(t,e){return u[t]||(u[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n(18217)?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})},85346:function(t,e,n){var r=n(75050),o=Math.max,i=Math.min;t.exports=function(t,e){return(t=r(t))<0?o(t+e,0):i(t,e)}},75050:function(t){var e=Math.ceil,n=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?n:e)(t)}},96477:function(t,e,n){var r=n(87604),o=n(61056);t.exports=function(t){return r(o(t))}},92112:function(t,e,n){var r=n(75050),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},24471:function(t,e,n){var r=n(61056);t.exports=function(t){return Object(r(t))}},93772:function(t,e,n){var r=n(63509);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},40255:function(t){var e=0,n=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+n).toString(36))}},4600:function(t,e,n){var r=n(51955);r(r.S+r.F,"Object",{assign:n(92858)})},11662:function(t,e,n){var r=n(51955);r(r.S+r.F*!n(29313),"Object",{defineProperty:n(60168).f})},49664:function(t,e,n){"use strict";n.r(e);var r,o=n(24197),i=n(95772),u=n(1024),c=n.n(u),a=n(30314),s=n(7481),f=JSON.parse('{"t4":"autoCMS.embed"}'),l=function(){return i.ModuleRegistry.registerMethod(f.t4,(function(){return function(t){!function(t){var e=t.historyType,n=void 0===e?"memory":e,r=t.node,o=t.configuration,u=i.ModuleRegistry.component(s.yZ);if(!u)throw new Error("AutoCMSPageComponent is undefined");if(!r)throw new Error("Node to render AutoCMSPageComponent is undefined.");(0,a.render)(c().createElement(u,{historyType:n,configuration:o,isEmbed:!0}),r)}(t)}}))},p=n(61442),d=(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),y=function(t){function e(e){return t.call(this,e,{files:[["https://static.parastorage.com/unpkg/ag-grid-enterprise@16.0.1/dist/ag-grid-enterprise.min.noStyle.js","https://static.parastorage.com/unpkg/codemirror@5.30.0/lib/codemirror.js","https://static.parastorage.com/unpkg/codemirror@5.30.0/mode/xml/xml.js","https://static.parastorage.com/unpkg/codemirror@5.30.0/mode/javascript/javascript.js","https://static.parastorage.com/unpkg/codemirror@5.30.0/addon/lint/lint.js","https://static.parastorage.com/unpkg/codemirror@5.30.0/addon/fold/foldcode.js","https://static.parastorage.com/unpkg/codemirror@5.30.0/addon/fold/foldgutter.js","https://static.parastorage.com/unpkg/codemirror@5.30.0/addon/fold/brace-fold.js","https://static.parastorage.com/unpkg/codemirror@5.30.0/addon/edit/matchbrackets.js","https://static.parastorage.com/unpkg/@wix/wix-base-ui@3.0.0/dist/base-ui.js","https://static.parastorage.com/unpkg/@wix/wix-richtext@3.258.0/dist/bundleWixRichText.js","https://static.parastorage.com/unpkg/@wix/wix-base-ui@3.0.0/dist/base-ui.js",e.config.topology.wixDatabasesStaticsUrl+"statics/"+s.v3+".js"],e.config.topology.wixDatabasesStaticsUrl+"statics/"+s.v3+".css"],component:s.v3})||this}return d(e,t),e}(i.ReactLazyComponent),h=n(49500),v=n(29430),g=function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),m=function(t){function e(n){var r=t.call(this,n)||this;return r.ignoreSentry=!1,Object.setPrototypeOf(r,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(r,e),r}return g(e,t),e.prototype.ignored=function(){return this.ignoreSentry=!0,this},e}(Error),b={dsn:"https://e41bc3a9c6584d4eab1f69cda756b008@sentry.wixpress.com/187",release:"10f929f65cd9636e70cf8061e52cf2367b7199212d6062149c0e18f8",environment:v.dM?"start:bo":v.jp?"testing":v.yG?"development":v.yv?"production":"unknown",beforeSend:function(t,e){var n,r=(null==e?void 0:e.originalException)||(null==e?void 0:e.syntheticException),o=r instanceof Error&&((n=r)instanceof m&&n.ignoreSentry);return!v.yv||v.dM||v.jp?(console.error("Sentry error "+(o?" (ignored)":""),r),null):o?null:t}},w=new h.BrowserClient(b),x=new h.Hub(w),_=n(50090),S=function(t,e,n,r){return new(n||(n=Promise))((function(o,i){function u(t){try{a(r.next(t))}catch(t){i(t)}}function c(t){try{a(r.throw(t))}catch(t){i(t)}}function a(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(u,c)}a((r=r.apply(t,e||[])).next())}))},j=function(t,e){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=u.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=e.call(t,u)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}},M=function(){return S(void 0,void 0,void 0,(function(){var t;return j(this,(function(e){switch(e.label){case 0:return[4,(t=new _.Z({scope:"wix-code"})).ready()];case 1:return e.sent(),[2,t.all()]}}))}))},O=function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();(0,o.registerModule)(s.ce,function(t){function e(e){var n=t.call(this,e)||this;return n.initSentry=function(t,e,n,r){var i="dashboard"===n?"business-manager":n;x.configureScope((function(o){o.setUser({id:t});var u={msid:e,mode:i};n&&(u.viewMode=n),r&&(u.locale=r),o.setTags(u)}));var u=x.getClient();u&&(0,o.registerPageComponentMonitors)(o.PageComponentId.WixCodeDatabase,{sentryClient:u})},n.registerComponentWithModuleParams(s.yZ,p.AutoCMSLazyPageComponent),n.registerComponentWithModuleParams(s.pW,y),n}return O(e,t),e.prototype.register=function(){l()},e.prototype.init=function(t){var e=t.userId,n=t.viewMode,r=t.metaSiteId,o=t.accountLanguage;i.ModuleRegistry.registerMethod("auto-cms.getActiveExperiments",(function(){return M})),this.initSentry(e,r,n,o)},e}(o.BusinessManagerModule))},61442:function(t,e,n){"use strict";n.d(e,{AutoCMSLazyPageComponent:function(){return d}});var r,o=n(95772),i=JSON.parse('{"A":"auto-cms-externals"}'),u=n(7481),c=n(29430),a=(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),s=function(t,e,n,r){return new(n||(n=Promise))((function(o,i){function u(t){try{a(r.next(t))}catch(t){i(t)}}function c(t){try{a(r.throw(t))}catch(t){i(t)}}function a(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(u,c)}a((r=r.apply(t,e||[])).next())}))},f=function(t,e){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=u.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=e.call(t,u)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}},l=function(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,o,i=n.call(t),u=[];try{for(;(void 0===e||e-- >0)&&!(r=i.next()).done;)u.push(r.value)}catch(t){o={error:t}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return u},p=function(t,e){for(var n=0,r=e.length,o=t.length;n<r;n++,o++)t[o]=e[n];return t},d=function(t){function e(e){var n=this,r="editor"===e.viewMode?[e.config.topology.staticsBaseUrl+"/services/js-platform-editor-sdk/"+u.qP+"/lib/editorSDK.min.js"]:[],a=c.yv?[""+e.config.topology.autoCmsStaticsUrl+u.Yk+".bundle.css"]:[];return n=t.call(this,e,{files:[p(p(p([],l(r)),["https://static.parastorage.com/unpkg/@wix/wix-base-ui@3.0.0/dist/base-ui.js",e.config.topology.autocmsServicesUrl+"autocmsServices.js",e.config.topology.autocmsServicesUrl+"autocmsServices.css",""+e.config.topology.autoCmsStaticsUrl+i.A+".js",""+e.config.topology.autoCmsStaticsUrl+u.Yk+".js"]),l(a))],component:u.Yk,resolve:function(){return s(n,void 0,void 0,(function(){return f(this,(function(t){switch(t.label){case 0:return[4,o.ModuleRegistry.invoke("auto-cms.getActiveExperiments")];case 1:return[2,{experiments:t.sent()}]}}))}))}})||this}return a(e,t),e}(o.ReactLazyComponent)},29430:function(t,e,n){"use strict";n.d(e,{yv:function(){return o},yG:function(){return i},jp:function(){return a},dM:function(){return s}});var r=n(34406),o=!0,i=!1,u=r.env.IS_MOCHA,c=r.env.IS_JEST,a=u||c,s=r.env.IS_BO},34406:function(t){var e,n,r=t.exports={};function o(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function u(t){if(e===setTimeout)return setTimeout(t,0);if((e===o||!e)&&setTimeout)return e=setTimeout,setTimeout(t,0);try{return e(t,0)}catch(n){try{return e.call(null,t,0)}catch(n){return e.call(this,t,0)}}}!function(){try{e="function"==typeof setTimeout?setTimeout:o}catch(t){e=o}try{n="function"==typeof clearTimeout?clearTimeout:i}catch(t){n=i}}();var c,a=[],s=!1,f=-1;function l(){s&&c&&(s=!1,c.length?a=c.concat(a):f=-1,a.length&&p())}function p(){if(!s){var t=u(l);s=!0;for(var e=a.length;e;){for(c=a,a=[];++f<e;)c&&c[f].run();f=-1,e=a.length}c=null,s=!1,function(t){if(n===clearTimeout)return clearTimeout(t);if((n===i||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(t);try{n(t)}catch(e){try{return n.call(null,t)}catch(e){return n.call(this,t)}}}(t)}}function d(t,e){this.fun=t,this.array=e}function y(){}r.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];a.push(new d(t,e)),1!==a.length||s||u(p)},d.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=y,r.addListener=y,r.once=y,r.off=y,r.removeListener=y,r.removeAllListeners=y,r.emit=y,r.prependListener=y,r.prependOnceListener=y,r.listeners=function(t){return[]},r.binding=function(t){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(t){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}},24197:function(e){"use strict";e.exports=t},1024:function(t){"use strict";t.exports=n},30314:function(t){"use strict";t.exports=r},49500:function(t){"use strict";t.exports=o},95772:function(t){"use strict";t.exports=e},7481:function(t){"use strict";t.exports=JSON.parse('{"ce":"WIX_DATABASES","Yk":"auto-cms-page-component","yZ":"wix-databases-lazy-page-component","v3":"collection-view-component","pW":"collection-view-lazy-component","qP":"1.262.0"}')}},u={};function c(t){var e=u[t];if(void 0!==e)return e.exports;var n=u[t]={exports:{}};return i[t](n,n.exports,c),n.exports}return c.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return c.d(e,{a:e}),e},c.d=function(t,e){for(var n in e)c.o(e,n)&&!c.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c(49664)}()}));
//# sourceMappingURL=auto-cms-bm-module.js.map
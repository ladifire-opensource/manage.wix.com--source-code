"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceParams = void 0;
function replaceParams(files, params) {
    return Object.keys(files).map(function (i) {
        var file = files[i];
        if (typeof file === 'string') {
            Object.keys(params).forEach(function (key) {
                file = file.replace(new RegExp('\\${' + key + '}', 'g'), params[key]);
            });
            return file;
        }
        return replaceParams(file, params);
    });
}
exports.replaceParams = replaceParams;

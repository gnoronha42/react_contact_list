"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (paths) {
    return paths
        .reduce(function (previous, path, index) {
        return "" + previous + (typeof path === 'string'
            ? "" + (index > 0 ? '.' : '') + path
            : "[" + path + "]");
    }, '')
        .toString();
});
//# sourceMappingURL=convertArrayToPathName.js.map
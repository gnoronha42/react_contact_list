"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.yupResolver = void 0;
var react_hook_form_1 = require("react-hook-form");
var parseErrorSchema = function (error, validateAllFieldCriteria) {
    var _a;
    return Array.isArray(error.inner) && error.inner.length
        ? error.inner.reduce(function (previous, _a) {
            var _b, _c;
            var path = _a.path, message = _a.message, type = _a.type;
            var previousTypes = (previous[path] && previous[path].types) || {};
            var key = path || type;
            return __assign(__assign({}, previous), (key
                ? (_b = {},
                    _b[key] = __assign(__assign({}, (previous[key] || {
                        message: message,
                        type: type,
                    })), (validateAllFieldCriteria
                        ? {
                            types: __assign(__assign({}, previousTypes), (_c = {}, _c[type] = previousTypes[type]
                                ? __spread([].concat(previousTypes[type]), [message]) : message, _c)),
                        }
                        : {})),
                    _b) : {}));
        }, {})
        : (_a = {},
            _a[error.path] = { message: error.message, type: error.type },
            _a);
};
exports.yupResolver = function (schema, options) {
    if (options === void 0) { options = {
        abortEarly: false,
    }; }
    return function (values, context, validateAllFieldCriteria) {
        if (validateAllFieldCriteria === void 0) { validateAllFieldCriteria = false; }
        return __awaiter(void 0, void 0, void 0, function () {
            var _a, e_1, parsedErrors;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        if (options.context &&
                            process.env.NODE_ENV === 'development') {
                            // eslint-disable-next-line no-console
                            console.warn("You should not used the yup options context. Please, use the 'useForm' context object instead");
                        }
                        _a = {};
                        return [4 /*yield*/, schema.validate(values, __assign(__assign({}, options), { context: context }))];
                    case 1: return [2 /*return*/, (_a.values = (_b.sent()),
                            _a.errors = {},
                            _a)];
                    case 2:
                        e_1 = _b.sent();
                        parsedErrors = parseErrorSchema(e_1, validateAllFieldCriteria);
                        return [2 /*return*/, {
                                values: {},
                                errors: react_hook_form_1.transformToNestObject(parsedErrors),
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
};
//# sourceMappingURL=yup.js.map
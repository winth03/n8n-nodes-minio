"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectExists = exports.removeObject = exports.putObject = exports.getObject = exports.listObjects = void 0;
var list_operation_1 = require("./list.operation");
Object.defineProperty(exports, "listObjects", { enumerable: true, get: function () { return list_operation_1.listObjects; } });
var get_operation_1 = require("./get.operation");
Object.defineProperty(exports, "getObject", { enumerable: true, get: function () { return get_operation_1.getObject; } });
var put_operation_1 = require("./put.operation");
Object.defineProperty(exports, "putObject", { enumerable: true, get: function () { return put_operation_1.putObject; } });
var remove_operation_1 = require("./remove.operation");
Object.defineProperty(exports, "removeObject", { enumerable: true, get: function () { return remove_operation_1.removeObject; } });
var exists_operation_1 = require("./exists.operation");
Object.defineProperty(exports, "objectExists", { enumerable: true, get: function () { return exists_operation_1.objectExists; } });
//# sourceMappingURL=index.js.map
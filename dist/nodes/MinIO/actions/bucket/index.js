"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeBucket = exports.removeBucket = exports.bucketExists = exports.listBuckets = void 0;
var list_operation_1 = require("./list.operation");
Object.defineProperty(exports, "listBuckets", { enumerable: true, get: function () { return list_operation_1.listBuckets; } });
var exists_operation_1 = require("./exists.operation");
Object.defineProperty(exports, "bucketExists", { enumerable: true, get: function () { return exists_operation_1.bucketExists; } });
var remove_operation_1 = require("./remove.operation");
Object.defineProperty(exports, "removeBucket", { enumerable: true, get: function () { return remove_operation_1.removeBucket; } });
var make_operation_1 = require("./make.operation");
Object.defineProperty(exports, "makeBucket", { enumerable: true, get: function () { return make_operation_1.makeBucket; } });
//# sourceMappingURL=index.js.map
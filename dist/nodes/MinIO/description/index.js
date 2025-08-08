"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeDescription = exports.properties = void 0;
const resources_1 = require("./resources");
const bucket_properties_1 = require("./bucket.properties");
const object_properties_1 = require("./object.properties");
const presigned_properties_1 = require("./presigned.properties");
exports.properties = [
    resources_1.resourceProperty,
    bucket_properties_1.bucketOperations,
    object_properties_1.objectOperations,
    presigned_properties_1.presignedOperations,
    bucket_properties_1.bucketNameForBucket,
    object_properties_1.bucketNameForObject,
    presigned_properties_1.bucketNameForPresigned,
    object_properties_1.objectNameForObject,
    presigned_properties_1.objectNameForPresigned,
    object_properties_1.fieldName,
];
var description_1 = require("./description");
Object.defineProperty(exports, "nodeDescription", { enumerable: true, get: function () { return description_1.nodeDescription; } });
//# sourceMappingURL=index.js.map
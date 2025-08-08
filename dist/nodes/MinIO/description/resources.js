"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceProperty = void 0;
exports.resourceProperty = {
    displayName: 'Resource',
    name: 'resource',
    type: 'options',
    noDataExpression: true,
    options: [
        {
            name: 'Bucket',
            value: 'bucket',
        },
        {
            name: 'Object',
            value: 'object',
        },
        {
            name: 'Presigned',
            value: 'presigned',
        }
    ],
    default: 'bucket',
};
//# sourceMappingURL=resources.js.map
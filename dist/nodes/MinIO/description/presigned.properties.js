"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectNameForPresigned = exports.bucketNameForPresigned = exports.presignedOperations = void 0;
exports.presignedOperations = {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
        show: {
            resource: [
                'presigned',
            ],
        },
    },
    options: [
        {
            name: 'Get',
            value: 'get',
            action: 'Generates a presigned URL for HTTP GET operations',
        },
        {
            name: 'Put',
            value: 'put',
            action: 'Generates a presigned URL for HTTP PUT operations',
        },
    ],
    default: 'get',
};
exports.bucketNameForPresigned = {
    displayName: 'Bucket Name',
    name: 'bucketName',
    type: 'string',
    displayOptions: {
        show: {
            resource: [
                'presigned',
            ],
        },
    },
    required: true,
    default: '',
};
exports.objectNameForPresigned = {
    displayName: 'Object Name',
    name: 'objectName',
    type: 'string',
    displayOptions: {
        show: {
            resource: [
                'presigned',
            ],
        },
    },
    required: true,
    default: '',
};
//# sourceMappingURL=presigned.properties.js.map
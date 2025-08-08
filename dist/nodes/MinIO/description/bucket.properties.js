"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bucketNameForBucket = exports.bucketOperations = void 0;
exports.bucketOperations = {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
        show: {
            resource: [
                'bucket',
            ],
        },
    },
    options: [
        {
            name: 'List',
            value: 'list',
            action: 'List all buckets',
        },
        {
            name: 'Make',
            value: 'make',
            action: 'Make a bucket',
        },
        {
            name: 'Remove',
            value: 'remove',
            action: 'Remove a bucket',
        },
        {
            name: 'Exists',
            value: 'exists',
            action: 'Check if a bucket exists',
        }
    ],
    default: 'list',
};
exports.bucketNameForBucket = {
    displayName: 'Bucket Name',
    name: 'bucketName',
    type: 'string',
    displayOptions: {
        show: {
            resource: [
                'bucket',
            ],
        },
        hide: {
            operation: [
                'list',
            ],
        },
    },
    required: true,
    default: '',
};
//# sourceMappingURL=bucket.properties.js.map
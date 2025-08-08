"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldName = exports.objectNameForObject = exports.bucketNameForObject = exports.objectOperations = void 0;
exports.objectOperations = {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
        show: {
            resource: [
                'object',
            ],
        },
    },
    options: [
        {
            name: 'Exists',
            value: 'exists',
            action: 'Check if an object exists',
        },
        {
            name: 'Get',
            value: 'get',
            action: 'Get an object',
        },
        {
            name: 'List',
            value: 'list',
            action: 'List all objects in a bucket',
        },
        {
            name: 'Put',
            value: 'put',
            action: 'Uploads an object',
        },
        {
            name: 'Remove',
            value: 'remove',
            action: 'Remove an object',
        }
    ],
    default: 'list',
};
exports.bucketNameForObject = {
    displayName: 'Bucket Name',
    name: 'bucketName',
    type: 'string',
    displayOptions: {
        show: {
            resource: [
                'object',
            ],
        },
    },
    required: true,
    default: '',
};
exports.objectNameForObject = {
    displayName: 'Object Name',
    name: 'objectName',
    type: 'string',
    displayOptions: {
        show: {
            resource: [
                'object',
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
exports.fieldName = {
    displayName: 'Field Name',
    name: 'fieldName',
    type: 'string',
    displayOptions: {
        show: {
            resource: [
                'object',
            ],
            operation: [
                'put',
                'get',
            ],
        },
    },
    required: true,
    default: 'data',
};
//# sourceMappingURL=object.properties.js.map
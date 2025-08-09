import { INodeProperties } from 'n8n-workflow';

export const objectOperations: INodeProperties = {
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
			name: 'Get',
			value: 'get',
			action: 'Download an object',
			description: 'Downloads an object from the bucket and returns it as binary data',
		},
		{
			name: 'List',
			value: 'list',
			action: 'List objects in a bucket',
			description: 'Lists all objects in a bucket',
		},
		{
			name: 'Put',
			value: 'put',
			action: 'Upload an object',
			description: 'Uploads an object to the bucket from binary data',
		},
		{
			name: 'Remove',
			value: 'remove',
			action: 'Remove an object',
			description: 'Removes an object from the bucket',
		},
		{
			name: 'Stat',
			value: 'stat',
			action: 'Get object information',
			description: 'Retrieves metadata about an object in the specified bucket',
		},
	],
	default: 'list',
};

export const bucketNameForObject: INodeProperties = {
	displayName: 'Bucket Name',
	name: 'bucketName',
	type: 'resourceLocator',
	description: 'Name of the bucket containing the object',
	modes: [
		{
			displayName: 'From List',
			name: 'list',
			type: 'list',
			typeOptions: {
				searchListMethod: 'listAllBuckets',
			}
		},
		{
			displayName: 'ID',
			name: 'id',
			type: 'string',
		}
	],
	displayOptions: {
		show: {
			resource: [
				'object',
			],
		},
	},
	required: true,
	default: { mode: 'list', value: '' },
};

export const objectNameForObject: INodeProperties = {
	displayName: 'Object Name',
	name: 'objectName',
	type: 'resourceLocator',
	description: 'Name of the object (key) in the bucket',
	modes: [
		{
			displayName: 'From List',
			name: 'list',
			type: 'list',
			typeOptions: {
				searchListMethod: 'listAllObjects',
			}
		},
		{
			displayName: 'ID',
			name: 'id',
			type: 'string',
		}
	],
	displayOptions: {
		show: {
			resource: [
				'object',
			],
		},
		hide: {
			operation: [
				'list',
				'put',
			],
		},
	},
	required: true,
	default: { mode: 'list', value: '' },
};

export const fieldName: INodeProperties = {
	displayName: 'Field Name',
	name: 'fieldName',
	type: 'string',
	description: 'Name of the binary field to use for object data',
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

// Export all object properties as an array for spreading
export const allObjectProperties: INodeProperties[] = [
	objectOperations,
	bucketNameForObject,
	objectNameForObject,
	fieldName,
];

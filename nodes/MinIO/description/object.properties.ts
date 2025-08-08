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
			name: 'Exists',
			value: 'exists',
			action: 'Check if an object exists',
			description: 'Checks if an object exists in the specified bucket',
		},
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
		}
	],
	default: 'list',
};

export const bucketNameForObject: INodeProperties = {
	displayName: 'Bucket Name',
	name: 'bucketName',
	type: 'string',
	description: 'Name of the bucket containing the object',
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

export const objectNameForObject: INodeProperties = {
	displayName: 'Object Name',
	name: 'objectName',
	type: 'string',
	description: 'Name of the object (key) in the bucket',
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

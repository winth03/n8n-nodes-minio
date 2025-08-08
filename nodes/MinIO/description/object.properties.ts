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

export const bucketNameForObject: INodeProperties = {
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

export const objectNameForObject: INodeProperties = {
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

export const fieldName: INodeProperties = {
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

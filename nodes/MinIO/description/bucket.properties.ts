import { INodeProperties } from 'n8n-workflow';

export const bucketOperations: INodeProperties = {
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

export const bucketNameForBucket: INodeProperties = {
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

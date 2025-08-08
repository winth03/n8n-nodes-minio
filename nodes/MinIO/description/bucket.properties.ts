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
			description: 'Lists all buckets owned by the authenticated user',
		},
		{
			name: 'Make',
			value: 'make',
			action: 'Create a new bucket',
			description: 'Creates a new bucket with the specified name',
		},
		{
			name: 'Remove',
			value: 'remove',
			action: 'Remove a bucket',
			description: 'Removes an empty bucket',
		},
		{
			name: 'Exists',
			value: 'exists',
			action: 'Check if a bucket exists',
			description: 'Checks if a bucket exists and is accessible',
		}
	],
	default: 'list',
};

export const bucketNameForBucket: INodeProperties = {
	displayName: 'Bucket Name',
	name: 'bucketName',
	type: 'string',
	description: 'Name of the bucket to operate on',
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

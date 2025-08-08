import { INodeProperties } from "n8n-workflow";

export const presignedOperations: INodeProperties = {
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
			action: 'Generate presigned URL for download',
			description: 'Generates a presigned URL for downloading an object (default expiry: 7 days)',
		},
		{
			name: 'Put',
			value: 'put',
			action: 'Generate presigned URL for upload',
			description: 'Generates a presigned URL for uploading an object (default expiry: 7 days)',
		},
	],
	default: 'get',
};

export const bucketNameForPresigned: INodeProperties = {
	displayName: 'Bucket Name',
	name: 'bucketName',
	type: 'string',
	description: 'Name of the bucket for which to generate the presigned URL',
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

export const objectNameForPresigned: INodeProperties = {
	displayName: 'Object Name',
	name: 'objectName',
	type: 'string',
	description: 'Name of the object (key) for which to generate the presigned URL',
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

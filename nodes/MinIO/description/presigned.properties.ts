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

export const bucketNameForPresigned: INodeProperties = {
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

export const objectNameForPresigned: INodeProperties = {
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

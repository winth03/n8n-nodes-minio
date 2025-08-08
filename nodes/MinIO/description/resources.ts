import { INodeProperties } from 'n8n-workflow';

export const resourceProperty: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Bucket',
			value: 'bucket',
		},
		{
			name: 'Object',
			value: 'object',
		},
		{
			name: 'Presigned',
			value: 'presigned',
		}
	],
	default: 'bucket',
};

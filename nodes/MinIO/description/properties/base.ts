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
			description: 'Operations on storage buckets',
		},
		{
			name: 'Object',
			value: 'object',
			description: 'Operations on objects stored in buckets',
		},
		{
			name: 'Presigned',
			value: 'presigned',
			description: 'Generate presigned URLs for temporary access',
		},
	],
	default: 'bucket',
};

// Export all base properties as an array for spreading
export const allBaseProperties: INodeProperties[] = [
	resourceProperty,
];

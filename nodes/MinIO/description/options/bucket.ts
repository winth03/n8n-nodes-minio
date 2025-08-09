import { INodeProperties } from "n8n-workflow";

export const optionsForMakeBucket: INodeProperties = {
	displayName: 'Options',
	name: 'options',
	type: 'collection',
	placeholder: 'Add option',
	default: {},
	displayOptions: {
		show: {
			resource: ['bucket'],
			operation: ['make'],
		}
	},
	options: [
		{
			displayName: 'Region',
			name: 'region',
			type: 'string',
			description: 'The region where the bucket will be created',
			default: 'us-east-1',
		},
		{
			displayName: 'Bucket Options',
			name: 'makeOpts',
			type: 'json',
			description: 'Options to create a bucket',
			default: '{}',
		},
	],
};

// Export all bucket options as an array for easy spreading
export const allBucketOptions = [
	optionsForMakeBucket,
];

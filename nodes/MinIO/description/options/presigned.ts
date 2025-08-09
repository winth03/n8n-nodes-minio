import { INodeProperties } from "n8n-workflow";

export const optionsForGetPresignedUrl: INodeProperties = {
	displayName: 'Options',
	name: 'options',
	type: 'collection',
	placeholder: 'Add option',
	default: {},
	displayOptions: {
		show: {
			resource: ['presigned'],
			operation: ['get'],
		}
	},
	options: [
		{
			displayName: 'Expiration',
			name: 'expiry',
			type: 'number',
			description: 'The expiration time in seconds for the presigned URL',
			default: 604800,
		},
		{
			displayName: 'Response Headers',
			name: 'reqParams',
			type: 'collection',
			description: 'Response headers to override',
			placeholder: 'Add header',
			default: {},
			options: [
				{
					displayName: 'Header Name',
					name: 'name',
					type: 'string',
					description: 'Name of the header to include',
					default: '',
				},
				{
					displayName: 'Header Value',
					name: 'value',
					type: 'string',
					description: 'Value of the header to include',
					default: '',
				},
			],
		},
		{
			displayName: 'Request Date',
			name: 'requestDate',
			type: 'dateTime',
			description: 'A date object, the URL will be issued at',
			default: '',
		}
	],
};

export const optionsForPutPresignedUrl: INodeProperties = {
	displayName: 'Options',
	name: 'options',
	type: 'collection',
	placeholder: 'Add option',
	default: {},
	displayOptions: {
		show: {
			resource: ['presigned'],
			operation: ['put'],
		}
	},
	options: [
		{
			displayName: 'Expiration',
			name: 'expiry',
			type: 'number',
			description: 'The expiration time in seconds for the presigned URL',
			default: 604800,
		},
	],
};

// Export all bucket options as an array for easy spreading
export const allPresignedOptions = [
	optionsForGetPresignedUrl,
	optionsForPutPresignedUrl,
];

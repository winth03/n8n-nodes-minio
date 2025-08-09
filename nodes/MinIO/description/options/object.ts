import { INodeProperties } from "n8n-workflow";

export const optionsForListObjects: INodeProperties = {
	displayName: 'Options',
	name: 'options',
	type: 'collection',
	placeholder: 'Add option',
	default: {},
	displayOptions: {
		show: {
			resource: ['object'],
			operation: ['list'],
		}
	},
	options: [
		{
			displayName: 'Prefix',
			name: 'prefix',
			type: 'string',
			description: 'The prefix of the objects that should be listed',
			default: '',
		},
		{
			displayName: 'Recursive',
			name: 'recursive',
			type: 'boolean',
			// eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether, n8n-nodes-base/node-param-description-lowercase-first-char
			description: 'true indicates recursive style listing and false indicates directory style listing delimited by \'/\'',
			default: false,
		},
		{
			displayName: 'List Options',
			name: 'listOpts',
			type: 'json',
			description: 'Query params to list object which can have {IncludeVersion: _bool_ }',
			default: '{}',
		}
	],
};

export const optionsForGetObject: INodeProperties = {
	displayName: 'Options',
	name: 'options',
	type: 'collection',
	placeholder: 'Add option',
	default: {},
	displayOptions: {
		show: {
			resource: ['object'],
			operation: ['get'],
		}
	},
	options: [
		{
			displayName: 'Get Options',
			name: 'getOpts',
			type: 'json',
			description: 'Options to get an object',
			default: '{}',
		},
	],
};

export const optionsForPutObject: INodeProperties = {
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				resource: ['object'],
				operation: ['put'],
			}
		},
		options: [
			{
				displayName: 'Object Name',
				name: 'objectName',
				type: 'string',
				description: 'Name of the object to upload',
				default: '',
			},
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				description: 'Metadata to set for the object',
				default: '{}',
			}
		],
};

export const optionsForStatObject: INodeProperties = {
	displayName: 'Options',
	name: 'options',
	type: 'collection',
	placeholder: 'Add option',
	default: {},
	displayOptions: {
		show: {
			resource: ['object'],
			operation: ['stat'],
		}
	},
	options: [
		{
			displayName: 'Stat Options',
			name: 'statOpts',
			type: 'json',
			description: 'Version of the object in the form {versionId:"my-versionId"}',
			default: '{}',
		},
	],
};

export const optionsForRemoveObject: INodeProperties = {
	displayName: 'Options',
	name: 'options',
	type: 'collection',
	placeholder: 'Add option',
	default: {},
	displayOptions: {
		show: {
			resource: ['object'],
			operation: ['remove'],
		}
	},
	options: [
		{
			displayName: 'Remove Options',
			name: 'removeOpts',
			type: 'json',
			description: 'Version of the object in the form {versionId:"my-versionId", governanceBypass: true or false }',
			default: '{}',
		},
	],
};

// Export all object options as an array for easy spreading
export const allObjectOptions = [
	optionsForListObjects,
	optionsForGetObject,
	optionsForPutObject,
	optionsForStatObject,
	optionsForRemoveObject,
];

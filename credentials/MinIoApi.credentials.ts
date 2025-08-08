import {
	// IAuthenticateGeneric,
	// ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MinIoApi implements ICredentialType {
	name = 'minIoApi';
	displayName = 'MinIO API';
	documentationUrl = 'https://your-docs-url';
	properties: INodeProperties[] = [
		{
			displayName: 'Endpoint',
			name: 'endpoint',
			type: 'string',
			default: 'play.min.io',
		},
		{
			displayName: 'Port',
			name: 'port',
			type: 'number',
			default: 9000,
		},
		{
			displayName: 'Access Key',
			name: 'accessKey',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			}
		},
		{
			displayName: 'Secret Key',
			name: 'secretKey',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			}
		},
		{
			displayName: 'Use SSL',
			name: 'useSSL',
			type: 'boolean',
			default: false,
		}
	];

	// This allows the credential to be used by other parts of n8n
	// stating how this credential is injected as part of the request
	// An example is the Http Request node that can make generic calls
	// reusing this credential
	// authenticate: IAuthenticateGeneric = {
	// 	type: 'generic',
	// 	properties: {
	// 		headers: {
	// 			Authorization: '={{"Bearer " + $credentials.token}}',
	// 		},
	// 	},
	// };

	// The block below tells how this credential can be tested
	// test: ICredentialTestRequest = {
	// 	request: {
	// 		baseURL: '={{$credentials?.domain}}',
	// 		url: '/bearer',
	// 	},
	// };
}

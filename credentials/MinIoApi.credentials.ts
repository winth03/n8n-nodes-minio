import {
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
}

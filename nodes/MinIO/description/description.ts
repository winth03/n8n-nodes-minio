/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import { INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export const nodeDescription: Partial<INodeTypeDescription> = {
	displayName: 'MinIO',
	name: 'minIo',
	icon: 'file:minio.svg',
	group: ['transform'],
	version: 1,
	subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
	description: 'Connect to your MinIO server',
	defaults: {
		name: 'MinIO',
	},
	inputs: [NodeConnectionType.Main],
	outputs: [NodeConnectionType.Main],
	usableAsTool: true,
	credentials: [
		{
			name: 'minIoApi',
			required: true,
			testedBy: 'minIoApiTest',
		}
	],
};

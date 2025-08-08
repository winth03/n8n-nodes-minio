import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { minIoApiTest } from './methods/credentialTest';
import { execute } from './actions/execute.operation';
import { nodeDescription, properties } from './description';

export class MinIo implements INodeType {
	description: INodeTypeDescription = {
		...nodeDescription,
		properties,
	} as INodeTypeDescription;
	execute = execute;
	methods = {
		credentialTest: {
			minIoApiTest
		}
	};
}

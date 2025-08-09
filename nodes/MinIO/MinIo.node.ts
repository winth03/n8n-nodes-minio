import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { execute } from './actions/execute.operation';
import properties, { nodeDescription } from './description';
import { credentialTest, listSearch } from './methods';

export class MinIo implements INodeType {
	description: INodeTypeDescription = {
		...nodeDescription,
		properties,
	} as INodeTypeDescription;
	execute = execute;
	methods = {
		credentialTest,
		listSearch
	};
}

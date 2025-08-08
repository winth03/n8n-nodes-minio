import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { minIoApiTest } from './methods/credentialTest';
import { execute } from './actions/execute.operation';
export declare class MinIo implements INodeType {
    description: INodeTypeDescription;
    execute: typeof execute;
    methods: {
        credentialTest: {
            minIoApiTest: typeof minIoApiTest;
        };
    };
}

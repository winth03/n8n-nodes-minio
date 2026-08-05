import * as Minio from 'minio';
import { NodeOperationError, type INode } from 'n8n-workflow';
import { MinIoCredentials } from './interfaces';
import { Agent } from 'node:https';

export async function createMinioClient(credentials: MinIoCredentials): Promise<Minio.Client> {
	const clientConfig: any = {
		endPoint: credentials.endpoint,
		port: credentials.port,
		useSSL: credentials.useSSL,
		accessKey: credentials.accessKey,
		secretKey: credentials.secretKey,
	};

	// 只有在使用SSL时才添加transportAgent
	if (credentials.useSSL) {
		clientConfig.transportAgent = new Agent({
			rejectUnauthorized: credentials.allowInsecure !== true,
		});
	}

	return new Minio.Client(clientConfig);
}

/**
 * Parse a JSON-encoded option string into an object, throwing a friendly
 * NodeOperationError on invalid input. Returns `{}` for empty/undefined values.
 */
export function parseJsonOption(
	raw: string | undefined,
	fieldName: string,
	node: INode,
): Record<string, unknown> {
	if (!raw) return {};
	try {
		return JSON.parse(raw) as Record<string, unknown>;
	} catch (error) {
		throw new NodeOperationError(node, `Invalid JSON in "${fieldName}" field`, {
			description: (error as Error).message,
		});
	}
}

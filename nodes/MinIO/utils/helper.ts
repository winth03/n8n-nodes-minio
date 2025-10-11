import * as Minio from 'minio';
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

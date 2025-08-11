import * as Minio from 'minio';
import { MinIoCredentials } from './interfaces';
import { Agent } from 'node:https';

export async function createMinioClient(credentials: MinIoCredentials): Promise<Minio.Client> {
	return new Minio.Client({
		endPoint: credentials.endpoint,
		port: credentials.port,
		useSSL: credentials.useSSL,
		accessKey: credentials.accessKey,
		secretKey: credentials.secretKey,
		transportAgent: new Agent({
			rejectUnauthorized: credentials.allowInsecure !== true,
		}),
	});
}

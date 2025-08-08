import { ICredentialsDecrypted, ICredentialTestFunctions, INodeCredentialTestResult } from "n8n-workflow";
import { MinIoCredentials } from "../helpers/interfaces";
import * as Minio from 'minio';

export async function minIoApiTest(this: ICredentialTestFunctions, credential: ICredentialsDecrypted): Promise<INodeCredentialTestResult> {
				const credentials = credential.data as MinIoCredentials | undefined;

				if (!credentials) {
					return {
						status: 'Error',
						message: 'Invalid credentials',
					};
				}

				try {
					const minioClient = new Minio.Client({
						endPoint: credentials.endpoint,
						port: credentials.port,
						useSSL: credentials.useSSL,
						accessKey: credentials.accessKey,
						secretKey: credentials.secretKey,
					});

					await minioClient.listBuckets();
				}
				catch (error) {
					return {
						status: 'Error',
						message: `Connection failed: ${(error as Error).message}`,
					};
				}

				return {
					status: 'OK',
					message: 'Connection successful',
				};
			}

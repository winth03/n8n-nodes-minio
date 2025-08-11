import { ICredentialsDecrypted, ICredentialTestFunctions, INodeCredentialTestResult } from "n8n-workflow";
import { MinIoCredentials } from "../utils/interfaces";
import { createMinioClient } from "../utils/helper";

export async function minIoApiTest(this: ICredentialTestFunctions, credential: ICredentialsDecrypted): Promise<INodeCredentialTestResult> {
				const credentials = credential.data as MinIoCredentials | undefined;

				if (!credentials) {
					return {
						status: 'Error',
						message: 'Invalid credentials',
					};
				}

				try {
					const minioClient = await createMinioClient(credentials);

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

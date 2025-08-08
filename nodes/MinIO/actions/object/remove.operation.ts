import { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import * as Minio from 'minio';

export async function removeObject(
	this: IExecuteFunctions,
	minioClient: Minio.Client
): Promise<INodeExecutionData[]> {
	const bucketName = this.getNodeParameter('bucketName', 0) as string;
	const objectName = this.getNodeParameter('objectName', 0) as string;

	await minioClient.removeObject(bucketName, objectName);

	return [{
		json: {
			id: objectName,
			name: objectName,
			removed: true
		}
	}];
}

import { IExecuteFunctions, INodeExecutionData, INodePropertyOptions } from "n8n-workflow";
import * as Minio from 'minio';

export async function removeObject(
	this: IExecuteFunctions,
	minioClient: Minio.Client
): Promise<INodeExecutionData[]> {
	const bucketName = (this.getNodeParameter('bucketName', 0) as INodePropertyOptions).value as string;
	const objectName = (this.getNodeParameter('objectName', 0) as INodePropertyOptions).value as string;

	await minioClient.removeObject(bucketName, objectName);

	return [{
		json: {
			bucket: bucketName,
			object: objectName,
			removed: true
		}
	}];
}

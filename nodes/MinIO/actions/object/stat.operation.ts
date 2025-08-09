import { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import * as Minio from 'minio';

export async function objectStat(
	this: IExecuteFunctions,
	minioClient: Minio.Client
): Promise<INodeExecutionData[]> {
	const bucketName = this.getNodeParameter('bucketName', 0) as string;
	const objectName = this.getNodeParameter('objectName', 0) as string;

	const stat = await minioClient.statObject(bucketName, objectName);

	return [{
		json: {
			bucket: bucketName,
			object: objectName,
			...stat
		}
	}];
}

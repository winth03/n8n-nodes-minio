import { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import * as Minio from 'minio';

export async function removeBucket(
	this: IExecuteFunctions,
	minioClient: Minio.Client
): Promise<INodeExecutionData[]> {
	const bucketName = this.getNodeParameter('bucketName', 0) as string;

	await minioClient.removeBucket(bucketName);

	return [
		{
			json: {
				id: bucketName,
				name: bucketName,
			},
		},
	];
}

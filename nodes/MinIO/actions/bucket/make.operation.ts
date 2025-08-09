import { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import * as Minio from 'minio';

export async function makeBucket(
	this: IExecuteFunctions,
	minioClient: Minio.Client
): Promise<INodeExecutionData[]> {
	const bucketName = this.getNodeParameter('bucketName', 0) as string;

	await minioClient.makeBucket(bucketName);

	return [
		{
			json: {
				bucket: bucketName,
				created: new Date().toISOString(),
			},
		},
	];
}

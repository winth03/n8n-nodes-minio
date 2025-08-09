import { IExecuteFunctions, INodeExecutionData, INodePropertyOptions } from "n8n-workflow";
import * as Minio from 'minio';

export async function removeBucket(
	this: IExecuteFunctions,
	minioClient: Minio.Client
): Promise<INodeExecutionData[]> {
	const bucketName = (this.getNodeParameter('bucketName', 0) as INodePropertyOptions).value as string;

	await minioClient.removeBucket(bucketName);

	return [
		{
			json: {
				bucket: bucketName,
				removed: true,
			},
		},
	];
}

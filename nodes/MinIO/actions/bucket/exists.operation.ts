import { IExecuteFunctions, INodeExecutionData, INodeParameterResourceLocator } from "n8n-workflow";
import * as Minio from 'minio';

export async function bucketExists(
	this: IExecuteFunctions,
	minioClient: Minio.Client
): Promise<INodeExecutionData[]> {
	const bucketName = (this.getNodeParameter('bucketName', 0) as INodeParameterResourceLocator).value as string;

	const exists = await minioClient.bucketExists(bucketName);

	return [
		{
			json: {
				bucket: bucketName,
				exists,
			},
		},
	];
}

import { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import * as Minio from 'minio';

export async function putObject(
	this: IExecuteFunctions,
	minioClient: Minio.Client
): Promise<INodeExecutionData[]> {
	const bucketName = this.getNodeParameter('bucketName', 0) as string;
	const objectName = this.getNodeParameter('objectName', 0) as string;
	const fieldName = this.getNodeParameter('fieldName', 0) as string;
	const items = this.getInputData();

	const uploadedData: INodeExecutionData[] = [];

	for (let i = 0; i < items.length; i++) {
		const data = items[i].json[fieldName] as Buffer;
		const result = await minioClient.putObject(bucketName, objectName, data);
		uploadedData.push({
			json: {
				...result,
			},
		});
	}

	return uploadedData;
}

import { IExecuteFunctions, INodeExecutionData, INodePropertyOptions } from "n8n-workflow";
import * as Minio from 'minio';
import { ObjectInfo } from "minio/dist/main/internal/type";

export async function listObjects(
	this: IExecuteFunctions,
	minioClient: Minio.Client
): Promise<INodeExecutionData[]> {
	const bucketName = (this.getNodeParameter('bucketName', 0) as INodePropertyOptions).value as string;
	const data: ObjectInfo[] = [];

	await new Promise<void>((resolve, reject) => {
		const stream = minioClient.listObjects(bucketName);
		stream.on('data', (obj) => {
			data.push(obj);
		});
		stream.on('end', () => {
			resolve();
		});
		stream.on('error', (err) => {
			reject(err);
		});
	});

	return data.reduce<INodeExecutionData[]>((acc, object) => {
		acc.push({
			json: {
				object,
			},
		});
		return acc;
	}, []);
}

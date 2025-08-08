import { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import * as Minio from 'minio';

export async function listBuckets(
	this: IExecuteFunctions,
	minioClient: Minio.Client
): Promise<INodeExecutionData[]> {
	const buckets = await minioClient.listBuckets();

	return buckets.reduce<INodeExecutionData[]>((acc, bucket) => {
		acc.push({
			json: {
				id: bucket.name,
				name: bucket.name,
				created: bucket.creationDate,
			},
		});
		return acc;
	}, []);
}

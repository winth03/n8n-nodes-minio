import { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import * as Minio from 'minio';

export async function makeBucket(
	this: IExecuteFunctions,
	minioClient: Minio.Client
): Promise<INodeExecutionData[]> {
	const bucketName = this.getNodeParameter('bucketName', 0) as string;
	// Optional Fields
	const options = this.getNodeParameter('options', 0, {});
	const region = options.region as string | undefined;
	const makeOpts = options.makeOpts as string | undefined;

	await minioClient.makeBucket(bucketName, region, makeOpts ? JSON.parse(makeOpts) : {});

	return [
		{
			json: {
				bucket: bucketName,
				created: true,
			},
		},
	];
}

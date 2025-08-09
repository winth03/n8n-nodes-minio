import { IExecuteFunctions, INodeExecutionData, INodeParameterResourceLocator } from "n8n-workflow";
import * as Minio from 'minio';
import { ObjectInfo } from "minio/dist/main/internal/type";

export async function listObjects(
	this: IExecuteFunctions,
	minioClient: Minio.Client
): Promise<INodeExecutionData[]> {
	const bucketName = (this.getNodeParameter('bucketName', 0) as INodeParameterResourceLocator).value as string;
	// Optional Fields
	const options = this.getNodeParameter('options', 0, {});
	const prefix = options.prefix as string | undefined;
	const recursive = options.recursive as boolean | undefined;
	const listOptions = options.listOpts as string | undefined;

	const data: ObjectInfo[] = [];
	await new Promise<void>((resolve, reject) => {
		const stream = minioClient.listObjects(bucketName, prefix, recursive, listOptions ? JSON.parse(listOptions) : {});
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

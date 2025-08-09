import { IExecuteFunctions, INodeExecutionData, INodeParameterResourceLocator } from "n8n-workflow";
import * as Minio from 'minio';

export async function objectStat(
	this: IExecuteFunctions,
	minioClient: Minio.Client
): Promise<INodeExecutionData[]> {
	const bucketName = (this.getNodeParameter('bucketName', 0) as INodeParameterResourceLocator).value as string;
	const objectName = (this.getNodeParameter('objectName', 0) as INodeParameterResourceLocator).value as string;
	// Optional Fields
	const options = this.getNodeParameter('options', 0, {});
	const statOpts = options.statOpts as string | undefined;

	const stat = await minioClient.statObject(bucketName, objectName, statOpts ? JSON.parse(statOpts) : {});

	return [{
		json: {
			bucket: bucketName,
			object: objectName,
			...stat
		}
	}];
}

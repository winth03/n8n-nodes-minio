import { IExecuteFunctions, INodeExecutionData, INodeParameterResourceLocator } from "n8n-workflow";
import * as Minio from 'minio';

export async function presignedGet(
	this: IExecuteFunctions,
	minioClient: Minio.Client
): Promise<INodeExecutionData[]> {
	const bucketName = (this.getNodeParameter('bucketName', 0) as INodeParameterResourceLocator).value as string;
	const objectName = (this.getNodeParameter('objectName', 0) as INodeParameterResourceLocator).value as string;
	// Optional Fields
	const options = this.getNodeParameter('options', 0, {});
	const expiry = options.expiry as number | undefined;
	const reqParams = options.reqParams as {} | undefined;
	const requestDate = options.requestDate as string | undefined;

	const presignedUrl = await minioClient.presignedGetObject(bucketName, objectName, expiry, reqParams, requestDate ? new Date(requestDate) : undefined);

	return [{
		json: {
			presignedUrl
		}
	}];
}

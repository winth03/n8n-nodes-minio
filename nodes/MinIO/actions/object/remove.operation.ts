import { IExecuteFunctions, INodeExecutionData, INodeParameterResourceLocator } from "n8n-workflow";
import * as Minio from 'minio';

export async function removeObject(
	this: IExecuteFunctions,
	minioClient: Minio.Client
): Promise<INodeExecutionData[]> {
	const bucketName = (this.getNodeParameter('bucketName', 0) as INodeParameterResourceLocator).value as string;
	const objectName = (this.getNodeParameter('objectName', 0) as INodeParameterResourceLocator).value as string;
	// Optional Fields
	const options = this.getNodeParameter('options', 0, {});
	const removeOpts = options.removeOpts as string | undefined;

	await minioClient.removeObject(bucketName, objectName, removeOpts ? JSON.parse(removeOpts) : {});

	return [{
		json: {
			bucket: bucketName,
			object: objectName,
			removed: true
		}
	}];
}

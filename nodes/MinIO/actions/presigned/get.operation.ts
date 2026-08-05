import { IExecuteFunctions, INodeExecutionData, INodeParameterResourceLocator } from "n8n-workflow";
import * as Minio from 'minio';

function toRespHeaders(rawHeaders: unknown): Record<string, string> | undefined {
	if (!rawHeaders) return undefined;
	// Array of {name, value} pairs from n8n collection UI
	if (Array.isArray(rawHeaders)) {
		const headers: Record<string, string> = {};
		for (const item of rawHeaders as Array<{ name: string; value?: string }>) {
			if (item.name) headers[item.name] = item.value ?? '';
		}
		return Object.keys(headers).length > 0 ? headers : undefined;
	}
	// Single {name, value} pair
	const single = rawHeaders as { name?: string; value?: string };
	if (single.name) {
		return { [single.name]: single.value ?? '' };
	}
	return undefined;
}

export async function presignedGet(
	this: IExecuteFunctions,
	minioClient: Minio.Client
): Promise<INodeExecutionData[]> {
	const bucketName = (this.getNodeParameter('bucketName', 0) as INodeParameterResourceLocator).value as string;
	const objectName = (this.getNodeParameter('objectName', 0) as INodeParameterResourceLocator).value as string;
	// Optional Fields
	const options = this.getNodeParameter('options', 0, {});
	const expiry = options.expiry as number | undefined;
	const reqParams = options.reqParams as unknown;
	const requestDate = options.requestDate as string | undefined;

	const respHeaders = toRespHeaders(reqParams);
	const presignedUrl = await minioClient.presignedGetObject(bucketName, objectName, expiry, respHeaders, requestDate ? new Date(requestDate) : undefined);

	return [{
		json: {
			presignedUrl
		}
	}];
}

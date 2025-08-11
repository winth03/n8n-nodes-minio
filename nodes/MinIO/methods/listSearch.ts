import { ILoadOptionsFunctions, INodeListSearchResult, INodeParameterResourceLocator, INodePropertyOptions, IResourceLocatorResult } from "n8n-workflow";
import { createMinioClient } from "../utils/helper";
import { MinIoCredentials } from "../utils/interfaces";

export async function listAllBuckets(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {
	const credentials = (await this.getCredentials('minIoApi')) as MinIoCredentials;
	const minioClient = await createMinioClient(credentials);

	const buckets = await minioClient.listBuckets();
	const results: INodePropertyOptions[] = buckets.map(bucket => ({
		name: bucket.name,
		value: bucket.name,
	}));
	return {
		results
	};
}

export async function listAllObjects(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {
	const credentials = (await this.getCredentials('minIoApi')) as MinIoCredentials;
	const bucketName = (this.getCurrentNodeParameter('bucketName') as INodeParameterResourceLocator).value as string;

	const minioClient = await createMinioClient(credentials);

	const results: IResourceLocatorResult[] = [];
	const stream = await minioClient.listObjects(bucketName);
	await new Promise((resolve, reject) => {
		stream.on('data', (obj) => {
			if (obj.name) {
				results.push({
					name: obj.name,
					value: obj.name,
				});
			}
		});
		stream.on('end', () => {
			resolve(results);
		});
		stream.on('error', (err) => {
			reject(err);
		});
	});

	return {
		results
	};
}

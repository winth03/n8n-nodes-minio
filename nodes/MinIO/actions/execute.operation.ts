import { IExecuteFunctions, INodeExecutionData, NodeOperationError } from "n8n-workflow";
import { MinIoCredentials } from "../helpers/interfaces";
import * as Minio from 'minio';
import * as operations from './index';

export async function execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>  {
	const credentials = (await this.getCredentials('minIoApi')) as MinIoCredentials;

	const minioClient = new Minio.Client({
		endPoint: credentials.endpoint,
		port: credentials.port,
		useSSL: credentials.useSSL,
		accessKey: credentials.accessKey,
		secretKey: credentials.secretKey,
	});

	// Execute based on the resource and operation
	const resource = this.getNodeParameter('resource') as string;
	const operation = this.getNodeParameter('operation', 0) as string;

	switch (resource) {
		case 'bucket':
			switch (operation) {
				case 'list':
					const bucketResult = await operations.bucket.listBuckets.call(this, minioClient);
					return [bucketResult];
				case 'exists':
					const existsResult = await operations.bucket.bucketExists.call(this, minioClient);
					return [existsResult];
				case 'remove':
					const removeResult = await operations.bucket.removeBucket.call(this, minioClient);
					return [removeResult];
				case 'make':
					const makeResult = await operations.bucket.makeBucket.call(this, minioClient);
					return [makeResult];
			}
			break;
		case 'object':
			switch (operation) {
				case 'list':
					const objectResult = await operations.object.listObjects.call(this, minioClient);
					return [objectResult];
				case 'get':
					const getResult = await operations.object.getObject.call(this, minioClient);
					return [getResult];
				case 'put':
					const putResult = await operations.object.putObject.call(this, minioClient);
					return [putResult];
				case 'remove':
					const removeResult = await operations.object.removeObject.call(this, minioClient);
					return [removeResult];
				case 'stat':
					const statResult = await operations.object.objectStat.call(this, minioClient);
					return [statResult];
			}
			break;
		case 'presigned':
			switch (operation) {
				case 'get':
					const presignedGetResult = await operations.presigned.presignedGet.call(this, minioClient);
					return [presignedGetResult];
				case 'put':
					const presignedPutResult = await operations.presigned.presignedPut.call(this, minioClient);
					return [presignedPutResult];
			}
			break;
	}

	return Promise.reject(new NodeOperationError(this.getNode(), `The resource "${resource}" with operation "${operation}" is not supported.`));
}

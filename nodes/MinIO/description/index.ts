import { INodeProperties } from 'n8n-workflow';
import { resourceProperty } from './resources';
import { bucketOperations, bucketNameForBucket } from './bucket.properties';
import { objectOperations, bucketNameForObject, objectNameForObject, fieldName } from './object.properties';
import { bucketNameForPresigned, objectNameForPresigned, presignedOperations } from './presigned.properties';

export const properties: INodeProperties[] = [
	resourceProperty,
	bucketOperations,
	objectOperations,
	presignedOperations,
	bucketNameForBucket,
	bucketNameForObject,
	bucketNameForPresigned,
	objectNameForObject,
	objectNameForPresigned,
	fieldName,
];

export { nodeDescription } from './node.description';

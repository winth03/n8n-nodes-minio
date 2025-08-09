import { allBaseProperties } from './base';
import { allBucketProperties } from './bucket';
import { allObjectProperties } from './object';
import { allPresignedProperties } from './presigned';

export default [
	...allBaseProperties,
	...allBucketProperties,
	...allObjectProperties,
	...allPresignedProperties,
];

// Also export individual property arrays for direct access
export * from './base';
export * from './bucket';
export * from './object';
export * from './presigned';

import { allBucketOptions } from './bucket';
import { allObjectOptions } from './object';
import { allPresignedOptions } from './presigned';

export default [
	...allBucketOptions,
	...allObjectOptions,
	...allPresignedOptions
];

// Also export individual options for direct access
export * from './bucket';
export * from './object';
export * from './presigned';

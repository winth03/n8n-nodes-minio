import allProperties from './properties';
import allOptions from './options';

export default [
	...allProperties,
	...allOptions,
];

// Also export for direct access
export { nodeDescription } from './node.description';

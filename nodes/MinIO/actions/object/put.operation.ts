import { BINARY_ENCODING, IExecuteFunctions, INodeExecutionData, INodeParameterResourceLocator } from "n8n-workflow";
import * as Minio from 'minio';
import { Readable } from "stream";

export async function putObject(
	this: IExecuteFunctions,
	minioClient: Minio.Client
): Promise<INodeExecutionData[]> {
	const items = this.getInputData();

	const uploadedData: INodeExecutionData[] = [];

	let item: INodeExecutionData;
	for (let i = 0; i < items.length; i++) {
		const bucketName = (this.getNodeParameter('bucketName', i) as INodeParameterResourceLocator).value as string;
		const fieldName = this.getNodeParameter('fieldName', i) as string;
		// Optional Fields
		const options = this.getNodeParameter('options', 0, {});
		const objectName = options.objectName as string | undefined;
		const metadata = options.metadata as string | undefined;

		item = items[i];

		const newItem: INodeExecutionData = {
			json: {},
			pairedItem: {
				item: i,
			},
		};
		Object.assign(newItem.json, item.json);

		const binaryData = this.helpers.assertBinaryData(i, fieldName);

		// Use provided object name or fall back to the binary data filename
		const finalObjectName = objectName || binaryData.fileName || 'untitled';

		let fileContent: Buffer | Readable;
		if (binaryData.id) {
			fileContent = await this.helpers.getBinaryStream(binaryData.id);
		} else {
			fileContent = Buffer.from(binaryData.data, BINARY_ENCODING);
		}

		// Set metadata with proper content type
		const finalMetadata = {
			...(metadata ? JSON.parse(metadata) : {}),
			'Content-Type': binaryData.mimeType || 'application/octet-stream',
		};

		const result = await minioClient.putObject(bucketName, finalObjectName, fileContent, undefined, finalMetadata);
		uploadedData.push({
			json: {
				bucket: bucketName,
				object: finalObjectName,
				...result,
			},
		});
	}

	return uploadedData;
}

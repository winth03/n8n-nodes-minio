import { BINARY_ENCODING, IExecuteFunctions, INodeExecutionData, INodePropertyOptions } from "n8n-workflow";
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
		const bucketName = (this.getNodeParameter('bucketName', i) as INodePropertyOptions).value as string;
		const objectName = (this.getNodeParameter('objectName', i) as INodePropertyOptions).value as string;
		const fieldName = this.getNodeParameter('fieldName', i) as string;
		item = items[i];

		const newItem: INodeExecutionData = {
			json: {},
			pairedItem: {
				item: i,
			},
		};
		Object.assign(newItem.json, item.json);

		const binaryData = this.helpers.assertBinaryData(i, fieldName);

		let fileContent: Buffer | Readable;
		if (binaryData.id) {
			fileContent = await this.helpers.getBinaryStream(binaryData.id);
		} else {
			fileContent = Buffer.from(binaryData.data, BINARY_ENCODING);
		}

		const result = await minioClient.putObject(bucketName, objectName, fileContent);
		uploadedData.push({
			json: {
				bucket: bucketName,
				object: objectName,
				...result,
			},
		});
	}

	return uploadedData;
}

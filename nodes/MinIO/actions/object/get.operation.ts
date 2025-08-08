import { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import * as Minio from 'minio';

export async function getObject(
	this: IExecuteFunctions,
	minioClient: Minio.Client
): Promise<INodeExecutionData[]> {
	const bucketName = this.getNodeParameter('bucketName', 0) as string;
	const objectName = this.getNodeParameter('objectName', 0) as string;
	const fieldName = this.getNodeParameter('fieldName', 0) as string;

	const stream = await minioClient.getObject(bucketName, objectName);
	const binaryData = await this.helpers.prepareBinaryData(stream);

	return [{
		json: {
			mimeType: binaryData.mimeType,
			fileType: binaryData.fileType,
			fileName: binaryData.fileName,
			fileExtension: binaryData.fileExtension,
			fileSize: binaryData.fileSize,
		},
		binary: {
			[fieldName]: binaryData
		}
	}];
}

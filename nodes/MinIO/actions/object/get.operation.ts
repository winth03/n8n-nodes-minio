import { IExecuteFunctions, INodeExecutionData, INodeParameterResourceLocator } from "n8n-workflow";
import * as Minio from 'minio';
import { parseJsonOption } from '../../utils/helper';

export async function getObject(
	this: IExecuteFunctions,
	minioClient: Minio.Client
): Promise<INodeExecutionData[]> {
	const bucketName = (this.getNodeParameter('bucketName', 0) as INodeParameterResourceLocator).value as string;
	const objectName = (this.getNodeParameter('objectName', 0) as INodeParameterResourceLocator).value as string;
	const fieldName = this.getNodeParameter('fieldName', 0) as string;
	// Optional Fields
	const options = this.getNodeParameter('options', 0, {});
	const getOpts = options.getOpts as string | undefined;

	const getOptsObj = parseJsonOption(getOpts, 'Get Options', this.getNode());

	const stream = await minioClient.getObject(bucketName, objectName, getOptsObj);
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObject = getObject;
async function getObject(minioClient) {
    const bucketName = this.getNodeParameter('bucketName', 0);
    const objectName = this.getNodeParameter('objectName', 0);
    const fieldName = this.getNodeParameter('fieldName', 0);
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
//# sourceMappingURL=get.operation.js.map
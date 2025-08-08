"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putObject = putObject;
async function putObject(minioClient) {
    const bucketName = this.getNodeParameter('bucketName', 0);
    const objectName = this.getNodeParameter('objectName', 0);
    const fieldName = this.getNodeParameter('fieldName', 0);
    const items = this.getInputData();
    const uploadedData = [];
    for (let i = 0; i < items.length; i++) {
        const data = items[i].json[fieldName];
        const result = await minioClient.putObject(bucketName, objectName, data);
        uploadedData.push({
            json: {
                ...result,
            },
        });
    }
    return uploadedData;
}
//# sourceMappingURL=put.operation.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectExists = objectExists;
async function objectExists(minioClient) {
    const bucketName = this.getNodeParameter('bucketName', 0);
    const objectName = this.getNodeParameter('objectName', 0);
    const exists = await minioClient.bucketExists(bucketName);
    return [{
            json: {
                id: objectName,
                name: objectName,
                exists
            }
        }];
}
//# sourceMappingURL=exists.operation.js.map
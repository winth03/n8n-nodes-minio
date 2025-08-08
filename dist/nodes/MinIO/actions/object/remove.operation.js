"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeObject = removeObject;
async function removeObject(minioClient) {
    const bucketName = this.getNodeParameter('bucketName', 0);
    const objectName = this.getNodeParameter('objectName', 0);
    await minioClient.removeObject(bucketName, objectName);
    return [{
            json: {
                id: objectName,
                name: objectName,
                removed: true
            }
        }];
}
//# sourceMappingURL=remove.operation.js.map
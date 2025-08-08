"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presignedPut = presignedPut;
async function presignedPut(minioClient) {
    const bucketName = this.getNodeParameter('bucketName', 0);
    const objectName = this.getNodeParameter('objectName', 0);
    const presignedUrl = await minioClient.presignedPutObject(bucketName, objectName);
    return [{
            json: {
                presignedUrl
            }
        }];
}
//# sourceMappingURL=put.operation.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presignedGet = presignedGet;
async function presignedGet(minioClient) {
    const bucketName = this.getNodeParameter('bucketName', 0);
    const objectName = this.getNodeParameter('objectName', 0);
    const presignedUrl = await minioClient.presignedGetObject(bucketName, objectName);
    return [{
            json: {
                presignedUrl
            }
        }];
}
//# sourceMappingURL=get.operation.js.map
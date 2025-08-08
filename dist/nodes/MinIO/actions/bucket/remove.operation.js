"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBucket = removeBucket;
async function removeBucket(minioClient) {
    const bucketName = this.getNodeParameter('bucketName', 0);
    await minioClient.removeBucket(bucketName);
    return [
        {
            json: {
                id: bucketName,
                name: bucketName,
            },
        },
    ];
}
//# sourceMappingURL=remove.operation.js.map
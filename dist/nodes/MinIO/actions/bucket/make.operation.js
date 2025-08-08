"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeBucket = makeBucket;
async function makeBucket(minioClient) {
    const bucketName = this.getNodeParameter('bucketName', 0);
    await minioClient.makeBucket(bucketName);
    return [
        {
            json: {
                id: bucketName,
                name: bucketName,
            },
        },
    ];
}
//# sourceMappingURL=make.operation.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bucketExists = bucketExists;
async function bucketExists(minioClient) {
    const bucketName = this.getNodeParameter('bucketName', 0);
    const exists = await minioClient.bucketExists(bucketName);
    return [
        {
            json: {
                id: bucketName,
                name: bucketName,
                exists,
            },
        },
    ];
}
//# sourceMappingURL=exists.operation.js.map
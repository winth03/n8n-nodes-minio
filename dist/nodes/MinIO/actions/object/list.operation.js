"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listObjects = listObjects;
async function listObjects(minioClient) {
    const bucketName = this.getNodeParameter('bucketName', 0);
    const data = [];
    await new Promise((resolve, reject) => {
        const stream = minioClient.listObjects(bucketName);
        stream.on('data', (obj) => {
            data.push(obj);
        });
        stream.on('end', () => {
            resolve();
        });
        stream.on('error', (err) => {
            reject(err);
        });
    });
    return data.reduce((acc, object) => {
        acc.push({
            json: {
                id: object.name,
                name: object.name,
                size: object.size,
                etag: object.etag,
                created: object.lastModified,
            },
        });
        return acc;
    }, []);
}
//# sourceMappingURL=list.operation.js.map
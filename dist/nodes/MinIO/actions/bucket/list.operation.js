"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listBuckets = listBuckets;
async function listBuckets(minioClient) {
    const buckets = await minioClient.listBuckets();
    return buckets.reduce((acc, bucket) => {
        acc.push({
            json: {
                id: bucket.name,
                name: bucket.name,
                created: bucket.creationDate,
            },
        });
        return acc;
    }, []);
}
//# sourceMappingURL=list.operation.js.map
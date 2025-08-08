"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const n8n_workflow_1 = require("n8n-workflow");
const Minio = __importStar(require("minio"));
const operations = __importStar(require("./index"));
async function execute() {
    const credentials = (await this.getCredentials('minIoApi'));
    const minioClient = new Minio.Client({
        endPoint: credentials.endpoint,
        port: credentials.port,
        useSSL: credentials.useSSL,
        accessKey: credentials.accessKey,
        secretKey: credentials.secretKey,
    });
    const resource = this.getNodeParameter('resource');
    const operation = this.getNodeParameter('operation', 0);
    switch (resource) {
        case 'bucket':
            switch (operation) {
                case 'list':
                    const bucketResult = await operations.bucket.listBuckets.call(this, minioClient);
                    return [bucketResult];
                case 'exists':
                    const existsResult = await operations.bucket.bucketExists.call(this, minioClient);
                    return [existsResult];
                case 'remove':
                    const removeResult = await operations.bucket.removeBucket.call(this, minioClient);
                    return [removeResult];
                case 'make':
                    const makeResult = await operations.bucket.makeBucket.call(this, minioClient);
                    return [makeResult];
            }
            break;
        case 'object':
            switch (operation) {
                case 'list':
                    const objectResult = await operations.object.listObjects.call(this, minioClient);
                    return [objectResult];
                case 'get':
                    const getResult = await operations.object.getObject.call(this, minioClient);
                    return [getResult];
                case 'put':
                    const putResult = await operations.object.putObject.call(this, minioClient);
                    return [putResult];
                case 'remove':
                    const removeResult = await operations.object.removeObject.call(this, minioClient);
                    return [removeResult];
                case 'exists':
                    const existsResult = await operations.object.objectExists.call(this, minioClient);
                    return [existsResult];
            }
            break;
        case 'presigned':
            switch (operation) {
                case 'get':
                    const presignedGetResult = await operations.presigned.presignedGet.call(this, minioClient);
                    return [presignedGetResult];
                case 'put':
                    const presignedPutResult = await operations.presigned.presignedPut.call(this, minioClient);
                    return [presignedPutResult];
            }
            break;
    }
    return Promise.reject(new n8n_workflow_1.NodeOperationError(this.getNode(), `The resource "${resource}" with operation "${operation}" is not supported.`));
}
//# sourceMappingURL=execute.operation.js.map
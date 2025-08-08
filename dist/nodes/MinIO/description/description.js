"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeDescription = void 0;
exports.nodeDescription = {
    displayName: 'MinIO',
    name: 'minIo',
    icon: 'file:minio.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
    description: 'Connect to your MinIO server',
    defaults: {
        name: 'MinIO',
    },
    inputs: ["main"],
    outputs: ["main"],
    usableAsTool: true,
    credentials: [
        {
            name: 'minIoApi',
            required: true,
            testedBy: 'minIoApiTest',
        }
    ],
};
//# sourceMappingURL=description.js.map
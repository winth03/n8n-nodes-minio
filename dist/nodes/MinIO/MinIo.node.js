"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinIo = void 0;
const credentialTest_1 = require("./methods/credentialTest");
const execute_operation_1 = require("./actions/execute.operation");
const description_1 = require("./description");
class MinIo {
    constructor() {
        this.description = {
            ...description_1.nodeDescription,
            properties: description_1.properties,
        };
        this.execute = execute_operation_1.execute;
        this.methods = {
            credentialTest: {
                minIoApiTest: credentialTest_1.minIoApiTest
            }
        };
    }
}
exports.MinIo = MinIo;
//# sourceMappingURL=MinIo.node.js.map
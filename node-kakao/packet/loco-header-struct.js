"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocoEncryptedHeaderStruct = exports.LocoHeaderStruct = void 0;
class LocoHeaderStruct {
    constructor() {
        this.PacketId = 0;
        this.StatusCode = 0;
        this.PacketName = '';
        this.BodyType = 0;
        this.BodySize = 0;
    }
}
exports.LocoHeaderStruct = LocoHeaderStruct;
class LocoEncryptedHeaderStruct {
    constructor() {
        this.EncryptedSize = 0;
    }
}
exports.LocoEncryptedHeaderStruct = LocoEncryptedHeaderStruct;
//# sourceMappingURL=loco-header-struct.js.map
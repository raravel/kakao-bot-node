"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestUtil = void 0;
const talk_client_1 = require("../talk-client");
const packet_kickout_1 = require("../packet/packet-kickout");
const Util = require("util");
const Crypto = require("crypto");
var TestUtil;
(function (TestUtil) {
    class VerboseHandler {
        constructor() {
            this.reason = packet_kickout_1.LocoKickoutType.UNKNOWN;
        }
        onDisconnected() {
            console.log(`!! Disconnected !! code: ${this.reason}(${packet_kickout_1.LocoKickoutType[this.reason]})`);
        }
        onRequest(packetId, packet) {
            console.log(`${packetId} | ${packet.PacketName} <- ${Util.inspect(packet, false, 4, true)}`);
        }
        onResponse(packetId, packet, reqPacket) {
            if (packet instanceof packet_kickout_1.PacketKickoutRes) {
                this.reason = packet.Reason;
            }
            console.log(`${packetId} | ${packet.PacketName} -> ${Util.inspect(packet, false, 4, true)}`);
        }
    }
    TestUtil.VerboseHandler = VerboseHandler;
    class FilteredHandler extends VerboseHandler {
        constructor(filter) {
            super();
            this.filter = filter;
        }
        onRequest(packetId, packet) {
            if (packet.PacketName.match(this.filter) || packet.PacketName === 'KICKOUT') {
                super.onRequest(packetId, packet);
            }
        }
        onResponse(packetId, packet, reqPacket) {
            if (packet.PacketName.match(this.filter)) {
                super.onResponse(packetId, packet, reqPacket);
            }
        }
    }
    TestUtil.FilteredHandler = FilteredHandler;
    class WrappedHandler {
        constructor(oldHandler, hook) {
            this.oldHandler = oldHandler;
            this.hook = hook;
        }
        onDisconnected() {
            this.hook.onDisconnected();
            this.oldHandler.onDisconnected();
        }
        onRequest(packetId, packet) {
            this.hook.onRequest(packetId, packet);
            this.oldHandler.onRequest(packetId, packet);
        }
        onResponse(packetId, packet, reqPacket) {
            this.hook.onResponse(packetId, packet, reqPacket);
            this.oldHandler.onResponse(packetId, packet, reqPacket);
        }
    }
    TestUtil.WrappedHandler = WrappedHandler;
    class HookedClient extends talk_client_1.TalkClient {
        constructor(name, hook) {
            super(name);
            let oldHandler = this.NetworkManager.LocoManager.Handler;
            this.NetworkManager.LocoManager.Handler = new WrappedHandler(oldHandler, hook);
        }
    }
    TestUtil.HookedClient = HookedClient;
    function randomDeviceUUID() {
        return Crypto.randomBytes(64).toString('base64');
    }
    TestUtil.randomDeviceUUID = randomDeviceUUID;
})(TestUtil = exports.TestUtil || (exports.TestUtil = {}));
//# sourceMappingURL=test-util.js.map
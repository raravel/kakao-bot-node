import { LocoPacketHandler } from "../loco/loco-packet-handler";
import { LocoRequestPacket, LocoResponsePacket } from "../packet/loco-packet-base";
import { TalkClient } from "../talk-client";
export declare namespace TestUtil {
    class VerboseHandler implements LocoPacketHandler {
        private reason;
        constructor();
        onDisconnected(): void;
        onRequest(packetId: number, packet: LocoRequestPacket): void;
        onResponse(packetId: number, packet: LocoResponsePacket, reqPacket?: LocoRequestPacket): void;
    }
    class FilteredHandler extends VerboseHandler {
        private filter;
        constructor(filter: RegExp);
        onRequest(packetId: number, packet: LocoRequestPacket): void;
        onResponse(packetId: number, packet: LocoResponsePacket, reqPacket?: LocoRequestPacket): void;
    }
    class WrappedHandler implements LocoPacketHandler {
        private oldHandler;
        private hook;
        constructor(oldHandler: LocoPacketHandler, hook: LocoPacketHandler);
        onDisconnected(): void;
        onRequest(packetId: number, packet: LocoRequestPacket): void;
        onResponse(packetId: number, packet: LocoResponsePacket, reqPacket?: LocoRequestPacket): void;
    }
    class HookedClient extends TalkClient {
        constructor(name: string, hook: LocoPacketHandler);
    }
    function randomDeviceUUID(): string;
}

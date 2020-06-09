/// <reference types="node" />
import { LocoSocket } from "../network/loco-socket";
import { Socket } from "net";
import { LocoSecureSocket } from "../network/loco-secure-socket";
import { LocoTLSSocket } from "../network/loco-tls-socket";
import { LocoRequestPacket, LocoResponsePacket } from "../packet/loco-packet-base";
import { PacketLoginRes } from "../packet/packet-login";
import { LocoPacketHandler } from "./loco-packet-handler";
import { Long } from "bson";
export declare class LocoManager {
    static readonly PING_INTERVAL = 600000;
    private pingSchedulerId;
    private locoSocket;
    private expireTime;
    private handler;
    private locoConnected;
    private locoLogon;
    constructor(handler?: LocoPacketHandler | null);
    get Handler(): LocoPacketHandler | null;
    set Handler(handler: LocoPacketHandler | null);
    get LocoSocket(): LocoSocket<Socket> | null;
    get LocoConnected(): boolean;
    get LocoLogon(): boolean;
    get NeedRelogin(): boolean;
    protected createBookingSocket(hostInfo: HostData): LocoTLSSocket;
    protected createCheckinSocket(hostInfo: HostData): LocoSecureSocket;
    protected createLocoSocket(hostInfo: HostData): LocoSecureSocket;
    connect(deviceUUID: string, accessToken: string, userId: Long): Promise<boolean>;
    connectToLoco(locoHost: HostData, expireTime: number): Promise<boolean>;
    loginToLoco(deviceUUID: string, accessToken: string): Promise<PacketLoginRes>;
    private schedulePing;
    getCheckinData(checkinHost: HostData, userId: Long): Promise<CheckinData>;
    getBookingData(bookingHost?: HostData): Promise<BookingData>;
    protected onPacket(packetId: number, packet: LocoResponsePacket, reqPacket?: LocoRequestPacket): void;
    protected onPacketSend(packetId: number, packet: LocoRequestPacket): void;
    sendPacket(packet: LocoRequestPacket): Promise<boolean>;
    disconnect(): void;
    onDisconnect(): void;
}
export declare class HostData {
    Host: string;
    Port: number;
    static readonly BookingHost: HostData;
    constructor(Host: string, Port: number);
}
export declare class BookingData {
    CheckinHost: HostData;
    constructor(CheckinHost: HostData);
}
export declare class CheckinData {
    LocoHost: HostData;
    expireTime: number;
    constructor(LocoHost: HostData, expireTime: number);
}

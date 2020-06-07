"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckinData = exports.BookingData = exports.HostData = exports.LocoManager = void 0;
const kakao_api_1 = require("../kakao-api");
const loco_secure_socket_1 = require("../network/loco-secure-socket");
const loco_tls_socket_1 = require("../network/loco-tls-socket");
const packet_get_conf_1 = require("../packet/packet-get-conf");
const packet_check_in_1 = require("../packet/packet-check-in");
const packet_login_1 = require("../packet/packet-login");
const loco_packet_list_1 = require("../packet/loco-packet-list");
const packet_ping_1 = require("../packet/packet-ping");
class LocoManager {
    constructor(handler = null) {
        this.locoSocket = null;
        this.pingSchedulerId = null;
        this.expireTime = 0;
        this.handler = handler;
        this.locoConnected = false;
        this.locoLogon = false;
    }
    get Handler() {
        return this.handler;
    }
    set Handler(handler) {
        this.handler = handler;
    }
    get LocoSocket() {
        return this.locoSocket;
    }
    get LocoConnected() {
        return this.locoConnected;
    }
    get LocoLogon() {
        return this.locoLogon;
    }
    get NeedRelogin() {
        return this.LocoConnected && this.expireTime < Date.now();
    }
    createBookingSocket(hostInfo) {
        return new loco_tls_socket_1.LocoTLSSocket(hostInfo.Host, hostInfo.Port, false);
    }
    createCheckinSocket(hostInfo) {
        return new loco_secure_socket_1.LocoSecureSocket(hostInfo.Host, hostInfo.Port, false);
    }
    createLocoSocket(hostInfo) {
        return new loco_secure_socket_1.LocoSecureSocket(hostInfo.Host, hostInfo.Port, true);
    }
    async connect(deviceUUID, accessToken, userId) {
        let bookingData = await this.getBookingData();
        let checkinData = await this.getCheckinData(bookingData.CheckinHost, userId);
        await this.connectToLoco(checkinData.LocoHost, checkinData.expireTime);
        try {
            await this.loginToLoco(deviceUUID, accessToken);
        }
        catch (e) {
            throw new Error('Cannot login to LOCO ' + e);
        }
        return true;
    }
    async connectToLoco(locoHost, expireTime) {
        this.locoSocket = this.createLocoSocket(locoHost);
        this.locoConnected = await this.locoSocket.connect();
        this.expireTime = expireTime;
        if (!this.locoConnected) {
            throw new Error('Cannot connect to LOCO server');
        }
        this.locoSocket.on('packet', this.onPacket.bind(this));
        this.locoSocket.on('disconnected', this.onDisconnect.bind(this));
        return true;
    }
    async loginToLoco(deviceUUID, accessToken) {
        if (!this.locoConnected) {
            throw new Error('Not connected to LOCO');
        }
        if (this.locoLogon) {
            throw new Error('Already logon to LOCO');
        }
        let packet = new packet_login_1.PacketLoginReq(deviceUUID, accessToken);
        let ticket = packet.submitResponseTicket();
        this.locoSocket.sendPacket(packet);
        let res = await ticket;
        this.schedulePing();
        this.locoLogon = true;
        return res;
    }
    schedulePing() {
        if (!this.locoLogon) {
            return;
        }
        this.pingSchedulerId = setTimeout(this.schedulePing.bind(this), LocoManager.PING_INTERVAL);
        this.sendPacket(new packet_ping_1.PacketPingReq());
    }
    async getCheckinData(checkinHost, userId) {
        let socket = this.createCheckinSocket(checkinHost);
        let connected = await socket.connect();
        if (!connected) {
            throw new Error('Cannot contact to checkin server');
        }
        let packet = new packet_check_in_1.PacketCheckInReq(userId);
        let ticket = packet.submitResponseTicket();
        socket.sendPacket(packet);
        let res = await ticket;
        socket.disconnect();
        return new CheckinData(new HostData(res.Host, res.Port), res.CacheExpire);
    }
    async getBookingData(bookingHost = HostData.BookingHost) {
        let socket = this.createBookingSocket(bookingHost);
        let connected = await socket.connect();
        if (!connected) {
            throw new Error('Cannot contact to booking server');
        }
        let packet = new packet_get_conf_1.PacketGetConfReq();
        let ticket = packet.submitResponseTicket();
        socket.sendPacket(packet);
        let res = await ticket;
        socket.disconnect();
        if (res.HostList.length < 1 && res.PortList.length < 1) {
            throw new Error(`No server avaliable`);
        }
        return new BookingData(new HostData(res.HostList[0], res.PortList[0]));
    }
    onPacket(packetId, packet, reqPacket) {
        try {
            if (this.Handler) {
                this.Handler.onResponse(packetId, packet, reqPacket);
            }
            if (packet.PacketName == 'KICKOUT') {
                this.disconnect();
            }
        }
        catch (e) {
            throw new Error(`Error while processing packet#${packetId} ${packet.PacketName}`);
        }
    }
    onPacketSend(packetId, packet) {
        if (this.Handler) {
            this.Handler.onRequest(packetId, packet);
        }
    }
    async sendPacket(packet) {
        if (!this.LocoConnected) {
            return false;
        }
        if (!loco_packet_list_1.LocoPacketList.hasReqPacket(packet.PacketName)) {
            console.log(`Tried to send invalid packet ${packet.PacketName}`);
            return false;
        }
        let promise = this.LocoSocket.sendPacket(packet);
        this.onPacketSend(this.LocoSocket.Writer.CurrentPacketId, packet);
        return await promise;
    }
    disconnect() {
        if (this.locoConnected) {
            this.locoSocket.disconnect();
        }
    }
    onDisconnect() {
        this.locoConnected = false;
        this.locoLogon = false;
        this.locoSocket.removeAllListeners();
        this.locoSocket = null;
        if (this.pingSchedulerId)
            clearTimeout(this.pingSchedulerId);
        if (this.handler)
            this.handler.onDisconnected();
    }
}
exports.LocoManager = LocoManager;
LocoManager.PING_INTERVAL = 600000;
class HostData {
    constructor(Host, Port) {
        this.Host = Host;
        this.Port = Port;
    }
}
exports.HostData = HostData;
HostData.BookingHost = new HostData(kakao_api_1.KakaoAPI.LocoEntry, kakao_api_1.KakaoAPI.LocoEntryPort);
class BookingData {
    constructor(CheckinHost) {
        this.CheckinHost = CheckinHost;
    }
}
exports.BookingData = BookingData;
class CheckinData {
    constructor(LocoHost, expireTime) {
        this.LocoHost = LocoHost;
        this.expireTime = expireTime;
    }
}
exports.CheckinData = CheckinData;
//# sourceMappingURL=loco-manager.js.map
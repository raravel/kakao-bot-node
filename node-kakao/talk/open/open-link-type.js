"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenchatProfileType = exports.OpenMemberType = exports.OpenLinkType = void 0;
var OpenLinkType;
(function (OpenLinkType) {
    OpenLinkType[OpenLinkType["PROFILE"] = 1] = "PROFILE";
    OpenLinkType[OpenLinkType["CHATROOM"] = 2] = "CHATROOM";
})(OpenLinkType = exports.OpenLinkType || (exports.OpenLinkType = {}));
var OpenMemberType;
(function (OpenMemberType) {
    OpenMemberType[OpenMemberType["UNKNOWN"] = 1] = "UNKNOWN";
    OpenMemberType[OpenMemberType["NONE"] = 2] = "NONE";
    OpenMemberType[OpenMemberType["MANAGER"] = 4] = "MANAGER";
})(OpenMemberType = exports.OpenMemberType || (exports.OpenMemberType = {}));
var OpenchatProfileType;
(function (OpenchatProfileType) {
    OpenchatProfileType[OpenchatProfileType["MAIN"] = 1] = "MAIN";
    OpenchatProfileType[OpenchatProfileType["KAKAO_ANON"] = 2] = "KAKAO_ANON";
    OpenchatProfileType[OpenchatProfileType["OPEN_PROFILE"] = 16] = "OPEN_PROFILE";
})(OpenchatProfileType = exports.OpenchatProfileType || (exports.OpenchatProfileType = {}));
//# sourceMappingURL=open-link-type.js.map
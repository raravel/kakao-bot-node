import { Long } from "bson";
export declare namespace JsonUtil {
    function readLong(value: any): Long;
    function parseLoseless(obj: string): any;
    function stringifyLoseless(obj: any): any;
}

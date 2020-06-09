export interface StructBase {
    fromJson(rawData: any): void;
    toJson(): any;
}

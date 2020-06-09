import { Long } from "bson";
export declare abstract class BaseConvertibleStore<K, MK, V, MV> {
    private cacheMap;
    constructor();
    abstract get(key: K, cache: boolean): V;
    has(key: K): boolean;
    protected getValue(key: K): MV | undefined;
    protected getValueRaw(key: MK): MV | undefined;
    protected setCache(key: K, value: MV): void;
    protected setCacheRaw(key: MK, value: MV): void;
    protected delete(key: K): void;
    protected values(): IterableIterator<MV>;
    protected clear(): void;
    protected abstract convertKey(key: K): MK;
}
export declare abstract class ConvertibleStore<K, MK, V> extends BaseConvertibleStore<K, MK, V, V> {
    constructor();
    get(key: K, cache?: boolean): V;
    protected abstract fetchValue(key: K): V;
}
export declare abstract class AsyncConvertibleStore<K, MK, V> extends BaseConvertibleStore<K, MK, Promise<V>, V> {
    constructor();
    get(key: K, cache?: boolean): Promise<V>;
    protected abstract convertKey(key: K): MK;
    protected abstract fetchValue(key: K): Promise<V>;
}
export declare abstract class Store<K, V> extends AsyncConvertibleStore<K, K, V> {
    constructor();
    protected convertKey(key: K): K;
}
export declare abstract class AsyncIdStore<V> extends AsyncConvertibleStore<Long, string, V> {
    protected convertKey(key: Long): string;
}
export declare abstract class IdStore<V> extends ConvertibleStore<Long, string, V> {
    protected convertKey(key: Long): string;
}

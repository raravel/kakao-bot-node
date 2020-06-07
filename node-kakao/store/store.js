"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdStore = exports.AsyncIdStore = exports.Store = exports.AsyncConvertibleStore = exports.ConvertibleStore = exports.BaseConvertibleStore = void 0;
class BaseConvertibleStore {
    constructor() {
        this.cacheMap = new Map();
    }
    has(key) {
        return this.cacheMap.has(this.convertKey(key));
    }
    getValue(key) {
        return this.cacheMap.get(this.convertKey(key));
    }
    getValueRaw(key) {
        return this.cacheMap.get(key);
    }
    setCache(key, value) {
        this.cacheMap.set(this.convertKey(key), value);
    }
    setCacheRaw(key, value) {
        this.cacheMap.set(key, value);
    }
    delete(key) {
        this.cacheMap.delete(this.convertKey(key));
    }
    values() {
        return this.cacheMap.values();
    }
    clear() {
        this.cacheMap.clear();
    }
}
exports.BaseConvertibleStore = BaseConvertibleStore;
class ConvertibleStore extends BaseConvertibleStore {
    constructor() {
        super();
    }
    get(key, cache = true) {
        let k = this.convertKey(key);
        if (cache && this.has(key))
            return this.getValueRaw(k);
        let val = this.fetchValue(key);
        if (cache)
            this.setCacheRaw(k, val);
        return val;
    }
}
exports.ConvertibleStore = ConvertibleStore;
class AsyncConvertibleStore extends BaseConvertibleStore {
    constructor() {
        super();
    }
    async get(key, cache = true) {
        let k = this.convertKey(key);
        if (cache && this.has(key))
            return this.getValueRaw(k);
        let val = await this.fetchValue(key);
        if (cache)
            this.setCacheRaw(k, val);
        return val;
    }
}
exports.AsyncConvertibleStore = AsyncConvertibleStore;
class Store extends AsyncConvertibleStore {
    constructor() {
        super();
    }
    convertKey(key) {
        return key;
    }
}
exports.Store = Store;
class AsyncIdStore extends AsyncConvertibleStore {
    convertKey(key) {
        return key.toString();
    }
}
exports.AsyncIdStore = AsyncIdStore;
class IdStore extends ConvertibleStore {
    convertKey(key) {
        return key.toString();
    }
}
exports.IdStore = IdStore;
//# sourceMappingURL=store.js.map
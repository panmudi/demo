import {AsyncStorage} from 'react-native';

export default class StorageUtil {

    /*
     * 保存
     * */
    static save(key, value, callback) {
        return AsyncStorage.setItem(key, JSON.stringify(value), callback);
    }

    /*
     * 获取
     * */
    static get(key) {
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value);
            return jsonValue;
        })
    }

    /*
     * 更新
     * */
    static update(key, value) {
        StorageUtil.get(key).then((item) => {
            value = typeof value === 'string' ? value : Object.assign({}, item, value);
            return AsyncStorage.setItem(key, JSON.stringify(value));
        })
    }

    /*
     * 删除
     * */
    static delete(key, callback) {
        AsyncStorage.removeItem(key, callback);
    }
}
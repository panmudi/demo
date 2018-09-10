/**
 * 基于 fetch 封装的 GET请求
 * @param url
 * @param params {}
 * @param headers
 * @returns {Promise}
 */
var HttpUtil = {};

HttpUtil.get = function (url, params, headers) {
    if (params) {
        let paramsArray = [];
        //encodeURIComponent
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'GET',
            headers: headers,
        }).then((response) => {
            return response.json();
        }).then((response) => {
            resolve(response);
        }).catch((err) => {
            reject(err)
        })
    })
}

/**
 * 基于 fetch 封装的 POST请求  FormData 表单数据
 * @param url
 * @param formData
 * @param headers
 * @returns {Promise}
 */
HttpUtil.post = function (url, formData, headers) {
    return new Promise(function (resolve, reject) {
        fetch(url, {
                method: 'POST',
                headers: headers,
                body: formData,
            }).then((response) => {
                return response.json();
            }).then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err)
            })
    })
}

export default HttpUtil;
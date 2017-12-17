import { urlPath } from '../params/urlParams.js';
import { message, notification } from 'antd'
// import { post } from '../utils/postUrl.js'
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty'

axios.defaults.baseURL = 'http://localhost:8888';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export function deepClone(initalObj) {
    var obj = {};
    obj = JSON.parse(JSON.stringify(initalObj));
    return obj;
}

function objToQuery(params) {
    let keys = Object.keys(params);
    let query = []
    if (keys.length) {
        keys.map(item => {
            query.push(`${item}=${params[item]}`)
        })
    }
    return query.join('&');
}

export function axiosAjax(urls, params, method = 'post', config) {
    let url = "";
    if (!urls || urls.length <= 0) return;
    switch (urls.length) {
        case 1:
            url = urlPath[urls[0]];
            break;
        case 2:
            url = urlPath[urls[0]][urls[1]];
            break;
        case 3:
            url = urlPath[urls[0]][urls[1]][urls[2]];
            break;
    }
    config = _isEmpty(config) ? {
        headers:{"Content-Type":'application/json'}
    } : config;
    if (method.toLowerCase() == "get") {
        if (!_isEmpty(params)) url = url + "?" + objToQuery(params);
        return axios.get(url, config)
            .then(function(response) {
                return Promise.resolve(response.data)
            })
            .catch(function(response) {
                notification['error']({
                    message: '服务异常',
                    description: response.statusText,
                });
                return Promise.reject(response)
            })
    }
    if (method.toLowerCase() == "post") {
        return axios.post(url, params, config)
            .then(function(response) {
                return Promise.resolve(response.data)
            })
            .catch(function(response) {
                notification['error']({
                    message: '服务异常',
                    description: response.statusText,
                });
                return Promise.reject(response)
            })
    }
}
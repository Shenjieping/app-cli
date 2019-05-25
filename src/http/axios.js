/**
* @file axios.js
* @author shenjp@founder.com
* @date 2019-05-25 22:47:38
*/
/* eslint-disable */
import axios from 'axios';
import urls from '@/api/urls.js';
import qs from 'qs';

axios.interceptors.request.use(request => {
    if (request.data && request.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        request.data = qs.stringify(request.data);
    }
    if (request.method === 'post') {
        // request.headers['Content-Type'] = 'application/json;charset=UTF-8';
        /* let tmpBody = '';
        Object.keys(request.data).map(item => {
            let value = request.data[item];
            tmpBody +=
                `${item}=` +
                encodeURIComponent(
                    typeof value === 'object' ? JSON.stringify(value) : value
                ) +
                (item === 't' ? '' : '&');
        });
        request.data = tmpBody; */
    }
    return request;
});
const apis = Object.assign({}, urls);

const apiFactory = api => {
    let { url, method, ...others } = api;
    method = method === 'post' ? 'post' : 'get';

    const isFormData = others
        && others.headers
        && others.headers['Content-Type'] === 'multipart/form-data';

    return params => {
        const request = isFormData
            ? axios({
                url,
                method,
                ...others,
                data: params,
                timeout: 1000 * 5
            })
            : axios.request({
                url,
                method,
                ...others,
                timeout: 1000 * 5,
                [method === 'get' ? 'params' : 'data']:
                    others.headers &&
                        others.headers['Content-Type'] === 'multipart/form-data'
                        ? params
                        : {
                            ...params,
                            t: new Date().getTime()
                        }
            });

        return request
            .then(({ data }) => {
                return data;
            })
            .catch(res => {
                let resString = res.toString();
                if (
                    ~resString.indexOf('Network') &&
                    !~url.indexOf('getnewquestionnum')
                ) {
                    console.log('网络错误');
                }

                return Promise.reject(res);
            });
    };
};

const IO = {};

Object.keys(apis).map(item => {
    IO[item] = apiFactory(apis[item]);
});

export default IO;
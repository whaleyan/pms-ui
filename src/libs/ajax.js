import axios from 'axios';
import Cookies from 'js-cookie';
// import env from '../../build/env';
import Url from '../../build/url';
import { Message, Modal } from 'iview';
import store from '@/store/index';

// const ajaxUrl = env === 'development' ?
//     // 'http://192.168.0.230:8765/api' :
//     'http://localhost:8080/api' :
//     env === 'production' ?
//     'http://192.168.20.153:8765/api' :
//     'https://debug.url.com';

const ajaxUrl = Url;

let ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

// Add a request interceptor
ajax.interceptors.request.use(function(config) {
    if (Cookies.get('kt_token')) {
        store.commit('SET_TOKEN', Cookies.get('kt_token'));
        config.headers['Token'] = store.state.user.token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config;
}, function(error) {
    Promise.reject(error);
});

// Add a response interceptor
ajax.interceptors.response.use(function(response) {
    const res = response.data;
    if (response.status === 401 || res.status === 40101 || res.status === 401) {
        Modal.confirm({
            content: '<p>你已被登出，可以取消继续留在该页面，或者重新登录</p>',
            okText: '重新登录',
            onOk: () => { 
                // store.commit('SET_TOKEN', '');
                // store.commit('logout');
                store.commit('logout');
                store.commit('clearOpenedSubmenu');
                location.reload();
            }
        });
        return Promise.reject('你已被登出');
    }
    if (res.status === 403) {
        Message.error({
            content: '当前用户无相关操作权限！',
            duration: 2
        });
        return Promise.reject('当前用户无相关操作权限');
    }
    if (res.status === 404) {
        Message.error({
            content: '请求不存在',
            duration: 2
        });
    }
    if (response.status === 500) {
        Message.error({
            content: res.msg || "请求异常，请联系管理员",
            duration: 2
        });
        return res;
    } else {
        return res;
    } 
}, function(error) {
    // if(error.response) {
    //     let response = error.response.data;
    //     Message.error(response.message);
    // }
    if(error) {
        Message.error({
            content: '网络错误',
            duration: 2
        });
    }
    // Promise.reject(error);
});

export default ajax;
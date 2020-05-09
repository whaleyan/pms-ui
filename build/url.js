import env from '../build/env';

const ajaxUrl = env === 'development' ?
    // 'http://192.168.0.230:8765/api' :
    // 'http://localhost:8080/api' :
    // 'http://192.168.0.53:8751/api/admin' :
    // 'http://192.168.0.152:8751/api/admin' :
    // 'http://192.168.20.153:8751/api/admin' :
    'http://120.76.121.210:10010/pmsapi/' :
    env === 'production' ?
        '/pmsapi' :
        '';

export default ajaxUrl;
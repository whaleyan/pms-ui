import ajax from '@/libs/ajax';
let prefix = '';
export default {
    getCode(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/password/code', params).then(response => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
                reject(error);
            });
        });
    },
    validateCode(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/password/validateCode', params).then(response => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
                reject(error);
            });
        });
    },
    resetPassword(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/password/reset', params).then(response => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
                reject(error);
            });
        });
    }
}
import ajax from '@/libs/ajax';
let prefix = '';
export default {
    register(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/register/toRegister', params).then(response => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
                reject(error);
            });
        });
    },
    sendCode(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/register/sendCode', params).then(response => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
                reject(error);
            });
        });
    },
    activeEmail(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/register/active', params).then(response => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
                reject(error);
            });
        });
    }
}
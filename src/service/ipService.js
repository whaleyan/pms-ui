import ajax from '@/libs/ajax';
let prefix = '';
export default {
    getIpList(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/control/queryControlips', { params: params }).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    updateControlips(controlips) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/control/updateControlips', controlips).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    addControlips(controlips) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/control/addControlips',controlips).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    delControlipsById(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/control/delControlipsById?id='+params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
}

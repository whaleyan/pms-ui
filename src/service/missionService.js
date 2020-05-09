import ajax from '@/libs/ajax';
let prefix = '';
export default {
    getLogList(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/schedule/log/list', {params: params}).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
            });
        });
    },
    getMissionList(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/schedule/task/list', { params: params }).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
            });
        });
    },
    createMission(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/schedule/task/save', params ).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
            });
        });
    },
    deleteMission(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/schedule/task/delete', params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
            });
        });
    },
    updateMission(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/schedule/task/update', params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
            });
        });
    },
    resumeMission(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/schedule/task/resume', params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
            });
        });
    },
    runMission(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/schedule/task/run', params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
            });
        });
    },
    pauseMission(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/schedule/task/pause', params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
            });
        });
    }
}
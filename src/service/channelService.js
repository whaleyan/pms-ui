import ajax from '@/libs/ajax';

let prefix = '';
export default {
    getChannels(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/sys/channel/tree', { params: params }).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    },
    createChannel(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/sys/channel/add', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    },
    updateChannel(params) {
        return new Promise((resolve, reject) => {
            ajax.put(prefix + '/sys/channel/update/' + params.id, params).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    }, 
    deleteChannel(params) {
        return new Promise((resolve, reject) => {
            ajax.delete(prefix + '/sys/channel/update/' + params.id).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    }
}
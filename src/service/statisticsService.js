import ajax from '@/libs/ajax';
let prefix = '';
export default {
    //用户登录统计/count/countLoginTimes
    countLoginTimes(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/count/countLoginTimes', { params: params }).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });

    },
    ///count/countPapersProcess
    countPapersProcess(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/count/countPapersProcess', { params: params }).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });

    },
    //统计各学院提交论文数量/count/countPapersViewers
    countPapersByDep(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/count/countPapersByDep', { params: params }).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });

    },
    //count/countIPPVUV?start=2018-5-24&end=2018-06-07
    countIPPVUV(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/count/countIPPVUV', { params: params }).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });

    },
}

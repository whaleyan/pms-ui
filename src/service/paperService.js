import ajax from '@/libs/ajax';
let prefix = '';
export default {
    getPaperList(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/papers/queryPapers', { params: params }).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    //处理中论文/papers/processingList
    processingList(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/papers/processingList', { params: params }).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    //未提交论文学生列表/papers/noPublishList
    noPublishList(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/papers/noPublishList', { params: params }).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    //已审核论文/papers/fisishAuditList
    fisishAuditList(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/papers/fisishAuditList', { params: params }).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    //删除论文 /papers/delPapersById
    delPapersById(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/papers/delPapersById?id='+params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    //论文审核通过
    passById(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/papers/passById?id='+params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    //论文审核不通过
    unPassById(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/papers/unPassById',params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    queryPapersById(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/papers/queryPapersById?id='+params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    queryNextPaper(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/papers/queryNextPaper',params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    //待编目
    toCatalogueingList(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/papers/toCatalogueingList',{ params: params }).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    catalogueById(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/papers/catalogueById?id='+params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    cataloguePapersById(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/papers/cataloguePapersById', params, {headers:{'Content-Type':'application/json'}})
                .then((response) => {resolve(response);})
                .catch((error) => {console.log('Error:', error)});
        });
    },
    //已编目列表
    finishCatalogueingList(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/papers/finishCatalogueingList',{ params: params }).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    //修改论文状态为未提交papers/unSubmitById?id=1
    unSubmitById(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/papers/unSubmitById?id='+params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    //修改论文状态为等待审核
    submitById(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/papers/submitById?id='+params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    //论文取消发布/papers/unPublishById
    unPublishById(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/papers/unPublishById?id='+params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    //论文发布/papers/publishById
    publishById(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/papers/publishById?id='+params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },

    //待审核论文/papers/toAuditList
    toAuditList(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/papers/toAuditList',{ params: params }).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },

}

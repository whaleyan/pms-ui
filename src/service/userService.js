import ajax from '@/libs/ajax';
let prefix = '';
export default {
    getUserList(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/sys/user/page', { params: params }).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
        
    },
    getUserInfo(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/sys/user/menu', { params: params }).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                reject(error);
            });
        });
    },
    getPermessedMenus(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/admin/user/front/menus', { params: params }).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    createUser(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/sys/user', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    },
    updateUser(params) {
        return new Promise((resolve, reject) => {
            ajax.put(prefix + '/sys/user/' + params.userId, params).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    },
    deleteUser(params) {
        return new Promise((resolve, reject) => {
            ajax.delete(prefix + '/sys/user/' + params.id).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
        
    },
    login(params, callback) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/login/tologin', params)
                .then(function(response) {
                    resolve(response);
                })
                .catch(function(error) {
                    console.log('Error:', error);
                });
        });

    },
    logout(params, callback) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/login/logout', params)
                .then(function(response) {
                    resolve(response);
                })
                .catch(function(error) {
                    console.log('Error:', error);
                });
        });

    },
    //判断微信code登录
    checkWxCode(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/sys/common/wechatlogin', params)
                .then(function(response) {
                    resolve(response);
                })
                .catch(function(error) {
                    console.log('Error:', error);
                });
        });

    },
    //微信号与系统账号绑定
    wxaccountBinding(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/sys/common/wechatBinding', params)
                .then(function(response) {
                    resolve(response);
                })
                .catch(function(error) {
                    console.log('Error:', error);
                });
        });

    },


    getUniqId() {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/code/getCode')
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    console.log('Error:', error);
                });
        });
    },
    checkCode(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/code/verifyCode', { params: params })
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    console.log('Error:', error);
                });
        });
    },
    getImage(id) {
        return prefix + "/code/getImage?id=" + id;
    } ,
    isUnique(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/password/userUnique', params)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    console.log('Error:', error);
                });
        });
    },
    updatePwd(params) {
        return new Promise((resolve, reject) => {
            ajax.put(prefix + '/sys/user/update/password', params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
            });
        });
    }
}
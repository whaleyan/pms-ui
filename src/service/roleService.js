import ajax from '@/libs/ajax';
let prefix = '';
export default {
    getRoles(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/admin/role/tree', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    },
    getReverstree(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/sys/user/reverstree/'+params.id, { rid: params.id }).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    },
    getRoleInfo(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/admin/role/' + params.id).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    },
    getRoleAuth(id) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/admin/role/' + id + '/authority/menu').then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    },
    setRoleAuth(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/admin/role/'+ params.id +'/authority/menu', params).then(response => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
                reject(error);
            });
        });
    },
    createRole(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/admin/role', params ).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    },
    deleteRole(params) {
        return new Promise((resolve, reject) => {
            ajax.delete(prefix + '/admin/role/' + params.id ).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    },
    // setAuth(params) {
    //     return new Promise((resolve, reject) => {
    //         ajax.post('admin/role/'+ params.roleId +'/user?members=' + params.MemberId).then((response) => {
    //             resolve(response);
    //         }).catch((error) => {
    //             console.log('Error:', error);
    //         });
    //     });
    // },
    updateRole(params) {
        return new Promise((resolve, reject) => {
            ajax.put(prefix + '/admin/role/update/' + params.roleId, params ).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    },
    getRoleChannel(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/admin/role/' + params.roleId + '/channel', { params: params }).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    },
    setRoleChannel(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/admin/role/' + params.roleId + '/channel', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    }
}
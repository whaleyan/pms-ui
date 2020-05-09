/**
 * Created by kunteng on 2018/5/17.
 */
import ajax from '@/libs/ajax';
let prefix = '';
// type: 1:批注内容 2:模版文档 3:email参数 4:通知公告 5:FAQ消息

export default {
    getComments() {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/sysmanage/queryByType?type=1').then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    addComment(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/sysmanage/addSysManage', params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });

    },
    delComment(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/sysmanage/delSysManageById?id=' + params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });

    },
    updateComment(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/sysmanage/updateSysManage', params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });

    },
    getEmailSetting() {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/sysmanage/queryByType?type=3').then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });

    },
    updateEmailSetting(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/sysmanage/updateSysManage', {
                id: params.id,
                type: 3,
                content: JSON.stringify(params)
            }).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });

    },
    addEmailSetting(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/sysmanage/addSysManage', {
                id: params.id,
                type: 3,
                title: "Email参数设置",
                content: JSON.stringify(params)
            }).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    getTemplates() {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/sysmanage/queryByType?type=2').then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    addTemplate(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/sysmanage/addSysManage', params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });

    },
    delTemplate(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/sysmanage/delSysManageById?id=' + params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });

    },
    updateTemplate(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/sysmanage/updateSysManage', params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },

    getFaqs() {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/sysmanage/queryByType?type=5').then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    addFaq(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/sysmanage/addSysManage', params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });

    },
    delFaq(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/sysmanage/delSysManageById?id=' + params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });

    },
    updateFaq(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/sysmanage/updateSysManage', params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },

    getNotifications() {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/sysmanage/queryByType?type=4').then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    addNotification(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/sysmanage/addSysManage', params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    delNotification(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/sysmanage/delSysManageById?id=' + params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    updateNotification(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/sysmanage/updateSysManage', params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },

    //学生登陆日志查询  /syslog/studentLoginLog
    studentLoginLog(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/syslog/studentLoginLog', {params:params}).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    //系统日志查询
    sysLoglist(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/syslog/list', {params:params}).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },

}

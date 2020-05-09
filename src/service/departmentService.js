import ajax from '@/libs/ajax';
let prefix = '';
export default {
    getCollegeList(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/department/departmentList', { params: params }).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });

    },
    addDepartment(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/department/addDepartment', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    },
    updateDepartment(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/department/updateDepartment', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    },
    deleteDepartment(params) {
        return new Promise((resolve, reject) => {
            ajax.delete(prefix + '/department/deleteDepartment?id='+ params.id).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    },
    //专业列表
    getMajorList(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/professional/professionalList?depId=-1', { params: params }).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    //专业列表
    getMajorListByDepId(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/professional/professionalList?depId='+params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    addProfessional(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/professional/addProfessional', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    },
    updateProfessional(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/professional/updateProfessional',params).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    },
    deleteProfessional(params) {
        return new Promise((resolve, reject) => {
            ajax.delete(prefix + '/professional/deleteProfessional?id='+ params.id).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    },
    //导师列表
    getTutorList(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/teacher/teacherList', { params: params }).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    addTeacher(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/teacher/addTeacher', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    },
    deleteTeacher(params) {
        return new Promise((resolve, reject) => {
            ajax.delete(prefix + '/teacher/deleteTeacher?id='+ params).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    },
    //学生类型管理
    getStudentTypeList(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/degree/degreeList', { params: params }).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    addDegree(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/degree/addDegree', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    },
    deleteDegree(params) {
        return new Promise((resolve, reject) => {
            ajax.delete(prefix + '/degree/deleteDegree?id='+ params.id).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    },
    updateDegree(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/degree/updateDegree',params).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log('Error:', error);
            });
        });
    },
}

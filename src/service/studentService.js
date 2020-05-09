import ajax from '@/libs/ajax';
let prefix = '';
export default {
    getStudentList(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/student/studentList', { params: params }).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
        
    },
    createStudent(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/student/addStudent', params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    delStudent(params) {
        return new Promise((resolve, reject) => {
            ajax.delete(prefix + '/student/deleteStudent?stuNo='+params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });
    },
    updateStudent(params) {
        return new Promise((resolve, reject) => {
            ajax.post(prefix + '/student/updateStudent', params).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
                // reject(error);
            });
        });

    },
    changeManySubmit(stuNos, state) {
        if (state === 1) {
            return new Promise((resolve, reject) => {
                ajax.get(prefix + "/student/allowManyById?id=" + stuNos)
                    .then((response) => {resolve(response)})
                    .catch((error) => {console.log('Error:', error);});
            });
        } else {
            return new Promise((resolve, reject) => {
                ajax.get(prefix + "/student/allowOneById?id=" + stuNos)
                    .then((response) => {resolve(response)})
                    .catch((error) => {console.log('Error:', error)});
            });
        }
    },
    passStudent(stuNo) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + "/student/passById?id=" + stuNo)
                .then((response) => {resolve(response)})
                .catch((error) => {console.log('Error:', error)});
        });
    }
}
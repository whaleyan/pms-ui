import ajax from '@/libs/ajax';
let prefix = '';
export default {
    getMenuTree(params) {
        return new Promise((resolve, reject) => {
            ajax.get(prefix + '/admin/menu/tree').then(function (response) {
                resolve(response);
            }).catch(function (error) {
                console.log('Error:', error);
            });
        });

    }
}
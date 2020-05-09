import Cookies from 'js-cookie';
import treeUtil from '@/libs/tree-util';
import { appRouter } from '@/router/router';

const user = {
    state: {
        uid: '',
        name: '',
        password: '',
        sex: '',
        username: '',
        mobile: '',
        email: '',
        description: '',
        code: '',
        token: '',
        avatar: '',
        roleId: '',
        roleName: '',
        roles: [],
        allowedMenu: [],
        allowedResource: [],
        allowedResourceTree: [],
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
            Cookies.set('kt_token', token);
        },
        SET_ID: (state, uid) => {
            state.uid = uid;
            Cookies.set('kt_uid', uid);
        },
        SET_NAME: (state, name) => {
            state.name = name;
            Cookies.set('kt_name', name);
        },
        SET_USERNAME: (state, username) => {
            state.username = username;
            Cookies.set('kt_username', username);
        },
        SET_ROLENAME: (state, roleName) => {
            state.roleName = roleName;
            Cookies.set('kt_roleName', roleName);
        },
        SET_ROLEID: (state, roleId) => {
            state.roleId = roleId;
            Cookies.set('kt_roleId', roleId);
        },
        SET_MOBILE: (state, mobile) => {
            state.mobile = mobile;
            Cookies.set('kt_mobile', mobile);
        },
        SET_EMAIL: (state, email) => {
            state.email = email;
            Cookies.set('kt_email', email);
        },
        SET_ALLOWEDRESOURCE: (state, resource) => {
            state.allowedMenu = resource;
            Cookies.set('kt_allowedMenu', resource);

            state.allowedResource = resource;

            //获取当前登录用户的角色权限树，与路由树 appRouter 对应其 title，同时把 auths 变成 children
            let ptree = treeUtil.filterTreeObj(appRouter,(item)=>{return true},(item)=>{
                if(item.auths && item.auths.length > 0){
                    item.children = item.auths;
                }
                return item;
            });
            //简化资源树结构
            let nt = treeUtil.copyTreeObjWithGivenProp(ptree, ['title','code']);

            //过滤没有的权限
            let nn = treeUtil.filterTreeObj(nt,(item) => {
                return state.allowedResource[item.code];
            },(item)=>{
                return item;
            });


            //以上逻辑可简化为一个方法
            state.allowedResourceTree = nn;
            Cookies.set('kt_allowedResourceTree', JSON.stringify(nn));

            console.log("简化后的树：",state.allowedResourceTree)

        },

        logout(state, vm) {
            Cookies.remove('kt_name');
            state.name = '';
            Cookies.remove('kt_username');
            state.username = '';
            Cookies.remove('kt_token');
            state.token = '';
            Cookies.remove('kt_mobile');
            state.mobile = '';
            Cookies.remove('kt_email');
            state.email = '';
            Cookies.remove('kt_uid');
            state.uid = '';
            Cookies.remove('kt_roleId');
            state.roleId = '';
            Cookies.remove('kt_roleName');
            state.roleName = '';
            Cookies.remove('kt_allowedMenu');
            state.allowedMenu = [];
            Cookies.remove('kt_allowedResourceTree');
            state.allowedResourceTree = [];
            // 恢复默认样式
            let themeLink = document.querySelector('link[name="theme"]');
            themeLink.setAttribute('href', '');
            // 清空打开的页面等数据，但是保存主题数据
            let theme = '';
            if (localStorage.theme) {
                theme = localStorage.theme;
            }
            localStorage.clear();
            if (theme) {
                localStorage.theme = theme;
            }
        }
    },
    getters: {
        getToken:(state) => {
            return state.token == "" ? Cookies.get("kt_token"): state.token ;
        },
        getUid: (state) => {
            return state.uid == "" ? Cookies.get("kt_uid") : state.uid;
        },
        getName: (state) => {
            return state.name == "" ? Cookies.get("kt_name") : state.name;
        },
        getMobile: (state) => {
            return state.mobile == "" ? Cookies.get("kt_mobile") : state.mobile;
        },
        getEmail: (state) => {
            return state.email == "" ? Cookies.get("kt_email") : state.email;
        },
        getRoleId:(state) => {
            return state.roleId == "" ? Cookies.get("kt_roleId"): state.roleId;
        },
        getRoleName: (state) => {
            return state.roleName == "" ? Cookies.get("kt_roleName"): state.roleName;
        },
        getAllowedMenus:( state ) => {
            return state.allowedMenu.length == 0 ? (Cookies.get("kt_allowedMenu") ? JSON.parse(Cookies.get("kt_allowedMenu")) : "[]") : state.allowedMenu ;
        },
        getAllowedResourceTree:( state ) => {
            return state.allowedResourceTree.length == 0 ? (Cookies.get("kt_allowedResourceTree") ? JSON.parse(Cookies.get("kt_allowedResourceTree")) : "[]") : state.allowedResourceTree ;
        }

    }
};

export default user;
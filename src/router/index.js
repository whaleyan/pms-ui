import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import userService from '@/service/userService';
import store from '../store';
import {
    routers,
} from './router';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

const whiteList = ['error-403', 'error-404', 'error-500', 'locking', 'forgetpwd', 'bindingWx', 'register', 'activeEmail']; // 没有登录时的白名单
const whiteList2 = ['error-403', 'error-404', 'error-500', 'locking', 'forgetpwd', 'home_index', 'ownspace_index', 'paper-review']; // 登录后的白名单
router.beforeEach((to, from, next)  => {
    iView.LoadingBar.start();
    let token = store.getters.getToken;
    console.log("To:", to);
    Util.title(to.meta.title);
    if (!token && to.name !== 'login') { // 判断 未登录且前往的页面不是登录页
        console.log("路由守卫: 1.没有登录");
        if (whiteList.indexOf(to.name) === -1) {
            next({
                name: 'login'
            });
        } else {
            console.log("============exist in whitelist.===========");
            next();
        }
    } else if (!token && to.name == 'login') { // 未登录且前往登录页
        next();
    } else if (token && to.name === 'login') { // 判断 已经登录且前往的是登录页
        console.log("路由守卫: 2.登录成功，跳转首页");
        
        Util.title();
        next({
            name: 'home_index'
        });
    } else { // 已登录其他条件
        console.log("路由守卫: 3.登录成功");
        if (store.state.user.allowedMenu.length === 0){
            userService.getUserInfo({
                token: token
            }).then(data => {
                store.commit('SET_ID', data.data.uid);
                store.commit('SET_NAME', data.data.name);
                store.commit('SET_USERNAME', data.data.userName);
                store.commit('SET_MOBILE', data.data.mobile);
                store.commit('SET_EMAIL', data.data.email);
                let allowedmenus = JSON.parse(data.data.menu);
                store.commit('SET_ALLOWEDRESOURCE', allowedmenus);
                store.commit('updateMenulist', store.getters.getAllowedMenus);
                console.log("权限信息：", allowedmenus);

                if (!allowedmenus[to.name] && (whiteList2.indexOf(to.name) === -1)) {
                    next({
                        name: 'error-403'
                    });
                } else {
                    store.commit('SET_ROLENAME', data.data.roleName);
                    store.commit('SET_ROLEID', data.data.roleId);
                    next();
                }
            });
        } else {
            let allowedmenus = store.state.user.allowedMenu;
            if (!allowedmenus[to.name] && (whiteList2.indexOf(to.name) === -1)) {
                next({
                    name: 'error-403'
                });
            } else {
                next();
            }
        }
    }
});

router.afterEach((to) => {
    Util.openNewPage(router.app, to.name, to.params, to.query);
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
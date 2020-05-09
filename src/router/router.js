import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => { require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve); }
};

export const forgetPwd = {
    path: '/forgetpwd',
    name: 'forgetpwd',
    meta: {
        title: '找回密码'
    },
    component: resolve => { require(['@/views/main-components/forgetpwd/forget-password.vue'], resolve); }
}

export const register = {
    path: '/register',
    name: 'register',
    meta: {
        title: '注册'
    },
    component: resolve => { require(['@/views/main-components/register/register.vue'], resolve); }
}

export const activeEmail = {
    path: '/activeEmail',
    name: 'activeEmail',
    meta: {
        title: '注册'
    },
    component: resolve => { require(['@/views/main-components/register/activeEmail.vue'], resolve); }
}

export const bindingWeixin = {
    path: '/bindingWx',
    name: 'bindingWx',
    meta: {
        title: '绑定微信'
    },
    component: resolve => { require(['@/views/main-components/register/binding/binding-weixin.vue'], resolve); }
}


// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: { i18n: 'home' }, name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => { require(['@/views/own-space/own-space.vue'], resolve); } },
        { path: 'message', title: '消息中心', name: 'message_index', component: resolve => { require(['@/views/message/message.vue'], resolve); } },
        { path: 'paper/review/:paper_id', title: '论文审核', name: 'paper-review', component: resolve => { require(['@/views/papers/paper-review.vue'], resolve); } },// 用于展示动态路由
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
// 必须加上 code 字段作为唯一标识，与数据库中的 json 对应
export const appRouter = [
    {
        path: '/student',
        code: "student", //唯一标识
        icon: 'ios-monitor',
        name: 'studentMg',
        title: '用户管理',
        type: 'dir',
        component: Main,
        children: [
            {
                path: 'student', type: 'page', code: 'student', title: '学生管理', name: 'student', icon: 'person-stalker', component: resolve => { require(['@/views/student/student-management.vue'], resolve); }
            },

        ]
    },
    {
        path: '/thesis',
        code: "thesis", //唯一标识
        icon: 'document',
        name: 'thesis',
        title: '论文管理',
        type: 'dir',
        component: Main,
        children: [
            { path: 't-processing', type: 'page', code: "t-processing", title: '处理中的论文', name: 't-processing', icon: 'document', component: resolve => { require(['@/views/thesis/in-process/thesis-management.vue'], resolve); } },
            { path: 't-unsubmit', type: 'page', code: "t-unsubmit", title: '未提交的论文', name: 't-unsubmit', icon: 'document', component: resolve => { require(['@/views/thesis/un-submit/thesis-unsubmit-list.vue'], resolve); } },
            { path: 't-done', type: 'page', code: "t-done", title: '已收录的论文', name: 't-done', icon: 'document', component: resolve => { require(['@/views/thesis/include/thesis-include.vue'], resolve); } }
        ]
    },
    {
        path: '/department',
        code: "department", //唯一标识
        icon: 'university',
        name: 'department',
        title: '院系导师管理',
        type: 'dir',
        component: Main,
        children: [
            {
                path: 'college', type: 'page', code: "college", title: ' 学院管理', name: 'college', icon: 'cube', component: resolve => { require(['@/views/department/college/college-management.vue'], resolve); }
            },
            {
                path: 'major', type: 'page', code: "major", title: '专业管理', name: 'major', icon: 'cube', component: resolve => { require(['@/views/department/major/major-management.vue'], resolve); }
            },
            {
                path: 'tutor', type: 'page', code: "tutor", title: '导师管理', name: 'tutor', icon: 'cube', component: resolve => { require(['@/views/department/tutor/tutor-management.vue'], resolve); }
            },
            {
                path: 'student-type', type: 'page', code: "student-type", title: '学生类型管理', name: 'student-type', icon: 'cube', component: resolve => { require(['@/views/department/student-type/studentType-management.vue'], resolve); }
            },
        ]
    },
    {
        path: '/t-review',
        code: "t-review", //唯一标识
        icon: 'eye',
        name: 't-review',
        title: '审核论文',
        type: 'dir',
        component: Main,
        children: [
            { path: 'r-processing', type: 'page', code: "r-processing", title: ' 待审核论文', name: 'r-processing', icon: 'cube', component: resolve => { require(['@/views/papers/r-processing/r-processing.vue'], resolve); } },
            { path: 'r-done', type: 'page', code: "r-done", title: '已审核论文', name: 'r-done', icon: 'cube', component: resolve => { require(['@/views/papers/r-done/r-done.vue'], resolve); } },
        ]
    },
    {
        path: '/recruitment',
        code: "recruitment", //唯一标识
        icon: 'star',
        name: 'recruitment',
        title: '论文编目',
        type: 'dir',
        component: Main,
        children: [
            { path: 'recruit-processing', type: 'page', code: "recruit-processing", title: '待编目论文', name: 'recruit-processing', icon: 'star', component: resolve => { require(['@/views/recruitment/processing/recruit-processing.vue'], resolve); } },
            { path: 'recruit-done', type: 'page', code: "recruit-done", title: '已编目论文', name: 'recruit-done', icon: 'star', component: resolve => { require(['@/views/recruitment/done/recruit-done.vue'], resolve); } },
            // { path: 'recruit-resubmit', type: 'page', code: "recruit-resubmit", title: '重新提交的申请', name: 'recruit-resubmit', icon: 'star', component: resolve => { require(['@/views/recruitment/resubmit/recruit-resubmit.vue'], resolve); } },
        ]
    },
    {
        path: '/ip',
        code: "ip", //唯一标识
        icon: 'wifi',
        name: 'ipMg',
        title: 'IP管理',
        type: 'dir',
        component: Main,
        children: [
            {
                path: 'ip', code: "ip", title: 'IP管理', name: 'ip', icon: 'wifi', component: resolve => { require(['@/views/ip/ip-management.vue'], resolve); }
            },

        ]
    },
    {
        path: '/log',
        code: "log", //唯一标识
        icon: 'search',
        name: 'logMg',
        title: '日志管理',
        type: 'dir',
        component: Main,
        children: [
            {  path: 'log', type: 'page', code: "log", title: '登录日志', name: 'log', icon: 'search', component: resolve => { require(['@/views/sys/log/login-times.vue'], resolve); }},
            {  path: 'opt', type: 'page', code: "opt", title: '操作日志', name: 'opt', icon: 'search', component: resolve => { require(['@/views/sys/log/opt-list.vue'], resolve); }}
        ]
    },
    {
        path: '/statistics',
        code: "statistics", //唯一标识
        icon: 'stats-bars',
        name: 'statisticsMg',
        title: '统计管理',
        type: 'dir',
        component: Main,
        children: [
            { path: 'statistics', type: 'page', code: "statistics", title: '统计管理', name: 'statistics', icon: 'pie-graph', component: resolve => { require(['@/views/statistics/statistics-management.vue'], resolve); } },
        ]
    },
    {
        path: '/sys',
        code: "sys", //唯一标识
        icon: 'gear-a',
        name: 'sys',
        title: '系统管理',
        type: 'dir',
        component: Main,
        children: [
            {
                path: 'user', type: 'page', code: 'user', title: '系统用户', name: 'user', icon: 'gear-a', component: resolve => { require(['@/views/sys/user/users-management.vue'], resolve); }
            },
            {
                path: 'role', type: 'page', code: 'role', title: '角色管理', name: 'role', icon: 'gear-a', component: resolve => { require(['@/views/sys/role/role-management.vue'], resolve); }
            },
            {
                path: 'comment', type: 'page', code: 'comment', title: '批注内容设置', name: 'comment', icon: 'gear-a', component: resolve => { require(['@/views/sys/setting/comments/comments-list.vue'], resolve); }
            },
            {
                path: 'template', type: 'page', code: 'template', title: '模版文档设置', name: 'template', icon: 'gear-a', component: resolve => { require(['@/views/sys/setting/template/template-list.vue'], resolve); }
            },
            {
                path: 'email', type: 'page', code: 'email', title: 'Email参数设置', name: 'email', icon: 'gear-a', component: resolve => { require(['@/views/sys/setting/email/email'], resolve); }
            },
            {
                path: 'notes', type: 'page', code: 'notes', title: '通知公告设置', name: 'notes', icon: 'gear-a', component: resolve => { require(['@/views/sys/setting/notes/notes-list.vue'], resolve); }
            },
            {
                path: 'faq', type: 'page', code: 'faq', title: 'FAQ消息设置', name: 'faq', icon: 'gear-a', component: resolve => { require(['@/views/sys/setting/faq/faq-list.vue'], resolve); }
            }
        ]
    },



];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    forgetPwd,
    bindingWeixin,
    register,
    activeEmail,
    ...appRouter,
    page500,
    page403,
    page404
];

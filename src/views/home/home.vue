<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <h1>首页</h1>
        <!-- <has-permisstion permission="sys:user:save">
            <Button type="primary" >新增用户</Button>
        </has-permisstion>
        <has-permisstion permission="sys:user:dele">
            <Button type="primary" >删除用户</Button>
        </has-permisstion> -->

        <!-- <role-tree-select selectedRid="U9C" :rid="rid" v-on:selectedVal="onSelectedVal" :isInit=isInit></role-tree-select> -->
        <!--<ktupload kttype="student"></ktupload>-->

    </div>
</template>

<script>
    import Ktupload from "../main-components/upload/ktupload";
    // import HasPermisstion from "@/views/main-components/auth/has-permission.vue";
    // import RoleTreeSelect from "../sys/role/role-tree-select.vue";
export default {
    components: {
//        Ktupload
        // RoleTreeSelect
        // HasPermisstion
    },
    name: 'home',
    data () {
        return {
            rid: '1',
            root: {},
            isInit: true
        };
    },
    computed: {

    },
    methods: {
        onSelectedVal(val){
            console.log("vali: ",val);
        }
    },
    created(){
    }
};
</script>

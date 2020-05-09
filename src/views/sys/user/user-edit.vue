<template>
    <span>
        <Button type="primary" size="small" @click="openDialog">编辑</Button>
        <!-- 新增 -->
        <Modal v-model="show" title="编辑用户" :loading="loading" @on-ok="onOk" @on-visible-change="visibleChange">
            <p>
                <Form ref="myForm" :model="item" :rules="rules" :label-width="80">
                    <FormItem label="账户" prop="userName">
                        <Input type="text" v-model="item.userName" disabled></Input>
                    </FormItem>
                    <FormItem label="姓名" prop='name'>
                        <Input type="text" v-model="item.name"></Input>
                    </FormItem>
                    <FormItem label="邮箱" prop='email'>
                        <Input type="email" v-model="item.email" disabled></Input>
                    </FormItem>
                    <FormItem label="联系方式" prop='mobile'>
                        <Input type="text" v-model="item.mobile" disabled></Input>
                    </FormItem>
                    <FormItem label="角色" prop='roleId'>
                        <Input v-show="false" type="text" v-model="item.roleId"></Input>
                        <role-tree-select :selectedRid="item.roleId" :rid="rid" v-on:selectedVal="onSelectedVal" :isInit=isInit></role-tree-select>
                        <!-- <role-tree-select selectedRid="L32" :rid="rid" v-on:selectedVal="onSelectedVal"></role-tree-select> -->
                    </FormItem>
                    
                </Form>
            </p>
        </Modal>

    </span>
</template>

<script>
import Cookies from 'js-cookie';
import UsersManagementService from '@/service/userService';
import RoleService from '@/service/roleService';
import User from '@/entity/user';
import RoleTreeSelect from "../role/role-tree-select";
export default {
    components: {RoleTreeSelect},
    name: "user-edit",
    props: {
        user: Object
    },
    data() {
        const isUniqAccount = (rule, value, callback) => {
            UsersManagementService.isUnique({type: 'account', item: value}).then(res => {
                if(res.status === 200) {
                    if(!res.data.isUnique) {
                        callback(new Error('该账户已被创建过'));
                    } else {
                        callback();
                    }
                }
            });
        }
        const isUniqEmail = (rule, value, callback) => {
            UsersManagementService.isUnique({type: 'email', item: value}).then(res => {
                if(res.status === 200) {
                    if(!res.data.isUnique) {
                        callback(new Error('该邮箱已被创建过'));
                    } else {
                        callback();
                    }
                }
            });
        }
        const isUniqMobile = (rule, value, callback) => {
            UsersManagementService.isUnique({type: 'mobile', item: value}).then(res => {
                if(res.status === 200) {
                    if(!res.data.isUnique) {
                        callback(new Error('该联系方式已被创建过'));
                    } else {
                        callback();
                    }
                }
            });
        }
        return {
            modal1: false,
            show: false,
            rid: "1",
            loading: true,
            rules: {
                // userName: [
                //     { required: true, message: '输入不能为空', trigger: 'blur' },
                //     { validator: isUniqAccount, trigger: 'blur'}
                // ],
                name: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ],
                // email: [
                //     { required: true, message: '输入不能为空', trigger: 'blur' },
                //     { validator: isUniqEmail, trigger: 'blur'}
                // ],
                // mobile: [
                //     { required: true, message: '输入不能为空', trigger: 'blur' },
                //     { validator: isUniqMobile, trigger: 'blur'}
                // ],
                roleId: [
                    { required: true, message: '请选择一个角色', trigger: 'blur'}
                ]
            },
            currentNode: {},
            treeData : [],
            item: {},
            selectedRid: "",
            isInit: false
        };
    },
    methods: {
        onOk() {
            let vm = this, params = this.item;
            this.$refs.myForm.validate((valid) => {
                if (valid) {
                    params.username = params.userName;
                    UsersManagementService.updateUser(params).then(res => {
                        if (res.status === 200) {
                            vm.loading = false; // 关闭等待状态
                            vm.show = false; // 关闭弹框
                            vm.$Notice.success({title: res.msg});
                            vm.$emit('onSuccess');
                        } else {
                            vm.loading = false;
                            vm.$Notice.error({title: res.msg});
                        }
                    });
                } else {
                    vm.loading = false;
                }
            });

        },
        visibleChange(flag) {
            if(!flag) {
                this.loading = true;
                this.isInit = false;
            } else {
                this.isInit = true;
            }
        },
        onSelectedVal(val){
            this.item.roleId = val;
        },
        openDialog(){
            this.show = true;

        }
    },
    created() {
        this.rid = this.$store.getters.getRoleId;
        this.item = Object.assign({}, this.user);
        this.item.userName = this.item.username;
        this.selectedRid = this.item.roleId;
    },
    mounted() {
        
    }
};
</script>



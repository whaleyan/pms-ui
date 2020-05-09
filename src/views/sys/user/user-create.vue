<template>
    <div>
        <!--<has-permisstion permission="sys:user:save">-->
            <Button type="primary" icon="plus" @click="openDialog">新增用户</Button>
        <!--</has-permisstion>-->
        <!-- 新增 -->
        <Modal v-model="show" title="新增用户" :loading="loading" @on-ok="createUser" @on-visible-change="visibleChange">
            <p>
                <Form ref="createForm" :model="item" :rules="rules" :label-width="80">
                    <FormItem label="账户" prop="userName">
                        <Input type="text" v-model="item.userName"></Input>
                    </FormItem>
                    <FormItem label="姓名" prop='name'>
                        <Input type="text" v-model="item.name"></Input>
                    </FormItem>
                    <FormItem label="密码" prop='password'>
                        <Input type="password" v-model="item.password"></Input>
                    </FormItem>
                    <FormItem label="邮箱" prop='email'>
                        <Input type="email" v-model="item.email"></Input>
                    </FormItem>
                    <FormItem label="联系方式" prop='mobile'>
                        <Input type="text" v-model="item.mobile"></Input>
                    </FormItem>
                    <FormItem label="角色" prop='roleId'>
                        <Input v-show="false" type="text" v-model="item.roleId"></Input>
                        <role-tree-select :isInit=isInit :selectedRid="item.roleId" :rid="rid" v-on:selectedVal="onSelectedVal"></role-tree-select>
                    </FormItem>
                </Form>
            </p>
        </Modal>

    </div>

    
</template>

<script>
import Cookies from 'js-cookie';
import UsersManagementService from '@/service/userService';
import RoleService from '@/service/roleService';
import User from '@/entity/user';
import RoleTreeSelect from "../role/role-tree-select";
import HasPermisstion from "@/views/main-components/auth/has-permission.vue";
import { validateEmail, validateMobile } from '@/libs/validate';
export default {
    components: {RoleTreeSelect, HasPermisstion},
    name: "user-create",
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
            if(!validateMobile(value)) {
                callback(new Error("手机号码格式不正确"));
            }
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
            show: false,
            loading: true,
            item: new User(),
            rules: {
                userName: [
                    { required: true, message: '输入不能为空', trigger: 'blur' },
                    { validator: isUniqAccount, trigger: 'blur'}
                ],
                name: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ],
                email: [
                    { required: true, type:'email', message: '输入邮箱格式不正确', trigger: 'blur' },
                    { validator: isUniqEmail, trigger: 'blur'}
                ],
                mobile: [
                    { required: true, message: '输入不能为空', trigger: 'blur' },
                    { validator: isUniqMobile, trigger: 'blur'}
                ],
                roleId: [
                    { required: true, message: '请选择一个角色', trigger: 'blur'}
                ]
            },
            rid : '1',
            isInit: false
        };
    },
    methods: {
        createUser() {
            let vm = this, params = this.item;
            this.$refs.createForm.validate((valid) => {
                if (valid) {
                    params.username = params.userName;
                    console.log("保持的用户信息为：",params);
                    UsersManagementService.createUser(params).then(res => {
                        if (res.status === 200) {
                            vm.loading = false; // 关闭等待状态
                            vm.show = false; // 关闭弹框
                            vm.$Notice.success({title: '创建成功'});
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
        onSelectedVal(val){
            this.item.roleId = val;
            console.log(this.item);
            
        },
        visibleChange(flag) {
            if(!flag) {
                this.item = new User();
                this.loading = true;
                this.isInit = false;
            } else {
                this.isInit = true;
            }
        },
        openDialog(){
            this.show = true;
        }
    },
    created() {
        // this.rid = this.$store.getters.getRoleId;
    }
};
</script>



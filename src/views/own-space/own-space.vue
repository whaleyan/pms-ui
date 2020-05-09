<style lang="less">
    @import './own-space.less';
</style>

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                个人信息
            </p>
            <div>
                <Form 
                    ref="userForm"
                    :model="userForm" 
                    :label-width="100" 
                    label-position="right"
                    :rules="inforValidate"
                >
                    <FormItem label="用户姓名：" prop="name">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.name" ></Input>
                        </div>
                    </FormItem>
                    <FormItem label="手机号：" prop="mobile" >
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.mobile"></Input>
                        </div>
                    </FormItem>
                    <FormItem label="Email：" prop="email" >
                        <div style="display:inline-block;width:300px;">
                            <Input type="email" v-model="userForm.email"></Input>
                        </div>
                    </FormItem>
                    <FormItem label="登录密码：">
                        <Button type="text" size="small" @click="showEditPassword">修改密码</Button>
                    </FormItem>
                    <div>
                        <Button type="text" style="width: 100px;" @click="cancelEditUserInfor">取消</Button>
                        <Button type="primary" style="width: 100px;" :loading="save_loading" @click="saveEdit">保存</Button>
                    </div>
                </Form>
            </div>
        </Card>
        <Modal v-model="editPasswordModal" :closable='false' :mask-closable=false :width="500">
            <h3 slot="header" style="color:#2D8CF0">修改密码</h3>
            <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right" :rules="passwordValidate">
                <FormItem label="原密码" prop="oldPass">
                    <Input type="password" v-model="editPasswordForm.oldPass" placeholder="请输入现在使用的密码" ></Input>
                </FormItem>
                <FormItem label="新密码" prop="newPass">
                    <Input type="password" v-model="editPasswordForm.newPass" placeholder="请输入新密码，至少6位字符" ></Input>
                </FormItem>
                <FormItem label="确认新密码" prop="rePass">
                    <Input type="password" v-model="editPasswordForm.rePass" placeholder="请再次输入新密码" ></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelEditPass">取消</Button>
                <Button type="primary" :loading="savePassLoading" @click="saveEditPass">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import UsersManagementService from '@/service/userService';
import { Base64 } from 'js-base64';
import { validateEmail, validateMobile } from '@/libs/validate';
export default {
    name: 'ownspace_index',
    data () {
        const validePhone = (rule, value, callback) => {
            if (!validateMobile(value)) {
                callback(new Error('请输入正确格式的手机号'));
            } else {
                callback();
            }
        };
        const valideRePassword = (rule, value, callback) => {
            if (value !== this.editPasswordForm.newPass) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
        const isValiEmail = (rule, value, callback) => {
            if(!validateEmail(value)) {
                callback(new Error("邮箱地址格式不正确"));
            } else {
                callback();
            }
        }
        return {
            userForm: {
                userId: this.$store.getters.getUid,
                name: this.$store.getters.getName,
                mobile: this.$store.getters.getMobile,
                email: this.$store.getters.getEmail
            },
            save_loading: false,
            editPasswordModal: false, // 修改密码模态框显示
            savePassLoading: false,
            inforValidate: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '请输入手机号码' },
                    { validator: validePhone }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址' },
                    { validator: isValiEmail, trigger: 'blur' }
                ]
            },
            editPasswordForm: {
                oldPass: '',
                newPass: '',
                rePass: ''
            },
            passwordValidate: {
                oldPass: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                newPass: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, message: '请至少输入6个字符', trigger: 'blur' },
                    { max: 32, message: '最多输入32个字符', trigger: 'blur' }
                ],
                rePass: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    { validator: valideRePassword, trigger: 'blur' }
                ]
            }
        };
    },
    // beforeRouteEnter (to, from, next) {
    //     console.log("BeforeRouteEnter:", to);
    //     next();
    // },
    // beforeRouteUpdate (to, from, next) {
    //     console.log("BeforeRouteUpdate:", to);
    //     next();
    // },
    // beforeRouteLeave (to, from , next) {
    //     console.log(to, from);
        
    //     this.$Modal.confirm({
    //         title: '警告',
    //         content: '<p>Do you really want to leave? you have unsaved changes!</p>',
    //         okText: 'OK',
    //         cancelText: 'Cancel',
    //         onOk: () => {
    //             next();
    //         }
    //     });
    // },
    methods: {
        showEditPassword () {
            this.editPasswordModal = true;
        },
        cancelEditUserInfor () {
            this.$store.commit('removeTag', 'ownspace_index');
            localStorage.pageOpenedList = JSON.stringify(this.$store.state.app.pageOpenedList);
            let lastPageName = '';
            if (this.$store.state.app.pageOpenedList.length > 1) {
                lastPageName = this.$store.state.app.pageOpenedList[1].name;
            } else {
                lastPageName = this.$store.state.app.pageOpenedList[0].name;
            }
            this.$router.push({
                name: lastPageName
            });
        },
        saveEdit () {
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    let vm = this, params = this.userForm;
                    UsersManagementService.updateUser(params).then(res => {
                        vm.save_loading = false;
                        if (res.status === 200) {
                            vm.$Notice.success({title: res.msg});
                        } else {
                            vm.$Notice.error({title: res.msg});
                        }
                        this.updateInfo();
                    });
                }
            });
        },
        updateInfo() {
            let token = this.$store.getters.getToken;
            UsersManagementService.getUserInfo({
                token: token
            }).then(data => {
                this.$store.commit('SET_ID', data.data.uid);
                this.$store.commit('SET_NAME', data.data.name);
                this.$store.commit('SET_USERNAME', data.data.userName);
                this.$store.commit('SET_MOBILE', data.data.mobile);
                this.$store.commit('SET_EMAIL', data.data.email);
                let allowedmenus = JSON.parse(data.data.menu);
                this.$store.commit('SET_ALLOWEDRESOURCE', allowedmenus);
            });
        },
        cancelEditPass () {
            this.editPasswordModal = false;
        },
        saveEditPass () {
            this.$refs['editPasswordForm'].validate((valid) => { 
                if (valid) {
                    this.savePassLoading = true;
                    let params = {
                        oldPassword: Base64.encode(this.editPasswordForm.oldPass), 
                        newPassword: Base64.encode(this.editPasswordForm.newPass)
                    }
                    UsersManagementService.updatePwd(params).then(res => {
                        this.savePassLoading = false;
                        this.editPasswordModal = false;
                        if(res.status === 200) {
                            this.$Notice.success({title: res.msg});
                        } else {
                            this.$Notice.error({title: res.msg});
                        }
                    });
                }
            });
        }
    }
};
</script>

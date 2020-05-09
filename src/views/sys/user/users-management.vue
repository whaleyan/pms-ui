<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
    <div>
        <Row>
            <Card>
                <h4 slot="title">
                    <Icon type="person-stalker"></Icon>
                    用户管理
                </h4>
                <Row>
                    <Col span="2">
                        <user-create v-on:onSuccess="userAdded"></user-create>
                    </Col>
                    <Col span="2">
                        <Button type="primary" shape="circle" icon="refresh" @click="refresh"></Button>
                    </Col>
                </Row>
                <Row class="margin-top-10">
                    <Col span="24">
                        <Table :columns="columns" :data="tableData" :loading="tableLoading"></Table>

                        <Page class="margin-top-10" :current="params.current" :total="totalCount" :page-size="params.limit" :page-size-opts=pageGroup show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                    </Col>
                </Row>
            </Card>
        </Row>

        <!--&lt;!&ndash; 编辑 &ndash;&gt;-->
        <!--<Modal v-model="modalEdit" title="用户编辑" @on-ok="editUser">-->
            <!--<p>-->
                <!--<Form :model="itemEdit" :rules="rules" :label-width="80">-->
                    <!--<FormItem label="账户" prop="userName">-->
                        <!--<Input v-model="itemEdit.username"></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="姓名" prop="name">-->
                        <!--<Input v-model="itemEdit.name"></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="密码" prop="password">-->
                        <!--<Input type="password" v-model="itemEdit.password"></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="邮箱" prop='email'>-->
                        <!--<Input type="text" v-model="itemEdit.email"></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="联系方式" prop='mobile'>-->
                        <!--<Input type="text" v-model="itemEdit.mobile"></Input>-->
                    <!--</FormItem>-->
                <!--</Form>-->
            <!--</p>-->
        <!--</Modal>-->
    </div>


</template>

<script>
import Cookies from 'js-cookie';
import UsersManagementService from '@/service/userService';
import User from '@/entity/user';
import { tableConfigMixin } from "@/libs/config";
import userCreate from "./user-create.vue";
import userEdit from "./user-edit.vue";
export default {
    name: "users-management",
    components: { userCreate, userEdit },
    mixins: [tableConfigMixin],
    data() {
        let obj = {
            searchRole: '',
            tableLoading: true,
            modalEdit: false,
            itemEdit: {},
            tableData: [],
            params:{
                current:1
            },
            columns: [
                {
                    title: "ID",
                    key: "userId",
                    width: 80
                },
                {
                    title: "账户",
                    key: "username",
                    width: 200
                },
                {
                    title: "姓名",
                    key: "name",
                    width: 140
                },
                {
                    title: "邮箱",
                    key: "email"
                },
                {
                    title: "联系方式",
                    key: "mobile",
                    width: 180
                },
                {
                    title: "操作",
                    key: "action",
                    width: 200,
                    align: "right",
                    render: (h, params) => {
                        let editBtn = h(userEdit, {
                            props: {
                                user: params.row
                            },
                            on: {
                                onSuccess: () => {
                                    this.getList();
                                }
                            }
                        });
                        let delBtn = h( "Button",{
                            props: {
                                type: "error",
                                size: "small"
                            },
                            on: {
                                click: () => {
                                    this.remove(params.index);
                                }
                            }
                        }, "删除");
                        let btns = []
                            btns.push(editBtn);
                            btns.push(delBtn);
                        return h("div", btns);
                    }
                }
            ]
        };
        // Object.assign(obj, JSON.parse(JSON.stringify(tableConfig)));
        return obj;
    },
    methods: {
        refresh(){
            this.pageChange(1);
            // this.params.page = 1;
            // this.getList();
        },
        remove(index) {
            let vm = this;
            this.$Modal.confirm({
                title: '警告',
                content: "确认删除吗？",
                onOk: () => {
                    UsersManagementService.deleteUser({ id: vm.tableData[index].userId }).then(res => {
                        if (res.status === 200) {
                            vm.$Notice.success({title: '删除成功'});
                            vm.pageChange(1);
                            // vm.getList();
                        } else {
                            vm.$Notice.error({title: res.msg});
                        }
                    });
                }
            });
        },
        editUser() {
            let vm = this;
            let params = this.itemEdit;
            UsersManagementService.updateUser(params).then(res => {
                if(res.status === 200) {
                    vm.$Message.success('编辑成功');

                    vm.pageChange(1);
                    // vm.getList();
                    vm.itemEdit = {};
                } else {
                    vm.$Notice.error({title: res.msg});
                }
            });
        },
        pageChange(page) {
            this.params.current = page;
            this.params.page = page;
            this.getList();
        },
        pageSizeChange(size) {
            this.params.limit = size;
            this.getList();
        },
        userAdded(){
            this.params.current = 1;
            this.params.page = 1;
            this.getList();
        },
        getList() {
            let vm = this;
            let params = this.params;
            vm.tableLoading = true;
            UsersManagementService.getUserList(params).then( res => {
                if(res.status == 200) {
                    vm.tableLoading = false;
                    vm.tableData = res.data.list;
                    vm.totalCount = res.data.totalCount * 1;
                } else {
                    vm.$Notice.error({title: res.msg});
                }
            });
        }
    },
    created() {
        this.$nextTick(function () {
            this.getList();

        });

    }
};
</script>



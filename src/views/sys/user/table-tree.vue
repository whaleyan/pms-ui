<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
    <div>
        <Row>
            <Card>
                <h4 slot="title">
                    <Icon type="person-stalker"></Icon>
                    AG用户管理
                </h4>
                <Row>
                    <Button type="primary" icon="plus" @click="newUser">新增用户</Button>
                    <span style="margin-left: 10px;">
                        <!-- <Select v-model="searchRole" style="width:200px">
                            <Option v-for="item in roles" :value="item.roleId" :key="item.roleId">{{ item.roleName }}</Option>
                        </Select> -->
                        <Input v-model="params.username" placeholder="请输入姓名搜搜..." style="width: 200px" />
                        <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
                    </span>
                    
                </Row>
                <Row class="margin-top-10">
                    <Col span="24">
                        <!-- <Table :columns="columns2" :data="data3" :loading="tableLoading" @on-expand="expandTable"></Table> -->

                        <zk-table
                            ref="table"
                            sum-text="sum"
                            index-text="#"
                            :data="data3"
                            :columns="columns2"
                            :selection-type="props.selectionType"
                            :expand-type="props.expandType"
                            :tree-type="props.treeType">
                            <template slot="action" slot-scope="scope">
                                <Button type="primary" size="small" @click.native="eidtInfo(scope.rowIndex)">编辑</Button>
                                <Button type="error" size="small" @click.native="remove(scope.rowIndex)">删除</Button>
                            </template>
                        </zk-table>
                        <Page class="margin-top-10" :total="totalCount" :page-size="params.limit" :page-size-opts=pageGroup show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                    </Col>
                </Row>
            </Card>
        </Row>

        <!-- 新增 -->
        <Modal v-model="modalNew" title="新增用户" :loading="loading" @on-ok="createUser" @on-visible-change="visibleChange">
            <p>
                <Form ref="createForm" :model="itemNew" :rules="rules" :label-width="80">
                    <FormItem label="账户" prop="userName">
                        <Input type="text" v-model="itemNew.userName"></Input>
                    </FormItem>
                    <FormItem label="姓名" prop='name'>
                        <Input type="text" v-model="itemNew.name"></Input>
                    </FormItem>
                    <FormItem label="密码" prop='password'>
                        <Input type="password" v-model="itemNew.password"></Input>
                    </FormItem>
                    <FormItem label="性别" prop='sex'>
                        <RadioGroup v-model="itemNew.sex">
                            <Radio label="男">男</Radio>
                            <Radio label="女">女</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="备注">
                        <Input type="text" v-model="itemNew.description"></Input>
                    </FormItem>
                    <FormItem label="角色">
                        <CheckboxGroup v-model="itemNew.roleIdList">
                            <Checkbox v-for="role in roles" :key="role.id" :label="role.id">{{role.name}}</Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    
                </Form>
            </p>
        </Modal>

        <!-- 编辑 -->
        <Modal v-model="modalEdit" title="用户编辑" @on-ok="editUser">
            <p>
                <Form :model="itemEdit" :label-width="80">
                    <FormItem label="账户">
                        <Input v-model="itemEdit.username"></Input>
                    </FormItem>
                    <FormItem label="姓名">
                        <Input v-model="itemEdit.name"></Input>
                    </FormItem>
                    <FormItem label="密码">
                        <Input type="password" v-model="itemEdit.password"></Input>
                    </FormItem>
                    <FormItem label="性别">
                        <RadioGroup v-model="itemEdit.sex">
                            <Radio label="男">男</Radio>
                            <Radio label="女">女</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="备注">
                        <Input type="text" v-model="itemEdit.description"></Input>
                    </FormItem>
                </Form>
            </p>
        </Modal>
    </div>

    
</template>

<script>
import Cookies from 'js-cookie';
import AgUsersManagementService from '@/service/userService';
import User from '@/entity/user';
import { tableConfigMixin } from "@/libs/config";
import InnerUser from './inner-user';
export default {
    name: "users-management",
    components: { InnerUser },
    mixins: [tableConfigMixin],
    data() {
        let obj = {
            searchRole: '',
            roles: [],
            loading: true,
            modalEdit: false,
            modalNew: false,
            itemEdit: {},
            itemNew: new User(),
            rules: {
                userName: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '输入不能为空' }
                ]
            },
            props: {
                selectionType: false,
                expandType: false,
                treeType: true
            },
            columns2: [
                // {
                //     label: "ID",
                //     prop: "id",
                //     width: 110
                // },
                {
                    label: "账户",
                    prop: "username",
                    width: 280
                },
                {
                    label: "姓名",
                    prop: "name",
                    width: 140
                },
                {
                    label: "性别",
                    prop: "sex",
                    width: 100
                },
                {
                    label: "备注",
                    prop: "description"
                },
                {
                    label: "联系方式",
                    prop: "mobilePhone"
                },
                {
                    label: "操作",
                    prop: "action",
                    width: 200,
                    type: "template",
                    template: "action",
                    align: "right",
                    headerAlign: "right",
                    // render: (h, params) => {
                    //     console.log(params.row);
                    //     return h("div", [
                    //         h(
                    //             "Button",
                    //             {
                    //             props: {
                    //                 type: "primary",
                    //                 size: "small"
                    //             },
                    //             style: {
                    //                 marginRight: "5px"
                    //             },
                    //             on: {
                    //                 click: () => {
                    //                     this.eidtInfo(params.index);
                    //                 }
                    //             }
                    //             },
                    //             "编辑"
                    //         ),
                    //         h(
                    //             "Button",
                    //             {
                    //             props: {
                    //                 type: "error",
                    //                 size: "small"
                    //             },
                    //             on: {
                    //                 click: () => {
                    //                 this.remove(params.index);
                    //                 }
                    //             }
                    //             },
                    //             "删除"
                    //         )
                    //     ]);
                    // }
                }
            ],
            data3: []
        };
        // Object.assign(obj, JSON.parse(JSON.stringify(tableConfig)));
        return obj; 
    },
    methods: {
        eidtInfo(index) {
            console.log("=============", index);
            this.modalEdit = true;
            // this.itemEdit = this.data3[index];
            
        },
        remove(index) {
            let vm = this;
            this.$Modal.confirm({
                title: '警告',
                content: "确认删除吗？",
                onOk: () => {
                    AgUsersManagementService.deleteUser({ id: vm.data3[index].id }).then(res => {
                        if (res.status === 200) {
                            vm.$Message.success('删除成功');
                            vm.getUserList();
                        }
                    });
                }
            });
        },
        editUser() {
            let vm = this;
            let params = this.itemEdit;
            AgUsersManagementService.updateUser(params).then(res => {
                if(res.status === 200) {
                    vm.$Message.success('编辑成功');
                    vm.getUserList();
                    vm.itemEdit = {};
                } 
            });
        },
        newUser() {
            this.modalNew = true;
        },
        createUser() {
            let vm = this, params = this.itemNew;
            this.$refs.createForm.validate((valid) => {
                if (valid) {
                    params.username = params.userName;
                    AgUsersManagementService.createUser(params).then(res => {
                        if (res.status === 200) {
                            vm.loading = false; // 关闭等待状态
                            vm.modalNew = false; // 关闭弹框
                            vm.$Message.success('创建成功');
                            vm.getUserList();
                            vm.itemNew = new User();
                        }
                    });
                } else {
                    vm.loading = false;
                    this.$Message.error('Fail!');
                }
            });
            
        },
        visibleChange(flag) {
            if(!flag) {
                this.itemNew = new User();
                this.loading = true;
            }
        },
        pageChange(page) {
            this.params.page = page;
            this.getUserList();
        },
        pageSizeChange(size) {
            this.params.limit = size;
            this.getUserList();
        },
        handleSearch() {
            this.getUserList();
        },
        getUserList() {
            let vm = this;
            let params = this.params;
            vm.tableLoading = true;
            AgUsersManagementService.getUserList(params).then(res => {
                if(res.status == 200) {
                    vm.tableLoading = false;
                    let rows = res.data.rows;
                    rows.forEach((item, index) => {
                        let obj = {};
                        Object.assign(obj, JSON.parse(JSON.stringify(item)));
                        item["children"] = [];
                        item.children.push(obj);
                    });
                    vm.data3 = rows;
                    console.log(vm.data3);
                    vm.totalCount = res.data.total * 1;
                }
            }).catch(function (error) {
                console.log('Error:', error);;
            });
        },
        getRoles() {
            let vm = this;
            AgUsersManagementService.getRoles({ groupType: 1 }).then(res => {
                if (res.length > 0) {
                    vm.roles = res;
                }
            });
        },
        expandTable(row, status) {
            console.log(status);
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.getUserList();
            // this.getRoles();

        });
        
    }
};
</script>



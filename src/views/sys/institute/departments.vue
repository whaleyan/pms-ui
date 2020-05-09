<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
    <div>
        <Row>
            <Card>
                <h4 slot="title">
                    <Icon type="person-stalker"></Icon>
                    学院管理
                </h4>
                <Row>
                    <user-create v-on:onSuccess="getList"></user-create>
                </Row>
                <Row class="margin-top-10">
                    <Col span="24">
                        <Table :columns="columns" :data="tableData" :loading="tableLoading"></Table>

                        <Page class="margin-top-10" :total="totalCount" :page-size="params.limit" :page-size-opts=pageGroup show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                    </Col>
                </Row>
            </Card>
        </Row>
    </div>

    
</template>

<script>
import { tableConfigMixin } from "@/libs/config";
export default {
    name: "departments",
    mixins: [tableConfigMixin],
    data() {
        let obj = {
            searchRole: '',
            tableLoading: true,
            modalEdit: false,
            itemEdit: {},
            tableData: [],
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
                        let btns = [];
                        if(this.$store.getters.getAllowedMenus['sys:user:update']) {
                            btns.push(editBtn);
                        }
                        if(this.$store.getters.getAllowedMenus['sys:user:delete']) {
                            btns.push(delBtn);
                        }
                        return h("div", btns);
                    }
                }
            ]
        };
        // Object.assign(obj, JSON.parse(JSON.stringify(tableConfig)));
        return obj; 
    },
    methods: {
        remove(index) {
            let vm = this;
            this.$Modal.confirm({
                title: '警告',
                content: "确认删除吗？",
                onOk: () => {
                    UsersManagementService.deleteUser({ id: vm.tableData[index].userId }).then(res => {
                        if (res.status === 200) {
                            vm.$Notice.success({title: '删除成功'});
                            vm.getList();
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
                    vm.getList();
                    vm.itemEdit = {};
                } else {
                    vm.$Notice.error({title: res.msg});
                }
            });
        },
        pageChange(page) {
            this.params.page = page;
            this.getList();
        },
        pageSizeChange(size) {
            this.params.limit = size;
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



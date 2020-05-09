<style lang="less">
    @import "../../../styles/common.less";
</style>
<template>
    <div>
        <Row>
            <Card>
                <h4 slot="title">
                    <Icon type="person-stalker"></Icon>
                    论文审核管理
                </h4>
                <Row>
                    <Form ref="formInline" inline>
                        <FormItem>
                            <Select>
                                <Option value="all">待审核</Option>
                                <Option value="jike">已审核</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Select>
                                <Option value="all">院系选择</Option>
                                <Option value="jike">计科院</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Input placeholder="输入标题、作者或学号..."></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary">搜索</Button>
                        </FormItem>
                    </Form>

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
    import StudentManagementService from '@/service/paperService';
    import { tableConfigMixin } from "@/libs/config";
    export default {
        name: "paper-review",
        components: { },
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
                        title: "论文标题",
                        key: "pap_title",
                    },
                    {
                        title: "学生名字",
                        key: "stu_name",
                    },
                    {
                        title: "学院",
                        key: "dep_id",
                    },
                    {
                        title: "学科",
                        key: "pro_id",
                    },
                    {
                        title: "类型",
                        key: "type",
                    },
                    {
                        title: "手机号",
                        key: "moblie",
                    },
                    {
                        title: "邮件",
                        key: "email",
                    },
                    {
                        title: "生日",
                        key: "birthday",
                    },
                    {
                        title: "性别",
                        key: "sex",
                    },
                    {
                        title: "上次登录时间",
                        key: "login_times",
                    },
                    {
                        title: "创建时间",
                        key: "create_time",
                    },
                    {
                        title: "操作",
                        key: "action",
                        align: "right"
                    }
                ]
            };
            return obj;
        },
        methods: {
            remove(index) {
                let vm = this;
                this.$Modal.confirm({
                    title: '警告',
                    content: "确认删除吗？",
                    onOk: () => {
                        StudentManagementService.deleteUser({ id: vm.tableData[index].userId }).then(res => {
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
                StudentManagementService.updateUser(params).then(res => {
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
                StudentManagementService.getStudentList(params).then( res => {
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

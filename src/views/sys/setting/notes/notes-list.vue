<style lang="less">
    @import '../../../../styles/common.less';
</style>
<template>
    <Row>
        <Card>
            <h4 slot="title">
                <Icon type="person-stalker"></Icon>
                通知公告设置
            </h4>
            <Row>
                <Col span="2">
                    <Button type="primary" @click="modal1 = true" icon="plus">添加</Button>
                </Col>
                <Col span="2">
                    <Button type="primary" shape="circle" icon="refresh" @click="refresh"></Button>
                </Col>
            </Row>
            <Row class="margin-top-10">
                <Col span="24">
                <Table :columns="columns" :data="tableData" :loading="tableLoading"></Table>

                <Page class="margin-top-10"  :current="params.current"    :total="totalCount" :page-size="params.limit" :page-size-opts=pageGroup show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                </Col>
            </Row>
        </Card>
        <Modal v-model="modal1"  title="添加" @on-ok="add" >
            <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="120">
                <!--<FormItem label="快捷批注原因" prop="title">-->
                    <!--<Input v-model="formData.title" placeholder="输入原因..."></Input>-->
                <!--</FormItem>-->
                <FormItem label="通知公告" prop="content">
                    <Input v-model="formData.content" type="textarea" placeholder="输入内容..."></Input>
                </FormItem>
            </Form>
        </Modal>
    </Row>
</template>

<script>
    import service from '@/service/sysSettingService';
    import { tableConfigMixin } from "@/libs/config";
    import notesEdit from "../notes/notes-edit.vue"
    export default {
        name: "notes-list",
        components: { notesEdit },
        mixins: [tableConfigMixin],
        data() {
            let obj = {
                modal1: false,
                tableLoading: true,
                tableData: [],
                searchTableData: [],
                srcTableData: [],
                formData: {
                    title: '',
                    content: '',
                    type: 4
                },
                params:{
                    current:1
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '输入不能为空', trigger: 'blur' }
                    ],
                    // content: [
                    //     { required: true, message: '输入不能为空', trigger: 'blur' }
                    // ],
                },
                columns: [
                    {
                        title: "ID",
                        key: "id",
                    },
                    // {
                    //     title: "原因",
                    //     key: "title",
                    // },
                    {
                        title: "内容",
                        key: "content",
                    },
                    {
                        title: "创建时间",
                        key: "createTime",
                        render: (h,params) => {
                            function date2string(d) {
                                if (typeof d == 'string') return d;
                                let year = d.getFullYear();
                                let month = d.getMonth() + 1;
                                let day = d.getDate();
                                let hour = d.getHours();
                                let min = d.getMinutes();
                                let sed = d.getSeconds();
                                return year + '-' + (month < 10 ? '0' + month : month)
                                            + '-' + (day < 10 ? '0' + day : day)
                                            + ' ' + (hour < 10 ? '0' + hour : hour)
                                            + ':' + (min < 10 ? '0' + min : min)
                                            + ':' + (sed < 10 ? '0' + sed : sed);
                            }
                            return h('span', date2string(new Date(params.row.createTime)));
                        }
                    },
                    {
                        title: "更新时间",
                        key: "updateTime",
                        render: (h,params) => {
                            function date2string(d) {
                                if (typeof d == 'string') return d;
                                let year = d.getFullYear();
                                let month = d.getMonth() + 1;
                                let day = d.getDate();
                                let hour = d.getHours();
                                let min = d.getMinutes();
                                let sed = d.getSeconds();
                                return year + '-' + (month < 10 ? '0' + month : month)
                                            + '-' + (day < 10 ? '0' + day : day)
                                            + ' ' + (hour < 10 ? '0' + hour : hour)
                                            + ':' + (min < 10 ? '0' + min : min)
                                            + ':' + (sed < 10 ? '0' + sed : sed);
                            }
                            if (!params.row.updateTime) {
                                return h('span', date2string(new Date(params.row.createTime)));
                            }
                            return h('span', date2string(new Date(params.row.updateTime)));
                        }
                    },
                    {
                        title: "操作",
                        key: "action",
                        align: "center",
                        width:240,
                        render: (h, params) => {
                            let editBtn = h(notesEdit, {
                                props: {
                                    obj: params.row
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
                                style: {
                                    marginRight: '4px'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index);
                                    }
                                }
                            }, "删除");

                            let btns = [];
                            btns.push(editBtn);
                            btns.push(delBtn);
                            return h("div", btns);
                        }
                    }
                ],
            };
            return obj;
        },
        methods:{
            refresh(){
                this.pageChange(1);
                // this.params.page = 1;
                this.getList();
            },
            add() {
                let vm = this;
                service.addNotification( vm.formData ).then(res => {
                    if (res.status === 200) {
                        vm.$Notice.success({title: '添加成功'});
                        this.pageChange(1);
                        // vm.getList();
                        vm.formData.title='';
                        vm.formData.content='';
                    } else {
                        vm.$Notice.error({title: res.msg});
                    }
                });
            },
            remove(index) {
                let vm = this;
                this.$Modal.confirm({
                    title: '警告',
                    content: "确认删除吗？",
                    onOk: () => {
                        service.delNotification(vm.tableData[index].id ).then(res => {
                            if (res.status === 200) {
                                vm.$Notice.success({title: '删除成功'});
                                this.pageChange(1);
                                // vm.getList();
                            } else {
                                vm.$Notice.error({title: res.msg});
                            }
                        });
                    }
                });
            },
            pageChange(page) {
                this.params.current = page;
                this.params.page = page;
                let _start = (page-1)*this.params.limit;
                let _end = page*this.params.limit;
                this.tableData = this.searchTableData.slice(_start,_end);
//            this.getList();
            },
            pageSizeChange(size) {
                this.params.limit = size;
                let _start = (page-1)*this.params.limit;
                let _end = page*this.params.limit;
                this.tableData = this.searchTableData.slice(_start,_end);
//            this.getList();
            },
            getList() {
                let vm = this;
                let params = this.params;
                vm.tableLoading = true;
                service.getNotifications().then( res => {
                    if(res.status == 200) {
                        vm.tableLoading = false;
                        vm.srcTableData = res.data.list;
                        vm.searchTableData = res.data.list;
                        vm.tableData = vm.srcTableData.slice(0,vm.params.limit);
                        vm.totalCount = res.data.total;
                    } else {
                        vm.$Notice.error({title: res.msg});
                    }
                });
            },
        },
        computed: {
            // total: function () {
            //     return this.searchTableData.length
            // }
        },
        created() {
            this.$nextTick(function () {
                this.getList();
            });
        }
    }
</script>

<style scoped>

</style>

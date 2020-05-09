<style lang="less">
    @import '../../../../styles/common.less';
</style>
<template>
    <Row>
        <Card>
            <h4 slot="title">
                <Icon type="person-stalker"></Icon>
                规范文档上传
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

                <Page class="margin-top-10" :current="params.current"   :total="total" :page-size="params.limit" :page-size-opts=pageGroup show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                </Col>
            </Row>
        </Card>
        <Modal v-model="modal1"  title="添加" @on-ok="add" >
            <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="120">
                <FormItem label="文档标题" prop="title">
                    <Input v-model="formData.title" placeholder="输入标题..."></Input>
                </FormItem>
                <FormItem label="文档上传" prop="">
                    <Upload
                            ref="upload"
                            name="uploadfile"
                            :headers="header"
                            :max-size="10240"
                            :on-exceeded-size="handleMaxSize"
                            :on-success="handleSuccess"
                            action="http://120.76.121.210:10010/pmsapi/common/uploadfile?type=student">
                        <Button type="ghost" icon="ios-cloud-upload-outline">选择文件上传</Button>
                    </Upload>
                </FormItem>
                <FormItem v-show="false" label="内容" prop="content">
                    <Input v-model="formData.content" type="textarea" placeholder="输入内容..."></Input>
                </FormItem>
            </Form>
        </Modal>
    </Row>
</template>

<script>
    import service from '@/service/sysSettingService';
    import { tableConfigMixin } from "@/libs/config";
    import templateEdit from "./template-edit.vue"
    export default {
        name: "template-list",
        components: {
            templateEdit },
        mixins: [tableConfigMixin],
        data() {
            let obj = {
                header : {
                    token:''
                },
                modal1: false,
                tableLoading: true,
                tableData: [],
                searchTableData: [],
                srcTableData: [],
                formData: {
                    title: '',
                    content: '',
                    type: 2
                },
                params:{
                    current:1
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '输入不能为空', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请上传文件', trigger: 'blur' }
                    ],
                },
                columns: [
                    {
                        title: "ID",
                        key: "id",
                    },
                    {
                        title: "标题",
                        key: "title",
                    },
                    {
                        title: "内容",
                        key: "content",
                        width:240,
                        render: (h, params) => {
                            let content = JSON.parse(params.row.content);

                            let delBtn = h( "Button",{
                                props: {
                                    type: "text",
                                    size: "small",
                                    icon: "ios-download"
                                },
                                on: {
                                    click: () => {
                                        window.open(content.url);
                                    }
                                }
                            }, content.originame);

                            let btns = [];
                            btns.push(delBtn);
                            return h("div", btns);
                        }
                    },
                    {
                        title: "创建时间",
                        key: "createTime",
                        render: (h, params) => {
                            function dateToString(d) {
                                let year = d.getFullYear();
                                let month = d.getMonth() + 1;
                                let datt = d.getDate();
                                let hh = d.getHours();
                                let mm = d.getMinutes();
                                let ss = d.getSeconds();
                                return year + "-" +
                                    (month < 10 ? "0" + month : "" + month) + "-" +
                                    (datt < 10 ? "0" + datt : "" + datt)+ " " +
                                    (hh < 10 ? '0'+hh:''+hh)+ ":"+(mm < 10 ? '0'+mm:''+mm)+":"+
                                    (ss < 10 ? '0'+ss :''+ss);
                            }
                            let dd = new Date(params.row.createTime);
                            return h("span", {}, dateToString(dd));
                        }
                    },
                    {
                        title: "更新时间",
                        key: "updateTime",
                        render: (h, params) => {
                            if(params.row.updateTime != null){
                                function dateToString(d) {
                                    let year = d.getFullYear();
                                    let month = d.getMonth() + 1;
                                    let datt = d.getDate();
                                    let hh = d.getHours();
                                    let mm = d.getMinutes();
                                    let ss = d.getSeconds();
                                    return year + "-" +
                                        (month < 10 ? "0" + month : "" + month) + "-" +
                                        (datt < 10 ? "0" + datt : "" + datt)+ " " +
                                        (hh < 10 ? '0'+hh:''+hh)+ ":"+(mm < 10 ? '0'+mm:''+mm)+":"+
                                        (ss < 10 ? '0'+ss :''+ss);
                                }
                                let dd = new Date(params.row.updateTime);
                                return h("span", {}, dateToString(dd));
                            }
                        }
                    },
                    {
                        title: "操作",
                        key: "action",
                        align: "center",
                        width:160,
                        render: (h, params) => {
                            let editBtn = h(templateEdit, {
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
                service.addTemplate( vm.formData ).then(res => {
                    if (res.status === 200) {
                        vm.$Notice.success({title: '添加成功'});
                        vm.pageChange(1);
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
                        service.delComment(vm.tableData[index].id ).then(res => {
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
                service.getTemplates().then( res => {
                    if(res.status == 200) {
                        vm.tableLoading = false;
                        vm.srcTableData = res.data.list;
                        vm.searchTableData = res.data.list;
                        vm.tableData = vm.srcTableData.slice(0,vm.params.limit);
                    } else {
                        vm.$Notice.error({title: res.msg});
                    }
                });
            },
            handleSuccess (res) {
                if(res.status == 200){
                    this.$Message.success(res.msg);
                    this.formData.content = JSON.stringify(res.data);
                }else{
                    this.$Message.error(res.msg);
                }
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出限定的文件大小',
                    desc: '文件【 ' + file.name + ' 】大于10M.'
                });
            },
        },
        computed: {
            total: function () {
                return this.searchTableData.length
            }
        },
        created() {
            this.$nextTick(function () {
                this.getList();
                this.header.token = this.$store.getters.getToken;
            });
        }
    }
</script>

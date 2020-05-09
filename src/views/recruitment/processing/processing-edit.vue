<template>
    <span>
        <Button type="primary" size="small" @click="openDialog">编目</Button>
        <!-- 编目 -->
        <Modal v-model="show" title="论文编目" :loading="loading" @on-ok="onOk" @on-visible-change="visibleChange" width="777px">
            <p><h3 style="text-align: center;margin-bottom: 20px">{{item.papTitleChina}}</h3></p>
            <p>
                <Form ref="myForm" :model="item" :rules="rules" :label-width="100">
                    <FormItem label="分类号" prop='papClassificationNo'>
                        <Input type="text" v-model="item.papClassificationNo"></Input>
                    </FormItem>
                    <FormItem label="保密级别" prop='securtLevel'>
                        <label style="padding:4px 7px;">{{item.securtLevel}}</label>
                    </FormItem>
                    <FormItem label="论文开放日期" prop="openUpDate">
                        <DatePicker type="date" :options="options" placeholder="Select date" v-model="item.openUpDate"></DatePicker>
                    </FormItem>
                    <FormItem label="财产号" prop='propertyNo'>
                        <Input type="text" v-model="item.propertyNo"></Input>
                    </FormItem>
                    <FormItem label="馆藏位置" prop='location'>
                        <Input type="text" v-model="item.location"></Input>
                    </FormItem>
                    <FormItem label="Calisd-OID" prop='calisoid'>
                        <Input type="text" v-model="item.calisoid"></Input>
                    </FormItem>
                    <FormItem label="" prop=''>
                        <a href="#" @click="showAll" style="margin-right: 30px">
                            <span>展开论文信息 <Icon type="arrow-down-b"></Icon>  </span>
                        </a>
                         <a :href="item.papUrl" target="_blank">
                            <span>查看全文   <Icon type="forward"></Icon> </span>
                        </a>
                    </FormItem>
                </Form>
                <Row class="showMore" v-show="showMore">
                    <Col span="8" style="margin-bottom:10px">
                        <p class="paper-detail">
                            <span class="paper-detail-title">第一导师姓名:</span>
                            <span  class="paper-detail-text">{{item.firstTeacherName}}</span>
                        </p>
                        <p class="paper-detail">
                            <span class="paper-detail-title">第二导师姓名:</span>
                            <span class="paper-detail-text"  > {{item.secondTeacherName}}</span>
                        </p>
                    </Col>
                    </Col>
                    <Col span="24">
                        <p class="paper-detail" style="width: 100%;margin-bottom: 10px">
                            <!--<span class="paper-detail-title" style="float: left">中文论文文摘:</span>-->
                            <span style="width: 86%;" class="paper-detail-text textHide">
                                <Collapse accordion>
                                         <Panel name="2">
                                            中文论文文摘详情
                                            <p slot="content"> {{item.papAbstractChina}}</p>
                                        </Panel>
                                </Collapse>
                            </span>
                        </p>

                    </Col>
                    <Col span="24">
                        <p class="paper-detail" style="width: 100%">
                            <!--<span class="paper-detail-title" style="float: left">外文论文文摘:</span>-->
                            <span style="width: 86%" class="paper-detail-text">
                                <Collapse accordion>
                                         <Panel name="3">
                                            外文论文文摘详情
                                    <p slot="content"> {{item.papAbstractForeign}}</p>
                                </Panel>
                                </Collapse>
                            </span>
                        </p>
                    </Col>
                </Row>
            </p>
        </Modal>

    </span>
</template>
<script>
    import paperService from '@/service/paperService';

    export default {
        name: "processing-edit",
        props: {
            obj: Object
        },
        data() {
            return {
                show: false,
                showMore: false,
                loading: true,
                isInit: false,
                item: {},
                rules: {
                    papClassificationNo: [
                        {required: true, message: '输入不能为空', trigger: 'blur'}
                    ],
                    openUpDate: [
                        {required: true, type: 'date', message: '输入不能为空', trigger: 'blur'}
                    ],
                    calisoid: [
                        {required: true, message: '输入不能为空', trigger: 'blur'}
                    ]
                },
                options: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
            };
        },
        methods: {
            showAll: function () {
                this.showMore = !this.showMore;
            },
            openDialog() {
                this.show = true;
            },
            onOk() {
                function date2String(d) {
                    let year = d.getFullYear();
                    let month = d.getMonth() + 1;
                    let datt = d.getDate();
                    return year + "-" +
                        (month < 10 ? "0" + month : "" + month) + "-" +
                        (datt < 10 ? "0" + datt : "" + datt);
                }

                let vm = this, params = {};
                params.id = this.item.id;
                params.calisoid = this.item.calisoid;
                params.location = this.item.location;
                params.propertyNo = this.item.propertyNo;
                params.papClassificationNo = this.item.papClassificationNo;
                params.openDate = date2String(this.item.openUpDate);

                this.$refs.myForm.validate((valid) => {
                    if (valid) {
                        paperService.cataloguePapersById(JSON.stringify(params)).then(res => {
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
                if (!flag) {
                    this.loading = true;
                    this.isInit = false;
                } else {
                    this.isInit = true;
                }
            },
        },
        computed: {},
        created: function () {
            this.item = Object.assign({}, this.obj);
        },
    }
</script>

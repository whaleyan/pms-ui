<style lang="less">
    @import '../../styles/common.less';
</style>
<template>
    <div>
            <Row class="margin-top-10" type="flex" justify="center" :loading="Loading">
                <Card style="width:100%">
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        学生信息
                    </p>
                    <p slot="extra">
                        <a style="margin-right: 50px;" href="#" @click="back()">
                            <Icon type="ios-close-outline"></Icon>
                            返回上一页
                        </a>
                        <Button type="primary" @click="modal1 = true" style="margin-right:10px ">论文审核</Button>
                        <Button type="primary" @click="nextPaper" >下一篇</Button>
                    </p>
                    <p class="paper-detail"><span class="paper-detail-title">id:</span><span class="paper-detail-text">{{item.id}}</span></p>
                    <p class="paper-detail"><span class="paper-detail-title">学位:</span><span class="paper-detail-text">{{item.stuType}}</span></p>
                    <p class="paper-detail" ><span class="paper-detail-title">学号:</span><span class="paper-detail-text"> {{item.stuNo}}</span></p>
                    <p class="paper-detail" ><span class="paper-detail-title">作者:</span><span class="paper-detail-text"> {{item.stuName}}</span></p>
                    <p class="paper-detail" ><span class="paper-detail-title">学校:</span><span class="paper-detail-text"> {{item.stuSchool}}</span></p>
                    <p class="paper-detail" ><span class="paper-detail-title">院系:</span><span class="paper-detail-text">  {{item.stuDepartment}}</span></p>
                    <p class="paper-detail" ><span class="paper-detail-title">专业:</span><span class="paper-detail-text"> {{item.stuProfessionals}}</span></p>
                </Card>
            </Row>
            <Row class="margin-top-10" type="flex" justify="center" :loading="Loading">
                <Card style="width:100%">
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        论文信息
                    </p>
                    <p slot="extra">
                        <a :href="item.papUrl" target="_blank" style="margin-right:10px ">
                            <Icon type="forward"></Icon>
                            论文附件地址
                        </a>
                    </p>
                    <p class="paper-detail"><span class="paper-detail-title">论文语种:</span><span class="paper-detail-text">{{item.papLanguage}}</span></p>
                    <p class="paper-detail"><span class="paper-detail-title">学科代码:</span><span class="paper-detail-text"> {{item.subNo}}</span></p>
                    <p class="paper-detail"><span class="paper-detail-title">学科名称:</span><span class="paper-detail-text">{{item.subName}}</span></p>
                    <p class="paper-detail"><span class="paper-detail-title">参考文献数:</span><span class="paper-detail-text">{{item.papReferenceNum}}</span></p>
                    <p class="paper-detail"><span class="paper-detail-title">中文关键词:</span><span class="paper-detail-text">{{item.papKeywordsChina}}</span></p>

                    <p class="paper-detail"><span class="paper-detail-title">论文总页数:</span><span class="paper-detail-text">{{item.papTotalPages}}</span></p>
                    <p class="paper-detail" style="width: 100%"><span class="paper-detail-title">外文关键词:</span><span style="width: 80%" class="paper-detail-text">{{item.papKeywordsForeign}}</span></p>
                    <p class="paper-detail" style="width: 100%"><span class="paper-detail-title">参考文献:</span><span style="width: 80%"class="paper-detail-text">{{item.papReference}}</span></p>
                    <p class="paper-detail" style="width: 100%"><span class="paper-detail-title">中文论文题目:</span><span style="width: 80%" class="paper-detail-text"> {{item.papTitleChina}}</span></p>
                    <p class="paper-detail" style="width: 100%"><span class="paper-detail-title">外文论文题目:</span><span style="width: 80%" class="paper-detail-text"> {{item.papTitleForeign}}</span></p>
                    <p class="paper-detail" style="width: 100%"><span class="paper-detail-title">中文论文文摘:</span><span style="width: 80%" class="paper-detail-text"> {{item.papAbstractChina}}</span></p>
                    <p class="paper-detail" style="width: 100%"><span class="paper-detail-title">外文论文文摘:</span><span style="width: 80%" class="paper-detail-text"> {{item.papAbstractForeign}}</span></p>
                </Card>
            </Row>
            <Row class="margin-top-10" type="flex" justify="center" :loading="Loading">
                <Card style="width:100%">
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        导师信息
                    </p>
                    <p class="paper-detail"><span class="paper-detail-title">第一导师姓名:</span><span class="paper-detail-text">{{item.firstTeacherName}}</span></p>
                    <p class="paper-detail"><span class="paper-detail-title">第一导师学校:</span><span class="paper-detail-text">{{item.firstTeacherSchool}}</span></p>
                    <p class="paper-detail"><span class="paper-detail-title">第一导师院系:</span><span class="paper-detail-text">{{item.firstTeacherDepartment}}</span></p>
                    <p class="paper-detail"><span class="paper-detail-title">第一导师专业:</span><span class="paper-detail-text">{{item.firstTeacherProfessionals}}</span></p>
                    <p class="paper-detail"><span class="paper-detail-title">第二导师姓名:</span><span class="paper-detail-text"> {{item.secondTeacherName}}</span></p>
                    <p class="paper-detail"><span class="paper-detail-title">第二导师学校:</span><span class="paper-detail-text"> {{item.secondTeacherSchool}}</span></p>
                    <p class="paper-detail"><span class="paper-detail-title">第二导师院系:</span><span class="paper-detail-text"> {{item.secondTeacherDepartment}}</span></p>
                    <p class="paper-detail"><span class="paper-detail-title">第二导师专业:</span><span class="paper-detail-text"> {{item.secondTeacherProfessionals}}</span></p>
                    <p class="paper-detail"><span class="paper-detail-title">论文完成日期:</span><span class="paper-detail-text"> {{item.papFinishedDate}}</span></p>
                    <p class="paper-detail"><span class="paper-detail-title">论文答辩日期:</span><span class="paper-detail-text"> {{item.papAnswerDate}}</span></p>
                </Card>
            </Row>
            <Modal
                    v-model="modal1"
                    title="审核论文"
                    @on-ok="handleSubmit()">
                <Form ref="formValidate" :label-width="80">
                    <FormItem label="审核状态"  prop="isPass">
                        <i-switch size="large" v-model="isPass" >
                            <span slot="open">通过</span>
                            <span slot="close">不通过</span>
                        </i-switch>
                    </FormItem>
                    <FormItem v-show="!isPass" label="常用批注" prop="explain">
                        <commons-selector @onCommonsSelected="handleCommonsSelected" style="width: 180px;"></commons-selector>
                    </FormItem>
                    <FormItem v-show="!isPass" label="不通过原因">
                        <Input v-model="reason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="不通过原因" />
                    </FormItem>
                </Form>
            </Modal>
    </div>
</template>
<script>
import paperService from '@/service/paperService';
import service from '@/service/sysSettingService';

import { tableConfigMixin } from "@/libs/config";
import CommonsSelector from "../sys/plugins/commons-selector";

export default {
    components: {
        CommonsSelector
    },
    name: "paper-review",
    mixins: [tableConfigMixin],
    data() {
        let obj = {
            id: '',
            Loading: true,
            modal1: false,
            item:{},
            isPass:true,
            reason:"",
            pizhuContent:'',
            pizhuId:'',

        };
        return obj;
    },
    methods: {
        back(){
            let vm = this;
            vm.$router.push({
                name: 'r-processing',
                path: "/t-review/r-processing",
            });
            // vm.$router.push('/t-review/r-processing');
        },
        nextPaper(){
            let vm = this ;
            vm.Loading=true;
            paperService.queryNextPaper().then( res => {
                if(res.status == 200) {
                    vm.Loading = false
                    let argu = {
                        paper_id: res.data.id ,
                    };
                    vm.$router.push({
                        name: 'paper-review',
                        params: argu
                    });
                } else {
                    vm.$Notice.error({title: res.msg});
                }
            });
        },
        getDetail() {
            let vm = this , params = this.$route.params.paper_id;
            this.id = params;
            vm.Loading=true;
            paperService.queryPapersById(params).then( res => {
                if(res.status == 200) {
                    vm.Loading = false;
                    vm.item = res.data;
                    vm.item.papFinishedDate=vm.dateFormat(res.data.papFinishedDate);
                    vm.item.papAnswerDate=vm.dateFormat(res.data.papAnswerDate);
                } else {
                    vm.$Notice.error({title: res.msg});
                }
            });
        },
        handleSubmit () {
            let vm = this, params = vm.params;
            params.id = vm.id;
            params.pizhuId= vm.pizhuId;
            params.reason = vm.reason;
            params.pizhuContent = vm.pizhuContent;
            if(this.isPass){
                paperService.passById(vm.id).then(res => {
                    if (res.status === 200) {
                        vm.nextPaper();
                        vm.modal1 = false; // 关闭弹框
                        vm.$Notice.success({title: res.msg});
                    } else {
                        vm.$Notice.error({title: res.msg});
                    }
                });

            }else{
                paperService.unPassById(params).then(res => {
                    if (res.status === 200) {

                        vm.modal1 = false; // 关闭弹框
                        vm.$Notice.success({title: res.msg});
                    } else {
                        vm.$Notice.error({title: res.msg});
                    }
                });

            }
        },
        handleCommonsSelected(data){
            console.log(data);
            if ((typeof data) == 'string') {
                data = JSON.parse(data)

            }
            this.pizhuId = data.id;
            this.pizhuContent =  data.content;
            this.reason = data.title;
        },
        dateFormat:function(obj){
            var date =  new Date(obj);
            var y = 1900+date.getYear();
            var m = "0"+(date.getMonth()+1);
            var d = "0"+date.getDate();
            return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
        }
    },
    created: function () {
        this.$nextTick(function () {
            this.getDetail()
        });
    },
    computed:{

    },
    watch: {
        '$route' (to, from) {
            if(to.name == 'paper-review'){
                this.getDetail()
            }
        }
    }

}
</script>

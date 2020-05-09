<template>
    <span>
        <Button type="primary" size="small" @click="openDialog">编辑</Button>
        <!-- 编辑 -->
        <Modal v-model="show" title="编辑" :loading="loading" @on-ok="onOk" @on-visible-change="visibleChange">
            <p>
                <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="120">
                <FormItem label="文档标题" prop="title">
                    <Input v-model="formData.title" placeholder="输入标题..."></Input>
                </FormItem>
                <FormItem label="文档上传" prop="">
                    <Upload
                            ref="upload"
                            name="uploadfile"
                            :max-size="10240"
                            :on-exceeded-size="handleMaxSize"
                            :on-success="handleSuccess"
                            action="http://120.76.121.210:10010/pmsapi/common/uploadfile?type=student">
                        <Button type="ghost" icon="ios-cloud-upload-outline">选择文件上传</Button>
                    </Upload>
                </FormItem>
                <FormItem v-show="false" label="内容" prop="content">
                    <Input v-model="formData.content"  type="textarea" placeholder="输入内容..."></Input>
                </FormItem>
            </Form>
            </p>
        </Modal>

    </span>
</template>

<script>
    import service from '@/service/sysSettingService';
    export default {
        name: "template-edit",
        props: {
            obj: Object
        },
        data() {
            return {
                show: false,
                loading: true,
                formData: {
                    title: '',
                    content: '',
                    type: 2
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '输入不能为空', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请上传文件', trigger: 'blur' }
                    ],
                },
                isInit: false
            };
        },
        methods: {
            onOk() {
                let vm = this;
                this.$refs.formData.validate((valid) => {
                    if (valid) {
                        service.updateTemplate( vm.formData ).then(res => {
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
                if(!flag) {
                    this.loading = true;
                    this.isInit = false;
                } else {
                    this.isInit = true;
                }
            },
            openDialog(){
                this.show = true;
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
        created() {
            this.formData = Object.assign({}, this.obj);
        },
        mounted() {

        }
    }
</script>

<template>
    <div>
        <Upload
                ref="upload"
                name="uploadfile"
                :max-size="10240"
                :on-exceeded-size="handleMaxSize"
                :on-success="handleSuccess"
                action="http://120.76.121.210:10010/pmsapi/common/uploadfile?type=student">
            <Button type="ghost" icon="ios-cloud-upload-outline">选择文件上传</Button>
        </Upload>
    </div>
</template>

<script>
    import ajaxurl from '../../../../build/url';
    export default {
        name: 'ktupload',
        props: {
            kttype: {
                type: String
            }
        },
        data () {
            return {
                file: null,
                loadingStatus: false,
            }
        },
        computed: {
            uploadurl: function () {
                return ajaxurl+"common/uploadfile?type="+this.kttype;
            }
        },
        methods: {
            handleUpload (file) {
                this.file = file;
                return false;
            },
            upload () {
                this.loadingStatus = true;
            },
            handleSuccess (res, file) {
                console.log("res",res);
                console.log("file",file);


                this.loadingStatus = false;
                this.$Message.success('Success')
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出限定的文件大小',
                    desc: '文件【 ' + file.name + ' 】大于10M.'
                });
            },
        }
    };
</script>

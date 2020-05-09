<template>
    <span>

        <Button type="primary" @click.prevent="openNew()"><Icon type="plus"></Icon> 新增渠道</Button>

        <Modal v-model="isShow" title="渠道角色" :mask-closable="false" :loading="loading" @on-ok="createItem" @on-visible-change="visibleChange">
            <p>
                <Form ref="newForm" :model="item" :rules="rules" :label-width="80">
                    <FormItem prop="name" label="渠道名称">
                        <Input type="text" v-model="item.name"></Input>
                    </FormItem>
                    <FormItem label="描述">
                        <Input type="text" v-model="item.remark"></Input>
                    </FormItem>
                </Form>
            </p>
        </Modal>
    </span>

</template>
<script>
import Channel from '@/entity/channel';
import ChannelService from '@/service/channelService';
export default {
    name: "channel-create",
    props: {
        parentNode: Object
    },
    data() {
        return {
            isShow: false,
            item: new Channel(this.parentNode.id),
            loading: true,
            rules: {
                name: [{ required: true, message: '输入不能为空', trigger: 'blur' }]
            }
        }
    },
    methods: {
        openNew() {
            if(this.parentNode.parentId){
                this.isShow = !this.isShow;
            } else {
                this.$Message.warning("没有选中任何节点");
            }
        },
        createItem() {
            let vm = this;
            this.$refs.newForm.validate((valid) => {
                if(valid) {
                    ChannelService.createChannel(this.item).then(res => {
                        vm.loading = false;
                        vm.isShow = false;
                        if(res.status === 200) {
                            vm.$Message.success('新建成功');
                            this.$emit("on-custom-create", this.parentNode);
                        } else {
                            vm.$Message.error(res.msg);
                        }

                    });
                } else {
                    vm.loading = false;
                }
            });
        },
        visibleChange(flag) {
            if(!flag) {
                this.item = new Channel(this.parentNode.id);
                this.loading = true;
            }
        }
    },
    updated() {
        this.item .parentId = this.parentNode.id;
        console.log("create Updated!", "pId:", this.parentNode.id);
    },
    mounted() {
        this.item .parentId = this.parentNode.id;
        console.log("create Mounted!");
    }
}
</script>


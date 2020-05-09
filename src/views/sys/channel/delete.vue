<template>
    <span>
        <Button type="error" @click.prevent="deleteRole()"><Icon type="trash-a"></Icon> 删除角色</Button>
    </span>
</template>
<script>
import ChannelService from '@/service/channelService';
export default {
    name: "channel-delete",
    props: {
        currentNode: Object
    },
    data() {
        return {}
    },
    methods: {
        deleteRole() {
            if(this.currentNode.parentId) {
                this.$Modal.confirm({
                    content: "<p>确认删除吗？</p>",
                    onOk: () => {
                        ChannelService.getChannels({parentId: this.currentNode.id}).then(res => {
                            if(res.status === 200 && res.data.list.length > 0) {
                                this.$Notice.warning({title: "角色包含子角色，无法删除！"});
                            } else if (res.status === 200 && res.data.list.length == 0) {
                                ChannelService.deleteChannel({id: this.currentNode.id}).then(res => {
                                    if(res.status === 200) {
                                        this.$Notice.success({title: '删除成功'});
                                        this.$emit("on-custom-delete", this.currentNode);
                                    } else {
                                        this.$Notice.warning({title: res.msg});
                                    }
                                });
                            } else {
                                this.$Notice.warning({title: res.msg});
                            }
                        });
                    }
                });
            } else {
                this.$Message.warning("没有选中任何节点");
            }

        }
    }
}
</script>

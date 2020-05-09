<template>
    <span>
        <h4 style="display: inline-block;">{{ role.title }} 渠道设置 </h4> 
        <has-permisstion permission="sys:role:update:channel">
        <Button type="primary" size="small" class="margin-left-10" @click="updateChannel">更新渠道</Button>
        </has-permisstion>
        <Tree :data="treeData" show-checkbox @on-check-change="onCheckChange" :load-data="loadData" @on-select-change="onSelectChange"></Tree>
    </span>
    
</template>
<script>
import ChannelService from '@/service/channelService';
import RoleService from '@/service/roleService';
import HasPermisstion from "@/views/main-components/auth/has-permission.vue";
export default {
    name: "authorities",
    components: {HasPermisstion},
    props: {
        role: Object,
        roleId: String
    },
    data() {
        return {
            treeData : [],
            rootId: -1,
            currentNode: {},
            checkedNodes: [],
            selectedChannel: []
        }
    },
    watch: {
        'roleId': function() {
            RoleService.getRoleChannel({roleId: this.roleId}).then(res => {
                if (res.status === 200) {
                    let channel = res.data.channel;
                    if(channel.length > 0) {
                        this.selectedChannel = channel;
                        this.treeData = [];
                        this.init();
                    } else {
                        this.selectedChannel = [];
                        this.treeData = [];
                        this.init();
                    }
                }
            });
        }
    },
    methods: {
        init() {
            this.getChannelTree("-1").then(data => {
                this.currentNode = data[0];
                this.currentNode.title = this.currentNode.name;
                if(this.currentNode.type == 0) {
                    this.currentNode.loading = false;
                }
                this.selectedChannel.forEach(item => {
                    if(this.currentNode.id == item) {
                        this.currentNode.checked = true;
                    }
                });
                this.currentNode.children = [];
                this.treeData = data;
            });
            
        },
        loadData (item, callback) {
            let pid = item.id;
            this.getChannelTree(pid).then(data => {
                let channels = data;
                channels.forEach(item1 => {
                    this.selectedChannel.forEach(chnl => {
                        if(item1.id === chnl) {
                            item1.checked = true;
                        }
                    });
                });
                callback(data);
            });
        },
        getChannelTree(pid){
            return new Promise((resolve, reject) => {
                ChannelService.getChannels({parentId: pid}).then(res => {
                    if (res.status === 200) {
                        let tree = res.data.list;
                        tree.forEach(element => {
                            element.title = element.name;
                            if(element.type === 0) {
                                element.loading = false;
                            }
                            element.children = [];
                        });
                        resolve(tree);
                    }else{
                        reject(res);
                    }
                });
            });
        },
        onSelectChange(nodes) {
            if(nodes.length > 0) {
                this.currentNode = nodes[0];
            }
        },
        onCheckChange(nodes) {
            this.checkedNodes = nodes;
        },
        updateChannel() {
            RoleService.setRoleChannel({roleId: this.roleId, channel: this.checkedChannel}).then(res => {
                if(res.status === 200) {
                    this.$Notice.success({title: '设置成功'});
                } else {
                    this.$Notice.error({title: res.data.msg});
                }
            });
        }
    },
    computed: {
        checkedChannel() {
            return this.checkedNodes.map(item => item.id);
        }
    },
    created(){
        this.init();
    }
}
</script>


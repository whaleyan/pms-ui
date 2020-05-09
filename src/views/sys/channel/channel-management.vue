<style>
@import '../../../styles/common.less';
</style>

<template>
    <div>
        <Row :gutter="16">
            <Col span="6">
                <Card style="height: 500px; overflow: scroll;">
                    <h4 slot="title">
                        <Icon type="cube"></Icon>
                        渠道管理
                    </h4>

                    <Row>
                        <create-channel :parentNode="currentNode" @on-custom-create="onCreate"></create-channel>
                        <delete-channel :currentNode="currentNode" @on-custom-delete="onDelete"></delete-channel>
                        <Tree :data="treeData" :load-data="loadData" @on-select-change="onSelectChange"></Tree>
                    </Row>
                </Card>
            </Col>
            <Col span="18">
                <Card style="height: 500px;">
                    <h4 slot="title">
                        <Icon type="cube"></Icon>
                        编辑信息
                    </h4>
                    <Row :gutter="16">
                        <Col span="12">
                            <Form ref="newForm" :model="item" :label-width="80" :rules="rules">
                                <FormItem prop="name" label="渠道名称">
                                    <Input type="text" v-model="item.name"></Input>
                                </FormItem>
                                <FormItem prop="description" label="描述">
                                    <Input type="text" v-model="item.remark"></Input>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click="onUpdate">更新信息</Button>
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>

    </div>
</template>

<script>
import Cookies from 'js-cookie';
import Channel from '@/entity/channel';
import ChannelService from '@/service/channelService';
import CreateChannel from './create.vue';
import DeleteChannel from './delete.vue';
export default {
    name: "channel-management",
    components: { CreateChannel, DeleteChannel },
    data() {
        return {
            rootId: -1,
            currentNode: {},
            item: new Channel(-1),
            treeData : [],
            rules: {
                name: [{ required: true, message: '输入不能为空', trigger: 'blur' }]
            }
        }
    },
    methods: {
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
         loadData (item, callback) {
             let pid = item.id;
             this.getChannelTree(pid).then(data => {
                 callback(data);
             });
         },
        onSelectChange(nodes) {
            if(nodes.length > 0) {
                let item = this.currentNode = nodes[0];
                this.item.name = item.name;
                this.item.id = item.id;
                this.item.parentId = item.parentId;
                this.item.remark = item.remark;
            }
        },
        onCreate(node) {
            this.getChannelTree(node.id).then(data => {
                node.children = data;
                node.expand = true;
            });
        },
        refreshTree(node) {
            let tree = this.treeData;
            let treeMap = {};
            function getTreeMap(tree) {
                tree.forEach(el => {
                    treeMap[el.id] = el;
                    if(el.children && el.children.length > 0){
                        getTreeMap(el.children);
                    }
                });
            }
            getTreeMap(tree);
            let parentNode = treeMap[node.parentId];
            this.getChannelTree(parentNode.id).then(data => {
                parentNode.children = data;
                parentNode.expand = true;
            });
        },
        onDelete(node) {
            this.refreshTree(node);
        },
        onUpdate() {
            ChannelService.updateChannel(this.item).then(res => {
                if(res.status === 200) {
                    this.$Notice.success({title:'操作成功'});
                    this.refreshTree(this.currentNode);
                } else {
                    this.$Notice.error({title:res.msg});
                }
            });
        }
    },
    created(){
        this.getChannelTree("-1").then(data => {
            this.currentNode = data[0];
            this.currentNode.title = this.currentNode.name;
            if(this.currentNode.type == 0) {
                this.currentNode.loading = false;
            }
            this.currentNode.children = [];
            this.treeData = data;
        });
    }
};
</script>



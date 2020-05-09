<template>
    <span>
        <Cascader :data="data" v-model="val" :load-data="loadData" @on-change="onChange" change-on-select></Cascader>
    </span>
</template>

<script>
    import RoleService from '@/service/roleService';
    import treeUtil from '@/libs/tree-util';
    export default {
        name: "role-tree-select",
        props: {
            rid: {
                type: String
            },
            isInit: {
                type: Boolean
            },
            selectedRid: {
                type: String
            }
        },
        data() {
            return {
                data : [],
                val : []
            };
        },
        methods: {
            loadData (item, callback){
                let vm = this;
                item.loading = true;
                vm.getRoles(item.roleId).then( d => {
                    d.forEach(it => {
                        it.children = [];
                        if (it.type == 0) {
                            it.loading = false;
                        }
                    });
                    item.children = d;
                    item.loading = false;
                    callback();
                });
            },
            getRoles(id){
                return new Promise((resolve, reject) => {
                    RoleService.getRoles({parentId: id}).then(data => {
                        data.data.list.forEach(item => {
                            item.value = item.roleId;
                            item.label = item.roleName;
                        });
                        resolve(data.data.list);
                    });
                });
            },
            onChange(value, selectedData) {
                //获取最后一个value
                this.$emit('selectedVal',value.reverse()[0])
            },
            init() {
                let vm = this;
                if(this.selectedRid  && this.selectedRid !== ''){
                    RoleService.getReverstree({ id: this.selectedRid }).then( d => {
                        let tree = d.data.roleIds;
                        let myVal = [];
                        tree.forEach(element => {
                            element.label = element.roleName;
                            element.value = element.roleId;
                            if(element.type == 0) {
                                element.loading = false;
                            }
                            if(element.roleId == this.selectedRid) {
                                myVal = element.rolePath.split("#").splice(1);
                            }
                        });
                        vm.data = treeUtil.list2Tree(tree,'parentId','roleId').children;
                        this.val = myVal;
                    });
                } else {
                    vm.getRoles(vm.rid).then( d => {
                        d.forEach(item => {
                            item.children = [];
//没有多级时可注掉
//                            if (item.type == 0) {    // type = 0
//                                item.loading = false;
//                            }
                        });
                        vm.data = d;
                    });
                }
            }

        },
        watch: {
            isInit: function(){
                if(this.isInit){
                    this.init();
                }
            }
        },
        mounted() {
            if(this.isInit){
                this.init();
            }
        }
    };
</script>



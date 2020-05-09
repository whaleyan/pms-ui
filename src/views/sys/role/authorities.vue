<template>
    <span>
        <h4 style="display: inline-block;">{{ role.title }} 权限设置 </h4> 
         <Button type="primary" size="small" class="margin-left-10" @click="getCheckedNodes">更新权限</Button>
        <Tree :data="pTree" show-checkbox ></Tree>
        
    </span>
    
</template>
<script>
import Role from '@/entity/role';
import RoleService from '@/service/roleService';
import _ from 'lodash';
import treeUtil from '@/libs/tree-util';
import { Base64 } from 'js-base64';
import HasPermisstion from "@/views/main-components/auth/has-permission.vue";
export default {
    name: "authorities",
    components: {HasPermisstion},
    props: {
        role : { type : Object},
    },
    data() {
        return {
            authTree:[],
            pTree : []
        }
    },
    watch: {
        'role': function() {
            let vm = this;
            vm.pTree = [];
            /*
                 根据当前选择用户的资源，进行比对
                 vm.$store.getters.getAllowedMenus
             */

            console.log("getAllowedResourceTree ",vm.$store.getters.getAllowedResourceTree);

            RoleService.getRoleAuth(vm.role.roleId).then(data => {
                let currentResources = JSON.parse(data.data.menu);
                console.log("当前用户的 资源: ",currentResources);

                vm.pTree = treeUtil.filterTreeObj(vm.$store.getters.getAllowedResourceTree,(item)=>{
                    //不进行过滤
                    return true;
                },(item)=>{
                    //如果有子节点则展开 expand: true,
                    if(item.children && item.children.length > 0){
                        item.expand = true;
                    }else if(currentResources[item.code]){
                        item.checked = true;
                    }
                    return item;
                });
            });
        }
    },
    methods: {
        getCheckedNodes() {
            let vm = this;
            let currentResources = treeUtil.filterAllNodes2Map(vm.pTree, {}, "code", (item)=>{
                return item.checked
            });
            // console.log(JSON.stringify(currentResources));

            for(let key in currentResources) {
                if(currentResources[key] === true) {
                    let words = key.split(":");
                    if(words.length > 1) {
                        words.forEach(element => {
                            if(typeof currentResources[element] === "boolean") {
                                currentResources[element] = true;
                            }
                        });
                    }
                }
            }
            console.log(JSON.stringify(currentResources));
            
            RoleService.setRoleAuth({
                id: vm.role.roleId,
                menu: Base64.encode(JSON.stringify(currentResources))
            }).then( (res) => {
                if(res.status === 200) {
                    vm.$Notice.success({title:'权限设置成功'});
                } else {
                    vm.$Notice.error({title:res.msg});
                }
            });


        }
    },
    created(){
        console.log("role:", this.role);
        
    }
}
</script>


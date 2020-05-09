<template>
    <span>
        <!--<has-permisstion permission="sys:role:delete">-->
        <Button type="error" @click.prevent="deleteRole()"><Icon type="trash-a"></Icon> 删除角色</Button>
        <!--</has-permisstion>-->
    </span>
</template>
<script>
import RoleService from '@/service/roleService';
import HasPermisstion from "@/views/main-components/auth/has-permission.vue";
export default {
    name: "modal-delete",
    components: {HasPermisstion},
    props: {
        currentNode: Object
    },
    data() {
        return {}
    },
    methods: {
        deleteRole() {
            // this.$emit("on-custom-delete", this.currentNode);
            this.$Modal.confirm({
                content: "<p>确认删除吗？</p>",
                onOk: () => {
                    RoleService.getRoles({parentId: this.currentNode.roleId}).then(res => {
                        if(res.status === 200 && res.data.list.length > 0) {
                            this.$Notice.warning({title: "角色包含子角色，无法删除！"});
                        } else if (res.status === 200 && res.data.list.length == 0) {
                            RoleService.deleteRole({id: this.currentNode.roleId}).then(res => {
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

        }
    }
}
</script>

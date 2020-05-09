<template>
    <span v-show="hasPermisstion">
        <slot>

        </slot>
    </span>
</template>

<script>

export default {
    name: 'hasPermisstion',
    data () {
        return {

        };
    },
    props: {
        permission: {
            type: String
        }
    },
    computed: {
        hasPermisstion: function () {
            // console.log(this.$store.getters.getAllowedMenus);
            
            return this.$store.getters.getAllowedMenus[this.permission];
        }
    }
};
</script>

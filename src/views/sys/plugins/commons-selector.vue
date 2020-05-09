<template>
    <div>
        <Select  @on-change="onChange">
            <Option v-for="item in commons"  :value="JSON.stringify(item)" :key="item.id">{{ item.content}}</Option>
        </Select>
    </div>
</template>

<script>
    import service from '@/service/sysSettingService';
    export default {
        name: 'commons-selector',
        data () {
            return {
                commons: [],
                title:"",
                selectedData:{},
            }
        },
        methods: {
            onChange(selectedData){
                this.$emit("onCommonsSelected", selectedData);
            }
        },
        created() {
            let vm = this;
            service.getComments().then( res => {
                if(res.status == 200) {
                    vm.commons = res.data.list;
                } else {
                    this.$Notice.error({title: res.msg});
                }
            });
        }
    };
</script>

<style lang="less">
@import '../../../../styles/common.less';
</style>
<template>
    <Row>
        <Card>
            <h4 slot="title">
                <Icon type="person-stalker"></Icon>
                FAQ消息设置
            </h4>
            <Row>
                <Col span="2">
                    <Button type="primary" @click="modal1 = true" icon="plus">添加</Button>
                </Col>
                <Col span="2">
                    <Button type="primary" shape="circle" icon="refresh" @click="refresh"></Button>
                </Col>
            </Row>
            <Row class="margin-top-10">
                <Col span="24">
                    <Table :columns="columns" :data="tableData" :loading="tableLoading"></Table>

                    <Page class="margin-top-10"   :current="params.current" :total="totalCount" :page-size="params.limit" :page-size-opts=pageGroup show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                </Col>
            </Row>
        </Card>
        <Modal v-model="modal1"  title="添加" @on-ok="add" >
            <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="100">

                <FormItem label="FAQ排列顺序" prop="sx">
						<Input v-model="formData.sx" placeholder="输入原因..."></Input>
				</FormItem>
					<FormItem label="FAQ题目" prop="title">
						<Input v-model="formData.title" type="textarea" placeholder="输入内容..."></Input>
					</FormItem>
					<FormItem label="FAQ回答" prop="answer">
						<!-- <Input v-model="formData.answer" type="textarea" placeholder="输入内容..."></Input> -->
						<c-k-editor :value="formData.answer" @abc="abc" ></c-k-editor>
				</FormItem>
            </Form>
        </Modal>
    </Row>
</template>

<script>
import service from '@/service/sysSettingService';
import { tableConfigMixin } from '@/libs/config';
import CKEditor from './faq-editor.vue';
import faqEdit from './faq-edit.vue';
export default {
	name: 'faq-list',
	components: { faqEdit,CKEditor },
	mixins: [tableConfigMixin],
	data() {
		let obj = {
			modal1: false,
			tableLoading: true,
			tableData: [],
			searchTableData: [],
			srcTableData: [],
            params:{
                current:1
            },
			formData: {
				title: '',
				content: '',
				type: 5,
				sx: '',
				answer: '',
			},
			ruleValidate: {
				title: [{ required: true, message: '输入不能为空', trigger: 'blur' }],
				content: [{ required: true, message: '输入不能为空', trigger: 'blur' }],
			},
			columns: [
				{
					title: '序号',
					key: 'id',
				},

				{
					title: 'FAQ问题',
					key: 'title',
				},
				{
					title: 'FAQ排列序号',
					key: 'content',
					width: 240,
					render: (h, params) => {
						// render for sx
						let content = JSON.parse(params.row.content);
						return h('span', content.sx);
					},
				},
				{
					title: '创建时间',
					key: 'createTime',
					render: (h,params) => {
						function date2string(d) {
							if (typeof d == 'string') return d;
							let year = d.getFullYear();
							let month = d.getMonth() + 1;
							let day = d.getDate();
							let hour = d.getHours();
							let min = d.getMinutes();
							let sed = d.getSeconds();
							return year + '-' + (month < 10 ? '0' + month : month)
										+ '-' + (day < 10 ? '0' + day : day)
										+ ' ' + (hour < 10 ? '0' + hour : hour)
										+ ':' + (min < 10 ? '0' + min : min)
										+ ':' + (sed < 10 ? '0' + sed : sed);
						}
						return h('span', date2string(new Date(params.row.createTime)));
					}
				},

				{
					title: '操作',
					key: 'action',
					align: 'center',
					width: 240,
					render: (h, params) => {
						let editBtn = h(faqEdit, {
							props: {
								obj: params.row,
							},
							on: {
								onSuccess: () => {
									this.getList();
								},
							},
						});
						let delBtn = h(
							'Button',
							{
								props: {
									type: 'error',
									size: 'small',
								},
								style: {
									marginRight: '4px',
								},
								on: {
									click: () => {
										this.remove(params.index);
									},
								},
							},
							'删除'
						);

						let btns = [];
						btns.push(editBtn);
						btns.push(delBtn);
						return h('div', btns);
					},
				},
			],
		};
		return obj;
	},
	methods: {
        refresh(){
            this.pageChange(1);
            // this.params.page = 1;
            this.getList();
        },
		add() {
			let vm = this;

			let innerInfo = {
				sx: vm.formData.sx,
				answer: vm.formData.answer,
			};

			let data = {
				title: vm.formData.title,
				type: 5,
				content: JSON.stringify(innerInfo),
			};

			service.addFaq(data).then(res => {
				if (res.status === 200) {
					vm.$Notice.success({ title: '添加成功' });
                    this.pageChange(1);
                    // vm.getList();
					vm.formData.title = '';
					vm.formData.answer = '';
					vm.formData.sx = '';
				} else {
					vm.$Notice.error({ title: res.msg });
				}
			});
		},
		remove(index) {
			let vm = this;
			this.$Modal.confirm({
				title: '警告',
				content: '确认删除吗？',
				onOk: () => {
					service.delFaq(vm.tableData[index].id).then(res => {
						if (res.status === 200) {
							vm.$Notice.success({ title: '删除成功' });
                            this.pageChange(1);
                            // vm.getList();
						} else {
							vm.$Notice.error({ title: res.msg });
						}
					});
				},
			});
		},
		pageChange(page) {
            this.params.current = page;
			this.params.page = page;
			let _start = (page - 1) * this.params.limit;
			let _end = page * this.params.limit;
			this.tableData = this.searchTableData.slice(_start, _end);
			//            this.getList();
		},
		pageSizeChange(size) {
			this.params.limit = size;
			let _start = (page - 1) * this.params.limit;
			let _end = page * this.params.limit;
			this.tableData = this.searchTableData.slice(_start, _end);
			//            this.getList();
		},
		getList() {
			let vm = this;
			let params = this.params;
			vm.tableLoading = true;
			service.getFaqs().then(res => {
				if (res.status == 200) {
					vm.tableLoading = false;
					vm.srcTableData = res.data.list;
					vm.searchTableData = res.data.list;
					vm.tableData = vm.srcTableData.slice(0, vm.params.limit);
                    vm.totalCount = res.data.total;
				} else {
					vm.$Notice.error({ title: res.msg });
				}
			});
		},
		abc(value) {
			this.formData.answer = value;
		},
	},
	computed: {
		// total: function() {
		// 	return this.searchTableData.length;
		// },
	},

	created() {
		this.$nextTick(function() {
			this.getList();
		});
	},
};
</script>

<style scoped>
</style>

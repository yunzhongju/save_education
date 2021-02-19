<template>
	<div class="in-animate">
		<base-tabs
		@onBaseTabClick="onBaseTabClick"
		:baseTabs="baseTabs">
			<template v-slot:1>
				<div class="flex-mid2 container">
					<base-form 
						@handleChoose="handleChoose"
						class="b-form"></base-form>
				</div>
			</template>
		</base-tabs>
	</div>
</template>

<script>
	import BaseTabs from '../../components/BaseTabs.vue';
	import BaseForm from './components/BaseForm.vue'
	import api from '../../api/api.js'
	export default {
		components:{
			BaseTabs,
			BaseForm
		},
		data(){
			return {
				baseTabs:[{label: '创建试卷',value: '1'}],
				questionList:[],
				total:0
			}
		},
		methods:{
			onBaseTabClick(){
			
			},
			handleChoose(type){
				this.queryQuestionByPage({pageNo:1,pageSize:10,questionType:type})
			},
			queryQuestionByPage(params){
				api.queryQuestionByPageAPI(params).then(res=>{
					// console.log(res);
					if(res.code==0){
						this.questionList=res.data.records,
						this.total=res.data.total
					}
				})
			}
		},
		created() {
			this.queryQuestionByPage({pageNo:1,pageSize:10})
		}
	}
</script>

<style>
</style>


<style>
</style>

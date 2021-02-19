<template>
	<div class="in-animate">
		<base-tabs 
		:baseTabs="baseTabs">
		<template v-slot:1>
			<div class="flex-mid2 container">
				<base-form 
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
	components: {
		BaseTabs,
		BaseForm,
	},
	data() {
		return {
			id:'',
			planDetail:'',
			baseTabs: [{label: '创建考试',value: '1'}],
		};
	},
	methods:{
	},
	created() {


	}
};
</script>

<style lang="less" scoped>
	.b-form{
		width: 50%;
	}
</style>

<template>
	<div class="in-animate">
		<base-tabs
		@onBaseTabClick="onBaseTabClick"
		:baseTabs="baseTabs">
			<template v-slot:1>
				<div class="d-flex">
					<base-form class="b-form"></base-form>
				</div>
			</template>
		</base-tabs>
	</div>
</template>

<script>
	import BaseTabs from '../../components/BaseTabs.vue';
	import BaseForm from './components/BaseForm.vue'
	export default {
		components:{
			BaseTabs, 
			BaseForm,
		},
		data(){
			return {
				baseTabs:[
					{
						label: '创建栏目',
						value: '1'
					}
				],
			}
		},
		methods:{
			onBaseTabClick(){
				
			}
		}
	}
</script>

<style>
</style>

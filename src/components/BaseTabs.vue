<template>
	<el-tabs 
	v-model="activeName"
	@tab-click="handleTabClick" 
	type="border-card">
		<el-tab-pane 
			v-for="(item, index) in baseTabs" 
			:key="item.value" 
			:name="item.value"
			:label="item.label">
			<slot :name="item.value"></slot>
		</el-tab-pane>
	</el-tabs>
</template>

<script>
export default {
	props:{
		baseTabs:{
			type:Array,
			required:true,
			default:()=>[]
		}
	},
	data() {
		return {
			activeName:'1'
		};
	},
	methods: {
		handleTabClick(tab) {
			// console.log(tab);
			this.$emit('onBaseTabClick',tab.name)
		}
	}
};
</script>

<style></style>

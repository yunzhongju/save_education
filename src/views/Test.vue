<template>
	<div class="in-animate">
		<base-tabs
		@onBaseTabClick="onBaseTabClick"
		:baseTabs="baseTabs">
			<template v-slot:1>
				<div style="height: 750px; display: flex;justify-content: center;align-items: center;flex-direction: column;">
					<img src="../assets/images/404.svg" alt="" style="width: 400px; height: 400;display: block;">
					<p>该模块未开发,敬请期待!</p>
				</div>
			</template>
		</base-tabs>
	</div>
</template>

<script>
	import BaseTabs from '../components/BaseTabs.vue';
	export default {
		components:{
			BaseTabs,
		},
		data(){
			return {
				baseTabs:[
					{
						label: '未开发',
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

<style scoped>
	p{
		font-size: 50px;
		color: #999999;
		font-family: test;
	}
</style>

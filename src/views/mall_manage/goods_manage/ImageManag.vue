<template>
	<div class="in-animate">
		<base-tabs
		@onBaseTabClick="onBaseTabClick"
		:baseTabs="baseTabs">
			<template v-slot:1>
				<div class="box-car">
					<el-row>
					  <el-col :span="24"><div class="grid-content bg-purple-dark">
							<ul  class="flex-end">
								<li class="marg-right30">
									<el-button 
										type="primary" 
										size="mini" 
										icon="el-icon-plus" 
										@click="onHandleAddImg"
										>
									添加
									</el-button>
								</li>
								<li class="marg-right30">
									<el-button 
										type="primary" 
										size="mini" 
										icon="el-icon-refresh-left" 
										@click="$router.go(-1)"
										>
									返回
									</el-button>
								</li>
							</ul>
						</div></el-col>
					</el-row>
				</div>
			</template>
		</base-tabs>
	</div>
</template>

<script>
	import BaseTabs from '../../../components/BaseTabs.vue';
	export default {
		components:{
			BaseTabs,
		},
		data(){
			return {
				baseTabs:[
					{
						label: '商品图片管理',
						value: '1'
					}
				],
			}
		},
		methods:{
			onHandleAddImg(){},
			onBaseTabClick(){
				
			}
		}
	}
</script>

<style scoped>
.box-car{
	min-height: 80vh;
	max-height: 80vh;
}
</style>
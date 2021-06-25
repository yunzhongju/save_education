<template>
	<div class="in-animate">
		<base-tabs
		@onBaseTabClick="onBaseTabClick"
		:baseTabs="baseTabs">
			<template v-slot:1>
				<el-row>
				  <el-col :span="24"><div class="grid-content bg-purple-dark flex-end">
						 <el-button 
							type="primary" 
							size="mini" 
							@click="$router.go(-1)"
							icon="el-icon-refresh-right">返回</el-button>
					</div></el-col>
				</el-row>
				<el-row>
				  <el-col :span="24"><div class="grid-content bg-purple-dark marg-top20">
						<el-card class="box-card" shadow="never">
							<el-row>
							  <el-col :span="24"><div class="grid-content bg-purple-dark" style="text-align: center;">
									<el-image :src="detail.imagePath" lazy style="width: 400px; height: 200px;"></el-image>
								</div></el-col>
							</el-row>
							<el-row>
							  <el-col :span="24"><div class="grid-content bg-purple-dark marg-top50">
									<ul>
										<li>创建时间:{{detail.createTime}}</li>
										<li>更新时间:{{detail.updateTime}}</li>
										<li>资讯来源:{{detail.source}}</li>
										<li>资讯栏目:{{detail.channelName}}</li>
										<li>阅读数量:{{detail.readNumber}}</li>
										<li>虚拟数量:{{detail.vmReadNumber}}</li>
										<li>资讯状态:{{detail.approve==1?'通过':detail.approve==3?'未通过':'未审核'}}</li>
									</ul>
								</div></el-col>
							</el-row>
							<el-row>
							  <el-col :span="24"><div class="grid-content bg-purple-dark" style="text-align: center;">
									<h1>{{detail.title}}</h1>
								</div></el-col>
							</el-row>
						  <el-row>
						    <el-col :span="24"><div class="grid-content bg-purple-dark marg-top20">
						  		<div class="show-content" v-html="detail.content"></div>
						  	</div></el-col>
						  </el-row>
						</el-card>
					</div></el-col>
				</el-row>
			</template>
		</base-tabs>
	</div>
</template>

<script>
	import BaseTabs from '../../components/BaseTabs.vue';
	// import BaseEditor from '../../components/ckeditor/ckeditor.vue'
	import api from '../../api/api.js'
	export default {
		components:{
			BaseTabs,
			// BaseEditor
		},
		data(){
			return {
				id:'',
				detail:'',
				baseTabs:[
					{
						label: '新闻详情',
						value: '1'
					}
				],
			}
		},
		methods:{
			onBaseTabClick(){
				
			}
		},
		created() {
			this.id=this.$route.query.id
			api.newsDetailAPI({id:this.id}).then(res=>{
				// // console.log('资讯详情',res);
				this.detail=res.data
			})
		}
	}
</script>

<style scoped lang="less">
	.box-card{
		height: 700px;
		overflow-y: auto;
	}
	.show-content{
		// min-height: 350px;
		// max-height: 350px;
		// overflow-y: auto;
	}
	ul{
		li{
			margin-bottom: 10px;
			span{
				margin-left: 20px 
			}
		}
	}
</style>
